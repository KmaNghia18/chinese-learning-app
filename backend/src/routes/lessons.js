const express = require('express');
const db = require('../db/connection');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/lessons — Lấy tất cả bài học (filter by hsk_level)
router.get('/', async (req, res) => {
  try {
    const { hsk_level } = req.query;
    let query = 'SELECT * FROM lessons WHERE is_active = TRUE';
    const params = [];
    if (hsk_level) {
      query += ' AND hsk_level = ?';
      params.push(hsk_level);
    }
    query += ' ORDER BY order_index ASC';
    const [lessons] = await db.query(query, params);
    res.json({ success: true, data: lessons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/lessons/:id — Chi tiết bài học + danh sách từ vựng
router.get('/:id', async (req, res) => {
  try {
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [req.params.id]);
    if (!lessons.length) return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });

    const [vocab] = await db.query(
      'SELECT * FROM vocabulary WHERE lesson_id = ? ORDER BY id ASC',
      [req.params.id]
    );
    res.json({ success: true, data: { ...lessons[0], vocabulary: vocab } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/lessons/:id/progress — Tiến độ user với bài học này
router.get('/:id/progress', auth, async (req, res) => {
  try {
    const [progress] = await db.query(
      `SELECT lp.*, 
        (SELECT COUNT(*) FROM vocabulary WHERE lesson_id = ?) as total_vocab,
        (SELECT COUNT(*) FROM user_progress up2 
          JOIN vocabulary v ON up2.vocabulary_id = v.id 
          WHERE v.lesson_id = ? AND up2.user_id = ? AND up2.status = 'mastered') as mastered_count
       FROM lesson_progress lp WHERE lp.lesson_id = ? AND lp.user_id = ?`,
      [req.params.id, req.params.id, req.user.id, req.params.id, req.user.id]
    );
    res.json({ success: true, data: progress[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
