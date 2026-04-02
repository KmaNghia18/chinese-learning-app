'use client';
import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAuth = pathname === "/login" || pathname === "/register";
  if (isAuth) return null;

  const mainLinks = [
    { href: "/dashboard",     label: "📊 Tổng quan" },
    { href: "/lessons",       label: "Bài học" },
    { href: "/dialogues",     label: "💬 Hội thoại" },
    { href: "/vocabulary",    label: "Từ vựng" },
    { href: "/pronunciation", label: "🗣️ Phát âm" },
  ];

  const practiceLinks = [
    { href: '/quiz',      label: '🧠 Quiz' },
    { href: '/listening', label: '🎧 Nghe' },
    { href: '/sentence',  label: '🧩 Ghép câu' },
    { href: '/reverse',   label: '🔁 Quiz Ngược' },
    { href: '/tones',     label: '🎵 Thanh điệu' },
    { href: '/flashcard', label: '📇 Flashcard' },
    { href: '/writing',   label: '✍️ Tập viết' },
    { href: '/exam',      label: '🎓 Thi thử HSK' },
  ];

  return (
    <nav className="navbar" style={{position:'relative'}}>
      <Link href="/" className="navbar-brand">
        <span className="logo">🀄</span>
        <span className="name">HanYu</span>
      </Link>

      <div className="navbar-links">
        {user && mainLinks.map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname.startsWith(l.href) ? " active" : ""}`}>{l.label}</Link>
        ))}

        {/* Practice dropdown */}
        {user && (
          <div style={{position:'relative'}}
            onMouseEnter={() => { if(closeTimer.current) clearTimeout(closeTimer.current); setMenuOpen(true); }}
            onMouseLeave={() => { closeTimer.current = setTimeout(() => setMenuOpen(false), 150); }}>
            <button className={`nav-link${practiceLinks.some(l=>pathname.startsWith(l.href))?' active':''}`}
              style={{background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',
                display:'flex',alignItems:'center',gap:'.3rem',
                color:practiceLinks.some(l=>pathname.startsWith(l.href))?'var(--c-primary)':'var(--c-text-muted)',
                fontWeight:practiceLinks.some(l=>pathname.startsWith(l.href))?700:500,
                fontSize:'.9rem',padding:'.25rem .5rem',borderRadius:6
              }}>
              🏋️ Luyện tập
              <span style={{fontSize:'.65rem',opacity:.7,transition:'transform .2s',
                transform:menuOpen?'rotate(180deg)':'rotate(0)'}}>▾</span>
            </button>

            {menuOpen && (
              <div style={{position:'absolute',top:'calc(100% + 2px)',left:0,minWidth:160,
                background:'var(--c-surface)',border:'1px solid var(--c-border)',
                borderRadius:12,boxShadow:'0 8px 30px #0006',padding:'.4rem',zIndex:999}}>
                {practiceLinks.map(l => (
                  <Link key={l.href} href={l.href}
                    style={{display:'block',padding:'.5rem .75rem',borderRadius:8,
                      fontSize:'.85rem',color:pathname.startsWith(l.href)?'#6366f1':'var(--c-text)',
                      fontWeight:pathname.startsWith(l.href)?700:500,
                      background:pathname.startsWith(l.href)?'#6366f115':'transparent',
                      textDecoration:'none'}}
                    onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {user ? (
          <>
            <span style={{fontSize:"0.85rem",color:"var(--c-text-muted)"}}>
              {user.display_name} · <span className="badge badge-gold">{user.hsk_level}</span>
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => { logout(); router.push("/login"); }}>Đăng xuất</button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
}
