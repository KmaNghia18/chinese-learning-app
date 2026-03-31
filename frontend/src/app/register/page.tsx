'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", display_name: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try { await register(form); router.push("/dashboard"); }
    catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const fields: [string, string, string, string][] = [
    ["username", "Tên đăng nhập", "xiaoming", "text"],
    ["display_name", "Tên hiển thị", "Tiểu Minh", "text"],
    ["email", "Email", "email@example.com", "email"],
    ["password", "Mật khẩu", "••••••••", "password"],
  ];

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">🀄</div>
        <h1 className="auth-title">Tạo tài khoản</h1>
        <p className="auth-subtitle">Bắt đầu hành trình học tiếng Trung</p>
        <form onSubmit={submit}>
          {fields.map(([k, l, ph, t]) => (
            <div className="form-group" key={k}>
              <label className="form-label">{l}</label>
              <input className="input" type={t} placeholder={ph} value={(form as any)[k]} onChange={set(k)} required />
            </div>
          ))}
          {err && <p className="form-error">⚠ {err}</p>}
          <button className="btn btn-primary" style={{width:"100%",marginTop:8}} disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Đăng ký →"}
          </button>
        </form>
        <div className="auth-switch">Đã có tài khoản? <Link href="/login">Đăng nhập</Link></div>
      </div>
    </div>
  );
}
