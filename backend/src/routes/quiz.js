const express = require('express');
const db = require('../db/connection');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/quiz/topics — Danh sách chủ đề luyện tập theo HSK
router.get('/topics', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1' } = req.query;
    // Nhóm theo word_type vì đó là "topic" được lưu trong vocabulary
    const [rows] = await db.query(
      `SELECT word_type as topic, COUNT(*) as word_count
       FROM vocabulary
       WHERE hsk_level = ? AND word_type IS NOT NULL AND word_type != ''
       GROUP BY word_type
       ORDER BY word_count DESC`,
      [hsk_level]
    );
    // Tổng từ của level
    const [[total]] = await db.query(
      'SELECT COUNT(*) as c FROM vocabulary WHERE hsk_level = ?', [hsk_level]
    );
    res.json({ success: true, data: { topics: rows, total: total.c, hsk_level } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/writing — Lấy từ để luyện viết chữ
router.get('/writing', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1', topic, count = 20 } = req.query;
    let query = 'SELECT id, hanzi, pinyin, meaning_vi, stroke_count, word_type FROM vocabulary WHERE hsk_level = ?';
    const params = [hsk_level];
    if (topic && topic !== 'all') {
      query += ' AND word_type = ?'; params.push(topic);
    }
    query += ' ORDER BY RAND() LIMIT ?'; params.push(parseInt(count));
    const [words] = await db.query(query, params);
    res.json({ success: true, data: words });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/questions — Lấy câu hỏi quiz ngẫu nhiên
router.get('/questions', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1', count = 10, type = 'multiple_choice', topic } = req.query;

    // Lấy từ ngẫu nhiên theo level (và topic nếu có)
    let wordsQuery = 'SELECT * FROM vocabulary WHERE hsk_level = ?';
    const wordsParams = [hsk_level];
    if (topic && topic !== 'all') {
      wordsQuery += ' AND word_type = ?'; wordsParams.push(topic);
    }
    wordsQuery += ' ORDER BY RAND() LIMIT ?'; wordsParams.push(parseInt(count));
    const [words] = await db.query(wordsQuery, wordsParams);

    if (words.length < 4) {
      return res.status(400).json({ success: false, message: 'Không đủ từ vựng để tạo quiz' });
    }

    // Tạo câu hỏi multiple choice
    const questions = await Promise.all(words.map(async (word) => {
      // Lấy 3 đáp án sai ngẫu nhiên
      const [wrong] = await db.query(
        'SELECT id, meaning_vi FROM vocabulary WHERE hsk_level = ? AND id != ? ORDER BY RAND() LIMIT 3',
        [hsk_level, word.id]
      );

      const choices = [
        { id: word.id, text: word.meaning_vi, correct: true },
        ...wrong.map(w => ({ id: w.id, text: w.meaning_vi, correct: false }))
      ].sort(() => Math.random() - 0.5);

      return {
        vocabulary_id: word.id,
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        audio_url: word.audio_url,
        question: `"${word.hanzi}" nghĩa là gì?`,
        choices
      };
    }));

    res.json({ success: true, data: { questions, hsk_level, type } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/quiz/submit — Nộp kết quả quiz
router.post('/submit', auth, async (req, res) => {
  try {
    const { hsk_level, quiz_type, answers, duration_seconds } = req.body;
    // answers: [{ vocabulary_id, correct }]

    const correct_answers = answers.filter(a => a.correct).length;
    const total = answers.length;
    const score = Math.round((correct_answers / total) * 100);

    await db.query(
      'INSERT INTO quiz_sessions (user_id, quiz_type, hsk_level, total_questions, correct_answers, score, duration_seconds) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, quiz_type || 'multiple_choice', hsk_level, total, correct_answers, score, duration_seconds]
    );

    // Cập nhật progress cho từng từ
    for (const answer of answers) {
      await db.query(
        `INSERT INTO user_progress (user_id, vocabulary_id, status, correct_count, wrong_count, last_reviewed, next_review)
         VALUES (?, ?, 'learning', ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY))
         ON DUPLICATE KEY UPDATE
           correct_count = correct_count + ?,
           wrong_count = wrong_count + ?,
           last_reviewed = NOW()`,
        [req.user.id, answer.vocabulary_id, answer.correct ? 1 : 0, answer.correct ? 0 : 1, answer.correct ? 3 : 1,
         answer.correct ? 1 : 0, answer.correct ? 0 : 1]
      );
    }

    res.json({ success: true, data: { score, correct_answers, total, message: score >= 80 ? '🎉 Xuất sắc!' : score >= 60 ? '👍 Tốt lắm!' : '💪 Cố gắng thêm nhé!' } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/history — Lịch sử quiz của user
router.get('/history', auth, async (req, res) => {
  try {
    const [history] = await db.query(
      'SELECT * FROM quiz_sessions WHERE user_id = ? ORDER BY completed_at DESC LIMIT 20',
      [req.user.id]
    );
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/tones — Luyện thanh điệu
router.get('/tones', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1', count = 10 } = req.query;
    const [words] = await db.query(
      'SELECT id, hanzi, pinyin, meaning_vi FROM vocabulary WHERE hsk_level = ? AND pinyin IS NOT NULL ORDER BY RAND() LIMIT ?',
      [hsk_level, parseInt(count)]
    );
    const toneMap = {'ā':1,'á':2,'ǎ':3,'à':4,'ē':1,'é':2,'ě':3,'è':4,'ī':1,'í':2,'ǐ':3,'ì':4,'ō':1,'ó':2,'ǒ':3,'ò':4,'ū':1,'ú':2,'ǔ':3,'ù':4,'ǖ':1,'ǘ':2,'ǚ':3,'ǜ':4};
    const getTone = (p) => { for (const [m,t] of Object.entries(toneMap)) if (p.includes(m)) return t; return 5; };
    const questions = words.map(w => ({
      vocabulary_id: w.id, hanzi: w.hanzi, pinyin: w.pinyin,
      meaning_vi: w.meaning_vi, correct_tone: getTone(w.pinyin.split(' ')[0]),
    }));
    res.json({ success: true, data: { questions, hsk_level } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/reverse — Quiz ngược (nghĩa → chữ Hán)
router.get('/reverse', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1', count = 10, topic } = req.query;
    let q = 'SELECT * FROM vocabulary WHERE hsk_level = ?'; const p = [hsk_level];
    if (topic && topic !== 'all') { q += ' AND word_type = ?'; p.push(topic); }
    q += ' ORDER BY RAND() LIMIT ?'; p.push(parseInt(count));
    const [words] = await db.query(q, p);
    if (words.length < 4) return res.status(400).json({ success: false, message: 'Không đủ từ' });
    const questions = await Promise.all(words.map(async (word) => {
      const [wrong] = await db.query(
        'SELECT id, hanzi, pinyin FROM vocabulary WHERE hsk_level = ? AND id != ? ORDER BY RAND() LIMIT 3',
        [hsk_level, word.id]
      );
      return {
        vocabulary_id: word.id, meaning_vi: word.meaning_vi, word_type: word.word_type,
        choices: [
          { id: word.id, hanzi: word.hanzi, pinyin: word.pinyin, correct: true },
          ...wrong.map(w => ({ id: w.id, hanzi: w.hanzi, pinyin: w.pinyin, correct: false }))
        ].sort(() => Math.random() - 0.5)
      };
    }));
    res.json({ success: true, data: { questions, hsk_level } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quiz/listening — Quiz nghe (audio → nghĩa)
router.get('/listening', auth, async (req, res) => {
  try {
    const { hsk_level = 'HSK1', count = 10, topic } = req.query;
    let wq = 'SELECT * FROM vocabulary WHERE hsk_level = ?'; const wp = [hsk_level];
    if (topic && topic !== 'all') { wq += ' AND word_type = ?'; wp.push(topic); }
    wq += ' ORDER BY RAND() LIMIT ?'; wp.push(parseInt(count));
    const [words] = await db.query(wq, wp);
    if (words.length < 4) return res.status(400).json({ success: false, message: 'Không đủ từ' });
    const questions = await Promise.all(words.map(async (word) => {
      const [wrong] = await db.query(
        'SELECT id, meaning_vi FROM vocabulary WHERE hsk_level = ? AND id != ? ORDER BY RAND() LIMIT 3',
        [hsk_level, word.id]
      );
      return {
        vocabulary_id: word.id, hanzi: word.hanzi, pinyin: word.pinyin,
        choices: [
          { id: word.id, text: word.meaning_vi, correct: true },
          ...wrong.map(w => ({ id: w.id, text: w.meaning_vi, correct: false }))
        ].sort(() => Math.random() - 0.5)
      };
    }));
    res.json({ success: true, data: { questions, hsk_level } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
