// seed_finish_hsk23.js — Hoàn thiện nốt HSK2 (+7) và HSK3 (+30)
require('dotenv').config();
const pool = require('./connection');

// Thêm vào bài hiện có
const hsk2Patches = [
  { lesson:'Động từ thông dụng nâng cao', words:[
    ['出发','chū fā','Khởi hành / Xuất phát','Depart / Set off','明天早上出发。','Sáng mai xuất phát.','verb'],
    ['经过','jīng guò','Đi qua / Trải qua','Pass by / Go through','经过学校门口。','Đi qua cổng trường.','verb'],
    ['发现','fā xiàn','Phát hiện','Discover / Find out','我发现了一个问题。','Tôi phát hiện ra một vấn đề.','verb'],
    ['认为','rèn wéi','Cho rằng','Think / Consider','我认为你是对的。','Tôi cho rằng bạn đúng.','verb'],
    ['影响','yǐng xiǎng','Ảnh hưởng','Influence / Affect','天气影响心情。','Thời tiết ảnh hưởng tâm trạng.','verb'],
    ['解决','jiě jué','Giải quyết','Solve / Resolve','一起解决问题。','Cùng nhau giải quyết vấn đề.','verb'],
    ['相信','xiāng xìn','Tin tưởng','Believe / Trust','我相信你能做到。','Tôi tin bạn có thể làm được.','verb'],
  ]},
];

const hsk3Patches = [
  { lesson:'Các từ không thể thiếu HSK3', words:[
    ['效果','xiào guǒ','Hiệu quả / Kết quả','Effect / Result','这个方法效果很好。','Phương pháp này hiệu quả rất tốt.','noun'],
    ['标准','biāo zhǔn','Tiêu chuẩn / Chuẩn mực','Standard / Criterion','符合标准。','Đáp ứng tiêu chuẩn.','noun'],
    ['方向','fāng xiàng','Hướng / Phương hướng','Direction','往哪个方向走？','Đi theo hướng nào?','noun'],
    ['速度','sù dù','Tốc độ','Speed','提高学习速度。','Nâng cao tốc độ học tập.','noun'],
    ['力量','lì liàng','Sức mạnh / Lực','Strength / Power','积累力量。','Tích lũy sức mạnh.','noun'],
    ['态度','tài dù','Thái độ','Attitude','端正学习态度。','Chỉnh đốn thái độ học tập.','noun'],
    ['角度','jiǎo dù','Góc độ','Angle / Perspective','从不同角度看问题。','Nhìn vấn đề từ góc độ khác nhau.','noun'],
    ['安全','ān quán','An toàn','Safe / Safety','注意交通安全。','Chú ý an toàn giao thông.','adjective'],
    ['危险','wēi xiǎn','Nguy hiểm','Dangerous / Danger','这很危险。','Điều này rất nguy hiểm.','adjective'],
    ['可怕','kě pà','Đáng sợ / Đáng lo','Terrible / Scary','这个消息很可怕。','Tin tức này rất đáng sợ.','adjective'],
    ['可爱','kě ài','Đáng yêu / Dễ thương','Cute / Adorable','这只猫很可爱。','Con mèo này rất đáng yêu.','adjective'],
    ['来自','lái zì','Đến từ / Xuất phát từ','Come from / Be from','他来自上海。','Anh ấy đến từ Thượng Hải.','verb'],
  ]},
  { lesson:'Hành vi & Thái độ sống', words:[
    ['爱惜','ài xī','Quý trọng / Tiết kiệm (giữ gìn)','Cherish / Take care of','爱惜粮食。','Quý trọng lương thực.','verb'],
    ['尊敬','zūn jìng','Kính trọng / Tôn kính','Respect / Revere','尊敬老师。','Kính trọng thầy cô.','verb'],
    ['帮助','bāng zhù','Giúp đỡ','Help / Assist','互相帮助。','Giúp đỡ lẫn nhau.','verb'],
    ['关注','guān zhù','Quan tâm / Theo dõi','Pay attention to / Follow','关注新闻动态。','Theo dõi tin tức thời sự.','verb'],
    ['坚持不懈','jiān chí bú xiè','Kiên trì không ngừng','Persist unrelentingly','坚持不懈地努力。','Kiên trì không ngừng cố gắng.','verb'],
    ['积累','jī lěi','Tích lũy / Tích góp','Accumulate / Build up','慢慢积累经验。','Từ từ tích lũy kinh nghiệm.','verb'],
    ['珍惜','zhēn xī','Trân trọng / Quý báu','Treasure / Value','珍惜时间。','Trân trọng thời gian.','verb'],
    ['经历','jīng lì','Trải qua / Kinh nghiệm','Experience / Go through','经历了很多困难。','Đã trải qua nhiều khó khăn.','verb'],
    ['承认','chéng rèn','Thừa nhận / Công nhận','Admit / Acknowledge','我承认我错了。','Tôi thừa nhận tôi đã sai.','verb'],
    ['反思','fǎn sī','Phản tư / Suy nghĩ lại','Reflect / Introspect','做事要反思。','Làm việc phải phản tư.','verb'],
    ['克制','kè zhì','Kiềm chế / Tự chủ','Restrain / Control oneself','克制自己的情绪。','Kiềm chế cảm xúc bản thân.','verb'],
    ['感激','gǎn jī','Biết ơn / Cảm kích','Grateful / Appreciate','我很感激你的帮助。','Tôi rất biết ơn sự giúp đỡ của bạn.','verb'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let total2=0, total3=0;

    // HSK2
    for(const {lesson,words} of hsk2Patches){
      const [ls]=await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[lesson,'HSK2']);
      if(!ls.length){console.log(`  ⚠ HSK2 không tìm thấy: ${lesson}`);continue;}
      const lid=ls[0].id;
      for(const [h,p,vi,en,exZh,exVi,type] of words){
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length)continue;
        await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK2',type]);
        total2++;
      }
    }

    // HSK3
    for(const {lesson,words} of hsk3Patches){
      const [ls]=await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[lesson,'HSK3']);
      if(!ls.length){console.log(`  ⚠ HSK3 không tìm thấy: ${lesson}`);continue;}
      const lid=ls[0].id;
      for(const [h,p,vi,en,exZh,exVi,type] of words){
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length)continue;
        await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK3',type]);
        total3++;
      }
    }

    await conn.commit();

    const [all]=await conn.query(`
      SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu
      FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id
      GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let grand=0;
    console.log('\n📊 Tổng kết sau khi hoàn thiện HSK1-3:');
    const targets={HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
    all.forEach(r=>{
      const t=targets[r.hsk_level]||0;
      const ok = r.tu>=t?'✅':`⏳(-${t-r.tu})`;
      console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${ok}`);
      grand+=Number(r.tu);
    });
    console.log(`   ══ TỔNG: ${grand} từ`);
    console.log(`\n   HSK2 thêm: +${total2} từ | HSK3 thêm: +${total3} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
