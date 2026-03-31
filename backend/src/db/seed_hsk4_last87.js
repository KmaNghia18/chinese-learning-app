// seed_hsk4_last87.js — 87 từ cuối để hoàn thành HSK4 ≥ 1200
require('dotenv').config();
const pool = require('./connection');

const batches = [
  { title:'Tâm lý cảm xúc hàng ngày', title_zh:'日常情绪心理', order:90, words:[
    ['憧憬','chōng jǐng','Mơ ước / Khao khát','Yearn for','憧憬美好未来。','Mơ ước tương lai tươi đẹp.','verb'],
    ['感慨','gǎn kǎi','Cảm khái / Bồi hồi','Sigh with feeling','感慨万千。','Bồi hồi khôn xiết.','verb'],
    ['遗憾','yí hàn','Tiếc nuối / Đáng tiếc','Regret','非常遗憾。','Rất đáng tiếc.','verb'],
    ['满足感','mǎn zú gǎn','Cảm giác thoả mãn','Sense of satisfaction','获得满足感。','Có được cảm giác thoả mãn.','noun'],
    ['挫折感','cuò zhé gǎn','Cảm giác thất vọng','Sense of frustration','克服挫折感。','Vượt qua cảm giác thất vọng.','noun'],
    ['孤独感','gū dú gǎn','Cảm giác cô đơn','Sense of loneliness','消除孤独感。','Xoá bỏ cảm giác cô đơn.','noun'],
    ['感恩','gǎn ēn','Biết ơn','Grateful','心存感恩之心。','Giữ lòng biết ơn.','verb'],
    ['宽恕','kuān shù','Tha thứ','Forgive','学会宽恕他人。','Học cách tha thứ người khác.','verb'],
    ['释放','shì fàng','Giải phóng / Xả bỏ','Release','释放内心压力。','Giải phóng áp lực nội tâm.','verb'],
    ['充实','chōng shí','Phong phú / Đầy đủ ý nghĩa','Fulfilling','生活充实快乐。','Cuộc sống phong phú vui vẻ.','adjective'],
    ['从容','cóng róng','Điềm tĩnh','Composed','处事从容淡定。','Xử lý việc một cách điềm tĩnh.','adjective'],
    ['潇洒','xiāo sǎ','Phóng khoáng','Carefree','活得潇洒自在。','Sống phóng khoáng tự tại.','adjective'],
  ]},
  { title:'Kinh tế vi mô & Người tiêu dùng', title_zh:'微观经济与消费者', order:91, words:[
    ['供求关系','gōng qiú guān xi','Quan hệ cung cầu','Supply and demand','了解供求关系。','Hiểu quan hệ cung cầu.','noun'],
    ['价格机制','jià gé jī zhì','Cơ chế giá cả','Price mechanism','价格机制调节市场。','Cơ chế giá cả điều tiết thị trường.','noun'],
    ['消费者剩余','xiāo fèi zhě shèng yú','Thặng dư tiêu dùng','Consumer surplus','增加消费者剩余。','Tăng thặng dư tiêu dùng.','noun'],
    ['边际效益','biān jì xiào yì','Lợi ích biên','Marginal utility','边际效益递减。','Lợi ích biên giảm dần.','noun'],
    ['垄断','lǒng duàn','Độc quyền','Monopoly','反对市场垄断。','Phản đối độc quyền thị trường.','noun'],
    ['寡头','guǎ tóu','Thị trường quả đầu','Oligopoly','寡头垄断市场。','Thị trường quả đầu độc quyền.','noun'],
    ['补贴','bǔ tiē','Trợ cấp / Trợ giá','Subsidy','政府补贴农业。','Chính phủ trợ giá nông nghiệp.','noun'],
    ['公共物品','gōng gòng wù pǐn','Hàng hoá công cộng','Public goods','提供公共物品。','Cung cấp hàng hoá công cộng.','noun'],
    ['信息不对称','xìn xī bù duì chèn','Thông tin bất đối xứng','Information asymmetry','解决信息不对称。','Giải quyết thông tin bất đối xứng.','noun'],
    ['消费升级','xiāo fèi shēng jí','Nâng cấp tiêu dùng','Consumption upgrade','中产阶级消费升级。','Tầng lớp trung lưu nâng cấp tiêu dùng.','noun'],
  ]},
  { title:'Phong tục & Giao tiếp văn hoá', title_zh:'习俗与文化交际', order:92, words:[
    ['握手','wò shǒu','Bắt tay','Shake hands','初次见面握手。','Lần đầu gặp mặt bắt tay.','verb'],
    ['鞠躬','jū gōng','Cúi chào','Bow (greeting)','日本人鞠躬致敬。','Người Nhật cúi chào kính trọng.','verb'],
    ['名片','míng piàn','Danh thiếp','Business card','交换名片。','Trao đổi danh thiếp.','noun'],
    ['餐桌礼仪','cān zhuō lǐ yí','Phép tắc bàn ăn','Table manners','注意餐桌礼仪。','Chú ý phép tắc bàn ăn.','noun'],
    ['敬酒','jìng jiǔ','Chúc rượu','Toast','为友谊干杯敬酒。','Nâng ly chúc rượu vì tình hữu nghị.','verb'],
    ['客套话','kè tào huà','Lời xã giao','Polite phrases','学几句客套话。','Học vài câu lời xã giao.','noun'],
    ['面子','miàn zi','Thể diện','Face (social concept)','给对方留面子。','Giữ thể diện cho đối phương.','noun'],
    ['缘分','yuán fèn','Duyên phận','Fate / Predestined relationship','相遇是一种缘分。','Gặp được nhau là một cái duyên.','noun'],
    ['知足常乐','zhī zú cháng lè','Biết đủ thường vui','Contentment brings happiness','知足常乐，心态好。','Biết đủ thường vui, tâm thái tốt.','noun'],
    ['以身作则','yǐ shēn zuò zé','Làm gương / Thân làm gương','Lead by example','以身作则影响他人。','Làm gương ảnh hưởng đến người khác.','noun'],
    ['因地制宜','yīn dì zhì yí','Tuỳ nơi mà ứng phó','Adapt to local conditions','因地制宜发展经济。','Tuỳ theo điều kiện địa phương phát triển KT.','noun'],
    ['博采众长','bó cǎi zhòng cháng','Học hỏi điểm mạnh của nhiều người','Learn from the strengths of many','博采众长，兼收并蓄。','Học hỏi điểm mạnh của mọi người.','noun'],
    ['精益求精','jīng yì qiú jīng','Luôn cầu tiến / Hoàn hảo hơn','Pursue perfection / Strive for excellence','精益求精的工匠精神。','Tinh thần thợ thủ công luôn cầu tiến.','noun'],
    ['言传身教','yán chuán shēn jiāo','Dạy bằng lời nói và hành động','Teach by word and deed','言传身教的好父母。','Cha mẹ tốt dạy bằng lời và hành động.','noun'],
    ['任重道远','rèn zhòng dào yuǎn','Nhiệm vụ nặng nề đường còn dài','The burden is heavy and the road is long','任重道远，继续努力。','Nhiệm vụ nặng đường dài, tiếp tục cố gắng.','noun'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let tL=0, tW=0;
    for(const {title,title_zh,order,words} of batches){
      let lid;
      const [ex]=await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[title,'HSK4']);
      if(ex.length){lid=ex[0].id;}
      else{
        const [r]=await conn.query('INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',
          [title,title_zh,title_zh,'HSK4',order]);
        lid=r.insertId; tL++; console.log(`  ✓ ${title} (${lid})`);
      }
      for(const [h,p,vi,en,ez,ev,t] of words){
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length) continue;
        await conn.query(
          'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,ez,ev,'HSK4',t]);
        tW++;
      }
    }
    await conn.commit();

    const [all]=await conn.query(`SELECT l.hsk_level lv, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    const targets={HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
    let grand=0;
    console.log('\n📊 Tổng kết:');
    all.forEach(r=>{
      const ok=r.tu>=targets[r.lv]?'✅':`⏳(${r.tu}/${targets[r.lv]})`;
      console.log(`   ${r.lv}: ${r.bai} bài · ${r.tu} từ ${ok}`);
      grand+=Number(r.tu);
    });
    console.log(`   ══ TỔNG: ${grand} từ`);
    console.log(`\n✅ Thêm ${tL} bài, ${tW} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
