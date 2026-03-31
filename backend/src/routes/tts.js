// backend/src/routes/tts.js
// Proxy Google Translate TTS — tránh CORS, chất lượng tốt hơn Web Speech API
const express = require('express');
const router = express.Router();
const https = require('https');

// Cache audio để không phải gọi Google mỗi lần
const audioCache = new Map();

// GET /api/tts?text=你好&lang=zh-CN
router.get('/', async (req, res) => {
  const { text = '', lang = 'zh-CN' } = req.query;
  if (!text) return res.status(400).json({ message: 'text is required' });

  const cacheKey = `${lang}:${text}`;
  
  // Trả về cache nếu có
  if (audioCache.has(cacheKey)) {
    const buf = audioCache.get(cacheKey);
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Length', buf.length);
    res.set('Cache-Control', 'public, max-age=86400');
    return res.send(buf);
  }

  const encoded = encodeURIComponent(text);
  // Google Translate TTS endpoint (miễn phí, không cần API key)
  const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${lang}&client=gtx&ttsspeed=0.9`;

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://translate.google.com/',
    }
  };

  https.get(url, options, (googleRes) => {
    if (googleRes.statusCode !== 200) {
      return res.status(500).json({ message: 'TTS fetch failed', code: googleRes.statusCode });
    }

    const chunks = [];
    googleRes.on('data', chunk => chunks.push(chunk));
    googleRes.on('end', () => {
      const buf = Buffer.concat(chunks);
      // Cache tối đa 500 entries
      if (audioCache.size < 500) audioCache.set(cacheKey, buf);
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Length', buf.length);
      res.set('Cache-Control', 'public, max-age=86400');
      res.send(buf);
    });
  }).on('error', (err) => {
    console.error('TTS error:', err.message);
    res.status(500).json({ message: 'TTS error', error: err.message });
  });
});

module.exports = router;
