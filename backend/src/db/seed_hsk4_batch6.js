// seed_hsk4_batch6.js — HSK4 batch 6+7: Tiêu dùng, Y tế cộng đồng, Giáo dục trẻ em, Ngành nghề, Ngôn ngữ & Tư duy, Văn hóa đại chúng
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Tiêu dùng thông minh & Thương mại điện tử', title_zh:'智慧消费与电子商务', level:'HSK4', order:44, words:[
    ['电商','diàn shāng','Thương mại điện tử / E-commerce','E-commerce','电商平台购物。','Mua sắm trên nền tảng thương mại điện tử.','noun'],
    ['网购','wǎng gòu','Mua sắm online','Online shopping','网购越来越方便。','Mua sắm online ngày càng tiện lợi.','verb'],
    ['下单','xià dān','Đặt đơn hàng','Place an order','在线下单购买。','Đặt mua trực tuyến.','verb'],
    ['物流','wù liú','Hậu cần / Logistics','Logistics / Shipping','物流配送很快。','Giao hàng logistics rất nhanh.','noun'],
    ['退款','tuì kuǎn','Hoàn tiền','Refund','申请退款。','Yêu cầu hoàn tiền.','noun'],
    ['优惠券','yōu huì quàn','Phiếu giảm giá / Coupon','Coupon / Discount voucher','使用优惠券。','Sử dụng phiếu giảm giá.','noun'],
    ['秒杀','miǎo shā','Flash sale / Seckill','Flash sale','参加秒杀活动。','Tham gia flash sale.','noun'],
    ['差评','chā píng','Đánh giá xấu / Bình luận tiêu cực','Negative review / Bad rating','收到了差评。','Nhận được đánh giá xấu.','noun'],
    ['好评率','hǎo píng lǜ','Tỷ lệ đánh giá tốt','Good rating rate','好评率百分之九十九。','Tỷ lệ đánh giá tốt 99%.','noun'],
    ['积分','jī fēn','Điểm tích lũy','Points / Credits','积累会员积分。','Tích lũy điểm thành viên.','noun'],
    ['订单','dìng dān','Đơn hàng','Order','查询订单状态。','Tra cứu trạng thái đơn hàng.','noun'],
    ['售后','shòu hòu','Dịch vụ hậu mãi','After-sales service','售后服务很好。','Dịch vụ hậu mãi rất tốt.','noun'],
  ]},
  { title:'Y tế cộng đồng & Dịch tễ học', title_zh:'公共卫生与流行病学', level:'HSK4', order:45, words:[
    ['疫情','yì qíng','Dịch bệnh / Tình hình dịch','Epidemic situation / Pandemic','控制疫情蔓延。','Kiểm soát sự lây lan dịch bệnh.','noun'],
    ['隔离','gé lí','Cách ly / Cô lập','Quarantine / Isolate','进行隔离观察。','Thực hiện cách ly theo dõi.','verb'],
    ['口罩','kǒu zhào','Khẩu trang','Face mask','佩戴口罩防病。','Đeo khẩu trang phòng bệnh.','noun'],
    ['消毒液','xiāo dú yè','Dung dịch sát khuẩn','Disinfectant liquid','用消毒液杀菌。','Dùng dung dịch sát khuẩn diệt khuẩn.','noun'],
    ['流行病','liú xíng bìng','Bệnh dịch / Dịch lưu hành','Epidemic disease','防控流行病传播。','Phòng chống lây lan dịch bệnh lưu hành.','noun'],
    ['病原体','bìng yuán tǐ','Mầm bệnh / Pathogen','Pathogen','消灭病原体。','Tiêu diệt mầm bệnh.','noun'],
    ['抗体','kàng tǐ','Kháng thể','Antibody','产生抗体。','Tạo ra kháng thể.','noun'],
    ['群体免疫','qún tǐ miǎn yì','Miễn dịch cộng đồng','Herd immunity','实现群体免疫。','Đạt miễn dịch cộng đồng.','noun'],
    ['公共卫生','gōng gòng wèi shēng','Y tế công cộng','Public health','加强公共卫生。','Tăng cường y tế công cộng.','noun'],
    ['院感','yuàn gǎn','Nhiễm khuẩn bệnh viện','Hospital-based infection','预防和控制院感。','Phòng ngừa và kiểm soát nhiễm khuẩn BV.','noun'],
    ['医疗资源','yī liáo zī yuán','Tài nguyên y tế','Medical resources','合理分配医疗资源。','Phân bổ hợp lý tài nguyên y tế.','noun'],
    ['心理援助','xīn lǐ yuán zhù','Hỗ trợ tâm lý','Psychological support','提供心理援助。','Cung cấp hỗ trợ tâm lý.','noun'],
  ]},
  { title:'Giáo dục trẻ em & Nuôi dạy con', title_zh:'儿童教育与育儿', level:'HSK4', order:46, words:[
    ['早教','zǎo jiào','Giáo dục sớm','Early childhood education','重视早教启蒙。','Coi trọng giáo dục khai sáng sớm.','noun'],
    ['启蒙','qǐ méng','Khai sáng / Khai mở','Enlighten / Enlightenment','启蒙教育很重要。','Giáo dục khai sáng rất quan trọng.','verb'],
    ['兴趣班','xìng qù bān','Lớp ngoại khóa sở thích','Interest class / Enrichment class','报了多个兴趣班。','Đăng ký nhiều lớp ngoại khóa sở thích.','noun'],
    ['培养','péi yǎng','Bồi dưỡng / Đào tạo','Cultivate / Nurture / Train','培养孩子的能力。','Bồi dưỡng năng lực của trẻ.','verb'],
    ['鼓励','gǔ lì','Khích lệ / Cổ vũ','Encourage','多鼓励孩子。','Thường xuyên khích lệ con cái.','verb'],
    ['惩罚','chéng fá','Trừng phạt','Punish / Punishment','过度惩罚有害。','Trừng phạt quá mức có hại.','verb'],
    ['青春期','qīng chūn qī','Tuổi dậy thì / Thanh thiếu niên','Adolescence / Puberty','青春期的孩子。','Trẻ em trong tuổi dậy thì.','noun'],
    ['叛逆','pàn nì','Nổi loạn / Phản nghịch','Rebellious / Defiant','叛逆期的孩子。','Đứa trẻ trong giai đoạn nổi loạn.','adjective'],
    ['沉迷','chén mí','Đam mê quá mức / Nghiện','Addicted / Obsessed','沉迷游戏影响学习。','Nghiện game ảnh hưởng học tập.','verb'],
    ['学前教育','xué qián jiào yù','Giáo dục mầm non','Preschool education','加强学前教育。','Tăng cường giáo dục mầm non.','noun'],
    ['素质教育','sù zhì jiào yù','Giáo dục toàn diện','Quality education','推行素质教育。','Thực hiện giáo dục toàn diện.','noun'],
    ['应试教育','yìng shì jiào yù','Giáo dục kiểm tra / Giáo dục thi cử','Exam-oriented education','批评应试教育。','Phê phán giáo dục thi cử.','noun'],
  ]},
  { title:'Ngành nghề & Tương lai việc làm', title_zh:'行业与就业前景', level:'HSK4', order:47, words:[
    ['行业','háng yè','Ngành nghề / Lĩnh vực','Industry / Sector','你在哪个行业工作？','Bạn làm việc trong ngành nào?','noun'],
    ['创业','chuàng yè','Khởi nghiệp','Start a business / Entrepreneurship','年轻人热衷创业。','Người trẻ hăng hái khởi nghiệp.','verb'],
    ['自由职业','zì yóu zhí yè','Làm tự do / Freelance','Freelancer','做自由职业。','Làm freelancer.','noun'],
    ['零工经济','líng gōng jīng jì','Kinh tế việc làm tự do','Gig economy','零工经济时代。','Thời đại kinh tế làm tự do.','noun'],
    ['人工智能工程师','rén gōng zhì néng gōng chéng shī','Kỹ sư AI','AI engineer','培养人工智能工程师。','Đào tạo kỹ sư AI.','noun'],
    ['数据分析师','shù jù fēn xī shī','Nhà phân tích dữ liệu','Data analyst','招聘数据分析师。','Tuyển dụng nhà phân tích dữ liệu.','noun'],
    ['就业率','jiù yè lǜ','Tỷ lệ có việc làm','Employment rate','提高高校就业率。','Nâng cao tỷ lệ có việc làm của SV.','noun'],
    ['薪资','xīn zī','Tiền lương / Thù lao','Salary / Remuneration','提高最低薪资。','Tăng mức lương tối thiểu.','noun'],
    ['内推','nèi tuī','Giới thiệu nội bộ (việc làm)','Internal referral (job)','通过内推获得面试。','Được phỏng vấn qua giới thiệu nội bộ.','noun'],
    ['跳槽','tiào cáo','Nhảy việc / Chuyển công ty','Job-hop / Switch jobs','他频繁跳槽。','Anh ấy thường xuyên nhảy việc.','verb'],
    ['外包','wài bāo','Thuê ngoài / Gia công','Outsource / Subcontract','工作外包给第三方。','Thuê ngoài việc cho bên thứ ba.','verb'],
    ['兼职','jiān zhí','Làm bán thời gian / Part-time','Part-time job','大学生做兼职。','Sinh viên làm bán thời gian.','verb'],
  ]},
  { title:'Văn hóa đại chúng & Giải trí hiện đại', title_zh:'流行文化与现代娱乐', level:'HSK4', order:48, words:[
    ['流行文化','liú xíng wén huà','Văn hóa đại chúng','Pop culture','年轻人热爱流行文化。','Người trẻ yêu thích văn hóa đại chúng.','noun'],
    ['偶像','ǒu xiàng','Thần tượng','Idol','追逐明星偶像。','Theo đuổi thần tượng minh tinh.','noun'],
    ['粉丝','fěn sī','Fan hâm mộ','Fan','他有很多粉丝。','Anh ấy có rất nhiều fan.','noun'],
    ['网红','wǎng hóng','Người nổi tiếng mạng / KOL','Internet celebrity','成为网红。','Trở thành người nổi tiếng mạng.','noun'],
    ['直播带货','zhí bō dài huò','Bán hàng livestream','Livestream selling','网红直播带货。','KOL bán hàng qua livestream.','noun'],
    ['综艺节目','zōng yì jié mù','Chương trình giải trí tổng hợp','Variety show','参加综艺节目。','Tham gia chương trình giải trí.','noun'],
    ['选秀','xuǎn xiù','Chương trình thi tuyển','Talent show / Audition','参加选秀节目。','Tham gia chương trình thi tuyển.','noun'],
    ['电竞','diàn jìng','Thể thao điện tử / Esports','Esports','电竞比赛越来越火。','Thi đấu esports ngày càng sôi nổi.','noun'],
    ['鬼畜','guǐ chù','Video ghép nhạc vui (meme loại TQ)','Chinese internet meme video','鬼畜视频很搞笑。','Video ghép nhạc rất buồn cười.','noun'],
    ['梗','gěng','Meme / Câu đùa internet','Internet meme / Joke','用了很多网络梗。','Dùng rất nhiều meme internet.','noun'],
    ['弹幕','dàn mù','Bình luận hiện lên màn hình','Bullet screen comments','看弹幕很有趣。','Xem bình luận màn hình rất thú vị.','noun'],
    ['二次元','èr cì yuán','Thế giới anime/manga / 2D culture','Anime/manga culture / 2D world','喜欢二次元文化。','Thích văn hóa anime manga.','noun'],
  ]},
  { title:'Tư duy phản biện & Lập luận', title_zh:'批判性思维与论证', level:'HSK4', order:49, words:[
    ['批判性思维','pī pàn xìng sī wéi','Tư duy phản biện','Critical thinking','培养批判性思维。','Bồi dưỡng tư duy phản biện.','noun'],
    ['论点','lùn diǎn','Luận điểm','Argument / Point','提出有力的论点。','Đưa ra luận điểm thuyết phục.','noun'],
    ['论据','lùn jù','Luận cứ / Bằng chứng','Evidence / Supporting argument','有力的论据支撑。','Luận cứ vững chắc hỗ trợ.','noun'],
    ['反驳','fǎn bó','Phản bác / Bác bỏ','Refute / Rebut','有效反驳对方论点。','Phản bác luận điểm của đối phương hiệu quả.','verb'],
    ['逻辑谬误','luó ji miù wù','Lỗi logic / Ngụy biện','Logical fallacy','识别逻辑谬误。','Nhận biết lỗi logic.','noun'],
    ['主观','zhǔ guān','Chủ quan','Subjective','避免主观判断。','Tránh phán đoán chủ quan.','adjective'],
    ['推论','tuī lùn','Suy luận / Kết luận suy ra','Inference / Deduction','从事实推论结论。','Suy luận kết luận từ sự thật.','noun'],
    ['假设前提','jiǎ shè qián tí','Giả định / Tiền đề','Assumption / Premise','质疑假设前提。','Đặt câu hỏi về giả định.','noun'],
    ['辩论','biàn lùn','Tranh luận / Biện luận','Debate / Argue','参加辩论比赛。','Tham gia cuộc thi tranh luận.','verb'],
    ['立场','lì chǎng','Lập trường / Quan điểm','Stance / Position','坚持自己的立场。','Giữ vững lập trường của mình.','noun'],
    ['权衡','quán héng','Cân nhắc / Đánh đổi','Weigh (pros and cons) / Trade-off','权衡利弊得失。','Cân nhắc lợi hại được mất.','verb'],
    ['共鸣','gòng míng','Sự đồng cảm / Tiếng vang','Resonance / Empathy','引发读者共鸣。','Gây được sự đồng cảm của độc giả.','noun'],
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

    const [all]=await conn.query(`SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let grand=0;
    const targets={HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
    console.log('\n📊 Tổng kết:');
    all.forEach(r=>{const ok=r.tu>=targets[r.hsk_level]?'✅':`⏳(${r.tu}/${targets[r.hsk_level]})`;console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${ok}`);grand+=Number(r.tu);});
    console.log(`   ══ TỔNG: ${grand} từ\n✅ Batch6+7: +${tL} bài, +${tW} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
