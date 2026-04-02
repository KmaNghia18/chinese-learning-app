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


// POST /api/vocabulary/annotate — Tách từng từ và tra nghĩa tiếng Việt
// Body: { texts: ["你好，我叫李明", "谢谢你"] }
router.post('/annotate', async (req, res) => {
  try {
    const { texts } = req.body;
    if (!texts || !texts.length) return res.json({ success: true, data: [] });

    // Load toàn bộ vocabulary, sort theo độ dài giảm dần để match dài nhất trước
    const [vocab] = await db.query(
      'SELECT hanzi, meaning_vi, pinyin FROM vocabulary WHERE hanzi IS NOT NULL AND LENGTH(hanzi) >= 1 ORDER BY LENGTH(hanzi) DESC'
    );

    // Tạo map: hanzi → {meaning, pinyin}
    const vocabMap = {};
    for (const v of vocab) {
      if (v.hanzi && !vocabMap[v.hanzi]) {
        vocabMap[v.hanzi] = { meaning: v.meaning_vi, pinyin: v.pinyin };
      }
    }

    // Max-forward matching: thử khớp chuỗi dài nhất trước (tối đa 4 ký tự)
    const annotate = (text) => {
      const tokens = [];
      let i = 0;
      while (i < text.length) {
        let matched = false;
        for (let len = Math.min(4, text.length - i); len >= 1; len--) {
          const word = text.slice(i, i + len);
          if (vocabMap[word]) {
            tokens.push({ word, meaning: vocabMap[word].meaning, pinyin: vocabMap[word].pinyin });
            i += len;
            matched = true;
            break;
          }
        }
        if (!matched) {
          tokens.push({ word: text[i], meaning: null, pinyin: null });
          i++;
        }
      }
      return tokens;
    };

    const data = texts.map((t) => annotate(t));
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
