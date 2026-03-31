// seed_hsk2_finish.js — Hoàn thiện HSK2 đủ 300 từ chuẩn
require('dotenv').config();
const pool = require('./connection');

const patches = [
  { lesson:'Động từ thông dụng', words: [
    ['运动','yùn dòng','Vận động / Tập thể dục','Exercise / Sport','我每天运动。','Tôi vận động mỗi ngày.','verb'],
    ['打','dǎ','Đánh / Chơi (thể thao)','Hit / Play (sport)','他会打乒乓球。','Anh ấy biết chơi bóng bàn.','verb'],
    ['带','dài','Mang / Đem','Bring / Take / Carry','请带雨伞来。','Hãy mang ô đến.','verb'],
    ['参加','cān jiā','Tham gia','Participate / Join','我参加了比赛。','Tôi đã tham gia cuộc thi.','verb'],
    ['准备','zhǔn bèi','Chuẩn bị','Prepare / Get ready','准备好了吗？','Chuẩn bị xong chưa?','verb'],
    ['练习','liàn xí','Luyện tập','Practice / Exercise','每天练习汉语。','Luyện tập tiếng Trung mỗi ngày.','verb'],
    ['改变','gǎi biàn','Thay đổi','Change','很多事情改变了。','Nhiều thứ đã thay đổi.','verb'],
  ]},
  { lesson:'Tính từ cơ bản', words: [
    ['方便','fāng biàn','Tiện lợi / Thuận tiện','Convenient','这里交通很方便。','Giao thông nơi đây rất tiện lợi.','adjective'],
    ['马上','mǎ shàng','Ngay lập tức / Ngay','Immediately / Right away','我马上来。','Tôi đến ngay.','adverb'],
    ['只','zhǐ','Chỉ / Chỉ có','Only / Just','我只有一个苹果。','Tôi chỉ có một quả táo.','adverb'],
    ['几乎','jī hū','Gần như / Hầu như','Almost / Nearly','我几乎忘了。','Tôi gầu như quên mất.','adverb'],
  ]},
  { lesson:'Nghề nghiệp & Nơi làm việc', words: [
    ['办公室','bàn gōng shì','Văn phòng','Office','他在办公室工作。','Anh ấy làm việc ở văn phòng.','noun'],
  ]},
  { lesson:'Đại từ & Từ nghi vấn nâng cao', words: [
    ['口','kǒu','Miệng / Cửa (lượng từ người)','Mouth / Opening','我家有四口人。','Nhà tôi có bốn người.','noun'],
    ['只','zhǐ','Con (lượng từ động vật)','(measure: animal)','一只猫。','Một con mèo.','other'],
    ['条','tiáo','Cái (lượng từ dài)','(measure: long objects)','一条鱼。','Một con cá.','other'],
  ]},
  { lesson:'Miêu tả sự vật & Tính chất', words: [
    ['特别','tè bié','Đặc biệt','Special / Especially','这个地方很特别。','Nơi này rất đặc biệt.','adjective'],
    ['一般','yī bān','Bình thường / Thông thường','Ordinary / So-so / Generally','这个菜一般。','Món ăn này bình thường thôi.','adjective'],
    ['当然','dāng rán','Tất nhiên / Dĩ nhiên','Of course / Certainly','当然可以！','Tất nhiên được!','adverb'],
    ['突然','tū rán','Đột nhiên / Bất ngờ','Suddenly / Unexpectedly','他突然出现了。','Anh ấy đột nhiên xuất hiện.','adverb'],
    ['刚才','gāng cái','Vừa rồi / Lúc nãy','Just now / A moment ago','刚才他在这里。','Lúc nãy anh ấy ở đây.','adverb'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0;
    for (const { lesson, words } of patches) {
      // Tìm trong cả HSK1 và HSK2
      let lid = null;
      for (const level of ['HSK2','HSK1']) {
        const [ls] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[lesson,level]);
        if (ls.length) { lid = ls[0].id; break; }
      }
      if (!lid) { console.log(`  ⚠ Không tìm thấy: ${lesson}`); continue; }
      for (const [h,p,vi,en,exZh,exVi,type] of words) {
        const [ex] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if (ex.length) continue;
        await conn.query(
          'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK2',type]
        );
        total++;
      }
    }
    await conn.commit();
    const [[h2]] = await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK2'`);
    console.log(`✅ HSK2 hoàn thiện: +${total} từ mới → tổng ${h2.c} từ (chuẩn 300)`);
  } catch(e) { await conn.rollback(); console.error('❌',e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
