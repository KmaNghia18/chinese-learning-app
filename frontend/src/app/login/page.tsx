'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try { await login(email, pw); router.push("/dashboard"); }
    catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">🀄</div>
        <h1 className="auth-title">Chào mừng trở lại</h1>
        <p className="auth-subtitle">Đăng nhập để tiếp tục học tiếng Trung</p>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="input" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input className="input" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} required />
          </div>
          {err && <p className="form-error">⚠ {err}</p>}
          <button className="btn btn-primary" style={{width:"100%",marginTop:8}} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập →"}
          </button>
        </form>
        <div className="auth-switch">Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link></div>
      </div>
    </div>
  );
}
