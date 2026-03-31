// seed_hsk3_batch5.js — HSK3 hoàn thành cuối: +130 từ để đạt 600
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Từ nối & Diễn đạt phức tạp', title_zh:'连接词与复杂表达', level:'HSK3', order:41, words:[
    ['不但','bù dàn','Không chỉ (... mà còn)','Not only (... but also)','他不但聪明，而且勤奋。','Anh ấy không chỉ thông minh mà còn chăm chỉ.','conjunction'],
    ['而且','ér qiě','Mà còn / Hơn nữa','Moreover / Furthermore','跑步不但健康，而且便宜。','Chạy bộ không chỉ tốt mà còn rẻ.','conjunction'],
    ['只有','zhǐ yǒu','Chỉ có / Chỉ khi','Only if / Only when','只有努力，才能成功。','Chỉ có cố gắng mới có thể thành công.','conjunction'],
    ['只要','zhǐ yào','Chỉ cần / Miễn là','As long as / As far as','只要你来，就好了。','Chỉ cần bạn đến là được rồi.','conjunction'],
    ['即使','jí shǐ','Ngay cả khi / Dù cho','Even if / Even though','即使下雨，我也要去。','Ngay cả khi mưa tôi vẫn phải đi.','conjunction'],
    ['除非','chú fēi','Trừ khi / Ngoại trừ','Unless','除非你道歉，否则不行。','Trừ khi bạn xin lỗi nếu không sẽ không được.','conjunction'],
    ['尽管','jǐn guǎn','Mặc dù / Dù rằng','Although / Despite','尽管很难，我还是要试。','Mặc dù rất khó tôi vẫn muốn thử.','conjunction'],
    ['然而','rán ér','Tuy nhiên / Song','However / Yet','他努力了，然而失败了。','Dù cố gắng nhưng anh ấy vẫn thất bại.','conjunction'],
    ['因此','yīn cǐ','Vì vậy / Do đó','Therefore / As a result','因此我们要认真学习。','Vì vậy chúng ta phải học nghiêm túc.','conjunction'],
    ['否则','fǒu zé','Nếu không / Bằng không','Otherwise / Or else','快点，否则会迟到。','Nhanh lên nếu không sẽ bị trễ.','conjunction'],
    ['不管','bù guǎn','Dù / Bất kể','No matter / Regardless','不管怎样，我会支持你。','Dù sao tôi vẫn ủng hộ bạn.','conjunction'],
    ['既然','jì rán','Đã vậy thì / Vì đã','Since / Given that','既然决定了，就去吧。','Đã quyết định rồi thì đi thôi.','conjunction'],
  ]},
  { title:'Từ vựng học thuật & Báo cáo', title_zh:'学术词汇与报告', level:'HSK3', order:42, words:[
    ['报告','bào gào','Báo cáo','Report / Presentation','交了报告了吗？','Nộp báo cáo chưa?','noun'],
    ['论文','lùn wén','Luận văn / Bài luận','Thesis / Essay','写毕业论文。','Viết luận văn tốt nghiệp.','noun'],
    ['作业','zuò yè','Bài tập / Bài về nhà','Homework / Assignment','做完了作业。','Làm xong bài tập rồi.','noun'],
    ['答案','dá àn','Đáp án / Câu trả lời','Answer / Solution','正确答案是什么？','Đáp án đúng là gì?','noun'],
    ['题目','tí mù','Tiêu đề / Đề bài','Title / Topic / Question','这道题目很难。','Đề bài này rất khó.','noun'],
    ['分析','fēn xī','Phân tích','Analyze / Analysis','分析这个数据。','Phân tích dữ liệu này.','verb'],
    ['总结','zǒng jié','Tổng kết / Tóm tắt','Summarize / Conclude','总结一下今天学的内容。','Tổng kết nội dung học hôm nay.','verb'],
    ['比较','bǐ jiào','So sánh','Compare / Comparatively','比较两种方法。','So sánh hai phương pháp.','verb'],
    ['调查','diào chá','Điều tra / Khảo sát','Investigate / Survey','做问卷调查。','Thực hiện khảo sát bảng câu hỏi.','verb'],
    ['说明','shuō míng','Giải thích / Trình bày','Explain / Indicate / Instructions','阅读说明书。','Đọc hướng dẫn sử dụng.','verb'],
    ['证明','zhèng míng','Chứng minh','Prove / Proof','证明这个观点。','Chứng minh quan điểm này.','verb'],
    ['提出','tí chū','Đưa ra / Nêu ra','Put forward / Raise','提出新方案。','Đưa ra phương án mới.','verb'],
  ]},
  { title:'Thực phẩm & Ẩm thực Trung Quốc', title_zh:'中国食物与饮食文化', level:'HSK3', order:43, words:[
    ['饺子','jiǎo zi','Bánh sủi cảo','Dumplings','过年吃饺子。','Tết Nguyên Đán ăn bánh sủi cảo.','noun'],
    ['包子','bāo zi','Bánh bao','Steamed bun','早餐吃包子。','Ăn bánh bao vào bữa sáng.','noun'],
    ['豆腐','dòu fu','Đậu phụ','Tofu','麻婆豆腐很好吃。','Đậu phụ sốt cay rất ngon.','noun'],
    ['炒饭','chǎo fàn','Cơm chiên','Fried rice','来份炒饭。','Cho tôi một phần cơm chiên.','noun'],
    ['汤','tāng','Canh / Súp','Soup / Broth','先喝汤吧。','Uống canh trước đi.','noun'],
    ['烤鸭','kǎo yā','Vịt quay','Roast duck','北京烤鸭很有名。','Vịt quay Bắc Kinh rất nổi tiếng.','noun'],
    ['火锅','huǒ guō','Lẩu','Hot pot','吃火锅很热闹。','Ăn lẩu rất vui nhộn.','noun'],
    ['粽子','zòng zi','Bánh tét / Bánh chưng','Rice dumpling (Zongzi)','端午节吃粽子。','Tết Đoan Ngọ ăn bánh chưng.','noun'],
    ['月饼','yuè bǐng','Bánh trung thu','Mooncake','中秋节吃月饼。','Tết Trung Thu ăn bánh trung thu.','noun'],
    ['豆浆','dòu jiāng','Sữa đậu nành','Soy milk','早饭喝豆浆。','Uống sữa đậu nành vào bữa sáng.','noun'],
    ['功夫茶','gōng fu chá','Trà công phu','Gongfu tea / Chinese tea ceremony','品味功夫茶。','Thưởng thức trà công phu.','noun'],
    ['品尝','pǐn cháng','Nếm thử / Thưởng thức','Taste / Sample','品尝各种小吃。','Thưởng thức các loại ẩm thực vặt.','verb'],
  ]},
  { title:'Thể chất & Vẻ ngoài', title_zh:'体型与外貌描述', level:'HSK3', order:44, words:[
    ['身材','shēn cái','Vóc dáng / Thân hình','Figure / Build','她身材很好。','Vóc dáng cô ấy rất đẹp.','noun'],
    ['肤色','fū sè','Màu da','Skin color','肤色不影响美丽。','Màu da không ảnh hưởng đến sắc đẹp.','noun'],
    ['头发','tóu fa','Tóc','Hair','她的头发很长。','Tóc cô ấy rất dài.','noun'],
    ['皮肤','pí fū','Da (body part)','Skin','皮肤要好好保护。','Phải bảo vệ da cẩn thận.','noun'],
    ['身高','shēn gāo','Chiều cao','Height','他的身高是一米八。','Chiều cao của anh ấy là 1m8.','noun'],
    ['体重','tǐ zhòng','Cân nặng / Thể trọng','Body weight','体重增加了。','Cân nặng tăng lên rồi.','noun'],
    ['年轻','nián qīng','Trẻ trung / Trẻ tuổi','Young','她看起来很年轻。','Cô ấy trông rất trẻ.','adjective'],
    ['成熟','chéng shú','Trưởng thành / Chín chắn','Mature / Ripe','他很成熟稳重。','Anh ấy rất chín chắn.','adjective'],
    ['帅','shuài','Đẹp trai / Điển trai','Handsome','他很帅。','Anh ấy rất đẹp trai.','adjective'],
    ['打扮','dǎ ban','Ăn mặc / Trang điểm','Dress up / Make up','她今天打扮得很漂亮。','Hôm nay cô ấy ăn mặc rất đẹp.','verb'],
    ['化妆','huà zhuāng','Trang điểm','Put on makeup','她每天化妆。','Cô ấy trang điểm mỗi ngày.','verb'],
    ['时尚','shí shàng','Thời trang / Mốt','Fashion / Trendy','她很时尚。','Cô ấy rất hợp mốt.','adjective'],
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
    console.log('\n📊 Tổng kết toàn bộ:');
    all.forEach(r=>{
      const status = r.hsk_level==='HSK3' ? (r.tu>=600?'✅':'⏳') : '';
      console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${status}`);
      grand+=Number(r.tu);
    });
    console.log(`   ══ TỔNG: ${grand} từ`);
    console.log(`\n✅ HSK3 Batch5: +${tL} bài, +${tW} từ mới`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
