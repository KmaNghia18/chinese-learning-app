# 🈳 HanYu — Ứng dụng Học Tiếng Trung

[![Frontend](https://img.shields.io/badge/Frontend-Next.js_14-black?logo=next.js)](https://nextjs.org)
[![Backend](https://img.shields.io/badge/Backend-Express.js-green?logo=node.js)](https://expressjs.com)
[![Database](https://img.shields.io/badge/Database-TiDB_Cloud-blue)](https://tidbcloud.com)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://chinese-learning-app-iota.vercel.app)

---

## 🌐 TRUY CẬP ỨNG DỤNG

<div align="center">

### 👉 **[https://chinese-learning-app-iota.vercel.app](https://chinese-learning-app-iota.vercel.app)** 👈

</div>

> ⚠️ Lần đầu vào sau thời gian không dùng, chờ ~30 giây để backend thức dậy (Render free tier). Các lần sau bình thường.

---

## ✨ Tính năng

### 📚 Từ vựng
- **6000+ từ** HSK 1–6 với nghĩa tiếng Việt
- **Phiên âm tiếng Việt** — đọc Hán tự theo kiểu Việt
- Tìm kiếm, lọc theo HSK level, loại từ
- ❤️ Đánh dấu yêu thích · ✅ Theo dõi tiến độ

### 🗣️ Phát âm
- Hướng dẫn phát âm với SVG đường cao độ 4 thanh điệu
- Phiên âm tiếng Việt (thanh 4 → huyền, thanh 3 → hỏi...)
- Phát âm TTS thực tế

### 📖 Bài học & 💬 Hội thoại
- Bài học cấu trúc theo HSK level
- Hội thoại thực tế HSK 1–4

### 🧪 Quiz & Luyện tập
| Chế độ | Mô tả |
|--------|-------|
| **Flashcard** | Lật thẻ ôn từ |
| **Trắc nghiệm** | Quiz nhiều lựa chọn |
| **Nghe hiểu** | Nghe audio → chọn nghĩa |
| **Thanh điệu** | Nhận biết thanh 1-4 |
| **Đảo ngược** | Thấy nghĩa → chọn Hán tự |
| **Tập viết** | Luyện viết nét Hán tự |

---

## 🏗️ Kiến trúc

```
chinese-learning-app/
├── frontend/          # Next.js 14 (App Router) → Vercel
│   └── src/
│       ├── app/       # Pages & routing
│       ├── components/# UI components
│       └── lib/       # API client, pinyinToVietnamese
│
├── backend/           # Node.js + Express → Render
│   └── src/
│       ├── routes/    # API endpoints
│       ├── middleware/ # Auth JWT
│       └── db/        # Migrations & seed data
│
└── docker-compose.yml # MySQL local (dev only)
```

### API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/vocabulary` | Danh sách từ vựng |
| GET | `/api/lessons` | Danh sách bài học |
| GET | `/api/dialogues` | Hội thoại |
| GET | `/api/quiz/questions` | Câu hỏi quiz |
| GET | `/api/tts` | Text-to-Speech |

---

## 🚀 Chạy Local

### Yêu cầu: Node.js >= 18, Docker Desktop, Git

```bash
# 1. Clone
git clone https://github.com/KmaNghia18/chinese-learning-app.git
cd chinese-learning-app

# 2. Khởi động MySQL (Docker)
docker compose up -d

# 3. Backend
cd backend
cp .env.example .env   # điền thông tin DB
npm install
npm run dev            # http://localhost:5000

# 4. Frontend (tab mới)
cd frontend
cp .env.local.example .env.local
npm install
npm run dev            # http://localhost:3000
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Vanilla CSS |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 (Docker local) / TiDB Cloud (production) |
| Auth | JWT + bcrypt |
| TTS | Google Translate API proxy |
| Hosting | Vercel (FE) + Render (BE) |

---

## 📝 Phiên âm tiếng Việt

| Thanh điệu | Ký hiệu | Phiên âm TV | Ví dụ |
|-----------|---------|------------|-------|
| 1声 (bình) | ˉ | Không dấu | jiā → cha |
| 2声 (sắc) | ˊ | Dấu sắc | huí → huấy |
| 3声 (hỏi) | ˇ | Dấu hỏi | nǐ → nỉ |
| 4声 (nặng) | ˋ | Dấu huyền | bù → bù |

---

## 📄 License

MIT © 2024 — [KmaNghia18](https://github.com/KmaNghia18)
