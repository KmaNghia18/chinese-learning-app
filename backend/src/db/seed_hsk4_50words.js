// seed_hsk4_50words.js — 50 từ cốt lõi cuối cùng hoàn thành HSK4
require('dotenv').config();
const pool = require('./connection');

const words = [
  ['挑剔','tiāo ti','Khó tính','Picky / Fussy','他很挑剔。','Anh ấy rất khó tính.','adjective'],
  ['谦逊','qiān xùn','Khiêm tốn','Humble','谦逊的态度。','Thái độ khiêm tốn.','adjective'],
  ['坦诚','tǎn chéng','Thành thật','Frank / Candid','坦诚相待。','Đối đãi thành thật.','adjective'],
  ['严谨','yán jǐn','Nghiêm túc / Chặt chẽ','Rigorous','严谨的态度。','Thái độ nghiêm túc.','adjective'],
  ['恒心','héng xīn','Lòng kiên trì','Perseverance','做事要有恒心。','Làm việc phải có lòng kiên trì.','noun'],
  ['毅力','yì lì','Ý chí / Nghị lực','Willpower','具有坚强毅力。','Có ý chí kiên cường.','noun'],
  ['进取','jìn qǔ','Cầu tiến','Enterprising','积极进取的精神。','Tinh thần tích cực cầu tiến.','adjective'],
  ['开拓','kāi tuò','Khai phá','Pioneer','开拓新市场。','Khai phá thị trường mới.','verb'],
  ['担当','dān dāng','Đảm nhận gánh vác','Take on responsibility','勇于担当责任。','Dũng cảm đảm nhận trách nhiệm.','verb'],
  ['奉献','fèng xiàn','Cống hiến','Dedicate selflessly','奉献精神可贵。','Tinh thần cống hiến đáng quý.','verb'],
  ['优先','yōu xiān','Ưu tiên','Prioritize','优先考虑孩子。','Ưu tiên nghĩ đến con cái.','verb'],
  ['着重','zhuó zhòng','Nhấn mạnh','Emphasize','着重强调安全。','Nhấn mạnh tầm quan trọng an toàn.','verb'],
  ['无处不在','wú chù bù zài','Có mặt khắp nơi','Ubiquitous','智能手机无处不在。','Điện thoại thông minh có mặt khắp nơi.','adjective'],
  ['不可或缺','bù kě huò quē','Không thể thiếu','Indispensable','水是不可或缺的。','Nước là thứ không thể thiếu.','adjective'],
  ['循序渐进','xún xù jiàn jìn','Từng bước một','Step by step','循序渐进地学习。','Học từng bước một.','adverb'],
  ['相辅相成','xiāng fǔ xiāng chéng','Bổ trợ lẫn nhau','Complement each other','理论与实践相辅相成。','Lý thuyết và thực hành bổ trợ lẫn nhau.','verb'],
  ['与时俱进','yǔ shí jù jìn','Tiến cùng thời đại','Keep up with the times','要与时俱进创新。','Phải tiến cùng thời đại đổi mới.','verb'],
  ['自力更生','zì lì gēng shēng','Tự lực cánh sinh','Self-reliance','自力更生发展经济。','Tự lực cánh sinh phát triển kinh tế.','noun'],
  ['标志性','biāo zhì xìng','Có tính biểu tượng','Iconic','标志性建筑。','Công trình kiến trúc biểu tượng.','adjective'],
  ['可观','kě guān','Đáng kể / Khá lớn','Considerable','利润相当可观。','Lợi nhuận khá đáng kể.','adjective'],
  ['规模','guī mó','Quy mô','Scale / Scope','企业规模扩大。','Quy mô doanh nghiệp mở rộng.','noun'],
  ['领域','lǐng yù','Lĩnh vực','Field / Domain','各个领域的专家。','Chuyên gia trong nhiều lĩnh vực.','noun'],
  ['层面','céng miàn','Tầng / Phương diện','Level / Aspect','从不同层面分析。','Phân tích từ các phương diện khác nhau.','noun'],
  ['范畴','fàn chóu','Phạm trù','Category / Scope','超出我的知识范畴。','Vượt ngoài phạm trù kiến thức của tôi.','noun'],
  ['维度','wéi dù','Chiều / Góc độ','Dimension','多维度思考问题。','Suy nghĩ vấn đề đa chiều.','noun'],
  ['深度','shēn dù','Chiều sâu','Depth','深度思考很重要。','Suy nghĩ sâu rất quan trọng.','noun'],
  ['广度','guǎng dù','Chiều rộng','Breadth','知识的广度和深度。','Chiều rộng và chiều sâu kiến thức.','noun'],
  ['精髓','jīng suǐ','Tinh tuý','Essence','文化的精髓。','Tinh tuý của văn hoá.','noun'],
  ['内核','nèi hé','Hạt nhân / Cốt lõi','Core / Kernel','产品的内核价值。','Giá trị cốt lõi của sản phẩm.','noun'],
  ['升华','shēng huá','Thăng hoa','Sublimate / Elevate','情感的升华。','Sự thăng hoa cảm xúc.','verb'],
  ['渗透','shèn tòu','Thẩm thấu / Lan rộng','Penetrate / Permeate','文化渗透影响深远。','Thẩm thấu văn hoá ảnh hưởng sâu xa.','verb'],
  ['聚焦','jù jiāo','Tập trung vào','Focus on','聚焦核心问题。','Tập trung vào vấn đề cốt lõi.','verb'],
  ['凸显','tū xiǎn','Nổi bật / Làm nổi bật','Highlight','凸显产品优势。','Làm nổi bật ưu thế sản phẩm.','verb'],
  ['催生','cuī shēng','Thúc đẩy hình thành','Catalyze','需求催生创新。','Nhu cầu thúc đẩy đổi mới.','verb'],
  ['衍生','yǎn shēng','Phái sinh','Derive from','衍生产品。','Sản phẩm phái sinh.','verb'],
  ['契机','qì jī','Thời cơ tốt','Opportunity / Turning point','抓住发展契机。','Nắm bắt thời cơ phát triển.','noun'],
  ['瓶颈','píng jǐng','Nút thắt cổ chai','Bottleneck','突破发展瓶颈。','Vượt qua nút thắt phát triển.','noun'],
  ['落地','luò dì','Triển khai cụ thể','Implement concretely','政策落地实施。','Triển khai thực hiện chính sách.','verb'],
  ['赋能','fù néng','Trao quyền năng','Empower / Enable','科技赋能传统行业。','Khoa học công nghệ trao quyền năng cho ngành truyền thống.','verb'],
  ['颠覆','diān fù','Lật đổ / Phá vỡ','Disrupt / Overturn','颠覆传统行业。','Lật đổ ngành truyền thống.','verb'],
  ['闭环','bì huán','Chu trình hoàn chỉnh','Closed loop','形成完整闭环。','Tạo thành chu trình hoàn chỉnh.','noun'],
  ['辐射','fú shè','Lan toả / Bức xạ','Radiate / Spread','城市辐射带动周边。','Thành phố lan toả thúc đẩy xung quanh.','verb'],
  ['折射','zhé shè','Phản ánh / Chiết xuất','Reflect / Refract','问题折射时代变化。','Vấn đề phản ánh sự thay đổi thời đại.','verb'],
  ['凝练','níng liàn','Súc tích / Cô đọng','Concise / Condensed','语言要凝练有力。','Ngôn ngữ phải súc tích mạnh mẽ.','adjective'],
  ['通俗易懂','tōng sú yì dǒng','Dễ hiểu / Bình dân dễ hiểu','Easy to understand','文章通俗易懂。','Bài văn dễ hiểu cho mọi người.','adjective'],
  ['耳熟能详','ěr shú néng xiáng','Quen tai biết rõ / Thông thuộc','Thoroughly familiar','这首歌耳熟能详。','Bài hát này ai cũng quen thuộc.','adjective'],
  ['不言而喻','bù yán ér yù','Không cần nói cũng hiểu','Goes without saying','道理不言而喻。','Đạo lý không cần nói cũng hiểu.','adjective'],
  ['潜移默化','qián yí mò huà','Ảnh hưởng âm thầm từ từ','Imperceptible influence','文化潜移默化影响人。','Văn hoá ảnh hưởng con người một cách âm thầm.','adverb'],
  ['融会贯通','róng huì guàn tōng','Thấu suốt / Nắm vững toàn bộ','Fuse and master thoroughly','融会贯通所学知识。','Nắm vững toàn bộ kiến thức đã học.','verb'],
  ['举一反三','jǔ yī fǎn sān','Suy ra cái này biết cái khác','Learn one and know three','善于举一反三。','Giỏi suy luận từ một biết nhiều.','verb'],
  ['触类旁通','chù lèi páng tōng','Hiểu loại này thông loại khác','Comprehend by analogy','触类旁通学知识。','Học kiến thức bằng suy luận tương tự.','verb'],
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // Tìm hoặc tạo bài học chứa từ này
    let lid;
    const [ls] = await conn.query(`SELECT id FROM lessons WHERE title='Từ vựng cốt lõi HSK4 - Tổng hợp' AND hsk_level='HSK4'`);
    if (ls.length) { lid = ls[0].id; }
    else {
      const [r] = await conn.query(`INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)`,
        ['Từ vựng cốt lõi HSK4 - Tổng hợp','核心词汇综合','核心词汇综合','HSK4',93]);
      lid = r.insertId;
      console.log(`  ✓ Tạo bài học (${lid})`);
    }
    let n = 0;
    for (const [h,p,vi,en,ez,ev,t] of words) {
      const [e] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?', [h, lid]);
      if (e.length) continue;
      await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
        [lid,h,p,vi,en,ez,ev,'HSK4',t]);
      n++;
    }
    await conn.commit();

    const [all] = await conn.query(`SELECT l.hsk_level lv, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    const targets={HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
    let grand=0;
    console.log('\n📊 Tổng kết:');
    all.forEach(r=>{ const ok=r.tu>=targets[r.lv]?'✅':`⏳(${r.tu}/${targets[r.lv]})`; console.log(`   ${r.lv}: ${r.bai} bài · ${r.tu} từ ${ok}`); grand+=Number(r.tu); });
    console.log(`   ══ TỔNG: ${grand} từ`);
    console.log(`\n✅ +${n} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
