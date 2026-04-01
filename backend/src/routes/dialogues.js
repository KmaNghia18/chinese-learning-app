// routes/dialogues.js — API cho hội thoại & đoạn văn song ngữ
const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// GET /api/dialogues — Danh sách tất cả (có filter)
router.get('/', async (req, res) => {
  try {
    const { hsk_level, type, topic } = req.query;
    let sql = `SELECT id, title, title_zh, type, hsk_level, topic, description, difficulty, order_index,
               (SELECT COUNT(*) FROM dialogue_lines dl WHERE dl.dialogue_id = d.id) AS line_count
               FROM dialogues d WHERE is_active = TRUE`;
    const params = [];
    if (hsk_level) { sql += ' AND hsk_level = ?'; params.push(hsk_level); }
    if (type)      { sql += ' AND type = ?';      params.push(type); }
    if (topic)     { sql += ' AND topic = ?';     params.push(topic); }
    sql += ' ORDER BY hsk_level, order_index';
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/dialogues/:id — Chi tiết 1 bài (kèm tất cả dòng)
router.get('/:id', async (req, res) => {
  try {
    const [dialogues] = await pool.query(
      'SELECT * FROM dialogues WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    );
    if (!dialogues.length) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    const [lines] = await pool.query(
      'SELECT * FROM dialogue_lines WHERE dialogue_id = ? ORDER BY line_order',
      [req.params.id]
    );
    res.json({ success: true, data: { ...dialogues[0], lines } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/dialogues/stats — Thống kê
router.get('/meta/stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT hsk_level,
             SUM(type='dialogue') AS dialogue_count,
             SUM(type='passage')  AS passage_count,
             COUNT(*)             AS total
      FROM dialogues WHERE is_active=TRUE
      GROUP BY hsk_level ORDER BY hsk_level
    `);
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// GET /api/dialogues/practice/sentences?hsk_level=HSK1&count=10
// Trả về các dòng hội thoại để luyện ghép câu
router.get('/practice/sentences', async (req, res) => {
  try {
    const { hsk_level, count = 10 } = req.query;
    let sql = `
      SELECT dl.id, dl.content_zh, dl.meaning_vi, dl.speaker,
             d.title, d.hsk_level, d.type
      FROM dialogue_lines dl
      JOIN dialogues d ON dl.dialogue_id = d.id
      WHERE d.is_active = TRUE
        AND dl.content_zh IS NOT NULL
        AND dl.meaning_vi IS NOT NULL
        AND LENGTH(dl.content_zh) >= 2
        AND LENGTH(dl.content_zh) <= 30`;
    const params = [];
    if (hsk_level) { sql += ' AND d.hsk_level = ?'; params.push(hsk_level); }
    sql += ` ORDER BY RAND() LIMIT ?`;
    params.push(parseInt(count));
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
