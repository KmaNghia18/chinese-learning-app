'use client';
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LEVEL_COLORS: Record<string, string> = {
  HSK1: "badge-green", HSK2: "badge-blue", HSK3: "badge-gold",
  HSK4: "badge-purple", HSK5: "badge-red", HSK6: "badge-red"
};

export default function LessonsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [lessons, setLessons] = useState<any[]>([]);
  const [filter, setFilter] = useState("HSK1");
  const [fetching, setFetching] = useState(true);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => {
    setFetching(true);
    api.getLessons(filter).then(r => setLessons(r.data || [])).finally(() => setFetching(false));
  }, [filter]);

  if (loading) return <div className="spinner" />;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">📚 Bài học</h1>
        <p className="page-subtitle">Chọn cấp độ và bắt đầu học tiếng Trung</p>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
        {["HSK1","HSK2","HSK3","HSK4","HSK5","HSK6"].map(lvl => (
          <button key={lvl} onClick={() => setFilter(lvl)} className={`btn btn-sm ${filter === lvl ? "btn-primary" : "btn-ghost"}`}>{lvl}</button>
        ))}
      </div>
      {fetching ? <div className="spinner" /> : (
        <div className="grid-3">
          {lessons.map(l => (
            <Link href={`/lessons/${l.id}`} key={l.id} className="lesson-card">
              <div className="lesson-title">{l.title}</div>
              <div className="lesson-title-zh">{l.title_zh}</div>
              {l.description && <div style={{color:"var(--c-text-muted)",fontSize:"0.83rem",marginBottom:8}}>{l.description}</div>}
              <div className="lesson-meta">
                <span className={`badge ${LEVEL_COLORS[l.hsk_level]}`}>{l.hsk_level}</span>
                <span style={{color:"var(--c-text-dim)",fontSize:"0.8rem"}}>Bài {l.order_index}</span>
              </div>
            </Link>
          ))}
          {lessons.length === 0 && <p style={{color:"var(--c-text-muted)",gridColumn:"1/-1"}}>Chưa có bài học nào.</p>}
        </div>
      )}
    </div>
  );
}
