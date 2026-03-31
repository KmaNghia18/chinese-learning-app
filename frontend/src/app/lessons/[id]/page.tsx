'use client';
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSpeech } from "@/lib/useSpeech";
import Link from "next/link";

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { speak } = useSpeech();
  const [lesson, setLesson] = useState<any>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { if (id) api.getLesson(Number(id)).then(r => setLesson(r.data)).catch(() => {}); }, [id]);

  const markDone = async () => {
    await api.updateLessonProgress(Number(id), "completed").catch(() => {});
    setDone(true);
  };

  if (loading || !lesson) return <div className="spinner" />;

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <Link href="/lessons" style={{color:"var(--c-text-muted)",fontSize:"0.9rem"}}>← Quay lại danh sách</Link>
      </div>

      <div className="page-header">
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <span className="badge badge-gold">{lesson.hsk_level}</span>
          <span style={{color:"var(--c-text-dim)",fontSize:"0.85rem"}}>Bài {lesson.order_index}</span>
        </div>
        <h1 className="page-title">{lesson.title}</h1>
        <div style={{fontFamily:"var(--font-zh)",fontSize:"1.2rem",color:"var(--c-text-muted)",marginTop:4}}>{lesson.title_zh}</div>
        {lesson.description && <p style={{color:"var(--c-text-muted)",marginTop:8}}>{lesson.description}</p>}
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{fontWeight:700}}>Từ vựng trong bài ({lesson.vocabulary?.length || 0} từ)</h2>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => lesson.vocabulary?.forEach((v: any, i: number) => setTimeout(() => speak(v.hanzi), i * 1500))}
        >▶ Nghe tất cả</button>
      </div>

      <div className="grid-3" style={{marginBottom:32}}>
        {lesson.vocabulary?.map((v: any) => (
          <div key={v.id} className="card" style={{cursor:"pointer",textAlign:"center",position:"relative"}} onClick={() => setFlipped(flipped === v.id ? null : v.id)}>
            {/* Nút phát âm */}
            <button
              onClick={e => { e.stopPropagation(); speak(v.hanzi); }}
              style={{
                position:"absolute",top:12,right:12,background:"var(--c-primary-soft)",
                border:"none",borderRadius:"var(--r-md)",padding:"4px 10px",
                cursor:"pointer",fontSize:"0.8rem",color:"var(--c-primary)"
              }}
            >🔊</button>

            <div className="zh" style={{fontSize:"2.5rem",fontWeight:700,marginBottom:4}}>{v.hanzi}</div>
            <div style={{color:"var(--c-primary)",marginBottom:8,fontStyle:"italic",fontSize:"1rem"}}>{v.pinyin}</div>

            {flipped === v.id ? (
              <div className="fade-in">
                <div style={{fontWeight:600,marginBottom:4,fontSize:"1rem"}}>{v.meaning_vi}</div>
                {v.meaning_en && <div style={{color:"var(--c-text-muted)",fontSize:"0.82rem",marginBottom:8}}>{v.meaning_en}</div>}
                {v.word_type && <span className="badge badge-blue">{v.word_type}</span>}
                {v.example_sentence_zh && (
                  <div style={{fontSize:"0.8rem",color:"var(--c-text-muted)",marginTop:10,borderTop:"1px solid var(--c-border)",paddingTop:8}}>
                    <div className="zh">{v.example_sentence_zh}</div>
                    <div style={{marginTop:3}}>{v.example_sentence_vi}</div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{color:"var(--c-text-dim)",fontSize:"0.82rem"}}>Nhấn để xem nghĩa</div>
            )}
          </div>
        ))}
      </div>

      <div style={{textAlign:"center"}}>
        {done
          ? <div style={{color:"var(--c-green)",fontWeight:700,fontSize:"1.1rem"}}>✅ Đã hoàn thành bài học!</div>
          : <button className="btn btn-primary btn-lg" onClick={markDone}>Đánh dấu hoàn thành ✓</button>
        }
      </div>
    </div>
  );
}
