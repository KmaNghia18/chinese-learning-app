// fix_hsk3_final.js — Thêm 6 từ còn thiếu để hoàn thành HSK3 = 600
require('dotenv').config();
const pool = require('./connection');

const words6 = [
  ['感情','gǎn qíng','Tình cảm / Cảm xúc','Feelings / Relationship','我们之间有深厚的感情。','Chúng tôi có tình cảm sâu sắc.','noun'],
  ['拒绝','jù jué','Từ chối','Refuse / Reject','他拒绝了我的邀请。','Anh ấy từ chối lời mời của tôi.','verb'],
  ['尊重','zūn zhòng','Tôn trọng','Respect','我们要尊重他人。','Chúng ta phải tôn trọng người khác.','verb'],
  ['信任','xìn rèn','Tin tưởng / Tin cậy','Trust','信任是友谊的基础。','Tin tưởng là nền tảng của tình bạn.','verb'],
  ['后悔','hòu huǐ','Hối hận / Tiếc nuối','Regret','没有努力学习，我很后悔。','Không chăm chỉ học, tôi rất hối hận.','verb'],
  ['比较','bǐ jiào','So sánh / Tương đối','Compare / Relatively','这个比较贵。','Cái này tương đối đắt.','adverb'],
];

async function fix() {
  const conn = await pool.getConnection();
  try {
    // Tìm bài học HSK3 cuối để thêm vào
    const [ls] = await conn.query(
      "SELECT id FROM lessons WHERE hsk_level='HSK3' ORDER BY order_index DESC LIMIT 1"
    );
    const lid = ls[0].id;
    let n = 0;
    for (const [h,p,vi,en,ez,ev,t] of words6) {
      const [e] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?', [h, lid]);
      if (e.length) continue;
      await conn.query(
        'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
        [lid,h,p,vi,en,ez,ev,'HSK3',t]);
      n++;
    }
    const [[s]] = await conn.query(
      "SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK3'"
    );
    console.log(`✅ +${n} từ → HSK3: ${s.c}/600 ${s.c>=600?'✅':'⏳'}`);
  } catch(e){ console.error('❌',e.message); }
  finally{ conn.release(); process.exit(0); }
}
fix();
