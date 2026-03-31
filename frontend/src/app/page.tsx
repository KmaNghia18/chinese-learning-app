'use client';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && user) router.push("/dashboard"); }, [user, loading, router]);
  return (
    <div style={{minHeight:"calc(100vh - 64px)",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--grad-hero)",padding:"40px 24px"}}>
      <div style={{maxWidth:600,textAlign:"center"}} className="fade-in">
        <div style={{fontSize:"5rem",marginBottom:16}}>🀄</div>
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,lineHeight:1.1,marginBottom:16}}>
          Học Tiếng Trung<br/>
          <span style={{background:"var(--grad-primary)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Hiệu Quả Mỗi Ngày</span>
        </h1>
        <p style={{color:"var(--c-text-muted)",fontSize:"1.1rem",marginBottom:40,lineHeight:1.7}}>
          Nền tảng học tiếng Trung với flashcard thông minh, quiz tương tác và hệ thống ôn tập Spaced Repetition
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/register" className="btn btn-primary btn-lg">Bắt đầu miễn phí →</Link>
          <Link href="/login" className="btn btn-ghost btn-lg">Đăng nhập</Link>
        </div>
        <div style={{display:"flex",gap:32,justifyContent:"center",marginTop:48}}>
          {([["📚","HSK 1-6","Toàn bộ chương trình"],["🎴","Flashcard","Học qua thẻ bài"],["🧠","Spaced Rep","Ôn tập thông minh"]] as [string,string,string][]).map(([icon,t,d])=>(
            <div key={t} style={{textAlign:"center"}}>
              <div style={{fontSize:"1.8rem",marginBottom:8}}>{icon}</div>
              <div style={{fontWeight:700,fontSize:"0.9rem"}}>{t}</div>
              <div style={{color:"var(--c-text-muted)",fontSize:"0.8rem"}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
