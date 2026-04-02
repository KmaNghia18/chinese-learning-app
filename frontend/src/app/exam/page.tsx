'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string, string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const TOTAL_Q = 20;
const TIME_PER_Q = 60; // 60s mỗi câu

type Choice = { id: number; text: string; correct: boolean };
type Question = { vocabulary_id: number; hanzi: string; pinyin: string; question: string; choices: Choice[] };

export default function ExamPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<'setup'|'exam'|'result'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<{id:number;choice:Choice|null;correct:boolean}[]>([]);
  const [selected, setSelected] = useState<number|null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [totalTime, setTotalTime] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  // Per-question timer
  useEffect(() => {
    if (phase !== 'exam') return;
    setTimeLeft(TIME_PER_Q);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleAnswer(null); // hết giờ → bỏ qua
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [qIdx, phase]); // eslint-disable-line

  // Total exam timer
  useEffect(() => {
    if (phase !== 'exam') return;
    totalTimerRef.current = setInterval(() => setTotalTime(t => t + 1), 1000);
    return () => clearInterval(totalTimerRef.current!);
  }, [phase]);

  const startExam = async () => {
    const data = await api.getQuizQuestions(level, TOTAL_Q, 'all');
    setQuestions(data.data.questions);
    setQIdx(0); setAnswers([]); setSelected(null);
    setTotalTime(0); setStartTime(Date.now());
    setPhase('exam');
  };

  const handleAnswer = useCallback((choice: Choice | null) => {
    if (selected !== null) return;
    clearInterval(timerRef.current!);
    if (choice) setSelected(choice.id);
    const q = questions[qIdx];
    const newAnswers = [...answers, { id: q?.vocabulary_id, choice, correct: choice?.correct ?? false }];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (qIdx + 1 >= questions.length) {
        // Kết thúc exam
        clearInterval(totalTimerRef.current!);
        const correct = newAnswers.filter(a => a.correct).length;
        const score = Math.round((correct / newAnswers.length) * 100);
        setResult({ score, correct, total: newAnswers.length, answers: newAnswers, time: totalTime });
        setPhase('result');
      } else {
        setQIdx(i => i + 1);
        setSelected(null);
      }
    }, 800);
  }, [selected, answers, questions, qIdx, totalTime]);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  if (loading) return <div style={{textAlign:'center',padding:'4rem'}}>Đang tải...</div>;

  // ── SETUP ──
  if (phase === 'setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:620,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>🎓</div>
          <h1 style={{fontSize:'2.2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#f59e0b,#ef4444)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Thi Thử HSK
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Bài kiểm tra {TOTAL_Q} câu theo format HSK thực tế</p>
        </div>

        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',marginBottom:'1.25rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',fontSize:'.95rem'}}>📊 Chọn cấp độ</h3>
          <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
            {['HSK1','HSK2','HSK3','HSK4'].map(lv => (
              <button key={lv} onClick={() => setLevel(lv)}
                style={{padding:'.6rem 1.4rem',borderRadius:50,border:'2px solid',
                  borderColor:level===lv?(LC[lv]||'#f59e0b'):'var(--c-border)',
                  background:level===lv?(LC[lv]||'#f59e0b'):'transparent',
                  color:level===lv?'#fff':'var(--c-text-muted)',
                  fontWeight:800,cursor:'pointer',fontSize:'.85rem',transition:'all .2s'}}>
                {lv}
              </button>
            ))}
          </div>
        </div>

        <div style={{background:'#f59e0b10',border:'1px solid #f59e0b30',borderRadius:12,
          padding:'1rem 1.2rem',marginBottom:'1.5rem',fontSize:'.82rem',color:'var(--c-text-muted)'}}>
          <div style={{fontWeight:800,color:'#f59e0b',marginBottom:'.5rem'}}>📋 Thông tin bài thi</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.4rem'}}>
            <span>📝 {TOTAL_Q} câu trắc nghiệm</span>
            <span>⏱️ {TIME_PER_Q}s mỗi câu</span>
            <span>🎯 80% để đạt</span>
            <span>🔇 Không gợi ý</span>
          </div>
        </div>

        <button onClick={startExam}
          style={{width:'100%',padding:'1.1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#f59e0b,#ef4444)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            boxShadow:'0 4px 20px #f59e0b40'}}>
          🎓 Bắt đầu thi →
        </button>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === 'result' && result) {
    const passed = result.score >= 80;
    const lc = LC[level] || '#f59e0b';
    return (
      <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
        <div style={{maxWidth:580,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <div style={{fontSize:'4rem',marginBottom:'.5rem'}}>
              {result.score>=90?'🏆':result.score>=80?'🎉':result.score>=60?'💪':'📚'}
            </div>
            <h1 style={{fontSize:'2rem',fontWeight:900,
              color:passed?'#10b981':'#ef4444',marginBottom:'.3rem'}}>
              {passed ? '✅ ĐẠT!' : '❌ Chưa đạt'}
            </h1>
            <div style={{fontSize:'3.5rem',fontWeight:900,color:lc}}>{result.score}%</div>
            <div style={{color:'var(--c-text-muted)',fontSize:'.88rem',marginTop:'.3rem'}}>
              {result.correct}/{result.total} câu đúng · ⏱️ {fmt(result.time)}
            </div>
          </div>

          {/* Score breakdown */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem',marginBottom:'1.5rem'}}>
            {[
              {icon:'✅',v:result.correct,l:'Đúng',c:'#10b981'},
              {icon:'❌',v:result.total-result.correct,l:'Sai',c:'#ef4444'},
              {icon:'⏱️',v:fmt(result.time),l:'Thời gian',c:'#6366f1'},
            ].map(s => (
              <div key={s.l} style={{background:'var(--c-surface)',borderRadius:14,padding:'1rem',
                textAlign:'center',border:'1px solid var(--c-border)'}}>
                <div style={{fontSize:'1.5rem'}}>{s.icon}</div>
                <div style={{fontSize:'1.6rem',fontWeight:900,color:s.c}}>{s.v}</div>
                <div style={{fontSize:'.7rem',color:'var(--c-text-muted)'}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Answer review */}
          <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',
            marginBottom:'1.5rem',border:'1px solid var(--c-border)'}}>
            <h3 style={{fontWeight:800,marginBottom:'.75rem',fontSize:'.9rem'}}>📋 Chi tiết đáp án</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'.4rem'}}>
              {result.answers.map((a: any, i: number) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'.75rem',
                  padding:'.5rem .75rem',borderRadius:8,
                  background:a.correct?'#10b98110':'#ef444410',
                  border:`1px solid ${a.correct?'#10b98130':'#ef444430'}`}}>
                  <span style={{fontSize:'1.2rem'}}>{a.correct?'✅':'❌'}</span>
                  <span style={{fontWeight:700,fontSize:'1rem'}}>{questions[i]?.hanzi}</span>
                  <span style={{fontSize:'.78rem',color:'var(--c-text-muted)',flex:1}}>{questions[i]?.pinyin}</span>
                  {!a.correct && a.choice && (
                    <span style={{fontSize:'.72rem',color:'#ef4444'}}>→ {a.choice.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex',gap:'.75rem',flexDirection:'column'}}>
            <button onClick={startExam}
              style={{padding:'.9rem',borderRadius:12,border:'none',
                background:'linear-gradient(135deg,#f59e0b,#ef4444)',
                color:'#fff',fontWeight:900,cursor:'pointer',fontSize:'1rem'}}>
              🔄 Thi lại
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
  }

  // ── EXAM ──
  const q = questions[qIdx];
  const lc = LC[level] || '#f59e0b';
  const timePct = (timeLeft / TIME_PER_Q) * 100;

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'1.5rem'}}>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <span style={{background:lc+'20',color:lc,padding:'.25rem .75rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>
            {level}
          </span>
          <span style={{fontWeight:800,color:totalTime > TOTAL_Q*TIME_PER_Q*0.7 ? '#ef4444':'var(--c-text-muted)',
            fontSize:'.9rem',fontFamily:'monospace'}}>
            ⏱️ {fmt(totalTime)}
          </span>
          <span style={{color:'var(--c-text-muted)',fontSize:'.85rem',fontWeight:700}}>
            {qIdx+1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{height:3,background:'var(--c-border)',borderRadius:99,marginBottom:'.5rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:`linear-gradient(90deg,${lc},#ec4899)`,
            width:`${((qIdx)/questions.length)*100}%`,transition:'width .4s'}} />
        </div>

        {/* Timer bar */}
        <div style={{display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'1.5rem'}}>
          <div style={{flex:1,height:6,background:'var(--c-border)',borderRadius:99,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:99,transition:'width 1s linear',
              background:timeLeft<=10?'#ef4444':timeLeft<=20?'#f59e0b':'#10b981',
              width:`${timePct}%`}} />
          </div>
          <span style={{fontSize:'.78rem',fontWeight:800,
            color:timeLeft<=10?'#ef4444':timeLeft<=20?'#f59e0b':'var(--c-text-muted)',
            minWidth:'2.5rem',textAlign:'right'}}>{timeLeft}s</span>
        </div>

        {/* Question card */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'2rem',
          border:'1px solid var(--c-border)',marginBottom:'1.25rem',textAlign:'center',
          boxShadow:'0 4px 24px #0002'}}>
          <p style={{color:'var(--c-text-muted)',marginBottom:'.75rem',fontSize:'.85rem'}}>{q?.question}</p>
          <div style={{fontSize:'4.5rem',fontWeight:900,lineHeight:1,marginBottom:'.5rem',
            fontFamily:'"Noto Serif CJK SC",serif',
            background:`linear-gradient(135deg,${lc},#ec4899)`,
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            {q?.hanzi}
          </div>
          <div style={{fontSize:'1rem',color:'#6366f1',fontStyle:'italic',fontWeight:600}}>
            {q?.pinyin}
          </div>
        </div>

        {/* Choices */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.65rem'}}>
          {q?.choices.map((c, i) => {
            const isSelected = selected === c.id;
            const revealed = selected !== null;
            let bg='var(--c-surface)', border='var(--c-border)', color='var(--c-text)';
            if (revealed) {
              if (c.correct) { bg='#10b98115'; border='#10b981'; color='#10b981'; }
              else if (isSelected) { bg='#ef444415'; border='#ef4444'; color='#ef4444'; }
            }
            return (
              <button key={c.id} onClick={() => handleAnswer(c)} disabled={selected !== null}
                id={`exam-choice-${i}`}
                style={{padding:'.9rem 1rem',borderRadius:12,border:`2px solid ${border}`,
                  background:bg,color,fontWeight:600,cursor:selected?'default':'pointer',
                  fontSize:'.88rem',textAlign:'left',transition:'all .2s',lineHeight:1.4}}
                onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = lc; }}
                onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)'; }}>
                <span style={{opacity:.5,marginRight:'.4rem',fontSize:'.75rem'}}>{['A','B','C','D'][i]}</span>
                {c.text}
              </button>
            );
          })}
        </div>

        {/* Skip button */}
        {selected === null && (
          <button onClick={() => handleAnswer(null)}
            style={{width:'100%',marginTop:'.75rem',padding:'.6rem',borderRadius:10,
              border:'1px solid var(--c-border)',background:'transparent',
              color:'var(--c-text-muted)',fontSize:'.8rem',cursor:'pointer'}}>
            ⏭️ Bỏ qua câu này
          </button>
        )}
      </div>
    </div>
  );
}
