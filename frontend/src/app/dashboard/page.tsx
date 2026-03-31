'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LC: Record<string,string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const DAYS = ['CN','T2','T3','T4','T5','T6','T7'];
const MONTHS = ['1','2','3','4','5','6','7','8','9','10','11','12'];

interface HeatCell { date:string; count:number; }
interface HskStat { hsk_level:string; total_words:number; learned_words:number; mastered_words:number; }
interface WeekDay { date:string; quizzes:number; avg_score:number; }

function HeatMap({ data }: { data: HeatCell[] }) {
  const map = new Map(data.map(d => [String(d.date).split('T')[0], d.count]));
  const cells: { date:string; count:number; }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    cells.push({ date: key, count: map.get(key) || 0 });
  }
  // Group into weeks
  const weeks: { date:string; count:number; }[][] = [];
  let week: { date:string; count:number; }[] = [];
  cells.forEach((c, i) => {
    week.push(c);
    if (week.length === 7 || i === cells.length - 1) { weeks.push(week); week = []; }
  });

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const getColor = (count: number) => {
    if (count === 0) return 'var(--c-border)';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return '#06b6d440';
    if (intensity < 0.5) return '#06b6d470';
    if (intensity < 0.75) return '#06b6d4b0';
    return '#06b6d4';
  };

  return (
    <div style={{overflowX:'auto',paddingBottom:'.5rem'}}>
      <div style={{display:'flex',gap:2,minWidth:'fit-content'}}>
        {weeks.map((wk, wi) => (
          <div key={wi} style={{display:'flex',flexDirection:'column',gap:2}}>
            {wk.map((c, di) => (
              <div key={di} title={`${c.date}: ${c.count} quiz`}
                style={{width:10,height:10,borderRadius:2,background:getColor(c.count),cursor:'default',transition:'background .2s'}}/>
            ))}
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:'.3rem',alignItems:'center',marginTop:'.5rem',fontSize:'.68rem',color:'var(--c-text-muted)'}}>
        <span>Ít</span>
        {[0,0.25,0.5,0.75,1].map((v,i) => (
          <div key={i} style={{width:10,height:10,borderRadius:2,
            background:v===0?'var(--c-border)':v<0.25?'#06b6d440':v<0.5?'#06b6d470':v<0.75?'#06b6d4b0':'#06b6d4'}}/>
        ))}
        <span>Nhiều</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [basicStats, setBasicStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user,loading,router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([api.getStreakStats(), api.getStats()])
      .then(([streak, basic]) => { setStats(streak.data); setBasicStats(basic.data); })
      .catch(e => console.error(e))
      .finally(() => setLoadingStats(false));
  }, [user]);

  if (loading || loadingStats) return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',color:'var(--c-text-muted)'}}>
        <div style={{fontSize:'2rem',marginBottom:'.5rem',animation:'spin 1s linear infinite'}}>⏳</div>
        Đang tải thống kê...
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  const hskStats: HskStat[] = stats?.hsk_stats || [];
  const weekActivity: WeekDay[] = stats?.week_activity || [];
  const heatmap: HeatCell[] = stats?.activity_heatmap || [];
  const streak = stats?.streak || 0;
  const totalWords = stats?.words_learned || 0;
  const mastered = stats?.words_mastered || 0;
  const quizTotal = stats?.quiz_total || 0;
  const avgScore = stats?.quiz_avg_score || 0;
  const bestScore = stats?.quiz_best_score || 0;

  // Build week chart
  const today = new Date();
  const weekDays = Array.from({length:7}, (_,i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6-i));
    const key = d.toISOString().split('T')[0];
    const found = weekActivity.find(w => String(w.date).split('T')[0] === key);
    return { label: DAYS[d.getDay()], date:key, quizzes: found?.quizzes||0, avg: found?.avg_score||0, isToday:i===6 };
  });
  const maxQuizzes = Math.max(...weekDays.map(d => d.quizzes), 1);

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        {/* Header */}
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontSize:'2rem',fontWeight:900,marginBottom:'.3rem',
            background:'linear-gradient(135deg,#06b6d4,#8b5cf6)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            📊 Tiến Độ Học Tập
          </h1>
          <p style={{color:'var(--c-text-muted)'}}>Xin chào, <strong style={{color:'var(--c-text)'}}>{user?.username}</strong>! Đây là thống kê chi tiết của bạn.</p>
        </div>

        {/* Big Stats Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
          {[
            { icon:'🔥', label:'Streak', value: streak, unit:'ngày', color:'#f59e0b', sub: streak>0?'Liên tục!':'Hôm nay chưa học' },
            { icon:'📚', label:'Đã học', value: totalWords, unit:'từ', color:'#06b6d4', sub:`${mastered} thàh thạo` },
            { icon:'🎯', label:'Quiz đã làm', value: quizTotal, unit:'lần', color:'#8b5cf6', sub:`TB ${avgScore}%` },
            { icon:'🏆', label:'Điểm tốt nhất', value: bestScore, unit:'%', color:'#10b981', sub:'Kỷ lục của bạn' },
          ].map(s => (
            <div key={s.label} style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',
              border:`1px solid ${s.color}30`,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,right:0,width:80,height:80,borderRadius:'50%',
                background:s.color+'10',transform:'translate(20px,-20px)'}}/>
              <div style={{fontSize:'1.8rem',marginBottom:'.4rem'}}>{s.icon}</div>
              <div style={{fontSize:'.75rem',color:'var(--c-text-muted)',fontWeight:600,marginBottom:'.2rem'}}>{s.label}</div>
              <div style={{fontSize:'2rem',fontWeight:900,color:s.color}}>
                {s.value}<span style={{fontSize:'.9rem',fontWeight:600,color:'var(--c-text-muted)',marginLeft:'.2rem'}}>{s.unit}</span>
              </div>
              <div style={{fontSize:'.7rem',color:'var(--c-text-muted)',marginTop:'.2rem'}}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
          {/* Week Activity Chart */}
          <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',border:'1px solid var(--c-border)'}}>
            <h3 style={{fontWeight:800,marginBottom:'1.25rem',color:'var(--c-text)',fontSize:'.95rem'}}>📅 Hoạt động 7 ngày qua</h3>
            <div style={{display:'flex',gap:'.4rem',alignItems:'flex-end',height:100}}>
              {weekDays.map((d, i) => (
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'.3rem'}}>
                  <div style={{fontSize:'.6rem',color:'var(--c-text-muted)',fontWeight:600,height:14,
                    display:'flex',alignItems:'center'}}>{d.quizzes>0?d.quizzes:''}</div>
                  <div style={{width:'100%',borderRadius:'4px 4px 0 0',minHeight:4,
                    background:d.quizzes>0?(d.isToday?'linear-gradient(180deg,#06b6d4,#8b5cf6)':'#06b6d460'):'var(--c-border)',
                    height:`${Math.max((d.quizzes/maxQuizzes)*80,4)}px`,
                    transition:'height .4s'}}/>
                  <div style={{fontSize:'.65rem',color:d.isToday?'#06b6d4':'var(--c-text-muted)',fontWeight:d.isToday?800:500}}>{d.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HSK Progress */}
          <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',border:'1px solid var(--c-border)'}}>
            <h3 style={{fontWeight:800,marginBottom:'1.25rem',color:'var(--c-text)',fontSize:'.95rem'}}>🎓 Tiến độ từng cấp HSK</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'.85rem'}}>
              {hskStats.map(h => {
                const pct = h.total_words ? Math.round((h.learned_words/h.total_words)*100) : 0;
                const mastPct = h.total_words ? Math.round((h.mastered_words/h.total_words)*100) : 0;
                const c = LC[h.hsk_level] || '#6366f1';
                return (
                  <div key={h.hsk_level}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.3rem'}}>
                      <span style={{fontSize:'.8rem',fontWeight:800,color:c}}>{h.hsk_level}</span>
                      <span style={{fontSize:'.72rem',color:'var(--c-text-muted)'}}>
                        {h.learned_words}/{h.total_words} từ · {pct}%
                      </span>
                    </div>
                    <div style={{height:8,background:'var(--c-border)',borderRadius:99,overflow:'hidden',position:'relative'}}>
                      <div style={{position:'absolute',height:'100%',borderRadius:99,
                        background:c,width:`${pct}%`,transition:'width .8s ease'}}/>
                      <div style={{position:'absolute',height:'100%',borderRadius:99,
                        background:'#fff5',width:`${mastPct}%`,transition:'width .8s ease'}}/>
                    </div>
                    <div style={{fontSize:'.65rem',color:'var(--c-text-muted)',marginTop:'.2rem'}}>
                      {h.mastered_words} thành thạo
                    </div>
                  </div>
                );
              })}
              {hskStats.length === 0 && (
                <div style={{textAlign:'center',color:'var(--c-text-muted)',fontSize:'.85rem',padding:'1rem'}}>
                  Chưa có dữ liệu — hãy làm quiz để bắt đầu!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <h3 style={{fontWeight:800,color:'var(--c-text)',fontSize:'.95rem',margin:0}}>🗓️ Hoạt động 365 ngày qua</h3>
            <span style={{fontSize:'.75rem',color:'var(--c-text-muted)'}}>{heatmap.length} ngày có hoạt động</span>
          </div>
          {heatmap.length > 0 ? <HeatMap data={heatmap}/> : (
            <div style={{textAlign:'center',padding:'2rem',color:'var(--c-text-muted)',fontSize:'.85rem'}}>
              🌱 Chưa có dữ liệu học tập — hãy làm quiz đầu tiên!
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',border:'1px solid var(--c-border)'}}>
          <h3 style={{fontWeight:800,marginBottom:'1rem',color:'var(--c-text)',fontSize:'.95rem'}}>⚡ Luyện tập ngay</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'.75rem'}}>
            {[
              { label:'📝 Quiz', href:'/quiz', color:'#6366f1' },
              { label:'🎧 Quiz Nghe', href:'/listening', color:'#06b6d4' },
              { label:'📇 Flashcard', href:'/flashcard', color:'#8b5cf6' },
              { label:'✍️ Tập viết', href:'/writing', color:'#f59e0b' },
              { label:'🎵 Thanh điệu', href:'/tones', color:'#ef4444' },
            ].map(a => (
              <a key={a.href} href={a.href}
                style={{padding:'.85rem',borderRadius:12,border:`1.5px solid ${a.color}40`,
                  background:`${a.color}10`,color:a.color,fontWeight:700,cursor:'pointer',
                  textAlign:'center',textDecoration:'none',fontSize:'.85rem',
                  display:'block',transition:'all .2s'}}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
