'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string,string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const TONE_LABELS: Record<number,string> = { 1:'1声 ˉ (bình)', 2:'2声 ˊ (sắc)', 3:'3声 ˇ (hỏi)', 4:'4声 ˋ (nặng)', 5:'轻声 (nhẹ)' };
const TONE_COLORS: Record<number,string> = { 1:'#06b6d4', 2:'#10b981', 3:'#f59e0b', 4:'#ef4444', 5:'#8b5cf6' };
const TONE_MARKS: Record<number,string[]> = {
  1:['ā','ē','ī','ō','ū','ǖ'], 2:['á','é','í','ó','ú','ǘ'],
  3:['ǎ','ě','ǐ','ǒ','ǔ','ǚ'], 4:['à','è','ì','ò','ù','ǜ'],
};

interface ToneQ { vocabulary_id:number; hanzi:string; pinyin:string; meaning_vi:string; correct_tone:number; }

function getTone(pinyin: string): number {
  const first = pinyin.split(' ')[0];
  for (const [t, marks] of Object.entries(TONE_MARKS)) {
    if (marks.some(m => first.includes(m))) return parseInt(t);
  }
  return 5;
}

function stripTones(pinyin: string): string {
  return pinyin
    .replace(/[āáǎà]/g,'a').replace(/[ēéěè]/g,'e').replace(/[īíǐì]/g,'i')
    .replace(/[ōóǒò]/g,'o').replace(/[ūúǔù]/g,'u').replace(/[ǖǘǚǜ]/g,'ü');
}

export default function TonesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<'setup'|'quiz'|'result'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [questions, setQuestions] = useState<ToneQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [answers, setAnswers] = useState<{correct:boolean}[]>([]);
  const [loadingQ, setLoadingQ] = useState(false);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user,loading,router]);

  const startQuiz = async () => {
    setLoadingQ(true);
    try {
      const d = await api.getToneQuiz(level, 10);
      setQuestions(d.data.questions); setIdx(0); setAnswers([]); setSelected(null);
      setPhase('quiz');
    } catch(e) { console.error(e); }
    setLoadingQ(false);
  };

  const playAudio = useCallback((hanzi: string) => {
    const url = `http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`;
    new Audio(url).play().catch(()=>{});
  }, []);

  const pick = (tone: number) => {
    if (selected !== null) return;
    const q = questions[idx];
    setSelected(tone);
    setAnswers(prev => [...prev, { correct: tone === q.correct_tone }]);
    setTimeout(() => {
      if (idx + 1 < questions.length) { setIdx(i => i+1); setSelected(null); }
      else setPhase('result');
    }, 1500);
  };

  if (loading) return <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>Đang tải...</div>;
  const score = answers.filter(a => a.correct).length;
  const pct = questions.length ? Math.round((score/questions.length)*100) : 0;
  const lc = LC[level];

  /* ── Setup ── */
  if (phase === 'setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:500,width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>🎵</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#f59e0b,#ef4444)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Luyện Thanh Điệu
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Xem chữ Hán → chọn thanh điệu đúng · 4 thanh + nhẹ</p>
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

        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',marginBottom:'1.5rem',border:'1px solid var(--c-border)'}}>
          <div style={{fontSize:'.85rem',color:'var(--c-text)',fontWeight:800,marginBottom:'.75rem'}}>4 thanh điệu tiếng Hán:</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.4rem'}}>
            {[1,2,3,4,5].map(t => (
              <div key={t} style={{display:'flex',gap:'.4rem',alignItems:'center',padding:'.4rem .5rem',borderRadius:8,background:'var(--c-bg)'}}>
                <span style={{width:10,height:10,borderRadius:'50%',background:TONE_COLORS[t],flexShrink:0}}/>
                <span style={{fontSize:'.78rem',color:'var(--c-text)',fontWeight:600}}>{TONE_LABELS[t]}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={startQuiz} disabled={loadingQ}
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#f59e0b,#ef4444)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            opacity:loadingQ?.6:1,boxShadow:'0 4px 20px #f59e0b40',transition:'all .2s'}}>
          {loadingQ?'⏳ Đang tải...':'🎵 Bắt đầu luyện →'}
        </button>
      </div>
    </div>
  );

  /* ── Result ── */
  if (phase === 'result') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:480,width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'5rem',marginBottom:'.5rem'}}>{pct>=80?'🎉':pct>=60?'👍':'💪'}</div>
        <h2 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.3rem',color:'var(--c-text)'}}>Kết quả Thanh Điệu</h2>
        <div style={{fontSize:'4rem',fontWeight:900,marginBottom:'1.5rem',
          background:pct>=80?'linear-gradient(135deg,#10b981,#06b6d4)':pct>=60?'linear-gradient(135deg,#f59e0b,#f97316)':'linear-gradient(135deg,#ef4444,#ec4899)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{pct}%</div>
        <div style={{display:'flex',gap:'.75rem'}}>
          <button onClick={() => { setPhase('setup'); setAnswers([]); }}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'1px solid var(--c-border)',
              background:'var(--c-surface)',color:'var(--c-text)',fontWeight:700,cursor:'pointer'}}>← Quay lại</button>
          <button onClick={startQuiz}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'none',
              background:'linear-gradient(135deg,#f59e0b,#ef4444)',
              color:'#fff',fontWeight:900,cursor:'pointer'}}>🔄 Làm lại</button>
        </div>
      </div>
    </div>
  );

  /* ── Quiz ── */
  const q = questions[idx];
  const correct = q.correct_tone;
  const pinyinNoTone = stripTones(q.pinyin);

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:580,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <span style={{background:lc+'20',color:lc,padding:'.25rem .7rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>{level}</span>
          <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{idx+1}/{questions.length}</span>
        </div>
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'2rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:'linear-gradient(90deg,#f59e0b,#ef4444)',
            width:`${(idx/questions.length)*100}%`,transition:'width .4s'}}/>
        </div>

        {/* Question */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'2rem',border:'2px solid var(--c-border)',
          textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'.8rem',color:'var(--c-text-muted)',marginBottom:'1rem'}}>🎵 Chọn thanh điệu đúng cho từ này</div>
          <div style={{fontSize:'5rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',marginBottom:'.5rem',
            background:'linear-gradient(135deg,#f59e0b,#ef4444)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            {q.hanzi}
          </div>
          {/* Show pinyin without tone marks */}
          <div style={{fontSize:'1.4rem',color:'var(--c-text-muted)',fontStyle:'italic',marginBottom:'.4rem'}}>{pinyinNoTone}</div>
          <div style={{fontSize:'.85rem',color:'var(--c-text)',background:'var(--c-bg)',padding:'.4rem .8rem',borderRadius:8,display:'inline-block'}}>
            🇻🇳 {q.meaning_vi}
          </div>
          <button onClick={() => playAudio(q.hanzi)} style={{display:'block',margin:'.75rem auto 0',
            background:'none',border:'1px solid var(--c-border)',borderRadius:8,padding:'.3rem .8rem',
            cursor:'pointer',color:'var(--c-text-muted)',fontSize:'.8rem'}}>🔊 Nghe phát âm</button>
          
          {/* Reveal answer */}
          {selected !== null && (
            <div style={{marginTop:'1rem',padding:'.75rem',borderRadius:10,
              background:selected===correct?'#10b98120':'#ef444420',
              border:`1.5px solid ${selected===correct?'#10b981':'#ef4444'}`,
              color:selected===correct?'#10b981':'#ef4444',fontWeight:700,fontSize:'.9rem'}}>
              {selected===correct?'✅ Chính xác! ':'❌ Sai! '}
              Đáp án đúng: <strong style={{color:TONE_COLORS[correct]}}>{TONE_LABELS[correct]}</strong>
              {' — '}<strong>{q.pinyin}</strong>
            </div>
          )}
        </div>

        {/* Tone choices */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
          {[1,2,3,4,5].map(t => {
            let border = TONE_COLORS[t]+'40';
            let bg = TONE_COLORS[t]+'10';
            let textColor = TONE_COLORS[t];
            if (selected !== null) {
              if (t === correct) { border = TONE_COLORS[t]; bg = TONE_COLORS[t]+'25'; }
              else if (t === selected && t !== correct) { border = '#ef4444'; bg = '#ef444420'; textColor = '#ef4444'; }
              else { border = 'var(--c-border)'; bg = 'transparent'; textColor = 'var(--c-text-muted)'; }
            }
            return (
              <button key={t} onClick={() => pick(t)} disabled={selected !== null}
                style={{padding:'1rem',borderRadius:12,border:`2px solid ${border}`,background:bg,
                  color:textColor,fontWeight:700,cursor:selected!==null?'default':'pointer',
                  textAlign:'center',transition:'all .25s',fontSize:'.88rem',
                  gridColumn: t===5?'1/-1':''}}>
                <div style={{fontSize:'1.5rem',marginBottom:'.2rem',
                  color:t===1?'#06b6d4':t===2?'#10b981':t===3?'#f59e0b':t===4?'#ef4444':'#8b5cf6'}}>
                  {t===1?'ˉ':t===2?'ˊ':t===3?'ˇ':t===4?'ˋ':'·'}
                </div>
                {TONE_LABELS[t]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
