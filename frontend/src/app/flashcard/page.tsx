'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string,string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };

interface Card { id:number; hanzi:string; pinyin:string; meaning_vi:string; word_type:string; hsk_level:string; }

export default function FlashcardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<'setup'|'study'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [cards, setCards] = useState<Card[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [retry, setRetry] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left'|'right'|null>(null);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user,loading,router]);

  const startStudy = async () => {
    setLoadingCards(true);
    try {
      const d = await api.getFlashcards(level, 20);
      const shuffled = [...d.data].sort(() => Math.random() - 0.5);
      setCards(shuffled); setIdx(0); setFlipped(false);
      setKnown([]); setRetry([]); setDone(false);
      setPhase('study');
    } catch(e) { console.error(e); }
    setLoadingCards(false);
  };

  const playAudio = useCallback((hanzi: string) => {
    const url = `http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`;
    new Audio(url).play().catch(()=>{});
  }, []);

  const swipe = (dir: 'left'|'right') => {
    if (!flipped) return;
    setSwipeDir(dir);
    const card = cards[idx];
    if (dir === 'right') setKnown(k => [...k, card.id]);
    else setRetry(r => [...r, card.id]);
    
    setTimeout(() => {
      setSwipeDir(null); setFlipped(false);
      if (idx + 1 < cards.length) setIdx(i => i+1);
      else setDone(true);
    }, 350);
  };

  const reviewRetry = () => {
    const retryCards = cards.filter(c => retry.includes(c.id)).sort(() => Math.random() - 0.5);
    setCards(retryCards); setIdx(0); setFlipped(false);
    setKnown([]); setRetry([]); setDone(false);
  };

  if (loading) return <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>Đang tải...</div>;

  const progress = cards.length ? Math.round((idx/cards.length)*100) : 0;
  const lc = LC[level];

  /* ── Setup ── */
  if (phase === 'setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:500,width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>📇</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#8b5cf6,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Flashcard
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Thẻ lật từ vựng · Nhấn để xem nghĩa · Vuốt để phân loại</p>
        </div>

        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',marginBottom:'1.25rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',color:'var(--c-text)',fontSize:'.95rem'}}>📊 Chọn cấp độ</h3>
          <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
            {['HSK1','HSK2','HSK3','HSK4'].map(lv => (
              <button key={lv} onClick={() => setLevel(lv)}
                style={{padding:'.5rem 1.2rem',borderRadius:50,border:'2px solid',
                  borderColor:level===lv?LC[lv]:'var(--c-border)',
                  background:level===lv?LC[lv]:'transparent',
                  color:level===lv?'#fff':'var(--c-text-muted)',
                  fontWeight:800,cursor:'pointer',fontSize:'.85rem',transition:'all .2s'}}>{lv}</button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',marginBottom:'1.5rem',border:'1px solid var(--c-border)'}}>
          <div style={{fontWeight:800,color:'var(--c-text)',marginBottom:'.75rem',fontSize:'.9rem'}}>📖 Cách sử dụng</div>
          <div style={{display:'flex',flexDirection:'column',gap:'.4rem',fontSize:'.82rem',color:'var(--c-text-muted)'}}>
            <div>👆 Nhấn vào thẻ để lật và xem nghĩa</div>
            <div>✅ Nhấn <strong style={{color:'#10b981'}}>Thuộc rồi →</strong> nếu đã nhớ từ</div>
            <div>🔄 Nhấn <strong style={{color:'#ef4444'}}>← Ôn lại</strong> nếu chưa nhớ</div>
            <div>🔊 Nhấn nút loa để nghe phát âm</div>
          </div>
        </div>

        <button onClick={startStudy} disabled={loadingCards}
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#8b5cf6,#ec4899)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            opacity:loadingCards?.6:1,boxShadow:'0 4px 20px #8b5cf640',transition:'all .2s'}}>
          {loadingCards?'⏳ Đang tải...':'📇 Bắt đầu học →'}
        </button>
      </div>
    </div>
  );

  /* ── Done ── */
  if (done) return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:480,width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>🎉</div>
        <h2 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'1rem',color:'var(--c-text)'}}>Xong rồi!</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginBottom:'1.5rem'}}>
          <div style={{background:'#10b98120',border:'2px solid #10b981',borderRadius:14,padding:'1.25rem',textAlign:'center'}}>
            <div style={{fontSize:'2.5rem',fontWeight:900,color:'#10b981'}}>{known.length}</div>
            <div style={{fontSize:'.8rem',color:'#10b981',fontWeight:700}}>✅ Đã thuộc</div>
          </div>
          <div style={{background:'#ef444420',border:'2px solid #ef4444',borderRadius:14,padding:'1.25rem',textAlign:'center'}}>
            <div style={{fontSize:'2.5rem',fontWeight:900,color:'#ef4444'}}>{retry.length}</div>
            <div style={{fontSize:'.8rem',color:'#ef4444',fontWeight:700}}>🔄 Cần ôn lại</div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'.6rem'}}>
          {retry.length > 0 && (
            <button onClick={reviewRetry}
              style={{padding:'.9rem',borderRadius:12,border:'none',
                background:'linear-gradient(135deg,#f59e0b,#ef4444)',
                color:'#fff',fontWeight:900,cursor:'pointer'}}>
              🔄 Ôn lại {retry.length} từ chưa thuộc
            </button>
          )}
          <button onClick={startStudy}
            style={{padding:'.9rem',borderRadius:12,border:'none',
              background:'linear-gradient(135deg,#8b5cf6,#ec4899)',
              color:'#fff',fontWeight:900,cursor:'pointer'}}>
            📇 Bộ thẻ mới
          </button>
          <button onClick={() => setPhase('setup')}
            style={{padding:'.85rem',borderRadius:12,border:'1px solid var(--c-border)',
              background:'var(--c-surface)',color:'var(--c-text)',fontWeight:700,cursor:'pointer'}}>
            ← Chọn cấp độ khác
          </button>
        </div>
      </div>
    </div>
  );

  /* ── Study ── */
  const card = cards[idx];

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'1.5rem'}}>
      <div style={{maxWidth:540,margin:'0 auto'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <button onClick={() => setPhase('setup')}
            style={{background:'var(--c-surface)',border:'1px solid var(--c-border)',borderRadius:8,
              padding:'.4rem .9rem',cursor:'pointer',color:'var(--c-text-muted)',fontSize:'.82rem'}}>← Quay lại</button>
          <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
            <span style={{background:lc+'20',color:lc,padding:'.25rem .7rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>{level}</span>
            <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{idx+1}/{cards.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'1.5rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:'linear-gradient(90deg,#8b5cf6,#ec4899)',
            width:`${progress}%`,transition:'width .4s'}}/>
        </div>

        {/* Stats bar */}
        <div style={{display:'flex',gap:'.5rem',marginBottom:'1.5rem'}}>
          <div style={{flex:1,background:'#10b98115',borderRadius:8,padding:'.4rem .6rem',textAlign:'center'}}>
            <span style={{fontSize:'.72rem',color:'#10b981',fontWeight:700}}>✅ {known.length} thuộc</span>
          </div>
          <div style={{flex:1,background:'#ef444415',borderRadius:8,padding:'.4rem .6rem',textAlign:'center'}}>
            <span style={{fontSize:'.72rem',color:'#ef4444',fontWeight:700}}>🔄 {retry.length} ôn lại</span>
          </div>
          <div style={{flex:1,background:'var(--c-surface)',borderRadius:8,padding:'.4rem .6rem',textAlign:'center'}}>
            <span style={{fontSize:'.72rem',color:'var(--c-text-muted)',fontWeight:700}}>📋 {cards.length-idx-1} còn lại</span>
          </div>
        </div>

        {/* Card */}
        <div
          onClick={() => { if (!flipped) setFlipped(true); }}
          style={{
            cursor: flipped ? 'default' : 'pointer',
            transform: swipeDir==='right'?'translateX(120%) rotate(15deg)':swipeDir==='left'?'translateX(-120%) rotate(-15deg)':'translateX(0)',
            transition: swipeDir ? 'transform .35s ease-in' : 'transform .1s',
            userSelect: 'none',
          }}
        >
          <div style={{
            background:'var(--c-surface)',borderRadius:24,
            border:`2px solid ${flipped?lc+'60':'var(--c-border)'}`,
            padding:'2.5rem 2rem',minHeight:280,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
            textAlign:'center',position:'relative',
            transition:'border-color .3s',boxShadow:flipped?`0 8px 30px ${lc}20`:'none',
          }}>
            {/* HSK badge */}
            <div style={{position:'absolute',top:'1rem',right:'1rem',
              background:lc+'20',color:lc,borderRadius:6,padding:'.2rem .5rem',fontSize:'.65rem',fontWeight:800}}>
              {card.hsk_level || level}
            </div>

            {!flipped ? (
              /* Front */
              <>
                <div style={{fontSize:'6rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',lineHeight:1,
                  background:'linear-gradient(135deg,#8b5cf6,#ec4899)',
                  WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  {card.hanzi}
                </div>
                <div style={{marginTop:'1.5rem',color:'var(--c-text-muted)',fontSize:'.82rem',display:'flex',alignItems:'center',gap:'.4rem'}}>
                  <span>👆 Nhấn để lật thẻ</span>
                </div>
              </>
            ) : (
              /* Back */
              <>
                <div style={{fontSize:'3rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                  background:'linear-gradient(135deg,#8b5cf6,#ec4899)',
                  WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'.5rem'}}>
                  {card.hanzi}
                </div>
                <div style={{fontSize:'1.4rem',color:'#818cf8',fontStyle:'italic',marginBottom:'.5rem'}}>{card.pinyin}</div>
                <div style={{fontSize:'1.1rem',color:'var(--c-text)',fontWeight:700,
                  background:'var(--c-bg)',padding:'.5rem 1.2rem',borderRadius:10,marginBottom:'.5rem'}}>
                  🇻🇳 {card.meaning_vi}
                </div>
                {card.word_type && (
                  <span style={{fontSize:'.72rem',background:'#8b5cf620',color:'#8b5cf6',
                    padding:'.2rem .6rem',borderRadius:6,fontWeight:700}}>{card.word_type}</span>
                )}
                <button onClick={(e) => { e.stopPropagation(); playAudio(card.hanzi); }}
                  style={{marginTop:'1rem',background:'none',border:'1px solid var(--c-border)',borderRadius:8,
                    padding:'.35rem .8rem',cursor:'pointer',color:'var(--c-text-muted)',fontSize:'.8rem'}}>
                  🔊 Nghe phát âm
                </button>
              </>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {flipped && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:'1.5rem'}}>
            <button onClick={() => swipe('left')}
              style={{padding:'1rem',borderRadius:14,border:'2px solid #ef4444',
                background:'#ef444420',color:'#ef4444',fontWeight:900,cursor:'pointer',
                fontSize:'1rem',transition:'all .2s'}}>
              ← 🔄 Ôn lại
            </button>
            <button onClick={() => swipe('right')}
              style={{padding:'1rem',borderRadius:14,border:'2px solid #10b981',
                background:'#10b98120',color:'#10b981',fontWeight:900,cursor:'pointer',
                fontSize:'1rem',transition:'all .2s'}}>
              ✅ Thuộc rồi →
            </button>
          </div>
        )}

        {!flipped && (
          <div style={{textAlign:'center',marginTop:'1.5rem',color:'var(--c-text-muted)',fontSize:'.8rem'}}>
            💡 Hãy nhớ nghĩa của từ trước khi lật thẻ
          </div>
        )}
      </div>
    </div>
  );
}
