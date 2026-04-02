'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSpeech } from '@/lib/useSpeech';

interface DialogueLine {
  id: number;
  line_order: number;
  speaker: string;
  speaker_role: string;
  text_zh: string;
  pinyin: string;
  text_vi: string;
}

interface Dialogue {
  id: number;
  title: string;
  title_zh: string;
  type: 'dialogue' | 'passage';
  hsk_level: string;
  topic: string;
  description: string;
  difficulty: string;
  line_count?: number;
  lines?: DialogueLine[];
}

// Bảng màu cho speaker theo index (ko phụ thuộc tên)
const PALETTE = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#f97316','#8b5cf6','#06b6d4'];

// Emoji map & topic label
const TOPIC_EMOJI: Record<string,string> = {
  greeting:'👋', weather:'🌤️', shopping:'🛍️', food:'🍜', family:'👨‍👩‍👧',
  school:'📚', hobbies:'🎨', numbers:'🔢', health:'💊', travel:'✈️',
  transport:'🚇', housing:'🏠', work:'💼', finance:'💰', services:'📦',
  daily_life:'☀️', culture:'🏛️', language:'🗣️', entertainment:'🎬',
  education:'🎓', future:'🌟', technology:'💻', society:'🌐', environment:'🌱',
  philosophy:'💭', business:'📊', economy:'📈', history:'📜', sports:'⚽',
  animals:'🐾', home:'🏡', celebration:'🎉', emotions:'❤️', time:'⏰',
  description:'🖼️', politics:'🤝', relationships:'💞', arts:'🎭',
  directions:'🗺️', leisure:'🌴',
};
const TOPIC_LABEL: Record<string,string> = {
  greeting:'Chào hỏi', weather:'Thời tiết', shopping:'Mua sắm', food:'Ẩm thực',
  family:'Gia đình', school:'Học đường', hobbies:'Sở thích', numbers:'Số đếm',
  health:'Sức khoẻ', travel:'Du lịch', transport:'Giao thông', housing:'Nhà ở',
  work:'Công việc', finance:'Tài chính', services:'Dịch vụ', daily_life:'Đời thường',
  culture:'Văn hoá', language:'Ngôn ngữ', entertainment:'Giải trí', education:'Giáo dục',
  future:'Tương lai', technology:'Công nghệ', society:'Xã hội', environment:'Môi trường',
  philosophy:'Triết học', business:'Kinh doanh', economy:'Kinh tế', history:'Lịch sử',
  sports:'Thể thao', animals:'Động vật', home:'Nhà cửa', celebration:'Lễ kỷ niệm',
  emotions:'Cảm xúc', time:'Thời gian', description:'Mô tả', politics:'Chính trị',
  relationships:'Quan hệ', arts:'Nghệ thuật', directions:'Đường đi', leisure:'Nghỉ ngơi',
};

const LEVEL_COLOR: Record<string,string> = {
  HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6'
};
const DIFF_STYLE: Record<string,{bg:string,color:string,label:string}> = {
  easy:   { bg:'#10b98118', color:'#10b981', label:'Cơ bản' },
  medium: { bg:'#f59e0b18', color:'#f59e0b', label:'Trung cấp' },
  hard:   { bg:'#ef444418', color:'#ef4444', label:'Nâng cao' },
};

// Assign speaker → color by index (stable per dialogue)
function buildSpeakerMap(lines: DialogueLine[]): Record<string,string> {
  const map: Record<string,string> = {};
  let idx = 0;
  for (const l of lines) {
    if (l.speaker && !(l.speaker in map)) {
      map[l.speaker] = PALETTE[idx % PALETTE.length];
      idx++;
    }
  }
  return map;
}

function getSpeakerEmoji(role: string): string {
  const m: Record<string,string> = {
    '老师':'👩‍🏫','学生1':'👨‍🎓','学生':'👨‍🎓','Học sinh 1':'👨‍🎓',
    '服务员':'🧑‍🍳','客人':'🙋','顾客':'🙋','买家':'🛍️','卖家':'🏪',
    '旅客':'✈️','售票员':'🎫','面试官':'💼','应聘者':'🙋‍♂️',
    '医生':'👨‍⚕️','牙医':'🦷','患者':'🤒','前台':'🛎️',
    '租客':'🏠','房东':'🔑','银行员':'🏦','工作人员':'👷',
    '前辈':'👔','新人':'👶','采访者':'🎙️','创业者':'🚀',
    '中国人':'🇨🇳','学习者':'📖','外国人':'🌍','市民':'👫',
    '妈妈':'👩','孩子':'👦','Mẹ':'👩','Con':'👦',
    'A':'🔵','B':'🔴',
  };
  return m[role] ?? '💬';
}

export default function DialoguesPage() {
  const [list, setList]           = useState<Dialogue[]>([]);
  const [selected, setSelected]   = useState<Dialogue | null>(null);
  const [loading, setLoading]     = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [filterType, setFilterType]   = useState('ALL');
  const [search, setSearch]       = useState('');
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVi, setShowVi]       = useState(true);
  const [playingId, setPlayingId] = useState<number|null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [speakerMap, setSpeakerMap] = useState<Record<string,string>>({});
  const detailRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef(false);
  const { speak } = useSpeech();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dialogues`)
      .then(r => r.json())
      .then(d => { if (d.success) setList(d.data); })
      .finally(() => setLoading(false));
  }, []);

  // ESC đóng panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const openDialogue = useCallback(async (d: Dialogue) => {
    setDetailLoading(true);
    setSelected(null);
    setIsAutoPlay(false);
    autoPlayRef.current = false;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dialogues/${d.id}`);
    const json = await res.json();
    if (json.success) {
      setSelected(json.data);
      setSpeakerMap(buildSpeakerMap(json.data.lines ?? []));
      setTimeout(() => detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
    setDetailLoading(false);
  }, []);

  const handleSpeak = useCallback((line: DialogueLine, idx: number) => {
    setPlayingId(idx);
    speak(line.text_zh);
    setTimeout(() => setPlayingId(null), 2500);
  }, [speak]);

  // Auto-play tất cả dòng tuần tự
  const handleAutoPlay = useCallback(async () => {
    if (!selected?.lines) return;
    setIsAutoPlay(true);
    autoPlayRef.current = true;
    for (let i = 0; i < selected.lines.length; i++) {
      if (!autoPlayRef.current) break;
      const l = selected.lines[i];
      setPlayingId(i);
      speak(l.text_zh);
      await new Promise(r => setTimeout(r, 2800));
    }
    setPlayingId(null);
    setIsAutoPlay(false);
    autoPlayRef.current = false;
  }, [selected, speak]);

  const stopAutoPlay = useCallback(() => {
    autoPlayRef.current = false;
    setIsAutoPlay(false);
    setPlayingId(null);
  }, []);

  // Filter
  const filtered = list.filter(d => {
    const matchLevel = filterLevel === 'ALL' || d.hsk_level === filterLevel;
    const matchType  = filterType  === 'ALL' || d.type === filterType;
    const q = search.toLowerCase();
    const matchSearch = !q || d.title.toLowerCase().includes(q)
      || (d.title_zh||'').includes(q)
      || (d.topic||'').includes(q)
      || (TOPIC_LABEL[d.topic]||'').toLowerCase().includes(q);
    return matchLevel && matchType && matchSearch;
  });

  const grouped = filtered.reduce<Record<string,Dialogue[]>>((acc,d) => {
    (acc[d.hsk_level] ??= []).push(d); return acc;
  }, {});

  const totalFiltered = filtered.length;

  return (
    <div style={{ minHeight:'100vh', background:'var(--c-bg)', padding:'2rem 1.5rem' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'.4rem', lineHeight:1 }}>💬</div>
          <h1 style={{ fontSize:'2.2rem', fontWeight:900, color:'var(--c-text)', marginBottom:'.4rem',
            background:'linear-gradient(135deg,#6366f1,#ec4899)', WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent' }}>
            Hội thoại &amp; Đoạn văn Song ngữ
          </h1>
          <p style={{ color:'var(--c-text-muted)', fontSize:'1rem' }}>
            Luyện đọc hiểu tiếng Trung qua {list.length} bài hội thoại và bài đọc thực tế
          </p>
        </div>

        {/* ── Search bar ── */}
        <div style={{ maxWidth:520, margin:'0 auto 1.75rem', position:'relative' }}>
          <span style={{ position:'absolute', left:'.9rem', top:'50%', transform:'translateY(-50%)',
            color:'var(--c-text-muted)', fontSize:'1.1rem' }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề, chủ đề..."
            style={{
              width:'100%', padding:'.65rem 1rem .65rem 2.5rem',
              borderRadius:50, border:'2px solid var(--c-border)',
              background:'var(--c-surface)', color:'var(--c-text)',
              fontSize:'.95rem', outline:'none', boxSizing:'border-box',
              transition:'border-color .2s'
            }}
            onFocus={e => (e.target.style.borderColor='#6366f1')}
            onBlur={e  => (e.target.style.borderColor='var(--c-border)')}
          />
          {search && (
            <button onClick={() => setSearch('')}
              style={{ position:'absolute', right:'.75rem', top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer', color:'var(--c-text-muted)', fontSize:'1.1rem' }}>
              ✕
            </button>
          )}
        </div>

        {/* ── Bộ lọc ── */}
        <div style={{ display:'flex', gap:'.6rem', flexWrap:'wrap', marginBottom:'1.25rem', justifyContent:'center' }}>
          {['ALL','HSK1','HSK2','HSK3','HSK4'].map(lv => (
            <button key={lv} onClick={() => setFilterLevel(lv)}
              id={`filter-level-${lv}`}
              style={{
                padding:'.4rem 1rem', borderRadius:50, border:'2px solid',
                borderColor: filterLevel===lv ? (lv==='ALL'?'#6366f1':LEVEL_COLOR[lv]) : 'var(--c-border)',
                background: filterLevel===lv ? (lv==='ALL'?'#6366f1':LEVEL_COLOR[lv]) : 'transparent',
                color: filterLevel===lv ? '#fff' : 'var(--c-text-muted)',
                fontWeight:700, cursor:'pointer', fontSize:'.82rem', transition:'all .2s'
              }}>
              {lv==='ALL'?'Tất cả':lv}
            </button>
          ))}
          <div style={{ width:1, background:'var(--c-border)', margin:'0 .2rem' }} />
          {[['ALL','Tất cả'],['dialogue','💬 Hội thoại'],['passage','📄 Đoạn văn']].map(([v,l]) => (
            <button key={v} onClick={() => setFilterType(v)}
              id={`filter-type-${v}`}
              style={{
                padding:'.4rem 1rem', borderRadius:50, border:'2px solid',
                borderColor: filterType===v ? '#6366f1' : 'var(--c-border)',
                background: filterType===v ? '#6366f1' : 'transparent',
                color: filterType===v ? '#fff' : 'var(--c-text-muted)',
                fontWeight:700, cursor:'pointer', fontSize:'.82rem', transition:'all .2s'
              }}>{l}</button>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div style={{ textAlign:'center', marginBottom:'1.5rem', color:'var(--c-text-muted)', fontSize:'.85rem' }}>
          {loading ? 'Đang tải...' : (
            <span>
              Hiển thị <strong style={{ color:'var(--c-text)' }}>{totalFiltered}</strong> / {list.length} bài
              {search && <span> · kết quả cho "<em>{search}</em>"</span>}
            </span>
          )}
        </div>

        {/* ── Main grid ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns: selected ? 'minmax(320px,1fr) minmax(0,1.8fr)' : '1fr',
          gap:'1.5rem', alignItems:'start'
        }}>

          {/* ── Danh sách ── */}
          <div>
            {loading ? (
              <div style={{ textAlign:'center', padding:'4rem', color:'var(--c-text-muted)' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem', animation:'spin 1s linear infinite' }}>⏳</div>
                Đang tải dữ liệu...
              </div>
            ) : Object.keys(grouped).length === 0 ? (
              <div style={{ textAlign:'center', padding:'4rem', color:'var(--c-text-muted)' }}>
                <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔍</div>
                <p>Không tìm thấy bài phù hợp</p>
                <button onClick={() => { setSearch(''); setFilterLevel('ALL'); setFilterType('ALL'); }}
                  style={{ marginTop:'1rem', padding:'.5rem 1.2rem', borderRadius:8,
                    background:'#6366f1', color:'#fff', border:'none', cursor:'pointer', fontWeight:600 }}>
                  Xoá bộ lọc
                </button>
              </div>
            ) : Object.entries(grouped).map(([level, items]) => (
              <div key={level} style={{ marginBottom:'1.75rem' }}>
                {/* Level header */}
                <div style={{
                  display:'flex', alignItems:'center', gap:'.75rem',
                  marginBottom:'1rem', paddingBottom:'.6rem',
                  borderBottom:`2px solid ${LEVEL_COLOR[level]}30`
                }}>
                  <span style={{
                    background:LEVEL_COLOR[level], color:'#fff',
                    padding:'.25rem .8rem', borderRadius:8, fontWeight:900, fontSize:'.8rem',
                    letterSpacing:'.05em'
                  }}>{level}</span>
                  <span style={{ color:'var(--c-text-muted)', fontSize:'.82rem', fontWeight:500 }}>
                    {items.length} bài
                  </span>
                  <div style={{ flex:1, height:1, background:`${LEVEL_COLOR[level]}20` }} />
                </div>

                {/* Cards */}
                <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
                  {items.map(d => {
                    const isActive = selected?.id === d.id;
                    const lc = LEVEL_COLOR[level];
                    const df = DIFF_STYLE[d.difficulty] ?? DIFF_STYLE.easy;
                    const topicEmoji = TOPIC_EMOJI[d.topic] ?? '💬';
                    const topicLabel = TOPIC_LABEL[d.topic] ?? d.topic;
                    return (
                      <button key={d.id} onClick={() => openDialogue(d)}
                        id={`dialogue-card-${d.id}`}
                        style={{
                          textAlign:'left', padding:'.85rem 1.1rem', borderRadius:14,
                          border:`2px solid ${isActive ? lc : 'var(--c-border)'}`,
                          background: isActive ? `${lc}12` : 'var(--c-surface)',
                          cursor:'pointer', transition:'all .18s', width:'100%',
                          boxShadow: isActive ? `0 0 0 3px ${lc}30` : 'none',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.borderColor = `${lc}80`;
                            (e.currentTarget as HTMLElement).style.background = `${lc}08`;
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
                            (e.currentTarget as HTMLElement).style.background = 'var(--c-surface)';
                          }
                        }}
                      >
                        {/* Row 1: icon + title */}
                        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.25rem' }}>
                          <span style={{ fontSize:'1rem' }}>{d.type==='dialogue'?'💬':'📄'}</span>
                          <span style={{ fontWeight:700, color:isActive?lc:'var(--c-text)', fontSize:'.92rem', lineHeight:1.3 }}>
                            {d.title}
                          </span>
                        </div>
                        {/* Row 2: chinese title */}
                        <div style={{ color:'var(--c-text-muted)', fontSize:'.78rem', fontStyle:'italic',
                          marginBottom:'.4rem', marginLeft:'1.5rem' }}>
                          {d.title_zh}
                        </div>
                        {/* Row 3: badges */}
                        <div style={{ display:'flex', gap:'.35rem', flexWrap:'wrap', marginLeft:'1.5rem' }}>
                          <span style={{ background:df.bg, color:df.color,
                            padding:'.12rem .45rem', borderRadius:5, fontSize:'.7rem', fontWeight:700 }}>
                            {df.label}
                          </span>
                          <span style={{ background:'#6366f118', color:'#6366f1',
                            padding:'.12rem .45rem', borderRadius:5, fontSize:'.7rem' }}>
                            {d.line_count} dòng
                          </span>
                          <span style={{ background:'transparent', color:'var(--c-text-muted)',
                            padding:'.12rem .45rem', borderRadius:5, fontSize:'.7rem', border:'1px solid var(--c-border)' }}>
                            {topicEmoji} {topicLabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Panel chi tiết ── */}
          {(selected || detailLoading) && (
            <div ref={detailRef} style={{
              background:'var(--c-surface)', borderRadius:20,
              border:'1px solid var(--c-border)',
              padding:'1.5rem', position:'sticky', top:'1rem',
              maxHeight:'calc(100vh - 100px)', overflowY:'auto',
              boxShadow:'0 8px 32px #0003'
            }}>
              {detailLoading ? (
                <div style={{ textAlign:'center', padding:'4rem', color:'var(--c-text-muted)' }}>
                  <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>⏳</div>
                  Đang tải nội dung...
                </div>
              ) : selected && (
                <>
                  {/* ─ Header chi tiết ─ */}
                  <div style={{ marginBottom:'1.25rem', paddingBottom:'1rem', borderBottom:'1px solid var(--c-border)' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'.75rem' }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        {/* Level + type */}
                        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.4rem', flexWrap:'wrap' }}>
                          <span style={{ fontSize:'1.4rem' }}>{selected.type==='dialogue'?'💬':'📄'}</span>
                          <span style={{
                            background:LEVEL_COLOR[selected.hsk_level]+'20',
                            color:LEVEL_COLOR[selected.hsk_level],
                            padding:'.2rem .65rem', borderRadius:6, fontSize:'.72rem', fontWeight:800
                          }}>{selected.hsk_level}</span>
                          <span style={{ background:'#6366f118', color:'#6366f1',
                            padding:'.2rem .65rem', borderRadius:6, fontSize:'.72rem', fontWeight:600 }}>
                            {selected.type === 'dialogue' ? 'Hội thoại' : 'Đoạn văn'}
                          </span>
                          {selected.topic && (
                            <span style={{ color:'var(--c-text-muted)', fontSize:'.72rem' }}>
                              {TOPIC_EMOJI[selected.topic]} {TOPIC_LABEL[selected.topic]}
                            </span>
                          )}
                        </div>
                        {/* Tiêu đề */}
                        <h2 style={{ fontSize:'1.25rem', fontWeight:900, color:'var(--c-text)',
                          marginBottom:'.2rem', lineHeight:1.3 }}>
                          {selected.title}
                        </h2>
                        <p style={{ color:'var(--c-text-muted)', fontSize:'.9rem', fontStyle:'italic' }}>
                          {selected.title_zh}
                        </p>
                        {selected.description && (
                          <p style={{ color:'var(--c-text-muted)', fontSize:'.8rem', marginTop:'.5rem',
                            background:'var(--c-bg)', padding:'.5rem .8rem', borderRadius:8,
                            borderLeft:'3px solid #6366f1', lineHeight:1.5 }}>
                            {selected.description}
                          </p>
                        )}
                      </div>
                      {/* Nút đóng */}
                      <button onClick={() => { setSelected(null); stopAutoPlay(); }}
                        title="Đóng (Esc)"
                        style={{ background:'var(--c-bg)', border:'1px solid var(--c-border)',
                          borderRadius:8, padding:'.3rem .75rem', cursor:'pointer',
                          color:'var(--c-text-muted)', fontSize:'.82rem', whiteSpace:'nowrap',
                          flexShrink:0, transition:'all .15s' }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.background='#ef444420')}
                        onMouseLeave={e => ((e.target as HTMLElement).style.background='var(--c-bg)')}>
                        ✕ Đóng
                      </button>
                    </div>

                    {/* Controls */}
                    <div style={{ display:'flex', gap:'.5rem', marginTop:'.85rem', flexWrap:'wrap', alignItems:'center' }}>
                      {/* Pinyin */}
                      <button onClick={() => setShowPinyin(!showPinyin)} id="toggle-pinyin"
                        style={{
                          padding:'.32rem .85rem', borderRadius:8, border:`1.5px solid ${showPinyin?'#6366f1':'var(--c-border)'}`,
                          background: showPinyin ? '#6366f1' : 'transparent',
                          color: showPinyin ? '#fff' : 'var(--c-text-muted)',
                          fontSize:'.78rem', cursor:'pointer', fontWeight:700, transition:'all .15s'
                        }}>🔤 Pinyin</button>
                      {/* Dịch */}
                      <button onClick={() => setShowVi(!showVi)} id="toggle-vi"
                        style={{
                          padding:'.32rem .85rem', borderRadius:8, border:`1.5px solid ${showVi?'#10b981':'var(--c-border)'}`,
                          background: showVi ? '#10b981' : 'transparent',
                          color: showVi ? '#fff' : 'var(--c-text-muted)',
                          fontSize:'.78rem', cursor:'pointer', fontWeight:700, transition:'all .15s'
                        }}>🇻🇳 Dịch nghĩa</button>

                      {/* Auto-play */}
                      <div style={{ marginLeft:'auto', display:'flex', gap:'.4rem' }}>
                        {isAutoPlay ? (
                          <button onClick={stopAutoPlay} id="btn-stop-autoplay"
                            style={{
                              padding:'.32rem .85rem', borderRadius:8, border:'1.5px solid #ef4444',
                              background:'#ef4444', color:'#fff',
                              fontSize:'.78rem', cursor:'pointer', fontWeight:700, transition:'all .15s',
                              display:'flex', alignItems:'center', gap:'.35rem'
                            }}>
                            ⏹ Dừng
                          </button>
                        ) : (
                          <button onClick={handleAutoPlay} id="btn-autoplay"
                            style={{
                              padding:'.32rem .85rem', borderRadius:8, border:'1.5px solid #6366f140',
                              background:'#6366f118', color:'#6366f1',
                              fontSize:'.78rem', cursor:'pointer', fontWeight:700, transition:'all .15s',
                              display:'flex', alignItems:'center', gap:'.35rem'
                            }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='#6366f130')}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='#6366f118')}>
                            ▶▶ Phát tất cả
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Tiến trình auto-play */}
                    {isAutoPlay && selected.lines && (
                      <div style={{ marginTop:'.6rem' }}>
                        <div style={{ height:3, borderRadius:99, background:'var(--c-border)', overflow:'hidden' }}>
                          <div style={{
                            height:'100%', borderRadius:99, background:'linear-gradient(90deg,#6366f1,#ec4899)',
                            width:`${playingId !== null ? ((playingId+1)/selected.lines.length*100) : 0}%`,
                            transition:'width .3s'
                          }} />
                        </div>
                        <p style={{ fontSize:'.72rem', color:'var(--c-text-muted)', marginTop:'.3rem', textAlign:'right' }}>
                          {playingId !== null ? playingId+1 : 0} / {selected.lines.length} dòng
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ─ Nội dung lines ─ */}
                  <div style={{ display:'flex', flexDirection:'column', gap: selected.type==='dialogue' ? '1rem' : '.75rem' }}>
                    {selected.lines?.map((line, idx) => {
                      const isNarrator = !line.speaker || selected.type === 'passage';
                      const color = speakerMap[line.speaker] || '#6366f1';
                      const emoji = getSpeakerEmoji(line.speaker_role || line.speaker);
                      const isPlaying = playingId === idx;

                      if (isNarrator) {
                        return (
                          <div key={line.id}
                            id={`line-${idx}`}
                            style={{
                              background: isPlaying ? '#6366f115' : 'var(--c-bg)',
                              borderRadius:12, padding:'1rem 1.1rem',
                              borderLeft:`3px solid ${isPlaying ? '#6366f1' : '#6366f150'}`,
                              transition:'all .3s',
                              boxShadow: isPlaying ? '0 0 0 2px #6366f130' : 'none'
                            }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'.75rem' }}>
                              <div style={{ flex:1 }}>
                                {/* Số thứ tự */}
                                <div style={{ fontSize:'.68rem', color:'#6366f1', fontWeight:700, marginBottom:'.3rem',
                                  opacity:.7 }}>¶ {idx+1}</div>
                                {/* zh + vi cạnh nhau cùng hàng */}
                                <div style={{ display:'flex', gap:'.75rem', alignItems:'flex-start' }}>
                                  <p style={{ fontSize:'1.08rem', fontWeight:600, color:'var(--c-text)',
                                    lineHeight:1.7, flex:'0 0 auto', maxWidth: showVi ? '52%' : '100%',
                                    marginBottom: showPinyin ? '.2rem' : 0 }}>
                                    {line.text_zh}
                                  </p>
                                  {showVi && (
                                    <p style={{ fontSize:'.88rem', color:'var(--c-text-muted)', lineHeight:1.6,
                                      flex:1, borderLeft:'2px dashed var(--c-border)', paddingLeft:'.75rem',
                                      marginTop:'.15rem' }}>
                                      🇻🇳 {line.text_vi}
                                    </p>
                                  )}
                                </div>
                                {showPinyin && line.pinyin && (
                                  <p style={{ fontSize:'.8rem', color:'#6366f1',
                                    fontStyle:'italic', lineHeight:1.5, marginTop:'.1rem' }}>
                                    {line.pinyin}
                                  </p>
                                )}
                              </div>
                              <button onClick={() => handleSpeak(line, idx)}
                                id={`speak-line-${idx}`}
                                style={{
                                  marginLeft:'.5rem', flexShrink:0,
                                  background: isPlaying ? '#6366f1' : 'transparent',
                                  border:`1.5px solid ${isPlaying?'#6366f1':'#6366f150'}`,
                                  borderRadius:8, padding:'.38rem .55rem',
                                  cursor:'pointer', fontSize:'.9rem', transition:'all .2s',
                                  color: isPlaying ? '#fff' : '#6366f1'
                                }}>
                                {isPlaying ? '🔊' : '▶'}
                              </button>
                            </div>
                          </div>
                        );
                      }

                      // Bubble chat — giao thay theo speaker index (A=left, B=right, C=left...)
                      const speakers = [...new Set(selected.lines?.map(l => l.speaker).filter(Boolean) ?? [])];
                      const speakerIdx = speakers.indexOf(line.speaker);
                      const isSideA = speakerIdx % 2 === 0;

                      return (
                        <div key={line.id}
                          id={`line-${idx}`}
                          style={{
                            display:'flex', alignItems:'flex-start', gap:'.6rem',
                            flexDirection: isSideA ? 'row' : 'row-reverse',
                            transition:'all .2s'
                          }}>
                          {/* Avatar */}
                          <div style={{
                            width:40, height:40, borderRadius:'50%', flexShrink:0,
                            background:`${color}22`, border:`2px solid ${isPlaying?color:color+'80'}`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:'1.1rem', transition:'all .3s',
                            boxShadow: isPlaying ? `0 0 0 3px ${color}40` : 'none'
                          }}>{emoji}</div>

                          <div style={{ flex:1, maxWidth:'77%' }}>
                            {/* Tên nhân vật */}
                            <div style={{
                              fontSize:'.7rem', fontWeight:800, color:color,
                              marginBottom:'.2rem', opacity:.9,
                              textAlign: isSideA ? 'left' : 'right'
                            }}>
                              {line.speaker}{line.speaker_role && line.speaker_role !== line.speaker ? ` · ${line.speaker_role}` : ''}
                            </div>

                            {/* Bong bóng */}
                            <div style={{
                              background: isPlaying ? `${color}25` : `${color}12`,
                              border:`1.5px solid ${isPlaying ? color : color+'40'}`,
                              borderRadius: isSideA ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                              padding:'.75rem 1rem',
                              transition:'all .3s',
                              boxShadow: isPlaying ? `0 0 0 2px ${color}30` : 'none'
                            }}>
                              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'.5rem' }}>
                                <div style={{ flex:1, minWidth:0 }}>
                                  {/* zh + vi cạnh nhau cùng hàng trong bong bóng */}
                                  <div style={{ display:'flex', gap:'.6rem', alignItems:'flex-start' }}>
                                    <p style={{ fontSize:'1.05rem', fontWeight:700, color:'var(--c-text)',
                                      lineHeight:1.55, flex:'0 0 auto', maxWidth: showVi ? '50%' : '100%',
                                      marginBottom: showPinyin ? '.15rem' : 0 }}>
                                      {line.text_zh}
                                    </p>
                                    {showVi && (
                                      <p style={{ fontSize:'.82rem', color:'var(--c-text-muted)', lineHeight:1.5,
                                        flex:1, borderLeft:'2px dashed var(--c-border)', paddingLeft:'.6rem',
                                        marginTop:'.1rem' }}>
                                        🇻🇳 {line.text_vi}
                                      </p>
                                    )}
                                  </div>
                                  {showPinyin && line.pinyin && (
                                    <p style={{ fontSize:'.77rem', color, fontStyle:'italic',
                                      marginTop:'.1rem', lineHeight:1.4 }}>
                                      {line.pinyin}
                                    </p>
                                  )}
                                </div>
                                <button onClick={() => handleSpeak(line, idx)}
                                  id={`speak-line-${idx}`}
                                  style={{
                                    background: isPlaying ? color : 'transparent',
                                    border:`1.5px solid ${color}60`, borderRadius:8,
                                    padding:'.3rem .5rem', cursor:'pointer', fontSize:'.88rem',
                                    transition:'all .2s', flexShrink:0,
                                    color: isPlaying ? '#fff' : color
                                  }}>
                                  {isPlaying ? '🔊' : '▶'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop:'1.5rem', paddingTop:'1rem', borderTop:'1px solid var(--c-border)',
                    display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'.5rem' }}>
                    <span style={{ fontSize:'.75rem', color:'var(--c-text-muted)' }}>
                      {selected.lines?.length} dòng · {DIFF_STYLE[selected.difficulty]?.label} · {TOPIC_EMOJI[selected.topic]} {TOPIC_LABEL[selected.topic]}
                    </span>
                    <button onClick={() => { setSelected(null); stopAutoPlay(); }}
                      style={{ fontSize:'.78rem', color:'var(--c-text-muted)', background:'none',
                        border:'none', cursor:'pointer', padding:'.3rem .6rem' }}>
                      ← Quay lại danh sách
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
