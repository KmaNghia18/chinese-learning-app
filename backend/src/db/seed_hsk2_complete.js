// seed_hsk2_complete.js — Bổ sung từ HSK2 còn thiếu để đạt chuẩn ~300 từ tích lũy
require('dotenv').config();
const pool = require('./connection');

// [hanzi, pinyin, vi, en, ex_zh, ex_vi, type]
const newLessons = [
  {
    lesson: { title:'Vị trí & Phương hướng', title_zh:'位置和方向', desc:'Từ chỉ vị trí không gian', level:'HSK2', order:8 },
    words: [
      ['左边','zuǒ biān','Bên trái','Left side','学校在左边。','Trường học ở bên trái.','noun'],
      ['右边','yòu biān','Bên phải','Right side','超市在右边。','Siêu thị ở bên phải.','noun'],
      ['前面','qián miàn','Phía trước','In front','停车场在前面。','Bãi đỗ xe ở phía trước.','noun'],
      ['后面','hòu miàn','Phía sau','Behind','花园在后面。','Vườn hoa ở phía sau.','noun'],
      ['里面','lǐ miàn','Bên trong','Inside','里面有很多人。','Bên trong có nhiều người.','noun'],
      ['外面','wài miàn','Bên ngoài','Outside','外面在下雨。','Bên ngoài đang mưa.','noun'],
      ['上面','shàng miàn','Phía trên','Above / On top','书在桌子上面。','Sách ở trên bàn.','noun'],
      ['下面','xià miàn','Phía dưới','Below / Under','猫在椅子下面。','Mèo ở dưới ghế.','noun'],
      ['中间','zhōng jiān','Ở giữa','In the middle','学校在中间。','Trường học ở chính giữa.','noun'],
      ['附近','fù jìn','Gần đây / Lân cận','Nearby','附近有没有医院？','Gần đây có bệnh viện không?','noun'],
      ['对面','duì miàn','Đối diện','Opposite side','银行在对面。','Ngân hàng ở đối diện.','noun'],
      ['旁边','páng biān','Bên cạnh','Next to / Beside','他坐在我旁边。','Anh ấy ngồi bên cạnh tôi.','noun'],
    ]
  },
  {
    lesson: { title:'Giao thông & Di chuyển nâng cao', title_zh:'交通与出行进阶', desc:'Thêm từ vựng về đi lại', level:'HSK2', order:9 },
    words: [
      ['公共汽车','gōng gòng qì chē','Xe buýt','Bus','我坐公共汽车上班。','Tôi đi xe buýt đi làm.','noun'],
      ['火车站','huǒ chē zhàn','Ga xe lửa','Train station','火车站在哪里？','Ga xe lửa ở đâu?','noun'],
      ['地铁','dì tiě','Tàu điện ngầm','Subway / Metro','地铁比公共汽车快。','Tàu điện ngầm nhanh hơn xe buýt.','noun'],
      ['路','lù','Đường / Tuyến đường','Road / Route','这条路很长。','Con đường này rất dài.','noun'],
      ['走','zǒu','Đi bộ / Đi','Walk / Go','我们走路去吧。','Chúng ta đi bộ nhé.','verb'],
      ['到','dào','Đến / Tới','Arrive / To','我到家了。','Tôi đã về nhà rồi.','verb'],
      ['从','cóng','Từ (điểm xuất phát)','From','我从家来。','Tôi đến từ nhà.','other'],
      ['往','wǎng','Đi về phía / Hướng về','Towards','往右走。','Đi về phía bên phải.','other'],
      ['向','xiàng','Hướng / Về phía','Towards / In the direction of','向前走五分钟。','Đi thẳng về phía trước năm phút.','other'],
      ['离','lí','Cách (khoảng cách)','Away from / Distance','这里离学校很近。','Nơi này cách trường học rất gần.','other'],
      ['骑','qí','Cưỡi / Đi (xe đạp)','Ride','他骑自行车上班。','Anh ấy đạp xe đi làm.','verb'],
      ['自行车','zì xíng chē','Xe đạp','Bicycle','我喜欢骑自行车。','Tôi thích đi xe đạp.','noun'],
    ]
  },
  {
    lesson: { title:'Hoạt động thể thao & Giải trí', title_zh:'体育活动与娱乐', desc:'Thể thao và hoạt động vui chơi', level:'HSK2', order:10 },
    words: [
      ['跑步','pǎo bù','Chạy bộ','Run / Jogging','我每天早上跑步。','Tôi chạy bộ mỗi sáng.','verb'],
      ['游泳','yóu yǒng','Bơi lội','Swim','夏天我喜欢游泳。','Mùa hè tôi thích bơi.','verb'],
      ['踢足球','tī zú qiú','Đá bóng','Play soccer','周末我们踢足球。','Cuối tuần chúng ta đá bóng.','verb'],
      ['打篮球','dǎ lán qiú','Chơi bóng rổ','Play basketball','他很会打篮球。','Anh ấy chơi bóng rổ rất giỏi.','verb'],
      ['唱歌','chàng gē','Hát','Sing','她唱歌唱得很好。','Cô ấy hát rất hay.','verb'],
      ['跳舞','tiào wǔ','Nhảy múa','Dance','我不会跳舞。','Tôi không biết nhảy.','verb'],
      ['旅游','lǚ yóu','Du lịch','Travel / Tourism','我喜欢旅游。','Tôi thích du lịch.','verb'],
      ['爬山','pá shān','Leo núi','Climb mountain','假期去爬山吧。','Kỳ nghỉ hãy đi leo núi nhé.','verb'],
      ['看电影','kàn diàn yǐng','Xem phim','Watch movie','今晚去看电影吗？','Tối nay đi xem phim không?','verb'],
      ['听音乐','tīng yīn yuè','Nghe nhạc','Listen to music','我喜欢听音乐。','Tôi thích nghe nhạc.','verb'],
      ['音乐','yīn yuè','Âm nhạc','Music','音乐让我放松。','Âm nhạc giúp tôi thư giãn.','noun'],
      ['票','piào','Vé','Ticket','我买了两张电影票。','Tôi mua hai vé xem phim.','noun'],
    ]
  },
  {
    lesson: { title:'Cảm xúc & Trạng thái tâm lý', title_zh:'情感与心理状态', desc:'Từ diễn đạt cảm xúc và tâm trạng', level:'HSK2', order:11 },
    words: [
      ['快乐','kuài lè','Vui vẻ / Hạnh phúc','Happy / Joyful','生日快乐！','Chúc mừng sinh nhật!','adjective'],
      ['难过','nán guò','Buồn / Khó chịu','Sad / Feel bad','她很难过。','Cô ấy rất buồn.','adjective'],
      ['担心','dān xīn','Lo lắng','Worry','我担心你。','Tôi lo lắng cho bạn.','verb'],
      ['害怕','hài pà','Sợ hãi','Afraid / Scared','他害怕蛇。','Anh ấy sợ rắn.','verb'],
      ['生气','shēng qì','Tức giận','Angry','不要生气了。','Đừng tức giận nữa.','verb'],
      ['高兴','gāo xìng','Vui mừng','Happy / Glad','见到你很高兴。','Rất vui khi gặp bạn.','adjective'],
      ['有趣','yǒu qù','Thú vị / Hay','Interesting','这本书很有趣。','Cuốn sách này rất thú vị.','adjective'],
      ['无聊','wú liáo','Buồn chán / Tẻ nhạt','Boring / Bored','今天很无聊。','Hôm nay rất chán.','adjective'],
      ['觉得','jué de','Cảm thấy / Cho rằng','Feel / Think','我觉得今天很累。','Tôi cảm thấy hôm nay rất mệt.','verb'],
      ['希望','xī wàng','Hy vọng / Mong muốn','Hope / Wish','我希望你成功。','Tôi hy vọng bạn thành công.','verb'],
      ['喜欢','xǐ huān','Thích','Like','我喜欢吃苹果。','Tôi thích ăn táo.','verb'],
      ['爱','ài','Yêu','Love','我爱我的家人。','Tôi yêu gia đình tôi.','verb'],
    ]
  },
  {
    lesson: { title:'Liên từ & Cấu trúc câu', title_zh:'连词与句型结构', desc:'Từ nối câu và cấu trúc ngữ pháp HSK2', level:'HSK2', order:12 },
    words: [
      ['但是','dàn shì','Nhưng / Tuy nhiên','But / However','我想去，但是没时间。','Tôi muốn đi, nhưng không có thời gian.','conjunction'],
      ['因为','yīn wèi','Vì / Bởi vì','Because','因为下雨，我没去。','Vì mưa, tôi không đi.','conjunction'],
      ['所以','suǒ yǐ','Nên / Cho nên','So / Therefore','所以我呆在家里。','Nên tôi ở nhà.','conjunction'],
      ['虽然','suī rán','Mặc dù / Dù','Although / Even though','虽然累，还是要坚持。','Mặc dù mệt vẫn phải kiên trì.','conjunction'],
      ['如果','rú guǒ','Nếu','If','如果下雨，就别出去。','Nếu mưa thì đừng ra ngoài.','conjunction'],
      ['一起','yì qǐ','Cùng nhau','Together','我们一起去吧。','Chúng ta cùng nhau đi nhé.','adverb'],
      ['已经','yǐ jīng','Đã (rồi)','Already','我已经吃了。','Tôi đã ăn rồi.','adverb'],
      ['终于','zhōng yú','Cuối cùng','Finally / At last','终于下班了！','Cuối cùng đã tan làm!','adverb'],
      ['再','zài','Nữa / Lại / Lần khác','Again / Then','明天再说吧。','Ngày mai nói lại nhé.','adverb'],
      ['就','jiù','Ngay / Liền / Chỉ','Then / Just / Only','我就在这里。','Tôi ngay ở đây thôi.','adverb'],
      ['还是','hái shì','Hay là / Vẫn là','Or / Still','你喝茶还是咖啡？','Bạn uống trà hay cà phê?','conjunction'],
      ['还','hái','Vẫn / Còn','Still / Also / Yet','她还没来。','Cô ấy vẫn chưa đến.','adverb'],
    ]
  },
  {
    lesson: { title:'Công việc & Học tập hàng ngày', title_zh:'日常工作与学习', desc:'Từ vựng về công việc và học tập thường ngày', level:'HSK2', order:13 },
    words: [
      ['上班','shàng bān','Đi làm','Go to work','我八点上班。','Tôi đi làm lúc 8 giờ.','verb'],
      ['下班','xià bān','Tan làm / Nghỉ làm','Get off work','几点下班？','Mấy giờ tan làm?','verb'],
      ['开始','kāi shǐ','Bắt đầu','Begin / Start','我们开始上课了。','Chúng ta bắt đầu vào học rồi.','verb'],
      ['完','wán','Xong / Hết','Finish / Done','你写完了吗？','Bạn viết xong rồi chưa?','verb'],
      ['帮助','bāng zhù','Giúp đỡ','Help','谢谢你帮助我。','Cảm ơn bạn đã giúp đỡ tôi.','verb'],
      ['努力','nǔ lì','Cố gắng / Chăm chỉ','Work hard / Effort','要努力学习。','Phải chăm chỉ học tập.','verb'],
      ['认真','rèn zhēn','Nghiêm túc / Cẩn thận','Serious / Careful','她学习很认真。','Cô ấy học tập rất nghiêm túc.','adjective'],
      ['需要','xū yào','Cần / Cần thiết','Need','我需要帮助。','Tôi cần sự giúp đỡ.','verb'],
      ['知道','zhī dào','Biết','Know','你知道吗？','Bạn có biết không?','verb'],
      ['懂','dǒng','Hiểu / Hiểu rõ','Understand','我听懂了。','Tôi đã hiểu rồi.','verb'],
      ['明白','míng bái','Hiểu rõ / Rõ ràng','Understand clearly','你明白了吗？','Bạn hiểu rõ chưa?','verb'],
      ['告诉','gào sù','Nói với / Thông báo','Tell','请告诉我。','Hãy nói với tôi.','verb'],
    ]
  },
  {
    lesson: { title:'Mua sắm & Giá cả', title_zh:'购物与价格', desc:'Từ vựng mua bán và giá cả', level:'HSK2', order:14 },
    words: [
      ['贵','guì','Đắt (tiền)','Expensive','这个太贵了。','Cái này đắt quá.','adjective'],
      ['便宜','pián yí','Rẻ','Cheap / Inexpensive','这个很便宜。','Cái này rất rẻ.','adjective'],
      ['百','bǎi','Trăm (100)','Hundred','一百块钱。','Một trăm đồng.','noun'],
      ['千','qiān','Nghìn (1000)','Thousand','三千块一个月。','Ba nghìn một tháng.','noun'],
      ['万','wàn','Mười nghìn (10,000)','Ten thousand','一万块很多。','Mười nghìn rất nhiều.','noun'],
      ['付钱','fù qián','Trả tiền','Pay money','我去付钱。','Tôi đi trả tiền.','verb'],
      ['找钱','zhǎo qián','Trả lại tiền thừa','Give change','找你五块钱。','Trả lại cho bạn năm đồng.','verb'],
      ['卖','mài','Bán','Sell','这里卖水果。','Nơi này bán hoa quả.','verb'],
      ['便利店','biàn lì diàn','Cửa hàng tiện lợi','Convenience store','方便的便利店。','Cửa hàng tiện lợi gần đây.','noun'],
      ['超市','chāo shì','Siêu thị','Supermarket','我去超市买东西。','Tôi đi siêu thị mua đồ.','noun'],
      ['商场','shāng chǎng','Trung tâm mua sắm','Shopping mall','商场里有很多店。','Trong trung tâm có nhiều cửa hàng.','noun'],
      ['打折','dǎ zhé','Giảm giá','Discount','今天打折！','Hôm nay giảm giá!','verb'],
    ]
  },
  {
    lesson: { title:'Miêu tả sự vật & Tính chất', title_zh:'描述事物与性质', desc:'Tính từ mô tả sự vật', level:'HSK2', order:15 },
    words: [
      ['长','cháng','Dài','Long','这条路很长。','Con đường này rất dài.','adjective'],
      ['短','duǎn','Ngắn','Short','她的头发很短。','Tóc cô ấy rất ngắn.','adjective'],
      ['新','xīn','Mới','New','我买了新手机。','Tôi mua điện thoại mới.','adjective'],
      ['旧','jiù','Cũ','Old / Second-hand','这本书很旧了。','Cuốn sách này rất cũ.','adjective'],
      ['干净','gān jìng','Sạch sẽ','Clean','房间很干净。','Phòng rất sạch sẽ.','adjective'],
      ['脏','zāng','Bẩn / Dơ','Dirty','衣服脏了。','Quần áo bẩn rồi.','adjective'],
      ['容易','róng yì','Dễ','Easy','这个问题很容易。','Câu hỏi này rất dễ.','adjective'],
      ['难','nán','Khó','Difficult','汉语很难。','Tiếng Trung rất khó.','adjective'],
      ['重要','zhòng yào','Quan trọng','Important','这很重要。','Điều này rất quan trọng.','adjective'],
      ['有名','yǒu míng','Nổi tiếng','Famous / Well-known','这是有名的餐厅。','Đây là nhà hàng nổi tiếng.','adjective'],
      ['正确','zhèng què','Đúng / Chính xác','Correct / Right','你的回答是正确的。','Câu trả lời của bạn là đúng.','adjective'],
      ['错','cuò','Sai / Nhầm','Wrong / Incorrect','我做错了。','Tôi đã làm sai.','adjective'],
    ]
  },
  {
    lesson: { title:'Sức khỏe & Cơ thể con người', title_zh:'身体健康与人体部位', desc:'Bộ phận cơ thể và sức khỏe cơ bản', level:'HSK2', order:16 },
    words: [
      ['身体','shēn tǐ','Cơ thể / Sức khỏe','Body / Health','注意身体健康。','Hãy chú ý sức khỏe.','noun'],
      ['头','tóu','Đầu','Head','我头疼。','Tôi đau đầu.','noun'],
      ['眼睛','yǎn jīng','Mắt','Eyes','她的眼睛很大。','Mắt cô ấy rất to.','noun'],
      ['鼻子','bí zi','Mũi','Nose','他的鼻子很高。','Mũi anh ấy rất cao.','noun'],
      ['嘴','zuǐ','Miệng','Mouth','请把嘴闭上。','Hãy ngậm miệng lại.','noun'],
      ['手','shǒu','Tay','Hand','请洗手。','Hãy rửa tay.','noun'],
      ['腿','tuǐ','Chân (cẳng chân)','Leg','我的腿很酸。','Chân tôi rất mỏi.','noun'],
      ['生病','shēng bìng','Bị bệnh / Ốm','Get sick / Be ill','他生病了。','Anh ấy bị bệnh rồi.','verb'],
      ['疼','téng','Đau','Ache / Pain','肚子疼。','Đau bụng.','verb'],
      ['发烧','fā shāo','Sốt','Fever / Have a fever','孩子发烧了。','Đứa trẻ bị sốt rồi.','verb'],
      ['吃药','chī yào','Uống thuốc','Take medicine','记得吃药。','Nhớ uống thuốc nhé.','verb'],
      ['医生','yī shēng','Bác sĩ','Doctor','我去看医生。','Tôi đi gặp bác sĩ.','noun'],
    ]
  },
  {
    lesson: { title:'Đại từ & Từ nghi vấn nâng cao', title_zh:'代词与疑问词进阶', desc:'Các đại từ và từ hỏi quan trọng', level:'HSK2', order:17 },
    words: [
      ['大家','dà jiā','Mọi người / Tất cả','Everyone / Everybody','大家好！','Xin chào mọi người!','pronoun'],
      ['自己','zì jǐ','Bản thân / Tự mình','Oneself / Self','你自己决定吧。','Bạn tự quyết định đi.','pronoun'],
      ['别人','bié rén','Người khác','Other people','不要打扰别人。','Đừng làm phiền người khác.','pronoun'],
      ['每','měi','Mỗi / Từng','Each / Every','我每天练习。','Tôi luyện tập mỗi ngày.','other'],
      ['所有','suǒ yǒu','Tất cả / Mọi','All / Every','所有人都来了。','Tất cả mọi người đều đến.','other'],
      ['一些','yī xiē','Một số / Một ít','Some / A few','我有一些问题。','Tôi có một số vấn đề.','other'],
      ['许多','xǔ duō','Nhiều / Rất nhiều','Many / Lots of','许多人喜欢旅游。','Nhiều người thích du lịch.','other'],
      ['为什么','wèi shén me','Tại sao / Vì sao','Why','为什么迟到了？','Tại sao bị trễ vậy?','other'],
      ['怎么','zěn me','Như thế nào / Làm thế nào','How / What way','这个字怎么写？','Chữ này viết như thế nào?','other'],
      ['多久','duō jiǔ','Bao lâu','How long','你学了多久？','Bạn đã học bao lâu rồi?','other'],
      ['多远','duō yuǎn','Bao xa','How far','学校有多远？','Trường học cách bao xa?','other'],
      ['多少次','duō shao cì','Bao nhiêu lần','How many times','你去过几次？','Bạn đã đến bao nhiêu lần?','other'],
    ]
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let totalLessons = 0, totalWords = 0;

    for (const { lesson, words } of newLessons) {
      // Tìm hoặc tạo lesson
      let lessonId;
      const [ex] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?', [lesson.title, lesson.level]);
      if (ex.length > 0) {
        lessonId = ex[0].id;
      } else {
        const [r] = await conn.query(
          'INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',
          [lesson.title, lesson.title_zh, lesson.desc, lesson.level, lesson.order]
        );
        lessonId = r.insertId;
        totalLessons++;
        console.log(`  ✓ Bài mới: ${lesson.title} (id=${lessonId})`);
      }

      // Thêm từ
      for (const [h,p,vi,en,exZh,exVi,type] of words) {
        const [exW] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?', [h, lessonId]);
        if (exW.length > 0) continue;
        await conn.query(
          'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lessonId, h, p, vi, en, exZh, exVi, 'HSK2', type]
        );
        totalWords++;
      }
    }

    await conn.commit();
    console.log(`\n✅ HSK2 COMPLETE: +${totalLessons} bài mới, +${totalWords} từ mới`);

    // Thống kê tổng
    const [stats] = await conn.query(`
      SELECT hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu
      FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id
      GROUP BY l.hsk_level ORDER BY l.hsk_level
    `);
    console.log('\n📊 Tổng hợp:');
    let total = 0;
    stats.forEach(s => { console.log(`   ${s.hsk_level}: ${s.bai} bài, ${s.tu} từ`); total += s.tu; });
    console.log(`   TỔNG: ${total} từ`);
  } catch(e) { await conn.rollback(); console.error('❌', e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
