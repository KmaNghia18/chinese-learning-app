'use client';
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => {
    if (user) {
      api.getStats().then(r => setStats(r.data)).catch(() => {});
      api.getQuizHistory().then(r => setHistory(r.data || [])).catch(() => {});
    }
  }, [user]);

  if (loading || !stats) return <div className="spinner" />;

  const totalLearned = (stats.mastered || 0) + (stats.learning || 0);
  const masteredPct = totalLearned > 0 ? Math.round((stats.mastered / totalLearned) * 100) : 0;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">📊 Tiến độ học tập</h1>
        <p className="page-subtitle">Theo dõi quá trình học của bạn</p>
      </div>

      <div className="grid-4" style={{marginBottom:32}}>
        {([
          { icon:"🏆", bg:"var(--c-gold-soft)", c:"var(--c-gold)", v: stats.mastered, l:"Từ đã thuộc" },
          { icon:"📖", bg:"var(--c-blue-soft)", c:"var(--c-blue)", v: stats.learning, l:"Đang học" },
          { icon:"✅", bg:"var(--c-green-soft)", c:"var(--c-green)", v: stats.lessons_completed, l:"Bài hoàn thành" },
          { icon:"🔔", bg:"var(--c-primary-soft)", c:"var(--c-primary)", v: stats.due_today, l:"Cần ôn hôm nay" },
        ] as const).map(s => (
          <div className="stat-card" key={s.l}>
            <div className="stat-icon" style={{background:s.bg}}><span style={{color:s.c}}>{s.icon}</span></div>
            <div><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:32}}>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:16}}>Tỷ lệ thuộc từ</h3>
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:"3rem",fontWeight:800,color:"var(--c-green)"}}>{masteredPct}%</div>
            <div style={{color:"var(--c-text-muted)",marginBottom:16,fontSize:"0.9rem"}}>đã thuộc / tổng đã học</div>
            <div className="progress-bar"><div className="progress-fill" style={{width:`${masteredPct}%`}} /></div>
          </div>
        </div>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:16}}>Hoạt động 7 ngày qua</h3>
          <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
            {(stats.recent_activity || []).slice(0, 7).map((a: any) => (
              <div key={a.date} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{background:"var(--grad-primary)",borderRadius:4,width:"100%",height:`${Math.min(a.count * 8, 72)}px`,minHeight:4}} />
                <div style={{fontSize:"0.65rem",color:"var(--c-text-dim)"}}>{new Date(a.date).toLocaleDateString("vi", {weekday:"short"})}</div>
              </div>
            ))}
            {!stats.recent_activity?.length && <p style={{color:"var(--c-text-muted)",fontSize:"0.9rem"}}>Chưa có dữ liệu</p>}
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:16}}>Lịch sử kiểm tra</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {history.slice(0, 10).map((h: any) => (
              <div key={h.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"var(--c-surface2)",borderRadius:"var(--r-md)"}}>
                <div>
                  <span className="badge badge-gold" style={{marginRight:8}}>{h.hsk_level}</span>
                  <span style={{fontSize:"0.85rem",color:"var(--c-text-muted)"}}>{h.correct_answers}/{h.total_questions} câu đúng</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontWeight:700,color:h.score >= 80 ? "var(--c-green)" : h.score >= 60 ? "var(--c-gold)" : "var(--c-primary)"}}>{h.score}%</span>
                  <span style={{fontSize:"0.75rem",color:"var(--c-text-dim)"}}>{new Date(h.completed_at).toLocaleDateString("vi")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
