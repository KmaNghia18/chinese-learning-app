# 🈳 HanYu — Ứng dụng Học Tiếng Trung

[![Frontend](https://img.shields.io/badge/Frontend-Next.js_14-black?logo=next.js)](https://nextjs.org)
[![Backend](https://img.shields.io/badge/Backend-Express.js-green?logo=node.js)](https://expressjs.com)
[![Database](https://img.shields.io/badge/Database-MySQL_8.0-blue?logo=mysql)](https://mysql.com)
[![Deploy FE](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Deploy BE](https://img.shields.io/badge/Deploy-Render-purple)](https://render.com)

---

## 🌐 DEMO TRỰC TIẾP

> ### 👉 [https://chinese-learning-app-iota.vercel.app](https://chinese-learning-app-iota.vercel.app)

| Thành phần | URL |
|-----------|-----|
| 🖥️ **Frontend** (Vercel) | [chinese-learning-app-iota.vercel.app](https://chinese-learning-app-iota.vercel.app) |
| ⚙️ **Backend API** (Render) | [chinese-learning-app-cxgq.onrender.com](https://chinese-learning-app-cxgq.onrender.com) |
| 🗄️ **Database** (TiDB Cloud) | MySQL · ap-southeast-1 (Singapore) |

> ⚠️ **Lưu ý**: Backend dùng Render free tier — lần đầu truy cập sau thời gian không hoạt động có thể mất ~30 giây để "thức dậy". Các lần sau bình thường.

---

---

## ✨ Tính năng nổi bật

### 📚 Từ vựng
- **6000+ từ** HSK 1–6 với nghĩa tiếng Việt và tiếng Anh
- **Phiên âm tiếng Việt** — đọc tiếng Trung gần giống cách đọc tiếng Việt
- Lọc theo HSK level, loại từ (danh từ, động từ, ...)
- Tìm kiếm bằng Hán tự, pinyin (có/không dấu), nghĩa
- ❤️ Đánh dấu yêu thích · ✅ Theo dõi tiến độ học
- Grid view & List view với phiên âm TV hiển thị trực tiếp

### 🗣️ Phát âm
- **Hướng dẫn phát âm modal** cho từng từ
- **Đường nét cao độ SVG** minh họa 4 thanh điệu
- **Phiên âm tiếng Việt** với quy tắc: thanh 4 → dấu huyền, thanh 3 → hỏi...
- Mẹo phát âm cho từng âm đầu (b/p/zh/ch/sh/j/q/x...)
- Phát âm TTS thực tế qua Web Speech API

### 📖 Bài học
- Bài học có cấu trúc theo HSK level
- Từ vựng + câu ví dụ trong ngữ cảnh
- Theo dõi tiến độ hoàn thành từng bài

### 💬 Hội thoại
- Đoạn hội thoại thực tế HSK 1–4
- Phát âm từng dòng
- Phiên âm và dịch nghĩa song ngữ

### 🧪 Luyện tập & Quiz
| Chế độ | Mô tả |
|--------|-------|
| **Flashcard** | Ôn từ theo kiểu lật thẻ |
| **Trắc nghiệm** | Quiz nhiều lựa chọn |
| **Nghe hiểu** | Nghe audio → chọn nghĩa |
| **Thanh điệu** | Nhận biết thanh 1-4 |
| **Đảo ngược** | Thấy nghĩa → chọn Hán tự |
| **Tập viết** | Luyện viết nét Hán tự |

### 📊 Tiến độ
- Streak học hàng ngày
- Heatmap hoạt động
- Thống kê từ đã học / quiz đã làm

---

## 🏗️ Kiến trúc

```
chinese-learning-app/
├── frontend/          # Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/       # Pages & routing
│   │   ├── components/# UI components
│   │   ├── lib/       # API client, utilities
│   │   └── context/   # Auth context
│   └── .env.local     # API URL config
│
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/    # API endpoints
│   │   ├── models/    # Database models
│   │   ├── middleware/ # Auth JWT
│   │   └── db/        # Migrations & seed data
│   └── .env           # Database & JWT config
│
└── docker-compose.yml # MySQL 8.0 + phpMyAdmin
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
| POST | `/api/progress/review` | Cập nhật tiến độ |
| GET | `/api/tts` | Text-to-Speech |

---

## 🚀 Cài đặt & Chạy Local

### Yêu cầu
- Node.js >= 18
- Docker Desktop
- Git

### 1. Clone project
```bash
git clone https://github.com/your-username/chinese-learning-app.git
cd chinese-learning-app
```

### 2. Khởi động Database (Docker)
```bash
docker compose up -d
```
> MySQL chạy ở port `3307`, phpMyAdmin tại http://localhost:8080

### 3. Cài đặt & chạy Backend
```bash
cd backend
npm install

# Tạo file .env từ template
cp .env.example .env

# Chạy migrations & seed dữ liệu HSK
node src/db/migrate.js
node src/db/seed.js

npm run dev
# Backend chạy tại http://localhost:5000
```

### 4. Cài đặt & chạy Frontend
```bash
cd frontend
npm install

# Tạo file .env.local từ template
cp .env.local.example .env.local

npm run dev
# Frontend chạy tại http://localhost:3000
```

---

## 🌐 Deploy (Miễn phí)

| Thành phần | Platform | URL |
|-----------|----------|-----|
| Frontend (Next.js) | **Vercel** | `your-app.vercel.app` |
| Backend (Express) | **Railway** | `your-backend.up.railway.app` |
| Database (MySQL) | **Railway** | Kèm theo backend |

### Deploy Backend lên Railway
1. Vào [railway.app](https://railway.app) → New Project
2. Add **MySQL** service → ghi lại credentials
3. Add **GitHub Repo** → Root Directory: `backend`
4. Set Environment Variables:
```
DB_HOST     = ${{MySQL.MYSQL_HOST}}
DB_PORT     = ${{MySQL.MYSQL_PORT}}
DB_USER     = ${{MySQL.MYSQL_USER}}
DB_PASSWORD = ${{MySQL.MYSQL_PASSWORD}}
DB_NAME     = ${{MySQL.MYSQL_DATABASE}}
JWT_SECRET  = your_secret_key
NODE_ENV    = production
```
5. Generate Domain → copy URL

### Import dữ liệu lên Railway MySQL
```bash
# Export từ Docker local
docker exec chinese_learning_db mysqldump -u root -proot123 chinese_learning > backup.sql

# Import vào Railway
mysql -h RAILWAY_HOST -P PORT -u USER -pPASS DB_NAME < backup.sql
```

### Deploy Frontend lên Vercel
1. Vào [vercel.com](https://vercel.com) → New Project → Import GitHub
2. Root Directory: `frontend`
3. Environment Variable:
```
NEXT_PUBLIC_API_URL = https://your-backend.up.railway.app/api
```
4. Deploy!

### Workflow sau khi setup
```bash
git add . && git commit -m "Update" && git push
# → Vercel & Railway tự động deploy lại
```

---

## 🔐 Bảo mật

- ⚠️ **Không commit file `.env`** — đã có trong `.gitignore`
- JWT authentication cho tất cả API protected
- Password hash bằng bcrypt
- CORS whitelist chỉ cho phép domain frontend

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Vanilla CSS (dark theme)
- Web Speech API (TTS)

**Backend**
- Node.js + Express
- MySQL 8.0 (Docker local / Railway production)
- JWT Authentication
- bcrypt password hashing

**Deployment**
- Vercel (frontend)
- Railway (backend + database)
- Docker (local development)

---

## 📝 Phiên âm tiếng Việt

App sử dụng bộ quy tắc chuyển đổi pinyin → phiên âm tiếng Việt độc lập:

| Thanh điệu | Ký hiệu | Phiên âm TV | Ví dụ |
|-----------|---------|------------|-------|
| 1声 (bình) | ˉ | Không dấu | jiā → cha |
| 2声 (sắc) | ˊ | Dấu sắc | huí → huấy |
| 3声 (hỏi) | ˇ | Dấu hỏi | nǐ → nỉ |
| 4声 (nặng) | ˋ | Dấu huyền | bù → bù |

---

## 📄 License

MIT © 2024
