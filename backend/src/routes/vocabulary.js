const express = require('express');
const db = require('../db/connection');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/vocabulary — Danh sách từ vựng (filter: hsk_level, lesson_id, search)
router.get('/', async (req, res) => {
  try {
    const { hsk_level, lesson_id, search, limit = 50, offset = 0 } = req.query;
    let query = 'SELECT * FROM vocabulary WHERE 1=1';
    const params = [];

    if (hsk_level) { query += ' AND hsk_level = ?'; params.push(hsk_level); }
    if (lesson_id) { query += ' AND lesson_id = ?'; params.push(lesson_id); }
    if (search) {
      query += ' AND (hanzi LIKE ? OR pinyin LIKE ? OR meaning_vi LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY id ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [vocab] = await db.query(query, params);
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM vocabulary WHERE 1=1', []);
    res.json({ success: true, data: vocab, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/vocabulary/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vocabulary WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/vocabulary/review/due — Từ cần ôn tập hôm nay (Spaced Repetition)
router.get('/review/due', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT v.*, up.status, up.correct_count, up.wrong_count, up.next_review
       FROM user_progress up
       JOIN vocabulary v ON up.vocabulary_id = v.id
       WHERE up.user_id = ? AND (up.next_review IS NULL OR up.next_review <= NOW())
       ORDER BY up.next_review ASC LIMIT 20`,
      [req.user.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
