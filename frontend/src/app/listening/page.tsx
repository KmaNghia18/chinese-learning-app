'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string,string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const LABELS = ['A','B','C','D'];

interface Q { vocabulary_id:number; hanzi:string; pinyin:string; choices:{id:number;text:string;correct:boolean}[]; }

export default function ListeningPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<'setup'|'quiz'|'result'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [questions, setQuestions] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [answers, setAnswers] = useState<{vocabulary_id:number;correct:boolean}[]>([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement|null>(null);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user,loading,router]);

  const playAudio = useCallback((hanzi: string) => {
    const ttsUrl = `http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const a = new Audio(ttsUrl);
    audioRef.current = a;
    setPlaying(true);
    setPlayCount(c => c + 1);
    a.onended = () => setPlaying(false);
    a.onerror = () => setPlaying(false);
    a.play().catch(() => setPlaying(false));
  }, []);

  const startQuiz = async () => {
    setLoadingQ(true);
    try {
      const d = await api.getListeningQuiz(level, 10);
      setQuestions(d.data.questions);
      setIdx(0); setAnswers([]); setSelected(null); setPlayCount(0);
      setPhase('quiz');
      setTimeout(() => playAudio(d.data.questions[0]?.hanzi), 500);
    } catch(e) { console.error(e); }
    setLoadingQ(false);
  };

  const pickAnswer = (choice: {id:number;correct:boolean}) => {
    if (selected !== null) return;
    setSelected(choice.id);
    setAnswers(prev => [...prev, { vocabulary_id: questions[idx].vocabulary_id, correct: choice.correct }]);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx(i => { const ni = i+1; setTimeout(() => playAudio(questions[ni]?.hanzi), 300); return ni; });
        setSelected(null); setPlayCount(0);
      } else { setPhase('result'); }
    }, 1200);
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
          <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>🎧</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#06b6d4,#6366f1)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Quiz Nghe
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Nghe phát âm → chọn nghĩa đúng · Luyện kỹ năng nghe tiếng Trung</p>
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

        <div style={{background:'#06b6d410',border:'1px solid #06b6d430',borderRadius:12,padding:'1rem',marginBottom:'1.5rem',fontSize:'.82rem',color:'var(--c-text-muted)',lineHeight:1.7}}>
          🎵 Audio sẽ tự động phát khi vào quiz<br/>
          🔊 Nhấn nút loa để nghe lại bất cứ lúc nào<br/>
          ❓ Chọn nghĩa tiếng Việt đúng với âm thanh vừa nghe
        </div>

        <button onClick={startQuiz} disabled={loadingQ}
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#06b6d4,#6366f1)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            opacity:loadingQ?.6:1,boxShadow:'0 4px 20px #06b6d440',transition:'all .2s'}}>
          {loadingQ?'⏳ Đang tải...':'🎧 Bắt đầu nghe →'}
        </button>
      </div>
    </div>
  );

  /* ── Result ── */
  if (phase === 'result') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:480,width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'5rem',marginBottom:'.5rem'}}>{pct>=80?'🎉':pct>=60?'👍':'💪'}</div>
        <h2 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.3rem',color:'var(--c-text)'}}>Kết quả Quiz Nghe</h2>
        <div style={{fontSize:'4rem',fontWeight:900,marginBottom:'1rem',
          background:pct>=80?'linear-gradient(135deg,#10b981,#06b6d4)':pct>=60?'linear-gradient(135deg,#f59e0b,#f97316)':'linear-gradient(135deg,#ef4444,#ec4899)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{pct}%</div>
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div><div style={{fontSize:'2rem',fontWeight:900,color:'#10b981'}}>{score}</div><div style={{fontSize:'.8rem',color:'var(--c-text-muted)'}}>Đúng</div></div>
            <div><div style={{fontSize:'2rem',fontWeight:900,color:'#ef4444'}}>{questions.length-score}</div><div style={{fontSize:'.8rem',color:'var(--c-text-muted)'}}>Sai</div></div>
          </div>
        </div>
        <div style={{display:'flex',gap:'.75rem'}}>
          <button onClick={() => { setPhase('setup'); setAnswers([]); }}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'1px solid var(--c-border)',
              background:'var(--c-surface)',color:'var(--c-text)',fontWeight:700,cursor:'pointer'}}>← Chọn cấp độ</button>
          <button onClick={startQuiz}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'none',
              background:'linear-gradient(135deg,#06b6d4,#6366f1)',
              color:'#fff',fontWeight:900,cursor:'pointer'}}>🔄 Làm lại</button>
        </div>
      </div>
    </div>
  );

  /* ── Quiz ── */
  const q = questions[idx];
  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:580,margin:'0 auto'}}>
        {/* Progress */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <span style={{background:lc+'20',color:lc,padding:'.25rem .7rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>{level}</span>
          <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{idx+1}/{questions.length}</span>
        </div>
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'2rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:'linear-gradient(90deg,#06b6d4,#6366f1)',
            width:`${((idx)/questions.length)*100}%`,transition:'width .4s'}}/>
        </div>

        {/* Audio Card */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'2.5rem',border:'2px solid var(--c-border)',
          textAlign:'center',marginBottom:'2rem',position:'relative'}}>
          <div style={{fontSize:'.8rem',color:'var(--c-text-muted)',marginBottom:'1rem'}}>🎧 Nghe và chọn nghĩa đúng</div>
          
          {/* Big play button */}
          <button onClick={() => playAudio(q.hanzi)}
            style={{width:100,height:100,borderRadius:'50%',border:'none',
              background:playing?'linear-gradient(135deg,#10b981,#06b6d4)':'linear-gradient(135deg,#06b6d4,#6366f1)',
              color:'#fff',fontSize:'2.5rem',cursor:'pointer',marginBottom:'1rem',
              boxShadow:playing?'0 0 0 8px #10b98130':'0 4px 20px #06b6d440',
              transition:'all .3s',animation:playing?'pulse 1s ease-in-out infinite':'none'}}>
            {playing?'🔊':'▶️'}
          </button>
          
          <div style={{fontSize:'.8rem',color:'var(--c-text-muted)'}}>
            Đã nghe {playCount} lần · {idx+1}/{questions.length}
          </div>

          {/* Show hanzi after selecting */}
          {selected !== null && (
            <div style={{marginTop:'1rem',padding:'.75rem',background:'var(--c-bg)',borderRadius:10}}>
              <div style={{fontSize:'2.5rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                background:'linear-gradient(135deg,#06b6d4,#6366f1)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{q.hanzi}</div>
              <div style={{fontSize:'.9rem',color:'#818cf8',fontStyle:'italic'}}>{q.pinyin}</div>
            </div>
          )}
        </div>

        {/* Choices */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
          {q.choices.map((c,i) => {
            let bg = 'var(--c-surface)', border = 'var(--c-border)', color = 'var(--c-text)';
            if (selected !== null) {
              if (c.correct) { bg='#10b98120'; border='#10b981'; color='#10b981'; }
              else if (c.id === selected && !c.correct) { bg='#ef444420'; border='#ef4444'; color='#ef4444'; }
            }
            return (
              <button key={c.id} onClick={() => pickAnswer(c)} disabled={selected !== null}
                style={{padding:'1rem',borderRadius:12,border:`2px solid ${border}`,background:bg,
                  color,fontWeight:600,cursor:selected!==null?'default':'pointer',
                  textAlign:'left',transition:'all .25s',display:'flex',gap:'.5rem',alignItems:'center'}}>
                <span style={{fontWeight:800,minWidth:22,height:22,borderRadius:'50%',
                  background:border==='var(--c-border)'?'var(--c-bg)':border+'30',
                  color:border==='var(--c-border)'?'var(--c-text-muted)':border,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',flexShrink:0}}>{LABELS[i]}</span>
                <span style={{fontSize:'.85rem',lineHeight:1.4}}>{c.text}</span>
              </button>
            );
          })}
        </div>

        <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 8px #10b98130}50%{box-shadow:0 0 0 14px #10b98110}}`}</style>
      </div>
    </div>
  );
}
