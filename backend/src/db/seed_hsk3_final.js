// seed_hsk3_final.js — HSK3 patch cuối: thêm 80 từ đạt đủ 600
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Từ phủ định & Giới hạn', title_zh:'否定词与限定词', level:'HSK3', order:45, words:[
    ['从不','cóng bù','Không bao giờ (chưa từng)','Never (habitual)','我从不说谎。','Tôi không bao giờ nói dối.','adverb'],
    ['没必要','méi bì yào','Không cần thiết','No need / Unnecessary','没必要紧张。','Không cần thiết phải căng thẳng.','other'],
    ['不一定','bù yī dìng','Chưa chắc / Không nhất định','Not necessarily','他不一定对。','Anh ấy chưa chắc đúng.','adverb'],
    ['未必','wèi bì','Chưa chắc / Chưa hẳn','Not necessarily','贵的未必好。','Đắt chưa hẳn là tốt.','adverb'],
    ['到处','dào chù','Khắp nơi / Ở đâu cũng','Everywhere / All around','到处都是人。','Khắp nơi đều là người.','adverb'],
    ['随时','suí shí','Bất cứ lúc nào','Anytime / At any time','有问题随时来找我。','Có vấn đề gì bất cứ lúc nào cũng tìm tôi.','adverb'],
    ['随便','suí biàn','Tùy tiện / Tùy ý','As you like / Casually','随便你。','Tùy ý bạn.','adjective'],
    ['特意','tè yì','Đặc biệt / Cố ý','Specially / Purposely','我特意来找你。','Tôi đặc biệt đến tìm bạn.','adverb'],
    ['顺便','shùn biàn','Tiện thể / Nhân tiện','By the way / In passing','顺便帮我买瓶水。','Tiện thể mua cho tôi chai nước.','adverb'],
    ['尤其','yóu qí','Đặc biệt là / Nhất là','Especially / Particularly','我尤其喜欢冬天。','Tôi đặc biệt thích mùa đông.','adverb'],
    ['相当','xiāng dāng','Khá / Tương đương','Quite / Rather / Equivalent','他相当聪明。','Anh ấy khá thông minh.','adverb'],
    ['几乎','jī hū','Gần như / Hầu như','Almost / Nearly','我几乎忘了。','Tôi gần như quên mất.','adverb'],
  ]},
  { title:'Đặc điểm & Tình huống', title_zh:'特点与情境描述', level:'HSK3', order:46, words:[
    ['麻烦','má fan','Phiền phức / Rắc rối','Troublesome / Trouble','真麻烦！','Thật phiền phức!','adjective'],
    ['方便','fāng biàn','Tiện lợi','Convenient','这里很方便。','Nơi đây rất tiện lợi.','adjective'],
    ['复杂','fù zá','Phức tạp','Complex / Complicated','这个问题很复杂。','Vấn đề này rất phức tạp.','adjective'],
    ['简单','jiǎn dān','Đơn giản','Simple / Easy','这道题很简单。','Bài tập này rất đơn giản.','adjective'],
    ['正常','zhèng cháng','Bình thường / Bình thường','Normal / Regular','这是正常现象。','Đây là hiện tượng bình thường.','adjective'],
    ['奇怪','qí guài','Kỳ lạ / Lạ','Strange / Odd','这很奇怪。','Điều này rất kỳ lạ.','adjective'],
    ['严重','yán zhòng','Nghiêm trọng','Serious / Severe','情况很严重。','Tình hình rất nghiêm trọng.','adjective'],
    ['合适','hé shì','Phù hợp / Vừa vặn','Suitable / Appropriate','这件衣服很合适。','Chiếc áo này rất phù hợp.','adjective'],
    ['准确','zhǔn què','Chính xác / Đúng mực','Accurate / Exact','你的回答很准确。','Câu trả lời của bạn rất chính xác.','adjective'],
    ['详细','xiáng xì','Chi tiết / Tỉ mỉ','Detailed / Specific','请详细说明。','Hãy giải thích chi tiết.','adjective'],
    ['广泛','guǎng fàn','Rộng rãi / Phổ biến','Extensive / Widespread','广泛阅读。','Đọc rộng rãi.','adjective'],
    ['普遍','pǔ biàn','Phổ biến','Common / Universal','这是普遍现象。','Đây là hiện tượng phổ biến.','adjective'],
  ]},
  { title:'Hành động hàng ngày bổ sung', title_zh:'日常动作补充', level:'HSK3', order:47, words:[
    ['想起','xiǎng qǐ','Nhớ ra / Nghĩ đến','Remember / Think of','突然想起了你。','Đột nhiên nghĩ đến bạn.','verb'],
    ['忘记','wàng jì','Quên mất','Forget','我忘记了他的名字。','Tôi quên mất tên anh ấy.','verb'],
    ['记得','jì de','Nhớ / Còn nhớ','Remember','你记得我吗？','Bạn còn nhớ tôi không?','verb'],
    ['发现','fā xiàn','Phát hiện / Nhận ra','Discover / Find','我发现了一个问题。','Tôi phát hiện ra một vấn đề.','verb'],
    ['认出','rèn chū','Nhận ra (ai đó)','Recognize','我认出了他。','Tôi nhận ra anh ấy.','verb'],
    ['拿','ná','Lấy / Cầm','Take / Hold / Get','把书拿来。','Lấy sách lại đây.','verb'],
    ['放','fàng','Đặt / Để / Thả','Put / Place / Release','把书放在桌上。','Đặt sách lên bàn.','verb'],
    ['移动','yí dòng','Di chuyển / Dời chỗ','Move','轻轻移动椅子。','Nhẹ nhàng dời ghế.','verb'],
    ['保存','bǎo cún','Lưu / Bảo quản','Save / Preserve','把文件保存好。','Lưu tài liệu cẩn thận.','verb'],
    ['取消','qǔ xiāo','Hủy bỏ / Bãi bỏ','Cancel','取消预订。','Hủy đặt chỗ.','verb'],
    ['确认','què rèn','Xác nhận','Confirm / Verify','请确认信息。','Hãy xác nhận thông tin.','verb'],
    ['完成','wán chéng','Hoàn thành','Complete / Finish','任务完成了。','Nhiệm vụ đã hoàn thành.','verb'],
  ]},
  { title:'Các từ không thể thiếu HSK3', title_zh:'HSK3必备词汇补充', level:'HSK3', order:48, words:[
    ['过去','guò qù','Đi qua / Quá khứ','Go over / Pass / Past','过去的事情。','Chuyện trong quá khứ.','noun'],
    ['将来','jiāng lái','Tương lai','Future','将来你会成功。','Tương lai bạn sẽ thành công.','noun'],
    ['现在','xiàn zài','Bây giờ / Hiện tại','Now / Present','现在去还来得及。','Bây giờ đi vẫn còn kịp.','noun'],
    ['过程','guò chéng','Quá trình','Process / Course','享受学习的过程。','Hãy tận hưởng quá trình học tập.','noun'],
    ['结果','jié guǒ','Kết quả','Result / Outcome','结果很好。','Kết quả rất tốt.','noun'],
    ['原因','yuán yīn','Nguyên nhân / Lý do','Reason / Cause','原因是什么？','Nguyên nhân là gì?','noun'],
    ['目的','mù dì','Mục đích','Purpose / Goal','你的目的是什么？','Mục đích của bạn là gì?','noun'],
    ['条件','tiáo jiàn','Điều kiện','Condition / Terms','满足这个条件。','Đáp ứng điều kiện này.','noun'],
    ['问题','wèn tí','Vấn đề / Câu hỏi','Problem / Question','有什么问题吗？','Có vấn đề gì không?','noun'],
    ['优点','yōu diǎn','Ưu điểm / Điểm mạnh','Advantage / Strength','每个人都有优点。','Mỗi người đều có ưu điểm.','noun'],
    ['缺点','quē diǎn','Nhược điểm / Điểm yếu','Disadvantage / Weakness','正视自己的缺点。','Thẳng thắn đối mặt với nhược điểm.','noun'],
    ['区别','qū bié','Sự khác biệt','Difference / Distinction','有什么区别？','Có sự khác biệt gì?','noun'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let tL=0,tW=0;
    for(const {title,title_zh,level,order,words} of lessons){
      let lid;
      const [ex]=await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[title,level]);
      if(ex.length){lid=ex[0].id;}
      else{
        const [r]=await conn.query('INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',[title,title_zh,title_zh,level,order]);
        lid=r.insertId;tL++;console.log(`  ✓ ${title} (${lid})`);
      }
      for(const [h,p,vi,en,exZh,exVi,type] of words){
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length)continue;
        await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK3',type]);
        tW++;
      }
    }
    await conn.commit();

    const [all]=await conn.query(`
      SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu
      FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id
      GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let grand=0;
    console.log('\n📊 Tổng kết:');
    all.forEach(r=>{
      const targets = {HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
      const t = targets[r.hsk_level]||0;
      const ok = r.tu >= t ? '✅' : `⏳(-${t-r.tu})`;
      console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${ok}`);
      grand+=Number(r.tu);
    });
    console.log(`   ══ TỔNG: ${grand} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
