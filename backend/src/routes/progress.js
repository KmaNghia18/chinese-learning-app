const express = require('express');
const db = require('../db/connection');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/progress/stats — Thống kê tổng quan của user
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [[mastered]] = await db.query(
      "SELECT COUNT(*) as count FROM user_progress WHERE user_id = ? AND status = 'mastered'", [userId]
    );
    const [[learning]] = await db.query(
      "SELECT COUNT(*) as count FROM user_progress WHERE user_id = ? AND status IN ('learning','reviewing')", [userId]
    );
    const [[lessonsCompleted]] = await db.query(
      "SELECT COUNT(*) as count FROM lesson_progress WHERE user_id = ? AND status = 'completed'", [userId]
    );
    const [[dueToday]] = await db.query(
      "SELECT COUNT(*) as count FROM user_progress WHERE user_id = ? AND (next_review IS NULL OR next_review <= NOW())", [userId]
    );
    const [recentActivity] = await db.query(
      `SELECT DATE(last_reviewed) as date, COUNT(*) as count 
       FROM user_progress WHERE user_id = ? AND last_reviewed IS NOT NULL
       GROUP BY DATE(last_reviewed) ORDER BY date DESC LIMIT 7`, [userId]
    );
    res.json({
      success: true,
      data: {
        mastered: mastered.count,
        learning: learning.count,
        lessons_completed: lessonsCompleted.count,
        due_today: dueToday.count,
        recent_activity: recentActivity
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/progress/review — Cập nhật sau khi ôn tập (SM-2 algorithm)
// quality: 0=sai hoàn toàn, 3=đúng khó, 4=đúng dễ, 5=đúng hoàn hảo
router.post('/review', auth, async (req, res) => {
  try {
    const { vocabulary_id, correct, quality } = req.body;
    const userId = req.user.id;
    // quality: 0-2=sai, 3-5=đúng. Default: correct=true→4, false→1
    const q = quality !== undefined ? quality : (correct ? 4 : 1);

    const [existing] = await db.query(
      'SELECT * FROM user_progress WHERE user_id = ? AND vocabulary_id = ?',
      [userId, vocabulary_id]
    );

    // ── SM-2 Algorithm ──
    let n = 0, ef = 2.5, interval = 1;
    if (existing.length > 0) {
      const prev = existing[0];
      n = prev.correct_count || 0;
      ef = parseFloat(prev.ease_factor) || 2.5;
    }

    // Tính EF mới: EF' = EF + (0.1 - (5-q)*(0.08 + (5-q)*0.02))
    const newEF = Math.max(1.3, ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

    if (q < 3) {
      // Sai → reset lần lặp về 0, interval = 1
      n = 0; interval = 1;
    } else {
      // Đúng → tính interval theo SM-2
      if (n === 0) interval = 1;
      else if (n === 1) interval = 6;
      else interval = Math.round(existing[0]?.interval_days * newEF || 6);
      n++;
    }

    const status = interval >= 21 ? 'mastered' : interval >= 7 ? 'reviewing' : 'learning';
    const next_review = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    await db.query(
      `INSERT INTO user_progress (user_id, vocabulary_id, status, correct_count, wrong_count, ease_factor, interval_days, last_reviewed, next_review)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
       ON DUPLICATE KEY UPDATE
         status = VALUES(status),
         correct_count = correct_count + ?,
         wrong_count = wrong_count + ?,
         ease_factor = VALUES(ease_factor),
         interval_days = VALUES(interval_days),
         last_reviewed = NOW(),
         next_review = VALUES(next_review)`,
      [userId, vocabulary_id, status,
       q >= 3 ? 1 : 0, q < 3 ? 1 : 0,
       newEF, interval, next_review,
       q >= 3 ? 1 : 0, q < 3 ? 1 : 0]
    );

    res.json({ success: true, data: { interval, ease_factor: newEF, status, next_review, quality: q } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/progress/lesson — Cập nhật tiến độ bài học
router.post('/lesson', auth, async (req, res) => {
  try {
    const { lesson_id, status } = req.body;
    await db.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, status, completed_at)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), completed_at = VALUES(completed_at)`,
      [req.user.id, lesson_id, status, status === 'completed' ? new Date() : null]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/progress/streak — Streak, heatmap, HSK stats
router.get('/streak', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Hoạt động 365 ngày qua từ quiz_sessions
    const [activity] = await db.query(
      `SELECT DATE(completed_at) as date, COUNT(*) as count
       FROM quiz_sessions WHERE user_id = ? AND completed_at >= DATE_SUB(NOW(), INTERVAL 365 DAY)
       GROUP BY DATE(completed_at) ORDER BY date ASC`, [userId]
    );

    // Tính streak liên tiếp
    const activitySet = new Set(activity.map(a => a.date instanceof Date
      ? a.date.toISOString().split('T')[0] : String(a.date).split('T')[0]));
    let streak = 0;
    const d = new Date();
    // Nếu hôm nay chưa có thì bắt đầu từ hôm qua
    const todayStr = d.toISOString().split('T')[0];
    if (!activitySet.has(todayStr)) d.setDate(d.getDate() - 1);
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      if (activitySet.has(dateStr)) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }

    // Hoạt động tuần qua (7 ngày)
    const [weekActivity] = await db.query(
      `SELECT DATE(completed_at) as date, COUNT(*) as quizzes, AVG(score) as avg_score
       FROM quiz_sessions WHERE user_id = ? AND completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(completed_at) ORDER BY date ASC`, [userId]
    );

    // Tiến độ từng HSK level
    const [hskStats] = await db.query(
      `SELECT v.hsk_level,
         COUNT(DISTINCT v.id) as total_words,
         COUNT(DISTINCT up.vocabulary_id) as learned_words,
         COUNT(DISTINCT CASE WHEN up.status = 'mastered' THEN up.vocabulary_id END) as mastered_words
       FROM vocabulary v
       LEFT JOIN user_progress up ON v.id = up.vocabulary_id AND up.user_id = ?
       GROUP BY v.hsk_level ORDER BY v.hsk_level`, [userId]
    );

    // Tổng thống kê quiz
    const [[quizStats]] = await db.query(
      `SELECT COUNT(*) as total, AVG(score) as avg_score,
              MAX(score) as best_score, SUM(total_questions) as total_questions
       FROM quiz_sessions WHERE user_id = ?`, [userId]
    );

    // Từ đã học tổng
    const [[wordStats]] = await db.query(
      `SELECT COUNT(*) as total_learned,
              COUNT(CASE WHEN status = 'mastered' THEN 1 END) as mastered
       FROM user_progress WHERE user_id = ?`, [userId]
    );

    res.json({
      success: true, data: {
        streak,
        activity_heatmap: activity,
        week_activity: weekActivity,
        hsk_stats: hskStats,
        quiz_total: quizStats.total || 0,
        quiz_avg_score: Math.round(quizStats.avg_score || 0),
        quiz_best_score: quizStats.best_score || 0,
        total_questions_answered: quizStats.total_questions || 0,
        words_learned: wordStats.total_learned || 0,
        words_mastered: wordStats.mastered || 0,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
