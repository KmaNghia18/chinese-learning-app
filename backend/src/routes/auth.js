const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../db/connection');

const router = express.Router();

// POST /api/auth/register
router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username 3-50 ký tự'),
    body('email').isEmail().normalizeEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu ít nhất 6 ký tự'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, email, password, display_name } = req.body;

    try {
      // Check duplicate
      const [existing] = await db.query(
        'SELECT id FROM users WHERE username = ? OR email = ?',
        [username, email]
      );
      if (existing.length > 0) {
        return res.status(409).json({ success: false, message: 'Username hoặc email đã tồn tại' });
      }

      const password_hash = await bcrypt.hash(password, 12);
      const [result] = await db.query(
        'INSERT INTO users (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)',
        [username, email, password_hash, display_name || username]
      );

      const token = jwt.sign(
        { id: result.insertId, username, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'Đăng ký thành công!',
        token,
        user: { id: result.insertId, username, email, display_name: display_name || username, hsk_level: 'HSK1' }
      });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  }
);

// POST /api/auth/login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
        return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
      }

      const user = users[0];
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: 'Đăng nhập thành công!',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          display_name: user.display_name,
          hsk_level: user.hsk_level,
          streak_days: user.streak_days
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  }
);

// GET /api/auth/me
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, username, email, display_name, hsk_level, streak_days, avatar_url, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: users[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

module.exports = router;
