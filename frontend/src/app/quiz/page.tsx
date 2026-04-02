'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSpeech } from '@/lib/useSpeech';
import { api } from '@/lib/api';

type Choice = { id: number; text: string; correct: boolean };
type Question = { vocabulary_id: number; hanzi: string; pinyin: string; question: string; choices: Choice[] };
type Topic = { topic: string; word_count: number };

const LEVEL_COLOR: Record<string, string> = {
  HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6', HSK5:'#ef4444', HSK6:'#ec4899',
};
const TOPIC_LABEL: Record<string, string> = {
  noun:'🏠 Danh từ', verb:'⚡ Động từ', adjective:'🌈 Tính từ', adverb:'💨 Trạng từ',
  pronoun:'👤 Đại từ', measure_word:'📦 Lượng từ', conjunction:'🔗 Liên từ',
  preposition:'📍 Giới từ', particle:'✨ Trợ từ', numeral:'🔢 Số từ',
  time:'⏰ Thời gian', greeting:'👋 Chào hỏi', question:'❓ Câu hỏi',
  expression:'💬 Thành ngữ', other:'📚 Khác',
};

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { speak } = useSpeech();

  const [level, setLevel]          = useState('HSK1');
  const [topics, setTopics]        = useState<Topic[]>([]);
  const [selTopic, setSelTopic]    = useState('all');
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [questions, setQuestions]  = useState<Question[]>([]);
  const [qIdx, setQIdx]            = useState(0);
  const [selected, setSelected]    = useState<number|null>(null);
  const [answers, setAnswers]      = useState<{vocabulary_id:number;correct:boolean}[]>([]);
  const [phase, setPhase]          = useState<'setup'|'quiz'|'result'>('setup');
  const [result, setResult]        = useState<any>(null);
  const [startTime, setStartTime]  = useState(0);
  const [streak, setStreak]        = useState(0);
  const [maxStreak, setMaxStreak]  = useState(0);
  const [timeLeft, setTimeLeft]    = useState(20);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  // Load topics
  useEffect(() => {
    if (!user) return;
    setLoadingTopics(true);
    setSelTopic('all');
    api.getQuizTopics(level)
      .then(d => setTopics(d.data.topics))
      .catch(() => {})
      .finally(() => setLoadingTopics(false));
  }, [level, user]);

  // Timer đếm ngược 20s mỗi câu
  useEffect(() => {
    if (phase !== 'quiz' || selected !== null) return;
    setTimeLeft(20);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // Hết giờ → tự động chọn sai
          const q = questions[qIdx];
          if (q) {
            const wrongChoice = q.choices.find(c => !c.correct);
            if (wrongChoice) choose(wrongChoice);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [qIdx, phase, selected]); // eslint-disable-line

  // Auto-speak khi câu mới
  useEffect(() => {
    if (phase==='quiz' && questions[qIdx]) {
      const t = setTimeout(() => speak(questions[qIdx].hanzi), 400);
      return () => clearTimeout(t);
    }
  }, [qIdx, phase, questions, speak]);

  const startQuiz = async () => {
    const data = await api.getQuizQuestions(level, 10, selTopic);
    setQuestions(data.data.questions);
    setQIdx(0); setAnswers([]); setSelected(null);
    setStreak(0); setMaxStreak(0);
    setPhase('quiz'); setStartTime(Date.now());
  };

  const choose = useCallback(async (choice: Choice) => {
    if (selected !== null) return;
    setSelected(choice.id);
    const newAnswers = [...answers, { vocabulary_id: questions[qIdx].vocabulary_id, correct: choice.correct }];
    setAnswers(newAnswers);
    if (choice.correct) setStreak(s => { const ns=s+1; setMaxStreak(m => Math.max(m,ns)); return ns; });
    else setStreak(0);

    setTimeout(async () => {
      if (qIdx+1 >= questions.length) {
        const r = await api.submitQuiz({
          hsk_level: level, quiz_type: 'multiple_choice',
          answers: newAnswers,
          duration_seconds: Math.round((Date.now()-startTime)/1000)
        });
        setResult(r.data); setPhase('result');
      } else { setQIdx(i => i+1); setSelected(null); }
    }, 900);
  }, [selected, answers, questions, qIdx, level, startTime]);

  if (loading) return <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>Đang tải...</div>;

  // ── SETUP ──
  if (phase==='setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:680,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{fontSize:'3.5rem',marginBottom:'.5rem'}}>🧠</div>
          <h1 style={{fontSize:'2.2rem',fontWeight:900,marginBottom:'.5rem',
            background:'linear-gradient(135deg,#6366f1,#ec4899)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Luyện Tập Từ Vựng
          </h1>
          <p style={{color:'var(--c-text-muted)',fontSize:'1rem'}}>
            Kiểm tra từ vựng theo cấp độ và từ loại
          </p>
        </div>

        {/* Level */}
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',marginBottom:'1.25rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',color:'var(--c-text)',fontSize:'1rem'}}>📊 Chọn cấp độ HSK</h3>
          <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
            {['HSK1','HSK2','HSK3','HSK4','HSK5','HSK6'].map(lv => (
              <button key={lv} onClick={() => setLevel(lv)} id={`level-${lv}`}
                style={{padding:'.45rem 1.1rem',borderRadius:50,border:'2px solid',
                  borderColor:level===lv?(LEVEL_COLOR[lv]||'#6366f1'):'var(--c-border)',
                  background:level===lv?(LEVEL_COLOR[lv]||'#6366f1'):'transparent',
                  color:level===lv?'#fff':'var(--c-text-muted)',
                  fontWeight:800,cursor:'pointer',fontSize:'.82rem',transition:'all .2s'
                }}>{lv}</button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',marginBottom:'1.25rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'.75rem',color:'var(--c-text)',fontSize:'1rem'}}>🏷️ Chọn chủ đề luyện tập</h3>
          <p style={{fontSize:'.78rem',color:'var(--c-text-muted)',marginBottom:'.9rem'}}>
            Luyện theo từng loại từ giúp ghi nhớ có hệ thống hơn
          </p>
          {loadingTopics ? (
            <div style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>Đang tải chủ đề...</div>
          ) : (
            <div style={{display:'flex',gap:'.45rem',flexWrap:'wrap'}}>
              <button onClick={() => setSelTopic('all')} id="topic-all"
                style={{padding:'.4rem .85rem',borderRadius:8,border:'1.5px solid',
                  borderColor:selTopic==='all'?'#6366f1':'var(--c-border)',
                  background:selTopic==='all'?'#6366f1':'transparent',
                  color:selTopic==='all'?'#fff':'var(--c-text-muted)',
                  fontWeight:700,cursor:'pointer',fontSize:'.78rem'}}>
                📚 Tất cả ({topics.reduce((s,t)=>s+t.word_count,0)})
              </button>
              {topics.map(t => (
                <button key={t.topic} onClick={() => setSelTopic(t.topic)} id={`topic-${t.topic}`}
                  style={{padding:'.4rem .85rem',borderRadius:8,border:'1.5px solid',
                    borderColor:selTopic===t.topic?'#6366f1':'var(--c-border)',
                    background:selTopic===t.topic?'#6366f118':'transparent',
                    color:selTopic===t.topic?'#6366f1':'var(--c-text-muted)',
                    fontWeight:selTopic===t.topic?700:500,cursor:'pointer',fontSize:'.75rem'}}>
                  {TOPIC_LABEL[t.topic]??t.topic} <span style={{opacity:.6}}>({t.word_count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hints */}
        <div style={{background:'#6366f110',border:'1px solid #6366f130',borderRadius:12,
          padding:'1rem 1.2rem',marginBottom:'1.5rem',fontSize:'.82rem',color:'var(--c-text-muted)',
          display:'flex',gap:'1rem',flexWrap:'wrap'}}>
          <span>🔊 Tự động phát âm</span>
          <span>🎯 10 câu trắc nghiệm</span>
          <span>🔥 Theo dõi chuỗi đúng</span>
          <span>⏱️ 20 giây mỗi câu</span>
        </div>

        <button onClick={startQuiz} id="btn-start-quiz"
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#6366f1,#ec4899)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            boxShadow:'0 4px 20px #6366f140'}}>
          🧠 Bắt đầu 10 câu →
        </button>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase==='result') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:480,margin:'0 auto',textAlign:'center'}}>
        <div style={{fontSize:'4rem',marginBottom:'1rem'}}>
          {result?.score>=90?'🏆':result?.score>=70?'🎉':result?.score>=50?'👍':'💪'}
        </div>
        <h1 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.5rem',color:'var(--c-text)'}}>Kết quả</h1>
        <div style={{fontSize:'4rem',fontWeight:900,marginBottom:'.5rem',
          background:result?.score>=70?'linear-gradient(135deg,#10b981,#3b82f6)':'linear-gradient(135deg,#f59e0b,#ef4444)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
          {result?.score}%
        </div>
        <p style={{color:'var(--c-text-muted)',marginBottom:'.5rem',fontSize:'.95rem'}}>
          {result?.correct_answers}/{result?.total} câu đúng
        </p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'.75rem',margin:'1.5rem 0'}}>
          {[
            {label:'Điểm số',value:`${result?.score}%`,color:'#6366f1'},
            {label:'Streak cao',value:`${maxStreak} 🔥`,color:'#f59e0b'},
            {label:'Cấp độ',value:level,color:LEVEL_COLOR[level]||'#6366f1'},
          ].map(s => (
            <div key={s.label} style={{background:'var(--c-surface)',borderRadius:12,padding:'.9rem',border:'1px solid var(--c-border)'}}>
              <div style={{fontSize:'1.25rem',fontWeight:900,color:s.color}}>{s.value}</div>
              <div style={{fontSize:'.7rem',color:'var(--c-text-muted)',marginTop:'.2rem'}}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{color:'#f59e0b',fontSize:'1.05rem',fontWeight:700,marginBottom:'1.5rem'}}>{result?.message}</p>
        <div style={{display:'flex',gap:'.75rem',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={() => setPhase('setup')}
            style={{padding:'.65rem 1.4rem',borderRadius:10,border:'none',
              background:'linear-gradient(135deg,#6366f1,#ec4899)',
              color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'.9rem'}}>
            🔄 Làm lại
          </button>
          <button onClick={() => router.push('/writing')}
            style={{padding:'.65rem 1.4rem',borderRadius:10,border:'1.5px solid #f59e0b',
              background:'#f59e0b10',color:'#f59e0b',fontWeight:700,cursor:'pointer',fontSize:'.9rem'}}>
            ✍️ Luyện viết
          </button>
          <button onClick={() => router.push('/dashboard')}
            style={{padding:'.65rem 1.4rem',borderRadius:10,border:'1.5px solid var(--c-border)',
              background:'transparent',color:'var(--c-text-muted)',fontWeight:700,cursor:'pointer',fontSize:'.9rem'}}>
            🏠 Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──
  const q = questions[qIdx];
  const lc = LEVEL_COLOR[level] || '#6366f1';

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'1.5rem'}}>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        {/* Top bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <span style={{background:lc+'20',color:lc,padding:'.25rem .75rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>
            {level}{selTopic!=='all'?` · ${TOPIC_LABEL[selTopic]?.split(' ').slice(1).join(' ')??selTopic}`:''}
          </span>
          <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
            {streak>=2 && <span style={{color:'#f59e0b',fontWeight:800,fontSize:'.85rem'}}>🔥 {streak}</span>}
            <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{qIdx+1} / {questions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'.6rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,
            background:`linear-gradient(90deg,${lc},#ec4899)`,
            width:`${(qIdx/questions.length)*100}%`,transition:'width .4s'}} />
        </div>

        {/* Timer bar */}
        <div style={{display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'1.25rem'}}>
          <div style={{flex:1,height:6,background:'var(--c-border)',borderRadius:99,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:99,transition:'width 1s linear',
              background: timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#10b981',
              width:`${(timeLeft/20)*100}%`}} />
          </div>
          <span style={{fontSize:'.75rem',fontWeight:800,
            color: timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : 'var(--c-text-muted)',
            minWidth:'2rem',textAlign:'right'}}>
            {timeLeft}s
          </span>
        </div>

        {/* Question */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'2rem',
          border:'1px solid var(--c-border)',marginBottom:'1.25rem',textAlign:'center',
          boxShadow:'0 4px 24px #0002'}}>
          <p style={{color:'var(--c-text-muted)',marginBottom:'.75rem',fontSize:'.85rem'}}>{q.question}</p>
          <div style={{fontSize:'5rem',fontWeight:900,lineHeight:1,marginBottom:'.5rem',
            fontFamily:'"Noto Serif CJK SC","Source Han Serif",serif',
            background:`linear-gradient(135deg,${lc},#ec4899)`,
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            {q.hanzi}
          </div>
          <div style={{fontSize:'1.1rem',color:'#6366f1',fontStyle:'italic',fontWeight:600,marginBottom:'1.25rem'}}>
            {q.pinyin}
          </div>
          <button onClick={() => speak(q.hanzi)}
            style={{padding:'.35rem .9rem',borderRadius:8,fontSize:'.8rem',
              background:lc+'18',border:`1.5px solid ${lc}40`,color:lc,cursor:'pointer',fontWeight:600}}>
            🔊 Nghe lại
          </button>
        </div>

        {/* Choices */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.65rem'}}>
          {q.choices.map((c,i) => {
            const isSelected = selected===c.id;
            const revealed = selected!==null;
            let bg='var(--c-surface)', border='var(--c-border)', color='var(--c-text)';
            if (revealed) {
              if (c.correct) { bg='#10b98115'; border='#10b981'; color='#10b981'; }
              else if (isSelected) { bg='#ef444415'; border='#ef4444'; color='#ef4444'; }
            }
            return (
              <button key={c.id} onClick={() => choose(c)} disabled={selected!==null} id={`choice-${i}`}
                style={{padding:'.9rem 1rem',borderRadius:12,border:`2px solid ${border}`,
                  background:bg,color,fontWeight:600,cursor:selected?'default':'pointer',
                  fontSize:'.9rem',textAlign:'left',transition:'all .2s',lineHeight:1.4}}
                onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor=lc; }}
                onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor='var(--c-border)'; }}>
                <span style={{opacity:.5,marginRight:'.4rem',fontSize:'.75rem'}}>{['A','B','C','D'][i]}</span>
                {c.text}
                {revealed && c.correct && <span style={{float:'right'}}>✓</span>}
                {revealed && isSelected && !c.correct && <span style={{float:'right'}}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
