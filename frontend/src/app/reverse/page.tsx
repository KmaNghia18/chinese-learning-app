'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string,string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const TOPIC_LABEL: Record<string,string> = {
  noun:'🏠 Danh từ',verb:'⚡ Động từ',adjective:'🌈 Tính từ',adverb:'💨 Trạng từ',
  pronoun:'👤 Đại từ',measure_word:'📦 Lượng từ',other:'📚 Khác',
};

interface RQ { vocabulary_id:number; meaning_vi:string; word_type:string; choices:{id:number;hanzi:string;pinyin:string;correct:boolean}[]; }

export default function ReversePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<'setup'|'quiz'|'result'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [topics, setTopics] = useState<{topic:string;word_count:number}[]>([]);
  const [selTopic, setSelTopic] = useState('all');
  const [questions, setQuestions] = useState<RQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [answers, setAnswers] = useState<{vocabulary_id:number;correct:boolean}[]>([]);
  const [loadingQ, setLoadingQ] = useState(false);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user,loading,router]);
  useEffect(() => {
    if (!user) return;
    api.getQuizTopics(level).then(d => setTopics(d.data.topics)).catch(()=>{});
  }, [level, user]);

  const playAudio = useCallback((hanzi: string) => {
    new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`).play().catch(()=>{});
  }, []);

  const startQuiz = async () => {
    setLoadingQ(true);
    try {
      const d = await api.getReverseQuiz(level, 10, selTopic);
      setQuestions(d.data.questions); setIdx(0); setAnswers([]); setSelected(null);
      setPhase('quiz');
    } catch(e) { console.error(e); }
    setLoadingQ(false);
  };

  const pick = (c: {id:number;correct:boolean;hanzi:string}) => {
    if (selected !== null) return;
    setSelected(c.id);
    setAnswers(prev => [...prev, { vocabulary_id: questions[idx].vocabulary_id, correct: c.correct }]);
    if (c.correct) playAudio(c.hanzi);
    setTimeout(() => {
      if (idx+1 < questions.length) { setIdx(i => i+1); setSelected(null); }
      else setPhase('result');
    }, 1300);
  };

  if (loading) return <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>Đang tải...</div>;

  const score = answers.filter(a=>a.correct).length;
  const pct = questions.length ? Math.round((score/questions.length)*100) : 0;
  const lc = LC[level];

  /* ── Setup ── */
  if (phase === 'setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:540,width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>🔁</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#10b981,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Quiz Ngược
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Đọc nghĩa tiếng Việt → chọn chữ Hán đúng · Luyện nhận diện từ</p>
        </div>

        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',marginBottom:'1.25rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',fontSize:'.95rem',color:'var(--c-text)'}}>📊 Cấp độ</h3>
          <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
            {['HSK1','HSK2','HSK3','HSK4'].map(lv => (
              <button key={lv} onClick={() => { setLevel(lv); setSelTopic('all'); }}
                style={{padding:'.5rem 1.2rem',borderRadius:50,border:'2px solid',
                  borderColor:level===lv?LC[lv]:'var(--c-border)',
                  background:level===lv?LC[lv]:'transparent',
                  color:level===lv?'#fff':'var(--c-text-muted)',
                  fontWeight:800,cursor:'pointer',fontSize:'.85rem',transition:'all .2s'}}>{lv}</button>
            ))}
          </div>
        </div>

        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',marginBottom:'1.5rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'.6rem',fontSize:'.9rem',color:'var(--c-text)'}}>🏷️ Từ loại</h3>
          <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap'}}>
            <button onClick={() => setSelTopic('all')}
              style={{padding:'.35rem .8rem',borderRadius:8,border:'1.5px solid',fontSize:'.78rem',fontWeight:700,cursor:'pointer',
                borderColor:selTopic==='all'?'#10b981':'var(--c-border)',
                background:selTopic==='all'?'#10b981':'transparent',
                color:selTopic==='all'?'#fff':'var(--c-text-muted)'}}>
              📚 Tất cả ({topics.reduce((s,t)=>s+t.word_count,0)})
            </button>
            {topics.map(t => (
              <button key={t.topic} onClick={() => setSelTopic(t.topic)}
                style={{padding:'.35rem .8rem',borderRadius:8,border:'1.5px solid',fontSize:'.75rem',cursor:'pointer',
                  borderColor:selTopic===t.topic?'#10b981':'var(--c-border)',
                  background:selTopic===t.topic?'#10b98118':'transparent',
                  color:selTopic===t.topic?'#10b981':'var(--c-text-muted)',
                  fontWeight:selTopic===t.topic?700:500}}>
                {TOPIC_LABEL[t.topic]??t.topic} ({t.word_count})
              </button>
            ))}
          </div>
        </div>

        <button onClick={startQuiz} disabled={loadingQ}
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#10b981,#06b6d4)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            opacity:loadingQ?.6:1,boxShadow:'0 4px 20px #10b98140',transition:'all .2s'}}>
          {loadingQ?'⏳ Đang tải...':'🔁 Bắt đầu quiz ngược →'}
        </button>
      </div>
    </div>
  );

  /* ── Result ── */
  if (phase === 'result') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:480,width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'5rem',marginBottom:'.5rem'}}>{pct>=80?'🎉':pct>=60?'👍':'💪'}</div>
        <h2 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.3rem',color:'var(--c-text)'}}>Kết quả Quiz Ngược</h2>
        <div style={{fontSize:'4rem',fontWeight:900,marginBottom:'1.5rem',
          background:pct>=80?'linear-gradient(135deg,#10b981,#06b6d4)':pct>=60?'linear-gradient(135deg,#f59e0b,#f97316)':'linear-gradient(135deg,#ef4444,#ec4899)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{pct}%</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginBottom:'1.5rem'}}>
          <div style={{background:'#10b98120',border:'2px solid #10b981',borderRadius:14,padding:'1rem'}}>
            <div style={{fontSize:'2rem',fontWeight:900,color:'#10b981'}}>{score}</div>
            <div style={{fontSize:'.8rem',color:'#10b981',fontWeight:700}}>Đúng</div>
          </div>
          <div style={{background:'#ef444420',border:'2px solid #ef4444',borderRadius:14,padding:'1rem'}}>
            <div style={{fontSize:'2rem',fontWeight:900,color:'#ef4444'}}>{questions.length-score}</div>
            <div style={{fontSize:'.8rem',color:'#ef4444',fontWeight:700}}>Sai</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'.75rem'}}>
          <button onClick={() => { setPhase('setup'); setAnswers([]); }}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'1px solid var(--c-border)',
              background:'var(--c-surface)',color:'var(--c-text)',fontWeight:700,cursor:'pointer'}}>← Quay lại</button>
          <button onClick={startQuiz}
            style={{flex:1,padding:'.85rem',borderRadius:12,border:'none',
              background:'linear-gradient(135deg,#10b981,#06b6d4)',
              color:'#fff',fontWeight:900,cursor:'pointer'}}>🔄 Làm lại</button>
        </div>
      </div>
    </div>
  );

  /* ── Quiz ── */
  const q = questions[idx];
  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <span style={{background:lc+'20',color:lc,padding:'.25rem .7rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>{level}</span>
          <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{idx+1}/{questions.length}</span>
        </div>
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'2rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:'linear-gradient(90deg,#10b981,#06b6d4)',
            width:`${(idx/questions.length)*100}%`,transition:'width .4s'}}/>
        </div>

        {/* Question */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'2rem',border:'2px solid var(--c-border)',textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'.8rem',color:'var(--c-text-muted)',marginBottom:'.75rem'}}>🇻🇳 Chọn chữ Hán đúng với nghĩa này:</div>
          <div style={{fontSize:'1.5rem',fontWeight:800,color:'var(--c-text)',lineHeight:1.5,marginBottom:'.5rem'}}>
            {q.meaning_vi}
          </div>
          {q.word_type && (
            <span style={{fontSize:'.72rem',background:'#6366f118',color:'#6366f1',padding:'.2rem .6rem',borderRadius:6,fontWeight:700}}>
              {TOPIC_LABEL[q.word_type]??q.word_type}
            </span>
          )}
        </div>

        {/* Choices — big hanzi buttons */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
          {q.choices.map((c) => {
            let border='var(--c-border)', bg='var(--c-surface)', textColor='var(--c-text)';
            if (selected !== null) {
              if (c.correct) { border='#10b981'; bg='#10b98120'; textColor='#10b981'; }
              else if (c.id===selected && !c.correct) { border='#ef4444'; bg='#ef444420'; textColor='#ef4444'; }
              else { border='var(--c-border)'; bg='var(--c-surface)'; textColor='var(--c-text-muted)'; }
            }
            return (
              <button key={c.id} onClick={() => pick(c)} disabled={selected!==null}
                style={{padding:'1.5rem 1rem',borderRadius:16,border:`2px solid ${border}`,background:bg,
                  cursor:selected!==null?'default':'pointer',textAlign:'center',transition:'all .25s'}}>
                <div style={{fontSize:'3rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                  color:textColor,marginBottom:'.4rem',lineHeight:1}}>{c.hanzi}</div>
                <div style={{fontSize:'.85rem',fontStyle:'italic',color:selected!==null?textColor+'aa':'var(--c-text-muted)'}}>{c.pinyin}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
