// seed_hsk4_batch2.js — HSK4 mở rộng (batch 2): Y tế, Luật pháp, Truyền thông, Cảm xúc phức tạp
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Y tế & Sức khỏe toàn diện', title_zh:'全面医疗与健康', level:'HSK4', order:22, words:[
    ['症状','zhèng zhuàng','Triệu chứng','Symptom','描述你的症状。','Mô tả triệu chứng của bạn.','noun'],
    ['诊断','zhěn duàn','Chẩn đoán','Diagnose / Diagnosis','医生诊断为感冒。','Bác sĩ chẩn đoán là cảm lạnh.','verb'],
    ['治疗','zhì liáo','Chữa trị / Điều trị','Treatment / Treat','接受治疗。','Tiếp nhận điều trị.','verb'],
    ['预防','yù fáng','Phòng ngừa / Dự phòng','Prevent / Prevention','预防疾病。','Phòng ngừa bệnh tật.','verb'],
    ['传染','chuán rǎn','Lây nhiễm / Truyền nhiễm','Infect / Contagious','预防传染病。','Phòng ngừa bệnh truyền nhiễm.','verb'],
    ['免疫','miǎn yì','Miễn dịch / Miễn nhiễm','Immune / Immunity','增强免疫力。','Tăng cường sức đề kháng.','noun'],
    ['疫苗','yì miáo','Vắc-xin','Vaccine','接种疫苗。','Tiêm phòng vắc-xin.','noun'],
    ['慢性病','màn xìng bìng','Bệnh mãn tính','Chronic disease','慢性病需要长期治疗。','Bệnh mãn tính cần điều trị lâu dài.','noun'],
    ['癌症','ái zhèng','Ung thư','Cancer','早期发现癌症。','Phát hiện sớm ung thư.','noun'],
    ['心理健康','xīn lǐ jiàn kāng','Sức khỏe tâm thần','Mental health','重视心理健康。','Coi trọng sức khỏe tâm thần.','noun'],
    ['抑郁','yì yù','Trầm cảm / Ức chế','Depression / Depressed','治疗抑郁症。','Điều trị trầm cảm.','noun'],
    ['焦虑','jiāo lǜ','Lo âu / Lo lắng (bệnh)','Anxiety','缓解焦虑情绪。','Giảm nhẹ sự lo âu.','noun'],
    ['术后','shù hòu','Sau phẫu thuật','Post-surgery','术后恢复。','Phục hồi sau phẫu thuật.','noun'],
    ['康复','kāng fù','Hồi phục / Phục hồi','Recover / Rehabilitation','慢慢康复中。','Đang từng bước hồi phục.','verb'],
    ['急诊','jí zhěn','Cấp cứu (khoa)','Emergency room','去急诊室。','Đến khoa cấp cứu.','noun'],
  ]},
  { title:'Pháp luật & Quyền công dân', title_zh:'法律与公民权利', level:'HSK4', order:23, words:[
    ['律师','lǜ shī','Luật sư','Lawyer / Attorney','请一个律师。','Thuê một luật sư.','noun'],
    ['法院','fǎ yuàn','Tòa án','Court','上诉到法院。','Kháng cáo lên tòa án.','noun'],
    ['犯罪','fàn zuì','Phạm tội / Tội phạm','Crime / Commit crime','犯罪必受惩罚。','Phạm tội tất bị trừng phạt.','noun'],
    ['逮捕','dài bǔ','Bắt giữ / Bắt','Arrest','被警察逮捕了。','Bị cảnh sát bắt giữ rồi.','verb'],
    ['判决','pàn jué','Phán quyết / Bản án','Verdict / Judgment','法庭作出判决。','Tòa án đưa ra phán quyết.','noun'],
    ['辩护','biàn hù','Biện hộ / Bào chữa','Defend / Defense','为自己辩护。','Tự biện hộ cho mình.','verb'],
    ['证人','zhèng rén','Nhân chứng','Witness','请来证人。','Mời nhân chứng.','noun'],
    ['合法','hé fǎ','Hợp pháp','Legal / Lawful','合法经营。','Kinh doanh hợp pháp.','adjective'],
    ['违法','wéi fǎ','Vi phạm pháp luật / Bất hợp pháp','Illegal / Violate law','违法必究。','Vi phạm pháp luật sẽ bị truy cứu.','verb'],
    ['条款','tiáo kuǎn','Điều khoản','Clause / Term','合同条款。','Điều khoản hợp đồng.','noun'],
    ['申请','shēn qǐng','Đơn xin / Xin cấp','Apply / Application','提交申请。','Nộp đơn xin.','verb'],
    ['登记','dēng jì','Đăng ký','Register / Registration','去登记结婚。','Đi đăng ký kết hôn.','verb'],
    ['版权','bǎn quán','Bản quyền / Quyền tác giả','Copyright','保护版权。','Bảo vệ bản quyền.','noun'],
    ['隐私','yǐn sī','Quyền riêng tư','Privacy','保护个人隐私。','Bảo vệ quyền riêng tư cá nhân.','noun'],
    ['举报','jǔ bào','Tố cáo / Báo cáo (vi phạm)','Report / Tip off','举报违法行为。','Tố cáo hành vi vi phạm.','verb'],
  ]},
  { title:'Truyền thông & Ngành Báo chí', title_zh:'传媒与新闻行业', level:'HSK4', order:24, words:[
    ['媒体','méi tǐ','Phương tiện truyền thông / Báo chí','Media','各种媒体报道。','Các phương tiện truyền thông đưa tin.','noun'],
    ['记者','jì zhě','Nhà báo / Phóng viên','Journalist / Reporter','记者采访现场。','Phóng viên phỏng vấn tại hiện trường.','noun'],
    ['采访','cǎi fǎng','Phỏng vấn (báo chí)','Interview (journalism)','记者采访政府官员。','Phóng viên phỏng vấn quan chức chính phủ.','verb'],
    ['报道','bào dào','Đưa tin / Phóng sự','Report / Coverage','新闻报道。','Đưa tin tức.','verb'],
    ['热点','rè diǎn','Điểm nóng / Chủ đề nóng hổi','Hot topic / Hot spot','社会热点问题。','Vấn đề điểm nóng xã hội.','noun'],
    ['舆论','yú lùn','Dư luận','Public opinion','引发社会舆论。','Gây ra dư luận xã hội.','noun'],
    ['审查','shěn chá','Kiểm duyệt / Xem xét','Censor / Review / Audit','审查新闻内容。','Kiểm duyệt nội dung tin tức.','verb'],
    ['播出','bō chū','Phát sóng','Broadcast / Air','节目播出了。','Chương trình phát sóng rồi.','verb'],
    ['主持人','zhǔ chí rén','MC / Người dẫn chương trình','Host / Presenter','主持人很有魅力。','MC rất có sức hút.','noun'],
    ['直播','zhí bō','Phát trực tiếp / livestream','Live broadcast / Livestream','在线直播活动。','Phát trực tiếp hoạt động online.','verb'],
    ['订阅','dìng yuè','Đăng ký / Theo dõi (kênh)','Subscribe','订阅这个频道。','Đăng ký kênh này.','verb'],
    ['版面','bǎn miàn','Trang (báo) / Bố cục','Layout / Page space','报纸的版面设计。','Thiết kế bố cục trang báo.','noun'],
    ['专栏','zhuān lán','Chuyên mục / Cột báo','Column / Special feature','他写专栏文章。','Anh ấy viết bài chuyên mục.','noun'],
    ['头条','tóu tiáo','Tiêu đề trang nhất / Tin nóng','Headline / Top news','登上了头条新闻。','Lên trang nhất tin tức.','noun'],
    ['假新闻','jiǎ xīn wén','Tin giả / Fake news','Fake news','辨别假新闻。','Phân biệt tin giả.','noun'],
  ]},
  { title:'Địa lý & Khí hậu', title_zh:'地理与气候', level:'HSK4', order:25, words:[
    ['气候','qì hòu','Khí hậu','Climate','气候变化影响很大。','Biến đổi khí hậu ảnh hưởng rất lớn.','noun'],
    ['地形','dì xíng','Địa hình','Terrain / Topography','中国地形复杂。','Địa hình Trung Quốc phức tạp.','noun'],
    ['平原','píng yuán','Đồng bằng','Plain / Flatland','肥沃的平原。','Đồng bằng phì nhiêu.','noun'],
    ['沙漠','shā mò','Sa mạc','Desert','穿越沙漠很危险。','Băng qua sa mạc rất nguy hiểm.','noun'],
    ['草原','cǎo yuán','Thảo nguyên / Đồng cỏ','Grassland / Prairie','内蒙古大草原。','Thảo nguyên rộng lớn Nội Mông.','noun'],
    ['森林','sēn lín','Rừng / Rừng nhiệt đới','Forest','保护热带雨林。','Bảo vệ rừng nhiệt đới.','noun'],
    ['洋','yáng','Đại dương','Ocean','太平洋很大。','Thái Bình Dương rất rộng lớn.','noun'],
    ['大陆','dà lù','Lục địa / Đại lục','Continent','七大洲五大洋。','Bảy châu lục năm đại dương.','noun'],
    ['半岛','bàn dǎo','Bán đảo','Peninsula','朝鲜半岛。','Bán đảo Triều Tiên.','noun'],
    ['气温','qì wēn','Nhiệt độ không khí','Air temperature / Atmospheric temperature','今天气温很高。','Hôm nay nhiệt độ không khí rất cao.','noun'],
    ['降水量','jiàng shuǐ liàng','Lượng mưa','Precipitation / Rainfall','年降水量很低。','Lượng mưa hàng năm rất thấp.','noun'],
    ['全球变暖','quán qiú biàn nuǎn','Nóng lên toàn cầu','Global warming','全球变暖是大问题。','Nóng lên toàn cầu là vấn đề lớn.','noun'],
    ['自然灾害','zì rán zāi hài','Thảm họa thiên nhiên','Natural disaster','自然灾害无情。','Thảm họa thiên nhiên vô tình.','noun'],
    ['洪水','hóng shuǐ','Lũ lụt','Flood','洪水泛滥。','Lũ lụt tràn ngập.','noun'],
    ['地震','dì zhèn','Động đất','Earthquake','发生了强烈地震。','Xảy ra trận động đất mạnh.','noun'],
  ]},
  { title:'Triết học & Tư duy trừu tượng', title_zh:'哲学与抽象思维', level:'HSK4', order:26, words:[
    ['价值','jià zhí','Giá trị','Value / Worth','有价值的东西。','Thứ có giá trị.','noun'],
    ['意义','yì yì','Ý nghĩa','Meaning / Significance','生命的意义。','Ý nghĩa của cuộc sống.','noun'],
    ['本质','běn zhì','Bản chất','Nature / Essence','事物的本质。','Bản chất của sự vật.','noun'],
    ['规律','guī lǜ','Quy luật / Nguyên tắc','Law (natural) / Pattern','遵循自然规律。','Tuân theo quy luật tự nhiên.','noun'],
    ['矛盾','máo dùn','Mâu thuẫn','Contradiction / Conflict','解决矛盾。','Giải quyết mâu thuẫn.','noun'],
    ['平衡','píng héng','Cân bằng','Balance / Equilibrium','保持平衡。','Duy trì cân bằng.','noun'],
    ['转变','zhuǎn biàn','Chuyển biến / Biến đổi','Transform / Change','发生了根本性转变。','Xảy ra sự chuyển biến căn bản.','verb'],
    ['突破','tū pò','Đột phá / Vượt qua','Breakthrough / Break through','取得重大突破。','Đạt được đột phá quan trọng.','verb'],
    ['本能','běn néng','Bản năng','Instinct','本能的反应。','Phản ứng bản năng.','noun'],
    ['精神','jīng shén','Tinh thần / Tâm linh','Spirit / Spiritual','精神力量很重要。','Sức mạnh tinh thần rất quan trọng.','noun'],
    ['哲学','zhé xué','Triết học','Philosophy','研究哲学思想。','Nghiên cứu tư tưởng triết học.','noun'],
    ['伦理','lún lǐ','Đạo đức / Luân lý','Ethics / Morality','职业伦理规范。','Quy tắc đạo đức nghề nghiệp.','noun'],
    ['道德','dào dé','Đạo đức','Morality / Ethics','高尚的道德品质。','Phẩm chất đạo đức cao thượng.','noun'],
    ['真理','zhēn lǐ','Chân lý / Sự thật','Truth','追求真理。','Theo đuổi chân lý.','noun'],
    ['客观','kè guān','Khách quan','Objective / Impartial','客观评价事物。','Đánh giá sự vật một cách khách quan.','adjective'],
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
          [lid,h,p,vi,en,exZh,exVi,'HSK4',type]);
        tW++;
      }
    }
    await conn.commit();
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK4'`);
    console.log(`\n✅ HSK4 Batch2: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
