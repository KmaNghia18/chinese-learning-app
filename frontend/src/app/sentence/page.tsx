'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string, string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const DISTRACTORS: Record<string, string[]> = {
  HSK1: ['我','你','他','好','是','不','的','了','在','有','吗','呢','啊','嗯'],
  HSK2: ['因为','所以','但是','可以','非常','一起','知道','觉得','时候','地方'],
  HSK3: ['虽然','已经','还是','应该','准备','认为','情况','问题','经常','希望'],
  HSK4: ['尽管','况且','建议','理解','承认','整体','效果','政策','技术','环境'],
};

interface Sentence {
  id: number;
  content_zh: string;
  meaning_vi: string;
  speaker: string;
  title: string;
  hsk_level: string;
}

interface Tile { char: string; id: string; isDistractor?: boolean; }

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTiles(contentZh: string, level: string): Tile[] {
  // Tách thành các token (ký tự Hán, bỏ dấu câu)
  const chars = contentZh.split('').filter(c => /[\u4e00-\u9fff\u3400-\u4dbf]/.test(c));
  const sourceTiles: Tile[] = chars.map((c, i) => ({ char: c, id: `src-${i}-${c}` }));

  // Thêm 2-4 distractors
  const pool = DISTRACTORS[level] || DISTRACTORS.HSK1;
  const distractors = shuffleArray(pool.filter(d => !chars.includes(d))).slice(0, Math.min(4, chars.length));
  const distTiles: Tile[] = distractors.flatMap((d, i) =>
    d.split('').map((c, j) => ({ char: c, id: `dis-${i}-${j}-${c}`, isDistractor: true }))
  );

  return shuffleArray([...sourceTiles, ...distTiles]);
}

function checkAnswer(selected: Tile[], contentZh: string): boolean {
  const answer = selected.map(t => t.char).join('');
  const correct = contentZh.replace(/[^\u4e00-\u9fff\u3400-\u4dbf]/g, '');
  return answer === correct;
}

export default function SentencePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [phase, setPhase] = useState<'setup' | 'practice' | 'result'>('setup');
  const [level, setLevel] = useState('HSK1');
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [idx, setIdx] = useState(0);
  const [loadingS, setLoadingS] = useState(false);

  // Tile state
  const [available, setAvailable] = useState<Tile[]>([]);
  const [selected, setSelected] = useState<Tile[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  const loadSentences = async () => {
    setLoadingS(true);
    try {
      const r = await api.request(`/dialogues/practice/sentences?hsk_level=${level}&count=12`);
      const data = r.data || [];
      if (data.length === 0) { alert('Không có câu nào cho cấp độ này!'); return; }
      setSentences(data);
      setIdx(0);
      setScore(0);
      setAttempts(0);
      startSentence(data[0], level);
      setPhase('practice');
    } catch(e) { console.error(e); }
    setLoadingS(false);
  };

  const startSentence = (s: Sentence, lv: string) => {
    const tiles = buildTiles(s.content_zh, lv);
    setAvailable(tiles);
    setSelected([]);
    setStatus('idle');
  };

  const pickTile = (tile: Tile) => {
    if (status !== 'idle') return;
    setAvailable(prev => prev.filter(t => t.id !== tile.id));
    setSelected(prev => [...prev, tile]);
  };

  const removeTile = (tile: Tile) => {
    if (status !== 'idle') return;
    setSelected(prev => prev.filter(t => t.id !== tile.id));
    setAvailable(prev => [...prev, tile]);
  };

  const checkNow = () => {
    if (!selected.length) return;
    const sentence = sentences[idx];
    const isCorrect = checkAnswer(selected, sentence.content_zh);
    setStatus(isCorrect ? 'correct' : 'wrong');
    setAttempts(a => a + 1);
    if (isCorrect) setScore(s => s + 1);
  };

  const next = () => {
    const nextIdx = idx + 1;
    if (nextIdx >= sentences.length) {
      setPhase('result');
    } else {
      setIdx(nextIdx);
      startSentence(sentences[nextIdx], level);
    }
  };

  const showAnswer = () => {
    const sentence = sentences[idx];
    const correctChars = sentence.content_zh.replace(/[^\u4e00-\u9fff\u3400-\u4dbf]/g, '').split('');
    const correctTiles: Tile[] = correctChars.map((c, i) => ({ char: c, id: `ans-${i}` }));
    setSelected(correctTiles);
    setAvailable([]);
    setStatus('wrong'); // show wrong color but revealed
  };

  if (loading) return <div style={{textAlign:'center',padding:'4rem',color:'var(--c-text-muted)'}}>Đang tải...</div>;

  const lc = LC[level] || '#6366f1';

  // ══ SETUP ══
  if (phase === 'setup') return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{maxWidth:500,width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'3.5rem',marginBottom:'.5rem'}}>🧩</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#6366f1,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Ghép Câu
          </h1>
          <p style={{color:'var(--c-text-muted)',fontSize:'.9rem'}}>Đọc nghĩa tiếng Việt → chọn từng chữ Hán theo đúng thứ tự</p>
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

        <div style={{background:'#6366f110',border:'1px solid #6366f130',borderRadius:12,padding:'1rem',marginBottom:'1.5rem',
          fontSize:'.82rem',color:'var(--c-text-muted)',lineHeight:1.8}}>
          🇻🇳 Thấy nghĩa tiếng Việt của câu<br/>
          🀄 Nhấn từng chữ Hán theo đúng thứ tự<br/>
          ✅ Nhấn Kiểm tra khi hoàn thành
        </div>

        <button onClick={loadSentences} disabled={loadingS}
          style={{width:'100%',padding:'1rem',borderRadius:14,border:'none',
            background:'linear-gradient(135deg,#6366f1,#ec4899)',
            color:'#fff',fontWeight:900,fontSize:'1.1rem',cursor:'pointer',
            opacity:loadingS?.6:1,boxShadow:'0 4px 20px #6366f140',transition:'all .2s'}}>
          {loadingS?'⏳ Đang tải...':'🧩 Bắt đầu ghép câu →'}
        </button>
      </div>
    </div>
  );

  // ══ RESULT ══
  if (phase === 'result') {
    const pct = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    return (
      <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
        <div style={{maxWidth:480,width:'100%',textAlign:'center'}}>
          <div style={{fontSize:'5rem',marginBottom:'.5rem'}}>{pct>=80?'🎉':pct>=60?'👍':'💪'}</div>
          <h2 style={{fontSize:'1.8rem',fontWeight:900,marginBottom:'.3rem',color:'var(--c-text)'}}>Kết quả</h2>
          <div style={{fontSize:'4rem',fontWeight:900,marginBottom:'1rem',
            background:pct>=80?'linear-gradient(135deg,#10b981,#06b6d4)':pct>=60?'linear-gradient(135deg,#f59e0b,#f97316)':'linear-gradient(135deg,#ef4444,#ec4899)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{pct}%</div>
          <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.5rem',border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div><div style={{fontSize:'2rem',fontWeight:900,color:'#10b981'}}>{score}</div><div style={{fontSize:'.8rem',color:'var(--c-text-muted)'}}>Đúng</div></div>
              <div><div style={{fontSize:'2rem',fontWeight:900,color:'#ef4444'}}>{attempts-score}</div><div style={{fontSize:'.8rem',color:'var(--c-text-muted)'}}>Sai</div></div>
            </div>
          </div>
          <div style={{display:'flex',gap:'.75rem'}}>
            <button onClick={() => setPhase('setup')}
              style={{flex:1,padding:'.85rem',borderRadius:12,border:'1px solid var(--c-border)',
                background:'var(--c-surface)',color:'var(--c-text)',fontWeight:700,cursor:'pointer'}}>← Chọn lại</button>
            <button onClick={loadSentences}
              style={{flex:1,padding:'.85rem',borderRadius:12,border:'none',
                background:'linear-gradient(135deg,#6366f1,#ec4899)',
                color:'#fff',fontWeight:900,cursor:'pointer'}}>🔄 Làm lại</button>
          </div>
        </div>
      </div>
    );
  }

  // ══ PRACTICE ══
  const sentence = sentences[idx];

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'1.5rem'}}>
      <div style={{maxWidth:640,margin:'0 auto'}}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <button onClick={() => setPhase('setup')}
            style={{background:'var(--c-surface)',border:'1px solid var(--c-border)',borderRadius:8,
              padding:'.4rem .9rem',cursor:'pointer',color:'var(--c-text-muted)',fontSize:'.82rem'}}>← Quay lại</button>
          <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
            <span style={{background:lc+'20',color:lc,padding:'.25rem .7rem',borderRadius:6,fontSize:'.75rem',fontWeight:800}}>{level}</span>
            <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>{idx+1}/{sentences.length}</span>
            <span style={{color:'#10b981',fontSize:'.85rem',fontWeight:700}}>✓ {score}</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{height:4,background:'var(--c-border)',borderRadius:99,marginBottom:'1.5rem',overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:'linear-gradient(90deg,#6366f1,#ec4899)',
            width:`${(idx/sentences.length)*100}%`,transition:'width .4s'}}/>
        </div>

        {/* Meaning card */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem 2rem',
          border:'2px solid var(--c-border)',marginBottom:'1.5rem',textAlign:'center'}}>
          <div style={{fontSize:'.75rem',color:'var(--c-text-muted)',marginBottom:'.5rem',fontWeight:600}}>🇻🇳 NGHĨA TIẾNG VIỆT</div>
          <div style={{fontSize:'1.35rem',fontWeight:800,color:'var(--c-text)',lineHeight:1.4}}>
            {sentence.meaning_vi}
          </div>
          {sentence.title && (
            <div style={{marginTop:'.6rem',fontSize:'.72rem',color:'var(--c-text-muted)'}}>
              📖 {sentence.title}
              {sentence.speaker && <span> · {sentence.speaker}</span>}
            </div>
          )}
        </div>

        {/* Answer area */}
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',
          minHeight:72,marginBottom:'1rem',border:`2px solid ${
            status==='correct'?'#10b981':status==='wrong'?'#ef4444':'var(--c-border)'}`,
          transition:'border-color .3s'}}>
          <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',marginBottom:'.6rem',fontWeight:600}}>
            🀄 CÂU CỦA BẠN {status==='correct'?'✅':status==='wrong'?'❌':''}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',minHeight:44,alignItems:'center'}}>
            {selected.length === 0 && status === 'idle' && (
              <span style={{color:'var(--c-text-muted)',fontSize:'.85rem',fontStyle:'italic'}}>Nhấn ô chữ bên dưới để ghép câu...</span>
            )}
            {selected.map(tile => (
              <button key={tile.id} onClick={() => removeTile(tile)}
                disabled={status !== 'idle'}
                style={{
                  padding:'.4rem .75rem',borderRadius:10,cursor:status==='idle'?'pointer':'default',
                  background:status==='correct'?'#10b98120':status==='wrong'?'#ef444420':'var(--c-bg)',
                  color:status==='correct'?'#10b981':status==='wrong'?'#ef4444':lc,
                  fontWeight:900,fontSize:'1.4rem',fontFamily:'"Noto Serif CJK SC",serif',
                  border:`2px solid ${status==='correct'?'#10b98140':status==='wrong'?'#ef444440':lc+'50'}`,
                  transition:'all .15s',
                }}>
                {tile.char}
              </button>
            ))}
          </div>

          {/* Show correct answer when wrong */}
          {status === 'wrong' && (
            <div style={{marginTop:'.75rem',padding:'.5rem .75rem',background:'#10b98110',borderRadius:8,
              fontSize:'.85rem',color:'#10b981',fontWeight:600}}>
              ✅ Đáp án đúng: <span style={{fontSize:'1.1rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif'}}>
                {sentence.content_zh}
              </span>
            </div>
          )}
        </div>

        {/* Available tiles */}
        <div style={{background:'var(--c-bg)',borderRadius:16,padding:'1rem',marginBottom:'1.25rem',
          border:'1px solid var(--c-border)'}}>
          <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',marginBottom:'.6rem',fontWeight:600}}>🀄 CÁC CHỮ HÁN</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',justifyContent:'center'}}>
            {available.map(tile => (
              <button key={tile.id} onClick={() => pickTile(tile)}
                disabled={status !== 'idle'}
                style={{
                  padding:'.5rem .85rem',borderRadius:12,
                  border:`2px solid ${tile.isDistractor?'var(--c-border)':lc+'60'}`,
                  background:tile.isDistractor?'var(--c-surface)':lc+'10',
                  color:tile.isDistractor?'var(--c-text-muted)':lc,
                  fontWeight:900,fontSize:'1.5rem',fontFamily:'"Noto Serif CJK SC",serif',
                  cursor:'pointer',transition:'all .15s',
                  opacity:status!=='idle'?.5:1,
                }}>
                {tile.char}
              </button>
            ))}
            {available.length === 0 && status === 'idle' && (
              <span style={{color:'var(--c-text-muted)',fontSize:'.85rem'}}>Đã dùng hết ô chữ</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{display:'flex',gap:'.75rem'}}>
          {status === 'idle' ? (
            <>
              <button onClick={showAnswer}
                style={{flex:1,padding:'.75rem',borderRadius:12,border:'1px solid var(--c-border)',
                  background:'var(--c-surface)',color:'var(--c-text-muted)',fontWeight:700,cursor:'pointer',fontSize:'.9rem'}}>
                💡 Xem đáp án
              </button>
              <button onClick={checkNow} disabled={!selected.length}
                style={{flex:2,padding:'.75rem',borderRadius:12,border:'none',
                  background:selected.length?'linear-gradient(135deg,#6366f1,#ec4899)':'var(--c-border)',
                  color:'#fff',fontWeight:900,fontSize:'1rem',cursor:selected.length?'pointer':'not-allowed',
                  opacity:selected.length?1:.5,transition:'all .2s'}}>
                ✓ Kiểm tra
              </button>
            </>
          ) : (
            <button onClick={next}
              style={{width:'100%',padding:'.85rem',borderRadius:12,border:'none',
                background:idx+1>=sentences.length?'linear-gradient(135deg,#10b981,#3b82f6)':'linear-gradient(135deg,#6366f1,#ec4899)',
                color:'#fff',fontWeight:900,fontSize:'1rem',cursor:'pointer'}}>
              {idx+1>=sentences.length?'✅ Xem kết quả':'→ Câu tiếp theo'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
