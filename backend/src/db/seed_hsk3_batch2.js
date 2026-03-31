// seed_hsk3_batch2.js — HSK3 mở rộng (batch 2/3): Xã hội & Cuộc sống
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Gia đình & Quan hệ xã hội nâng cao', title_zh:'家庭与社会关系进阶', level:'HSK3', order:20, words:[
    ['亲戚','qīn qi','Họ hàng / Thân thích','Relative / Kin','过节走亲戚。','Ngày lễ đi thăm họ hàng.','noun'],
    ['邻居','lín jū','Hàng xóm','Neighbor','我的邻居很友好。','Hàng xóm của tôi rất thân thiện.','noun'],
    ['同事','tóng shì','Đồng nghiệp','Colleague / Coworker','我和同事关系很好。','Tôi có quan hệ tốt với đồng nghiệp.','noun'],
    ['关系','guān xì','Quan hệ / Mối quan hệ','Relationship / Connection','我们的关系很好。','Mối quan hệ của chúng tôi rất tốt.','noun'],
    ['关心','guān xīn','Quan tâm / Chăm sóc','Care about / Show concern','他很关心我。','Anh ấy rất quan tâm đến tôi.','verb'],
    ['帮忙','bāng máng','Giúp đỡ (nói chung)','Help out / Give a hand','你能帮忙吗？','Bạn có thể giúp không?','verb'],
    ['礼物','lǐ wù','Quà tặng / Lễ vật','Gift / Present','我送你一个礼物。','Tôi tặng bạn một món quà.','noun'],
    ['请客','qǐng kè','Mời khách / Đãi khách','Treat (someone) / Host guests','今天我请客。','Hôm nay tôi đãi khách.','verb'],
    ['热情','rè qíng','Nhiệt tình / Nồng nhiệt','Enthusiastic / Warm','他待人很热情。','Anh ấy đối xử với người rất nồng nhiệt.','adjective'],
    ['尊重','zūn zhòng','Tôn trọng','Respect','互相尊重很重要。','Tôn trọng lẫn nhau rất quan trọng.','verb'],
    ['礼貌','lǐ mào','Lịch sự / Lễ độ','Polite / Courtesy','他很有礼貌。','Anh ấy rất lịch sự.','adjective'],
    ['分手','fēn shǒu','Chia tay','Break up / Part ways','他们分手了。','Họ đã chia tay.','verb'],
  ]},
  { title:'Công việc & Nghề nghiệp nâng cao', title_zh:'工作与职业进阶', level:'HSK3', order:21, words:[
    ['职业','zhí yè','Nghề nghiệp / Sự nghiệp','Profession / Career','你的职业是什么？','Nghề nghiệp của bạn là gì?','noun'],
    ['简历','jiǎn lì','Sơ yếu lý lịch / CV','Resume / CV','发送简历。','Gửi sơ yếu lý lịch.','noun'],
    ['面试','miàn shì','Phỏng vấn','Interview','明天有面试。','Ngày mai có phỏng vấn.','noun'],
    ['工资','gōng zī','Lương / Tiền công','Salary / Wage','这份工作工资高。','Công việc này lương cao.','noun'],
    ['加班','jiā bān','Làm thêm giờ','Work overtime','今晚要加班。','Tối nay phải làm thêm.','verb'],
    ['出差','chū chāi','Đi công tác','Go on business trip','他去北京出差了。','Anh ấy đi công tác Bắc Kinh.','verb'],
    ['合同','hé tong','Hợp đồng','Contract','签了合同。','Ký hợp đồng rồi.','noun'],
    ['项目','xiàng mù','Dự án / Hạng mục','Project / Item','我负责这个项目。','Tôi phụ trách dự án này.','noun'],
    ['成功','chéng gōng','Thành công','Success / Succeed','祝你成功！','Chúc bạn thành công!','verb'],
    ['失败','shī bài','Thất bại','Fail / Failure','失败是成功之母。','Thất bại là mẹ thành công.','verb'],
    ['经验','jīng yàn','Kinh nghiệm','Experience','他工作经验丰富。','Anh ấy có kinh nghiệm công việc phong phú.','noun'],
    ['能力','néng lì','Năng lực / Khả năng','Ability / Capability','提高自己的能力。','Nâng cao năng lực bản thân.','noun'],
  ]},
  { title:'Giao thông & Du lịch nâng cao', title_zh:'交通与旅行进阶', level:'HSK3', order:22, words:[
    ['行李','xíng li','Hành lý','Luggage / Baggage','行李太重了。','Hành lý nặng quá.','noun'],
    ['护照','hù zhào','Hộ chiếu','Passport','护照放好了吗？','Hộ chiếu để cẩn thận chưa?','noun'],
    ['签证','qiān zhèng','Visa','Visa','申请签证。','Xin cấp visa.','noun'],
    ['航班','háng bān','Chuyến bay','Flight','我的航班几点起飞？','Chuyến bay của tôi mấy giờ cất cánh?','noun'],
    ['预订','yù dìng','Đặt trước / Đặt chỗ','Book / Reserve','预订酒店房间。','Đặt phòng khách sạn.','verb'],
    ['导游','dǎo yóu','Hướng dẫn viên du lịch','Tour guide','我们需要一个导游。','Chúng ta cần một hướng dẫn viên.','noun'],
    ['景色','jǐng sè','Cảnh đẹp / Phong cảnh','Scenery / Landscape','这里景色很美。','Phong cảnh nơi đây rất đẹp.','noun'],
    ['拍照','pāi zhào','Chụp ảnh','Take photo','在这里拍照吗？','Chụp ảnh ở đây nhé?','verb'],
    ['地图','dì tú','Bản đồ','Map','用地图找路。','Dùng bản đồ để tìm đường.','noun'],
    ['迷路','mí lù','Lạc đường','Get lost','我迷路了。','Tôi bị lạc đường rồi.','verb'],
    ['交通','jiāo tōng','Giao thông','Traffic / Transportation','北京交通很堵。','Giao thông Bắc Kinh rất kẹt.','noun'],
    ['堵车','dǔ chē','Kẹt xe','Traffic jam','今天堵车严重。','Hôm nay kẹt xe nghiêm trọng.','verb'],
  ]},
  { title:'Thể thao & Sở thích nâng cao', title_zh:'体育与兴趣爱好进阶', level:'HSK3', order:23, words:[
    ['爱好','ài hào','Sở thích','Hobby / Interest','你有什么爱好？','Bạn có sở thích gì?','noun'],
    ['比赛','bǐ sài','Cuộc thi / Trận đấu','Competition / Match','明天有比赛。','Ngày mai có trận đấu.','noun'],
    ['冠军','guàn jun','Vô địch','Champion','他是世界冠军。','Anh ấy là nhà vô địch thế giới.','noun'],
    ['训练','xùn liàn','Huấn luyện / Luyện tập','Train / Practice','每天坚持训练。','Kiên trì luyện tập mỗi ngày.','verb'],
    ['教练','jiào liàn','Huấn luyện viên','Coach / Trainer','他是我的教练。','Anh ấy là huấn luyện viên của tôi.','noun'],
    ['输','shū','Thua','Lose (game/bet)','我们输了比赛。','Chúng tôi đã thua trận.','verb'],
    ['赢','yíng','Thắng','Win','我们赢了！','Chúng ta thắng rồi!','verb'],
    ['运动员','yùn dòng yuán','Vận động viên','Athlete / Player','他是职业运动员。','Anh ấy là vận động viên chuyên nghiệp.','noun'],
    ['钢琴','gāng qín','Đàn piano','Piano','她在弹钢琴。','Cô ấy đang chơi piano.','noun'],
    ['画画','huà huà','Vẽ tranh','Draw / Paint','我喜欢画画。','Tôi thích vẽ tranh.','verb'],
    ['摄影','shè yǐng','Nhiếp ảnh','Photography','摄影是我的爱好。','Nhiếp ảnh là sở thích của tôi.','noun'],
    ['收藏','shōu cáng','Sưu tập / Bộ sưu tập','Collect / Collection','他收藏了很多邮票。','Anh ấy sưu tập rất nhiều tem thư.','verb'],
  ]},
  { title:'Thời gian & Sự kiện cuộc sống', title_zh:'时间与生活事件', level:'HSK3', order:24, words:[
    ['以前','yǐ qián','Trước đây / Trước kia','Before / Previously','以前我住在农村。','Trước đây tôi sống ở nông thôn.','noun'],
    ['以后','yǐ hòu','Sau này / Về sau','After / In the future','以后有机会再来。','Sau này có cơ hội lại đến.','noun'],
    ['最近','zuì jìn','Gần đây / Dạo gần đây','Recently / Lately','最近你怎么样？','Dạo gần đây bạn thế nào?','adverb'],
    ['然后','rán hòu','Sau đó / Rồi','Then / After that','先吃饭，然后学习。','Ăn cơm trước, rồi học bài.','conjunction'],
    ['于是','yú shì','Vì vậy / Do đó (ngay sau đó)','So / Therefore (then)','他很饿，于是去吃饭。','Anh ấy rất đói, vì vậy đi ăn.','conjunction'],
    ['一直','yī zhí','Mãi / Luôn / Thẳng','Always / Straight / Continuously','我一直等你。','Tôi đã chờ bạn mãi.','adverb'],
    ['越来越','yuè lái yuè','Ngày càng','More and more / Increasingly','天气越来越热了。','Thời tiết ngày càng nóng hơn.','adverb'],
    ['互相','hù xiāng','Lẫn nhau / Qua lại','Mutually / Each other','互相帮助。','Giúp đỡ lẫn nhau.','adverb'],
    ['终于','zhōng yú','Cuối cùng','Finally / At long last','终于放假了！','Cuối cùng được nghỉ rồi!','adverb'],
    ['已经','yǐ jīng','Đã (rồi)','Already','他已经走了。','Anh ấy đã đi rồi.','adverb'],
    ['再次','zài cì','Một lần nữa','Once again / Another time','请再次确认。','Hãy xác nhận lại một lần nữa.','adverb'],
    ['从来','cóng lái','Từ trước đến nay','All along / Never (with negative)','我从来不说谎。','Tôi không bao giờ nói dối.','adverb'],
  ]},
  { title:'Tính cách & Phẩm chất con người', title_zh:'性格与品质', level:'HSK3', order:25, words:[
    ['勇敢','yǒng gǎn','Dũng cảm / Can đảm','Brave / Courageous','他很勇敢。','Anh ấy rất dũng cảm.','adjective'],
    ['诚实','chéng shí','Thành thật / Trung thực','Honest','做人要诚实。','Làm người phải thành thật.','adjective'],
    ['善良','shàn liáng','Lương thiện / Tốt bụng','Kind-hearted / Goodhearted','她很善良。','Cô ấy rất tốt bụng.','adjective'],
    ['温柔','wēn róu','Dịu dàng / Nhu mì','Gentle / Tender','她说话很温柔。','Cô ấy nói chuyện rất dịu dàng.','adjective'],
    ['积极','jī jí','Tích cực / Chủ động','Positive / Active / Proactive','保持积极的态度。','Giữ thái độ tích cực.','adjective'],
    ['开朗','kāi lǎng','Vui vẻ / Cởi mở','Cheerful / Outgoing','她性格很开朗。','Tính cách cô ấy rất vui vẻ.','adjective'],
    ['害羞','hài xiū','Xấu hổ / E thẹn','Shy / Bashful','他很害羞。','Anh ấy rất e thẹn.','adjective'],
    ['骄傲','jiāo ào','Kiêu ngạo / Tự hào','Proud / Arrogant','他有点骄傲。','Anh ấy hơi kiêu ngạo.','adjective'],
    ['谦虚','qiān xū','Khiêm tốn','Modest / Humble','要谦虚，不要自满。','Hãy khiêm tốn, đừng tự mãn.','adjective'],
    ['耐心','nài xīn','Kiên nhẫn','Patient / Patience','他工作很有耐心。','Anh ấy làm việc rất kiên nhẫn.','adjective'],
    ['马虎','mǎ hu','Cẩu thả / Bất cẩn','Careless / Sloppy','做事不能马虎。','Làm việc không được cẩu thả.','adjective'],
    ['认真','rèn zhēn','Nghiêm túc / Cẩn thận','Serious / Conscientious','学习要认真。','Học tập phải nghiêm túc.','adjective'],
  ]},
  { title:'Tiền bạc & Ngân hàng', title_zh:'金钱与银行', level:'HSK3', order:26, words:[
    ['存钱','cún qián','Gửi tiền / Tiết kiệm','Save money / Deposit','我每月存一点钱。','Tôi tiết kiệm một ít tiền mỗi tháng.','verb'],
    ['取钱','qǔ qián','Rút tiền','Withdraw money','我去取钱。','Tôi đi rút tiền.','verb'],
    ['转账','zhuǎn zhàng','Chuyển khoản','Transfer money','用手机转账。','Chuyển khoản bằng điện thoại.','verb'],
    ['信用卡','xìn yòng kǎ','Thẻ tín dụng','Credit card','我用信用卡付款。','Tôi thanh toán bằng thẻ tín dụng.','noun'],
    ['现金','xiàn jīn','Tiền mặt','Cash','你要现金还是刷卡？','Bạn muốn tiền mặt hay quẹt thẻ?','noun'],
    ['利息','lì xi','Lãi suất / Lãi','Interest (on money)','银行利息不高。','Lãi suất ngân hàng không cao.','noun'],
    ['消费','xiāo fèi','Tiêu dùng / Chi tiêu','Consume / Spend','理性消费很重要。','Tiêu dùng hợp lý rất quan trọng.','verb'],
    ['理财','lǐ cái','Quản lý tài chính','Financial management','学会理财很重要。','Biết quản lý tài chính rất quan trọng.','verb'],
    ['购物','gòu wù','Mua sắm','Shopping','她喜欢购物。','Cô ấy thích mua sắm.','noun'],
    ['节省','jié shěng','Tiết kiệm (tiết kiệm)','Save / Economize','节省用水用电。','Tiết kiệm điện nước.','verb'],
    ['投资','tóu zī','Đầu tư','Invest / Investment','他喜欢投资股票。','Anh ấy thích đầu tư cổ phiếu.','verb'],
    ['借钱','jiè qián','Vay tiền','Borrow money','我向朋友借钱。','Tôi vay tiền từ bạn bè.','verb'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let tL=0,tW=0;
    for (const {title,title_zh,level,order,words} of lessons) {
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
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK3'`);
    console.log(`\n✅ HSK3 Batch2: +${tL} bài, +${tW} từ → HSK3 tổng: ${s.c} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
