// seed_hsk3_batch4.js — HSK3 mở rộng (batch 4/4): Hoàn thiện đủ 600 từ
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Cảm giác & Phản ứng thể chất', title_zh:'感觉与身体反应', level:'HSK3', order:34, words:[
    ['感觉','gǎn jué','Cảm giác / Cảm nhận','Feeling / Sensation','这个感觉很好。','Cảm giác này rất tốt.','noun'],
    ['味道','wèi dao','Mùi vị / Vị','Taste / Flavor / Smell','这道菜味道很好。','Món ăn này mùi vị rất ngon.','noun'],
    ['气味','qì wèi','Mùi / Hương','Smell / Odor','这里有什么气味？','Ở đây có mùi gì vậy?','noun'],
    ['温暖','wēn nuǎn','Ấm áp','Warm','今天天气很温暖。','Hôm nay thời tiết rất ấm áp.','adjective'],
    ['凉快','liáng kuai','Mát mẻ','Cool / Pleasant (weather)','秋天很凉快。','Mùa thu rất mát mẻ.','adjective'],
    ['舒服','shū fu','Thoải mái / Dễ chịu','Comfortable','这张椅子很舒服。','Chiếc ghế này rất thoải mái.','adjective'],
    ['难受','nán shòu','Khó chịu / Đau khổ','Feel bad / Uncomfortable','我今天很难受。','Hôm nay tôi rất khó chịu.','adjective'],
    ['兴奋','xīng fèn','Hưng phấn / Phấn khích','Excited','他很兴奋。','Anh ấy rất hưng phấn.','adjective'],
    ['紧张','jǐn zhāng','Căng thẳng / Hồi hộp','Nervous / Tense','考试前我很紧张。','Trước khi thi tôi rất căng thẳng.','adjective'],
    ['放松','fàng sōng','Thư giãn / Thoải mái','Relax','周末好好放松一下。','Cuối tuần thư giãn tốt thôi.','verb'],
    ['吃惊','chī jīng','Ngạc nhiên / Kinh ngạc','Surprised / Startled','我很吃惊。','Tôi rất ngạc nhiên.','verb'],
    ['满足','mǎn zú','Thỏa mãn / Hài lòng','Satisfied / Content','我很满足现在的生活。','Tôi rất hài lòng với cuộc sống hiện tại.','adjective'],
  ]},
  { title:'Sự kiện & Lễ hội', title_zh:'活动与节庆', level:'HSK3', order:35, words:[
    ['活动','huó dòng','Hoạt động / Sự kiện','Activity / Event','学校有什么活动？','Trường học có hoạt động gì?','noun'],
    ['节日','jié rì','Ngày lễ / Lễ hội','Festival / Holiday','喜欢哪个节日？','Bạn thích ngày lễ nào?','noun'],
    ['庆祝','qìng zhù','Kỷ niệm / Ăn mừng','Celebrate','我们庆祝她的生日。','Chúng ta ăn mừng sinh nhật của cô ấy.','verb'],
    ['邀请','yāo qǐng','Mời / Thư mời','Invite / Invitation','我邀请你来参加。','Tôi mời bạn đến tham gia.','verb'],
    ['参加','cān jiā','Tham gia','Attend / Participate','我想参加这个活动。','Tôi muốn tham gia hoạt động này.','verb'],
    ['聚会','jù huì','Buổi tụ họp / Tiệc','Party / Gathering','周末有个聚会。','Cuối tuần có một buổi tụ họp.','noun'],
    ['婚礼','hūn lǐ','Đám cưới / Lễ cưới','Wedding ceremony','参加朋友的婚礼。','Tham dự đám cưới của bạn.','noun'],
    ['典礼','diǎn lǐ','Lễ điển / Buổi lễ','Ceremony','毕业典礼很庄重。','Lễ tốt nghiệp rất trang nghiêm.','noun'],
    ['假期','jià qī','Kỳ nghỉ','Holiday / Vacation','暑假去旅游。','Kỳ nghỉ hè đi du lịch.','noun'],
    ['纪念','jì niàn','Kỷ niệm / Tưởng niệm','Commemorate / Remember','纪念这个特别的日子。','Kỷ niệm ngày đặc biệt này.','verb'],
    ['春节','chūn jié','Tết Nguyên Đán (HSK3)','Chinese New Year','春节是最重要的节日。','Tết Nguyên Đán là ngày lễ quan trọng nhất.','noun'],
    ['烟火','yān huǒ','Pháo hoa','Fireworks','节日放烟火。','Ngày lễ bắn pháo hoa.','noun'],
  ]},
  { title:'Giáo dục & Phát triển bản thân', title_zh:'教育与自我发展', level:'HSK3', order:36, words:[
    ['目标','mù biāo','Mục tiêu','Goal / Target','设定一个目标。','Đặt ra một mục tiêu.','noun'],
    ['计划','jì huà','Kế hoạch','Plan','你有什么计划？','Bạn có kế hoạch gì?','noun'],
    ['方法','fāng fǎ','Phương pháp / Cách','Method / Way','找到好的学习方法。','Tìm ra phương pháp học tốt.','noun'],
    ['习惯','xí guàn','Thói quen','Habit / Custom','养成好习惯。','Hình thành thói quen tốt.','noun'],
    ['坚持','jiān chí','Kiên trì / Bền bỉ','Persist / Stick to','坚持每天学习。','Kiên trì học mỗi ngày.','verb'],
    ['放弃','fàng qì','Từ bỏ / Bỏ cuộc','Give up / Abandon','不要轻易放弃。','Không được dễ dàng từ bỏ.','verb'],
    ['克服','kè fú','Vượt qua / Khắc phục','Overcome','克服困难。','Vượt qua khó khăn.','verb'],
    ['影响','yǐng xiǎng','Ảnh hưởng / Tác động','Influence / Affect','好书影响人生。','Sách hay ảnh hưởng cuộc đời.','verb'],
    ['机会','jī huì','Cơ hội','Opportunity / Chance','抓住机会。','Nắm bắt cơ hội.','noun'],
    ['基础','jī chǔ','Cơ sở / Nền tảng','Foundation / Base','打好基础很重要。','Xây dựng nền tảng tốt rất quan trọng.','noun'],
    ['进步','jìn bù','Tiến bộ','Progress / Improvement','你进步很大。','Bạn tiến bộ rất nhiều.','verb'],
    ['总结','zǒng jié','Tổng kết / Tóm tắt','Summarize / Sum up','每天总结学到的东西。','Mỗi ngày tổng kết những gì đã học.','verb'],
  ]},
  { title:'Y tế & Cơ sở hạ tầng', title_zh:'医疗与基础设施', level:'HSK3', order:37, words:[
    ['救护车','jiù hù chē','Xe cấp cứu','Ambulance','打120叫救护车。','Gọi 120 để gọi xe cấp cứu.','noun'],
    ['急救','jí jiù','Cấp cứu','First aid / Emergency treatment','进行急救处理。','Thực hiện xử lý cấp cứu.','noun'],
    ['血型','xuè xíng','Nhóm máu','Blood type','你是什么血型？','Bạn có nhóm máu gì?','noun'],
    ['手术室','shǒu shù shì','Phòng mổ','Operating room','推进手术室。','Vào phòng mổ.','noun'],
    ['出院','chū yuàn','Xuất viện','Discharge from hospital','今天可以出院了。','Hôm nay có thể xuất viện.','verb'],
    ['住院','zhù yuàn','Nhập viện / Nằm viện','Hospitalize / Be hospitalized','他住院了一个星期。','Anh ấy nằm viện một tuần.','verb'],
    ['处方','chǔ fāng','Đơn thuốc','Prescription','医生开了处方。','Bác sĩ đã kê đơn thuốc.','noun'],
    ['消毒','xiāo dú','Khử trùng / Khử khuẩn','Disinfect / Sterilize','伤口要消毒。','Vết thương phải khử trùng.','verb'],
    ['病房','bìng fáng','Phòng bệnh nhân','Hospital ward','他在病房休息。','Anh ấy đang nghỉ ngơi ở phòng bệnh.','noun'],
    ['初诊','chū zhěn','Khám lần đầu','First visit / Initial consultation','今天来初诊的。','Hôm nay đến khám lần đầu.','noun'],
    ['化验','huà yàn','Xét nghiệm','Lab test / Chemical test','做一下血液化验。','Lấy máu xét nghiệm.','verb'],
    ['保险','bǎo xiǎn','Bảo hiểm','Insurance','买了医疗保险。','Mua bảo hiểm y tế.','noun'],
  ]},
  { title:'Hành vi & Thái độ sống', title_zh:'行为与生活态度', level:'HSK3', order:38, words:[
    ['浪费','làng fèi','Lãng phí','Waste','不要浪费食物。','Không được lãng phí thức ăn.','verb'],
    ['节约','jié yuē','Tiết kiệm / Tiết chế','Save / Economize','节约用水用电。','Tiết kiệm nước và điện.','verb'],
    ['散步','sàn bù','Đi dạo / Tản bộ','Take a walk / Stroll','饭后散步有益健康。','Đi dạo sau bữa ăn tốt cho sức khỏe.','verb'],
    ['排队','pái duì','Xếp hàng','Queue / Line up','请排队等候。','Xin hãy xếp hàng chờ đợi.','verb'],
    ['守时','shǒu shí','Đúng giờ','Punctual / On time','做人要守时。','Làm người phải đúng giờ.','verb'],
    ['遵守','zūn shǒu','Tuân thủ / Chấp hành','Obey / Abide by','遵守交通规则。','Tuân thủ luật giao thông.','verb'],
    ['保护','bǎo hù','Bảo vệ','Protect','保护环境。','Bảo vệ môi trường.','verb'],
    ['分享','fēn xiǎng','Chia sẻ','Share','与朋友分享快乐。','Chia sẻ niềm vui với bạn bè.','verb'],
    ['感谢','gǎn xiè','Cảm ơn / Biết ơn','Be grateful / Thank','我感谢你的帮助。','Tôi cảm ơn sự giúp đỡ của bạn.','verb'],
    ['道歉','dào qiàn','Xin lỗi / Tạ lỗi','Apologize','我要向你道歉。','Tôi phải xin lỗi bạn.','verb'],
    ['原谅','yuán liàng','Tha thứ / Tha lỗi','Forgive','请原谅我的错误。','Hãy tha lỗi cho lỗi lầm của tôi.','verb'],
    ['照顾','zhào gù','Chăm sóc / Trông nom','Take care of','照顾好自己。','Hãy chăm sóc bản thân tốt.','verb'],
  ]},
  { title:'Ngữ pháp & Phân tích câu', title_zh:'语法与句子分析', level:'HSK3', order:39, words:[
    ['主语','zhǔ yǔ','Chủ ngữ','Subject (grammar)','找出句子的主语。','Tìm chủ ngữ trong câu.','noun'],
    ['谓语','wèi yǔ','Vị ngữ','Predicate (grammar)','动词是谓语。','Động từ là vị ngữ.','noun'],
    ['宾语','bīn yǔ','Tân ngữ','Object (grammar)','我找到了宾语。','Tôi đã tìm ra tân ngữ.','noun'],
    ['语法','yǔ fǎ','Ngữ pháp','Grammar','学好语法很重要。','Học tốt ngữ pháp rất quan trọng.','noun'],
    ['量词','liàng cí','Lượng từ','Measure word','中文量词很多。','Tiếng Trọng có rất nhiều lượng từ.','noun'],
    ['副词','fù cí','Phó từ','Adverb','副词修饰动词。','Phó từ bổ nghĩa cho động từ.','noun'],
    ['否定','fǒu dìng','Phủ định / Phủ nhận','Negate / Denial','用不和没来否定。','Dùng 不 và 没 để phủ định.','verb'],
    ['肯定','kěn dìng','Khẳng định / Chắc chắn','Affirm / Definitely','我肯定去。','Tôi chắc chắn sẽ đi.','verb'],
    ['疑问','yí wèn','Nghi vấn / Câu hỏi','Question / Doubt','用吗来表示疑问。','Dùng 吗 để biểu thị nghi vấn.','noun'],
    ['例子','lì zi','Ví dụ','Example','举个例子。','Đưa ra một ví dụ.','noun'],
    ['段落','duàn luò','Đoạn văn','Paragraph','这篇文章有五个段落。','Bài viết này có năm đoạn văn.','noun'],
    ['标点','biāo diǎn','Dấu câu','Punctuation','正确使用标点。','Sử dụng dấu câu đúng cách.','noun'],
  ]},
  { title:'Kiến trúc & Đô thị', title_zh:'建筑与城市', level:'HSK3', order:40, words:[
    ['建筑','jiàn zhù','Kiến trúc / Công trình','Architecture / Building','这座建筑很美。','Công trình kiến trúc này rất đẹp.','noun'],
    ['大楼','dà lóu','Tòa nhà lớn','Building / Skyscraper','这栋大楼有五十层。','Tòa nhà này cao năm mươi tầng.','noun'],
    ['政府','zhèng fǔ','Chính phủ','Government','政府制定政策。','Chính phủ hoạch định chính sách.','noun'],
    ['学院','xué yuàn','Học viện / Khoa','Academy / College / School','他在医学院读书。','Anh ấy học ở học viện y.','noun'],
    ['商业区','shāng yè qū','Khu thương mại','Commercial district','上海的商业区很繁华。','Khu thương mại Thượng Hải rất sầm uất.','noun'],
    ['居民区','jū mín qū','Khu dân cư','Residential area','这里是居民区。','Đây là khu dân cư.','noun'],
    ['停车场','tíng chē chǎng','Bãi đỗ xe','Parking lot','停车场在地下。','Bãi đỗ xe ở dưới lòng đất.','noun'],
    ['十字路口','shí zì lù kǒu','Ngã tư đường','Intersection / Crossroads','在十字路口左转。','Rẽ trái ở ngã tư.','noun'],
    ['红绿灯','hóng lǜ dēng','Đèn giao thông','Traffic light','看红绿灯过马路。','Nhìn đèn giao thông khi sang đường.','noun'],
    ['斑马线','bān mǎ xiàn','Vạch kẻ đường / Vạch qua đường','Zebra crossing / Crosswalk','走斑马线过马路。','Sang đường tại vạch kẻ đường.','noun'],
    ['地下室','dì xià shì','Tầng hầm','Basement','停车场在地下室。','Bãi đỗ xe ở tầng hầm.','noun'],
    ['入口','rù kǒu','Lối vào / Cổng vào','Entrance / Entry','入口在右边。','Lối vào ở bên phải.','noun'],
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
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK3'`);
    console.log(`\n✅ HSK3 Batch4 HOÀN THÀNH: +${tL} bài, +${tW} từ → HSK3 tổng: ${s.c} từ (chuẩn 600)`);

    // Tổng kết toàn bộ
    const [all]=await conn.query(`
      SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu
      FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id
      GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let grand=0;
    console.log('\n📊 Tổng kết toàn bộ:');
    all.forEach(r=>{console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ`);grand+=Number(r.tu);});
    console.log(`   ══ TỔNG: ${grand} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
