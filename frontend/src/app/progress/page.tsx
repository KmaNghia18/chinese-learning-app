'use client';
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LC: Record<string, string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6', HSK5:'#ef4444', HSK6:'#ec4899' };
const TOTAL: Record<string, number> = { HSK1:150, HSK2:300, HSK3:600, HSK4:1200, HSK5:2500, HSK6:5000 };

export default function ProgressPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [dailyGoal] = useState(10); // mục tiêu 10 từ/ngày

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => {
    if (user) {
      api.getStats().then(r => setStats(r.data)).catch(() => {});
      api.getStreakStats().then(r => setStreak(r.data)).catch(() => {});
      api.getQuizHistory().then(r => setHistory(r.data || [])).catch(() => {});
    }
  }, [user]);

  if (loading || !stats) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--c-bg)'}}>
      <div style={{textAlign:'center',color:'var(--c-text-muted)'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>⏳</div>Đang tải...
      </div>
    </div>
  );

  const todayLearned = streak?.week_activity?.find((a: any) => {
    const d = new Date(a.date); const today = new Date();
    return d.toDateString() === today.toDateString();
  })?.quizzes || 0;
  const dailyPct = Math.min(100, Math.round((todayLearned / dailyGoal) * 100));
  const streakCount = streak?.streak || 0;

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'3rem',marginBottom:'.3rem'}}>📊</div>
          <h1 style={{fontSize:'2rem',fontWeight:900,background:'linear-gradient(135deg,#6366f1,#ec4899)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'.3rem'}}>
            Tiến độ học tập
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Theo dõi quá trình học của bạn</p>
        </div>

        {/* Streak + Daily Goal */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1.5rem'}}>
          {/* Streak */}
          <div style={{background:'linear-gradient(135deg,#f59e0b15,#f97316  15)',border:'2px solid #f59e0b40',
            borderRadius:20,padding:'1.5rem',textAlign:'center'}}>
            <div style={{fontSize:'3.5rem',lineHeight:1,marginBottom:'.25rem'}}>🔥</div>
            <div style={{fontSize:'3rem',fontWeight:900,color:'#f59e0b'}}>{streakCount}</div>
            <div style={{color:'var(--c-text-muted)',fontSize:'.85rem',fontWeight:600}}>Ngày liên tiếp</div>
            <div style={{marginTop:'.75rem',fontSize:'.75rem',color:'var(--c-text-muted)'}}>
              {streakCount === 0 ? '⚠️ Học hôm nay để bắt đầu streak!' :
               streakCount >= 7 ? '🏆 Tuyệt vời! Duy trì nhé!' : '💪 Tiếp tục cố gắng!'}
            </div>
          </div>

          {/* Daily Goal */}
          <div style={{background:'linear-gradient(135deg,#6366f115,#ec4899  15)',border:'2px solid #6366f130',
            borderRadius:20,padding:'1.5rem',textAlign:'center'}}>
            <div style={{fontSize:'3.5rem',lineHeight:1,marginBottom:'.25rem'}}>🎯</div>
            <div style={{fontSize:'3rem',fontWeight:900,
              color: dailyPct >= 100 ? '#10b981' : '#6366f1'}}>{dailyPct}%</div>
            <div style={{color:'var(--c-text-muted)',fontSize:'.85rem',fontWeight:600}}>Mục tiêu hôm nay</div>
            <div style={{marginTop:'.75rem',height:8,background:'var(--c-border)',borderRadius:99,overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:99,
                background: dailyPct >= 100 ? '#10b981' : 'linear-gradient(90deg,#6366f1,#ec4899)',
                width:`${dailyPct}%`,transition:'width .5s'}} />
            </div>
            <div style={{marginTop:'.4rem',fontSize:'.72rem',color:'var(--c-text-muted)'}}>
              {dailyPct >= 100 ? '✅ Hoàn thành hôm nay!' : `${todayLearned}/${dailyGoal} phiên luyện tập`}
            </div>
          </div>
        </div>

        {/* Stats 4 ô */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.75rem',marginBottom:'1.5rem'}}>
          {[
            { icon:'🏆', v: stats.mastered, l:'Từ đã thuộc', c:'#10b981' },
            { icon:'📖', v: stats.learning, l:'Đang học', c:'#3b82f6' },
            { icon:'✅', v: stats.lessons_completed, l:'Bài hoàn thành', c:'#f59e0b' },
            { icon:'🔔', v: stats.due_today, l:'Cần ôn hôm nay', c:'#8b5cf6' },
          ].map(s => (
            <div key={s.l} style={{background:'var(--c-surface)',borderRadius:16,padding:'1rem',
              border:'1px solid var(--c-border)',textAlign:'center'}}>
              <div style={{fontSize:'1.75rem',marginBottom:'.25rem'}}>{s.icon}</div>
              <div style={{fontSize:'1.8rem',fontWeight:900,color:s.c}}>{s.v}</div>
              <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* HSK Progress Bars */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',
          border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
          <h3 style={{fontWeight:800,marginBottom:'1.25rem',color:'var(--c-text)',fontSize:'1rem'}}>
            📈 Tiến độ từng cấp HSK
          </h3>
          {(streak?.hsk_stats || []).filter((h: any) => ['HSK1','HSK2','HSK3','HSK4'].includes(h.hsk_level)).map((h: any) => {
            const color = LC[h.hsk_level] || '#6366f1';
            const total = TOTAL[h.hsk_level] || h.total_words;
            const learnedPct = Math.min(100, Math.round((h.learned_words / total) * 100));
            const masteredPct = Math.min(100, Math.round((h.mastered_words / total) * 100));
            return (
              <div key={h.hsk_level} style={{marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'.4rem'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                    <span style={{background:color+'20',color,padding:'.2rem .6rem',borderRadius:6,
                      fontSize:'.75rem',fontWeight:800}}>{h.hsk_level}</span>
                    <span style={{fontSize:'.82rem',color:'var(--c-text-muted)'}}>
                      {h.learned_words} / {total} từ
                    </span>
                  </div>
                  <div style={{display:'flex',gap:'.75rem',fontSize:'.72rem',color:'var(--c-text-muted)'}}>
                    <span>📖 Đã học: {learnedPct}%</span>
                    <span style={{color:'#10b981'}}>🏆 Thuộc: {masteredPct}%</span>
                  </div>
                </div>
                {/* Track bar */}
                <div style={{height:10,background:'var(--c-border)',borderRadius:99,overflow:'hidden',position:'relative'}}>
                  <div style={{position:'absolute',height:'100%',borderRadius:99,
                    background:color+'40',width:`${learnedPct}%`,transition:'width .5s'}} />
                  <div style={{position:'absolute',height:'100%',borderRadius:99,
                    background:color,width:`${masteredPct}%`,transition:'width .5s'}} />
                </div>
              </div>
            );
          })}
          <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',marginTop:'.5rem',display:'flex',gap:'1rem'}}>
            <span>⬜ Chưa học</span>
            <span style={{color:'#6366f150'}}>▬ Đang học</span>
            <span style={{color:'#10b981'}}>▬ Đã thuộc</span>
          </div>
        </div>

        {/* Heatmap hoạt động 7 ngày */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',
          border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',color:'var(--c-text)',fontSize:'1rem'}}>
            📅 Hoạt động 7 ngày qua
          </h3>
          <div style={{display:'flex',gap:'.5rem',alignItems:'flex-end',height:80}}>
            {Array.from({length:7}).map((_,i) => {
              const d = new Date(); d.setDate(d.getDate() - (6 - i));
              const dateStr = d.toISOString().split('T')[0];
              const act = streak?.week_activity?.find((a: any) => String(a.date).split('T')[0] === dateStr);
              const h = act ? Math.min(act.quizzes * 14, 72) : 0;
              const isToday = i === 6;
              return (
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{width:'100%',borderRadius:6,
                    background: h > 0 ?'linear-gradient(180deg,#6366f1,#ec4899)':'var(--c-border)',
                    height:`${Math.max(h, 4)}px`,
                    opacity: isToday ? 1 : 0.8, transition:'height .3s'}} />
                  <div style={{fontSize:'.65rem',color:isToday?'#6366f1':'var(--c-text-muted)',fontWeight:isToday?700:400}}>
                    {isToday ? 'Hôm nay' : d.toLocaleDateString('vi',{weekday:'short'})}
                  </div>
                  {act && <div style={{fontSize:'.6rem',color:'var(--c-text-muted)'}}>{act.quizzes}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz stats */}
        {streak && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem',marginBottom:'1.5rem'}}>
            {[
              { icon:'🎯', v: streak.quiz_total, l:'Bài quiz đã làm' },
              { icon:'⭐', v: `${streak.quiz_avg_score}%`, l:'Điểm trung bình' },
              { icon:'💎', v: `${streak.quiz_best_score}%`, l:'Điểm cao nhất' },
            ].map(s => (
              <div key={s.l} style={{background:'var(--c-surface)',borderRadius:16,padding:'1rem',
                border:'1px solid var(--c-border)',textAlign:'center'}}>
                <div style={{fontSize:'1.5rem',marginBottom:'.2rem'}}>{s.icon}</div>
                <div style={{fontSize:'1.6rem',fontWeight:900,color:'var(--c-text)'}}>{s.v}</div>
                <div style={{fontSize:'.72rem',color:'var(--c-text-muted)'}}>{s.l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Nút luyện tập nhanh */}
        <div style={{background:'linear-gradient(135deg,#6366f1,#ec4899)',borderRadius:20,
          padding:'1.5rem',textAlign:'center',marginBottom:'1.5rem'}}>
          <div style={{color:'#fff',fontWeight:900,fontSize:'1.1rem',marginBottom:'.75rem'}}>
            🚀 Nhanh, học thôi!
          </div>
          <div style={{display:'flex',gap:'.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            {[
              { href:'/quiz', label:'🧠 Quiz' },
              { href:'/flashcard', label:'📇 Flashcard' },
              { href:'/writing', label:'✍️ Tập viết' },
              { href:'/sentence', label:'🧩 Ghép câu' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                style={{background:'rgba(255,255,255,.2)',color:'#fff',border:'1px solid rgba(255,255,255,.4)',
                  borderRadius:10,padding:'.5rem 1rem',fontWeight:700,fontSize:'.85rem',
                  textDecoration:'none',backdropFilter:'blur(8px)'}}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Lịch sử quiz */}
        {history.length > 0 && (
          <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',
            border:'1px solid var(--c-border)'}}>
            <h3 style={{fontWeight:800,marginBottom:'1rem',fontSize:'1rem'}}>📋 Lịch sử kiểm tra</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {history.slice(0,8).map((h: any) => (
                <div key={h.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',
                  padding:'.65rem 1rem',background:'var(--c-bg)',borderRadius:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                    <span style={{background:LC[h.hsk_level]+'20',color:LC[h.hsk_level]||'#6366f1',
                      padding:'.18rem .55rem',borderRadius:6,fontSize:'.72rem',fontWeight:800}}>{h.hsk_level}</span>
                    <span style={{fontSize:'.82rem',color:'var(--c-text-muted)'}}>
                      {h.correct_answers}/{h.total_questions} câu đúng
                    </span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
                    <span style={{fontWeight:800,fontSize:'1rem',
                      color:h.score>=80?'#10b981':h.score>=60?'#f59e0b':'#ef4444'}}>{h.score}%</span>
                    <span style={{fontSize:'.72rem',color:'var(--c-text-muted)'}}>
                      {new Date(h.completed_at).toLocaleDateString('vi')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
