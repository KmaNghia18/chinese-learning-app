# CLAUDE.md  Chinese Learning App

## Project Overview
Full-stack website h?c ti?ng Trung Qu?c:
- **Frontend**: Next.js 14 (App Router, TypeScript)  `frontend/` — port 3000
- **Backend**: Node.js + Express REST API  `backend/`  port 5000
- **Database**: MySQL 8 via Docker  port 3306
- **Admin DB**: phpMyAdmin  port 8080

## Quick Start
```bash
# 1. Start database
docker-compose up -d

# 2. Start backend
cd backend && npm install && npm run dev

# 3. Start frontend
cd frontend && npm run dev
```

## Architecture
```
frontend/src/
  app/           # Next.js App Router pages
    page.tsx     # Home (landing)
    dashboard/   # User dashboard
    lessons/     # Bài h?c list + [id] detail
    vocabulary/  # Flashcard ôn t? v?ng
    quiz/        # Quiz tr?c nghi?m
    progress/    # Th?ng kê ti?n d?
    login/       # Auth
    register/    # Auth
  components/    # Shared: Navbar
  context/       # AuthContext (JWT)
  lib/api.ts     # API client wrapper

backend/src/
  index.js          # Express entry, CORS, middleware
  routes/
    auth.js         # POST /api/auth/login|register, GET /api/auth/me
    lessons.js      # GET /api/lessons, GET /api/lessons/:id
    vocabulary.js   # GET /api/vocabulary (filter: hsk_level, search)
    progress.js     # GET /api/progress/stats, POST /api/progress/review
    quiz.js         # GET /api/quiz/questions, POST /api/quiz/submit
  middleware/auth.js # JWT verify
  db/
    connection.js   # mysql2 pool (utf8mb4)
    migrations/001_init.sql  # Schema + HSK1 seed data
```

## Database Tables
- `users`  id, username, email, password_hash, hsk_level, streak_days
- `lessons`  id, title, title_zh, hsk_level, order_index
- `vocabulary`  id, lesson_id, hanzi, pinyin, meaning_vi, example_sentence_zh
- `user_progress`  spaced repetition: status, ease_factor, interval_days, next_review
- `lesson_progress`  user lesson completion status
- `quiz_sessions`  score history

## API Conventions
- All responses: `{ success: boolean, data?: any, message?: string }`
- Auth: JWT Bearer token in `Authorization` header
- Charset: utf8mb4 (Chinese requires this  never use utf8)

## Key Patterns
- Frontend auth state: `useAuth()` from `context/AuthContext`
- API calls: always use `api.*` from `lib/api.ts` (auto-injects JWT)
- New route: add to `backend/src/routes/`, register in `src/index.js`
- New page: add folder in `frontend/src/app/`, always check `useAuth()` guard

## Environment Variables
Backend `.env`: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, PORT
Frontend `.env.local`: NEXT_PUBLIC_API_URL
