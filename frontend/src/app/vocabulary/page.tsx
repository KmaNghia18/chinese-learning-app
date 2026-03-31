'use client';
import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { PronunciationModal } from "@/components/PronunciationGuide";
import { pinyinToVietnamese } from "@/lib/pinyinToVietnamese";

const TONE_COLORS: Record<number, string> = { 1:'#06b6d4',2:'#10b981',3:'#f59e0b',4:'#ef4444',5:'#8b5cf6' };
const TONE_MAP: Record<string,number> = {
  'ā':1,'á':2,'ǎ':3,'à':4,'ē':1,'é':2,'ě':3,'è':4,
  'ī':1,'í':2,'ǐ':3,'ì':4,'ō':1,'ó':2,'ǒ':3,'ò':4,
  'ū':1,'ú':2,'ǔ':3,'ù':4,'ǖ':1,'ǘ':2,'ǚ':3,'ǜ':4,
};
function getFirstTone(pinyin: string): number {
  const first = pinyin.trim().split(' ')[0];
  for (const [ch,t] of Object.entries(TONE_MAP)) if (first.includes(ch)) return t;
  return 5;
}
const LEVEL_COLORS: Record<string,string> = {
  HSK1:'#10b981',HSK2:'#3b82f6',HSK3:'#f59e0b',HSK4:'#8b5cf6',HSK5:'#ec4899',HSK6:'#ef4444'
};
const TYPE_LABELS: Record<string,string> = {
  noun:'名词',verb:'动词',adjective:'形容词',adverb:'副词',
  pronoun:'代词',measure_word:'量词',other:'其他'
};

interface Word {
  id: number; hanzi: string; pinyin: string;
  meaning_vi: string; meaning_en?: string;
  word_type?: string; hsk_level: string;
  example_sentence_zh?: string; example_sentence_vi?: string;
}

// ── LocalStorage helpers ──────────────────────────────────
function loadSet(key: string): Set<number> {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); }
}
function saveSet(key: string, s: Set<number>) {
  localStorage.setItem(key, JSON.stringify([...s]));
}

export default function VocabularyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<Word[]>([]);
  const [fetching, setFetching] = useState(false);
  const [filter, setFilter] = useState("HSK1");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');
  const [pronWord, setPronWord] = useState<Word|null>(null);
  const [expandedId, setExpandedId] = useState<number|null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 60;

  // ── New state ───────────────────────────────────────────
  const [showVietPron, setShowVietPron] = useState(false);      // toggle phiên âm TV trên thẻ
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [favOnly, setFavOnly] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  // Load favorites & known from localStorage
  useEffect(() => {
    setFavorites(loadSet('vocab_favorites'));
    setKnown(loadSet('vocab_known'));
  }, []);

  useEffect(() => {
    if (!user) return;
    setFetching(true);
    setPage(1);
    api.getVocabulary({ hsk_level: filter, limit: "2000" })
      .then(r => setWords(r.data || []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [filter, user]);

  const play = useCallback((hanzi: string) => {
    new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`).play().catch(()=>{});
  }, []);

  const toggleFav = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSet('vocab_favorites', next);
      return next;
    });
  }, []);

  const toggleKnown = useCallback((id: number) => {
    setKnown(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSet('vocab_known', next);
      return next;
    });
  }, []);

  // Normalize pinyin for search
  const normalizePin = (s: string) => s
    .replace(/[āáǎà]/g,'a').replace(/[ēéěè]/g,'e')
    .replace(/[īíǐì]/g,'i').replace(/[ōóǒò]/g,'o')
    .replace(/[ūúǔù]/g,'u').replace(/[ǖǘǚǜ]/g,'u')
    .toLowerCase();

  const filtered = words.filter(w => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      w.hanzi.includes(q) ||
      w.pinyin.toLowerCase().includes(q) ||
      normalizePin(w.pinyin).includes(normalizePin(q)) ||
      w.meaning_vi.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || w.word_type === typeFilter;
    const matchFav = !favOnly || favorites.has(w.id);
    return matchSearch && matchType && matchFav;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const types = ['all', ...Array.from(new Set(words.map(w => w.word_type).filter(Boolean))) as string[]];

  const knownCount = words.filter(w => known.has(w.id)).length;
  const favCount = words.filter(w => favorites.has(w.id)).length;

  if (loading) return <div className="spinner"/>;
  const lc = LEVEL_COLORS[filter] || '#6366f1';

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'1.5rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>

        {/* ── Header ── */}
        <div style={{marginBottom:'1.25rem',display:'flex',alignItems:'flex-start',gap:'1rem',flexWrap:'wrap'}}>
          <div style={{flex:1}}>
            <h1 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.2rem',
              background:'linear-gradient(135deg,#06b6d4,#8b5cf6)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              📚 Từ Vựng Tiếng Trung
            </h1>
            <p style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>
              Tổng <strong style={{color:'var(--c-text)'}}>{filtered.length}</strong> từ
              {knownCount > 0 && <span> · ✅ <strong style={{color:'#10b981'}}>{knownCount}</strong> đã biết</span>}
              {favCount > 0 && <span> · ❤️ <strong style={{color:'#f43f5e'}}>{favCount}</strong> yêu thích</span>}
            </p>
          </div>

          {/* Progress bar */}
          {words.length > 0 && (
            <div style={{minWidth:160}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.68rem',
                color:'var(--c-text-muted)',marginBottom:'.2rem'}}>
                <span>Tiến độ {filter}</span>
                <span>{Math.round(knownCount/words.length*100)}%</span>
              </div>
              <div style={{height:6,borderRadius:3,background:'var(--c-border)',overflow:'hidden'}}>
                <div style={{height:'100%',borderRadius:3,
                  background:`linear-gradient(90deg,${lc},${lc}88)`,
                  width:`${Math.round(knownCount/words.length*100)}%`,
                  transition:'width .4s ease'}}/>
              </div>
            </div>
          )}
        </div>

        {/* ── Controls bar ── */}
        <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap',marginBottom:'1rem',alignItems:'center'}}>
          {/* Level tabs */}
          <div style={{display:'flex',gap:'.3rem',background:'var(--c-surface)',borderRadius:10,
            padding:'.3rem',border:'1px solid var(--c-border)'}}>
            {['HSK1','HSK2','HSK3','HSK4','HSK5','HSK6'].map(lv => (
              <button key={lv} onClick={() => { setFilter(lv); setTypeFilter('all'); setSearch(''); setFavOnly(false); }}
                style={{padding:'.35rem .75rem',borderRadius:7,border:'none',cursor:'pointer',
                  fontWeight:700,fontSize:'.8rem',transition:'all .15s',
                  background:filter===lv?LEVEL_COLORS[lv]:'transparent',
                  color:filter===lv?'#fff':'var(--c-text-muted)'}}>
                {lv}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{flex:1,minWidth:200,position:'relative'}}>
            <span style={{position:'absolute',left:'.6rem',top:'50%',transform:'translateY(-50%)',
              fontSize:'.8rem',pointerEvents:'none'}}>🔍</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm chữ Hán, pinyin, nghĩa..."
              style={{width:'100%',padding:'.5rem .75rem .5rem 2rem',borderRadius:10,
                border:'1.5px solid var(--c-border)',background:'var(--c-surface)',
                color:'var(--c-text)',fontSize:'.85rem',outline:'none',boxSizing:'border-box'}}/>
            {search && (
              <button onClick={() => setSearch('')}
                style={{position:'absolute',right:'.5rem',top:'50%',transform:'translateY(-50%)',
                  background:'none',border:'none',cursor:'pointer',color:'var(--c-text-muted)',fontSize:'.8rem'}}>✕</button>
            )}
          </div>

          {/* Toolbar right */}
          <div style={{display:'flex',gap:'.4rem',alignItems:'center'}}>
            {/* Phiên âm TV toggle */}
            <button onClick={() => setShowVietPron(p=>!p)}
              title="Hiện/ẩn phiên âm tiếng Việt trên thẻ"
              style={{padding:'.38rem .65rem',borderRadius:8,border:`1.5px solid ${showVietPron?'#f59e0b':'var(--c-border)'}`,
                background:showVietPron?'#f59e0b15':'var(--c-surface)',
                color:showVietPron?'#f59e0b':'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.72rem',fontWeight:700,transition:'all .15s',whiteSpace:'nowrap'}}>
              🇻🇳 {showVietPron?'Ẩn':'Hiện'} TV
            </button>

            {/* Yêu thích filter */}
            <button onClick={() => { setFavOnly(p=>!p); setPage(1); }}
              title="Chỉ hiện từ yêu thích"
              style={{padding:'.38rem .65rem',borderRadius:8,border:`1.5px solid ${favOnly?'#f43f5e':'var(--c-border)'}`,
                background:favOnly?'#f43f5e15':'var(--c-surface)',
                color:favOnly?'#f43f5e':'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.8rem',fontWeight:700,transition:'all .15s'}}>
              {favOnly ? '❤️ Yêu thích' : '🤍'}
            </button>

            {/* View mode */}
            <div style={{display:'flex',gap:'.2rem',background:'var(--c-surface)',borderRadius:8,
              padding:'.15rem',border:'1px solid var(--c-border)'}}>
              {(['grid','list'] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  style={{padding:'.35rem .6rem',borderRadius:6,border:'none',cursor:'pointer',
                    background:viewMode===m?lc:'transparent',
                    color:viewMode===m?'#fff':'var(--c-text-muted)',fontSize:'.85rem',transition:'all .15s'}}>
                  {m==='grid'?'⊞':'☰'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Type filters ── */}
        <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap',marginBottom:'1.25rem'}}>
          {types.map(t => (
            <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
              style={{padding:'.3rem .7rem',borderRadius:20,border:'1.5px solid',
                borderColor:typeFilter===t?lc:'var(--c-border)',
                background:typeFilter===t?lc+'15':'transparent',
                color:typeFilter===t?lc:'var(--c-text-muted)',
                fontWeight:typeFilter===t?700:500,cursor:'pointer',fontSize:'.75rem',transition:'all .15s'}}>
              {t==='all'?`📚 Tất cả (${words.length})`:
                `${TYPE_LABELS[t]||t} (${words.filter(w=>w.word_type===t).length})`}
            </button>
          ))}
        </div>

        {/* ── Words display ── */}
        {fetching ? (
          <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>
            <div style={{fontSize:'2rem',marginBottom:'.5rem'}}>⏳</div>Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>
            <div style={{fontSize:'2rem',marginBottom:'.5rem'}}>{favOnly?'❤️':'🔍'}</div>
            {favOnly ? 'Chưa có từ yêu thích nào. Nhấn 🤍 trên thẻ để thêm!' : 'Không tìm thấy từ nào phù hợp'}
          </div>
        ) : viewMode === 'grid' ? (
          /* ── GRID VIEW ── */
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))',gap:'.75rem'}}>
            {paged.map(word => {
              const tone = getFirstTone(word.pinyin);
              const tc = TONE_COLORS[tone];
              const isExp = expandedId === word.id;
              const isFav = favorites.has(word.id);
              const isKnown = known.has(word.id);
              const vietPron = pinyinToVietnamese(word.pinyin);

              return (
                <div key={word.id}
                  style={{background:'var(--c-surface)',borderRadius:14,padding:'1rem',
                    border:`1.5px solid ${isKnown?'#10b98144':isExp?tc:'var(--c-border)'}`,
                    cursor:'pointer',transition:'all .18s',position:'relative',overflow:'hidden',
                    boxShadow:isExp?`0 4px 16px ${tc}25`:isKnown?'0 2px 8px #10b98115':'none',
                    opacity:isKnown&&!isExp?.85:1}}
                  onClick={() => setExpandedId(isExp?null:word.id)}>

                  {/* Known badge */}
                  {isKnown && (
                    <div style={{position:'absolute',top:0,left:0,right:0,height:3,
                      background:'linear-gradient(90deg,#10b981,#34d399)'}}/>
                  )}

                  {/* Top row: level badge + fav + known */}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'.4rem'}}>
                    <span style={{background:LEVEL_COLORS[word.hsk_level]+'20',
                      color:LEVEL_COLORS[word.hsk_level],
                      borderRadius:5,padding:'.1rem .35rem',fontSize:'.58rem',fontWeight:800}}>
                      {word.hsk_level}
                    </span>
                    <div style={{display:'flex',gap:'.25rem'}}>
                      {/* Yêu thích button */}
                      <button onClick={e => { e.stopPropagation(); toggleFav(word.id); }}
                        title={isFav?'Bỏ yêu thích':'Thêm yêu thích'}
                        style={{background:'none',border:'none',cursor:'pointer',
                          fontSize:'.9rem',lineHeight:1,padding:'.1rem',
                          filter:isFav?'saturate(1)':'saturate(0) opacity(0.4)',
                          transition:'filter .15s, transform .1s',transform:'scale(1)'}}>
                        ❤️
                      </button>
                      {/* Đã biết button */}
                      <button onClick={e => { e.stopPropagation(); toggleKnown(word.id); }}
                        title={isKnown?'Đánh dấu chưa biết':'Đánh dấu đã biết'}
                        style={{background:'none',border:'none',cursor:'pointer',
                          fontSize:'.85rem',lineHeight:1,padding:'.1rem',
                          filter:isKnown?'saturate(1)':'saturate(0) opacity(0.35)',
                          transition:'filter .15s'}}>
                        ✅
                      </button>
                    </div>
                  </div>

                  {/* Hanzi */}
                  <div style={{fontSize:'2.4rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                    lineHeight:1,marginBottom:'.3rem',
                    background:isExp?`linear-gradient(135deg,${tc},${tc}99)`:'linear-gradient(135deg,#06b6d4,#8b5cf6)',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                    {word.hanzi}
                  </div>

                  {/* Pinyin */}
                  <div style={{fontSize:'.85rem',fontStyle:'italic',color:tc,fontWeight:600,marginBottom:'.2rem'}}>
                    {word.pinyin}
                  </div>

                  {/* Phiên âm TV — hiện nếu toggle bật */}
                  {showVietPron && (
                    <div style={{fontSize:'.78rem',fontWeight:800,color:'#f59e0b',
                      background:'#f59e0b10',borderRadius:5,padding:'.1rem .35rem',
                      marginBottom:'.2rem',display:'inline-block',letterSpacing:.3}}>
                      🇻🇳 {vietPron}
                    </div>
                  )}

                  {/* Meaning */}
                  <div style={{fontSize:'.8rem',color:'var(--c-text)',fontWeight:600,
                    marginBottom:'.4rem',lineHeight:1.4}}>🇻🇳 {word.meaning_vi}</div>

                  {/* Word type */}
                  {word.word_type && (
                    <span style={{fontSize:'.6rem',background:tc+'15',color:tc,
                      borderRadius:4,padding:'.1rem .35rem',fontWeight:700}}>
                      {TYPE_LABELS[word.word_type]||word.word_type}
                    </span>
                  )}

                  {/* Expanded content */}
                  {isExp && (
                    <div style={{marginTop:'.75rem',paddingTop:'.75rem',borderTop:'1px solid var(--c-border)'}}>
                      {/* Phiên âm TV full (luôn hiện khi expand) */}
                      {!showVietPron && (
                        <div style={{background:'#f59e0b10',border:'1px solid #f59e0b30',
                          borderRadius:8,padding:'.35rem .6rem',marginBottom:'.5rem'}}>
                          <div style={{fontSize:'.55rem',color:'#f59e0b',fontWeight:700,marginBottom:'.1rem'}}>🇻🇳 PHIÊN ÂM TV</div>
                          <div style={{fontSize:'1rem',fontWeight:900,color:'#f59e0b'}}>{vietPron}</div>
                        </div>
                      )}
                      {word.meaning_en && (
                        <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',marginBottom:'.5rem'}}>
                          🇬🇧 {word.meaning_en}
                        </div>
                      )}
                      {word.example_sentence_zh && (
                        <div style={{background:'var(--c-bg)',borderRadius:8,padding:'.5rem .6rem',marginBottom:'.6rem'}}>
                          <div style={{fontSize:'.8rem',fontFamily:'"Noto Serif CJK SC",serif',
                            color:'var(--c-text)',marginBottom:'.2rem'}}>{word.example_sentence_zh}</div>
                          <div style={{fontSize:'.68rem',color:'var(--c-text-muted)'}}>{word.example_sentence_vi}</div>
                        </div>
                      )}
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'.4rem'}}>
                        <button onClick={e => { e.stopPropagation(); play(word.hanzi); }}
                          style={{padding:'.35rem',borderRadius:7,border:`1px solid ${tc}40`,
                            background:tc+'10',color:tc,cursor:'pointer',fontSize:'.72rem',fontWeight:700}}>
                          🔊 Nghe
                        </button>
                        <button onClick={e => { e.stopPropagation(); setPronWord(word); }}
                          style={{padding:'.35rem',borderRadius:7,border:'1px solid #f59e0b40',
                            background:'#f59e0b10',color:'#f59e0b',cursor:'pointer',fontSize:'.72rem',fontWeight:700}}>
                          🎤 Phát âm
                        </button>
                        <button onClick={e => { e.stopPropagation(); toggleKnown(word.id); }}
                          style={{padding:'.35rem',borderRadius:7,
                            border:`1px solid ${isKnown?'#10b98140':'var(--c-border)'}`,
                            background:isKnown?'#10b98115':'transparent',
                            color:isKnown?'#10b981':'var(--c-text-muted)',
                            cursor:'pointer',fontSize:'.68rem',fontWeight:700}}>
                          {isKnown?'✅ Biết rồi':'⬜ Chưa biết'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Compact buttons (not expanded) */}
                  {!isExp && (
                    <div style={{display:'flex',gap:'.3rem',marginTop:'.5rem'}}>
                      <button onClick={e => { e.stopPropagation(); play(word.hanzi); }}
                        style={{padding:'.2rem .45rem',borderRadius:5,border:`1px solid ${tc}30`,
                          background:tc+'08',color:tc,cursor:'pointer',fontSize:'.65rem'}}>🔊</button>
                      <button onClick={e => { e.stopPropagation(); setPronWord(word); }}
                        style={{padding:'.2rem .45rem',borderRadius:5,border:'1px solid #f59e0b30',
                          background:'#f59e0b08',color:'#f59e0b',cursor:'pointer',fontSize:'.65rem'}}>🎤</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ── LIST VIEW ── */
          <div style={{display:'flex',flexDirection:'column',gap:'.4rem'}}>
            <div style={{display:'grid',
              gridTemplateColumns:'50px 1fr 1fr 1fr 90px 70px 90px',
              gap:'1rem',padding:'.4rem .8rem',
              fontSize:'.7rem',color:'var(--c-text-muted)',fontWeight:700,
              textTransform:'uppercase',letterSpacing:.8,borderBottom:'1px solid var(--c-border)'}}>
              <span>Chữ</span><span>Pinyin / TV</span><span>Tiếng Việt</span>
              <span>Tiếng Anh</span><span>Loại từ</span><span>Biết</span><span>Phát âm</span>
            </div>
            {paged.map(word => {
              const tone = getFirstTone(word.pinyin);
              const tc = TONE_COLORS[tone];
              const isFav = favorites.has(word.id);
              const isKnown = known.has(word.id);
              const vietPron = pinyinToVietnamese(word.pinyin);
              return (
                <div key={word.id}
                  style={{display:'grid',
                    gridTemplateColumns:'50px 1fr 1fr 1fr 90px 70px 90px',
                    gap:'1rem',padding:'.6rem .8rem',
                    background: isKnown ? '#10b98108' : 'var(--c-surface)',
                    borderRadius:10,
                    border:`1px solid ${isKnown?'#10b98130':'var(--c-border)'}`,
                    alignItems:'center',transition:'border-color .15s'}}
                  onMouseEnter={e => (e.currentTarget.style.borderColor=tc+'60')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor=isKnown?'#10b98130':'var(--c-border)')}>

                  <div style={{fontSize:'1.5rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                    background:`linear-gradient(135deg,${tc},${tc}80)`,
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                    {word.hanzi}
                  </div>
                  <div>
                    <div style={{fontSize:'.83rem',color:tc,fontStyle:'italic',fontWeight:600}}>{word.pinyin}</div>
                    <div style={{fontSize:'.73rem',color:'#f59e0b',fontWeight:700,marginTop:'.1rem'}}>🇻🇳 {vietPron}</div>
                  </div>
                  <div style={{fontSize:'.83rem',color:'var(--c-text)',lineHeight:1.4}}>{word.meaning_vi}</div>
                  <div style={{fontSize:'.78rem',color:'var(--c-text-muted)',lineHeight:1.4}}>{word.meaning_en||'—'}</div>
                  <div>
                    {word.word_type ? (
                      <span style={{fontSize:'.65rem',background:tc+'15',color:tc,
                        borderRadius:5,padding:'.15rem .4rem',fontWeight:700}}>
                        {TYPE_LABELS[word.word_type]||word.word_type}
                      </span>
                    ) : <span style={{color:'var(--c-text-muted)'}}>—</span>}
                  </div>
                  <div style={{display:'flex',gap:'.25rem',justifyContent:'center'}}>
                    <button onClick={() => toggleFav(word.id)}
                      style={{background:'none',border:'none',cursor:'pointer',fontSize:'.9rem',
                        filter:isFav?'saturate(1)':'saturate(0) opacity(0.4)'}}>❤️</button>
                    <button onClick={() => toggleKnown(word.id)}
                      style={{background:'none',border:'none',cursor:'pointer',fontSize:'.85rem',
                        filter:isKnown?'saturate(1)':'saturate(0) opacity(0.4)'}}>✅</button>
                  </div>
                  <div style={{display:'flex',gap:'.3rem'}}>
                    <button onClick={() => play(word.hanzi)}
                      style={{padding:'.3rem .4rem',borderRadius:6,border:`1px solid ${tc}40`,
                        background:tc+'10',color:tc,cursor:'pointer',fontSize:'.7rem',fontWeight:700}}>
                      🔊
                    </button>
                    <button onClick={() => setPronWord(word)}
                      style={{padding:'.3rem .4rem',borderRadius:6,border:'1px solid #f59e0b40',
                        background:'#f59e0b10',color:'#f59e0b',cursor:'pointer',fontSize:'.7rem',fontWeight:700}}>
                      🎤
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{display:'flex',gap:'.5rem',justifyContent:'center',
            alignItems:'center',marginTop:'2rem',flexWrap:'wrap'}}>
            <button onClick={() => setPage(1)} disabled={page===1}
              style={{padding:'.4rem .7rem',borderRadius:8,border:'1px solid var(--c-border)',
                background:'var(--c-surface)',color:'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.78rem',opacity:page===1?.5:1}}>«</button>
            <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
              style={{padding:'.4rem .75rem',borderRadius:8,border:'1px solid var(--c-border)',
                background:'var(--c-surface)',color:'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.85rem',opacity:page===1?.5:1}}>‹</button>
            {Array.from({length:totalPages},(_,i)=>i+1)
              .filter(p => p===1||p===totalPages||Math.abs(p-page)<=2)
              .map((p,i,arr) => (
                <span key={p} style={{display:'inline-flex',gap:'.3rem',alignItems:'center'}}>
                  {i>0 && arr[i-1]!==p-1 && <span style={{color:'var(--c-text-muted)'}}>…</span>}
                  <button onClick={() => setPage(p)}
                    style={{padding:'.4rem .75rem',borderRadius:8,border:'none',cursor:'pointer',
                      fontWeight:700,fontSize:'.85rem',
                      background:p===page?lc:'var(--c-surface)',
                      color:p===page?'#fff':'var(--c-text-muted)'}}>
                    {p}
                  </button>
                </span>
              ))}
            <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
              style={{padding:'.4rem .75rem',borderRadius:8,border:'1px solid var(--c-border)',
                background:'var(--c-surface)',color:'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.85rem',opacity:page===totalPages?.5:1}}>›</button>
            <button onClick={() => setPage(totalPages)} disabled={page===totalPages}
              style={{padding:'.4rem .7rem',borderRadius:8,border:'1px solid var(--c-border)',
                background:'var(--c-surface)',color:'var(--c-text-muted)',cursor:'pointer',
                fontSize:'.78rem',opacity:page===totalPages?.5:1}}>»</button>
            <span style={{color:'var(--c-text-muted)',fontSize:'.75rem'}}>
              {page}/{totalPages} · {filtered.length} từ
            </span>
          </div>
        )}
      </div>

      {/* Pronunciation Modal */}
      {pronWord && (
        <PronunciationModal
          hanzi={pronWord.hanzi} pinyin={pronWord.pinyin}
          meaning_vi={pronWord.meaning_vi} onClose={() => setPronWord(null)}
        />
      )}
    </div>
  );
}
