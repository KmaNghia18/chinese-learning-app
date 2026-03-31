// seed_hsk3_batch1.js — HSK3 mở rộng (batch 1/3): Cuộc sống hàng ngày
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Đồ ăn & Nhà hàng nâng cao', title_zh:'饮食与餐厅进阶', level:'HSK3', order:13, words:[
    ['菜单','cài dān','Thực đơn','Menu','请给我看菜单。','Cho tôi xem thực đơn.','noun'],
    ['盘子','pán zi','Đĩa','Plate','把菜放在盘子里。','Cho thức ăn vào đĩa.','noun'],
    ['碗','wǎn','Bát','Bowl','我要一碗米饭。','Cho tôi một bát cơm.','noun'],
    ['筷子','kuài zi','Đũa','Chopsticks','你会用筷子吗？','Bạn biết dùng đũa không?','noun'],
    ['甜','tián','Ngọt','Sweet','这个蛋糕很甜。','Chiếc bánh này rất ngọt.','adjective'],
    ['咸','xián','Mặn','Salty','汤太咸了。','Canh mặn quá.','adjective'],
    ['辣','là','Cay','Spicy','我不吃辣的。','Tôi không ăn đồ cay.','adjective'],
    ['酸','suān','Chua','Sour','柠檬很酸。','Chanh rất chua.','adjective'],
    ['蛋糕','dàn gāo','Bánh kem','Cake','生日蛋糕很好吃。','Bánh sinh nhật rất ngon.','noun'],
    ['面条','miàn tiáo','Mì / Mì ống','Noodles','我喜欢吃面条。','Tôi thích ăn mì.','noun'],
    ['点菜','diǎn cài','Gọi món','Order food','我们可以点菜了吗？','Chúng ta có thể gọi món chưa?','verb'],
    ['饱','bǎo','No / Đã ăn no','Full (eating)','我吃饱了。','Tôi ăn no rồi.','adjective'],
  ]},
  { title:'Nhà ở & Nội thất nâng cao', title_zh:'住所与家具进阶', level:'HSK3', order:14, words:[
    ['灯','dēng','Đèn','Lamp / Light','开灯吧。','Bật đèn lên đi.','noun'],
    ['空调','kōng tiáo','Điều hòa','Air conditioner','开空调了。','Bật điều hòa rồi.','noun'],
    ['电梯','diàn tī','Thang máy','Elevator / Lift','坐电梯上楼。','Đi thang máy lên lầu.','noun'],
    ['楼','lóu','Tòa nhà / Tầng','Floor / Building','他住在三楼。','Anh ấy ở tầng ba.','noun'],
    ['层','céng','Tầng lớp','Layer / Floor','这幢楼有二十层。','Tòa nhà này có hai mươi tầng.','noun'],
    ['搬','bān','Chuyển / Dọn (nhà)','Move (furniture/home)','我要搬家了。','Tôi sắp dọn nhà rồi.','verb'],
    ['打扫','dǎ sǎo','Quét dọn / Vệ sinh','Clean / Sweep','我在打扫房间。','Tôi đang dọn phòng.','verb'],
    ['洗澡','xǐ zǎo','Tắm','Bathe / Take a shower','我每天洗澡。','Tôi tắm mỗi ngày.','verb'],
    ['刷牙','shuā yá','Đánh răng','Brush teeth','记得刷牙。','Nhớ đánh răng.','verb'],
    ['整理','zhěng lǐ','Sắp xếp / Dọn dẹp','Organize / Tidy up','整理一下桌子。','Dọn bàn lại xíu.','verb'],
    ['窗户','chuāng hu','Cửa sổ','Window','打开窗户透透气。','Mở cửa sổ cho thoáng khí.','noun'],
    ['地板','dì bǎn','Sàn nhà','Floor','地板很干净。','Sàn nhà rất sạch.','noun'],
  ]},
  { title:'Động vật & Thiên nhiên', title_zh:'动物与大自然', level:'HSK3', order:15, words:[
    ['熊猫','xióng māo','Gấu trúc','Giant panda','中国有很多熊猫。','Trung Quốc có nhiều gấu trúc.','noun'],
    ['鸟','niǎo','Chim','Bird','树上有一只鸟。','Trên cây có một con chim.','noun'],
    ['鱼','yú','Cá','Fish','这条鱼很大。','Con cá này rất lớn.','noun'],
    ['虎','hǔ','Hổ','Tiger','老虎是百兽之王。','Hổ là vua của bách thú.','noun'],
    ['海','hǎi','Biển','Sea / Ocean','我喜欢游泳在海里。','Tôi thích bơi ở biển.','noun'],
    ['河','hé','Sông','River','长江是中国最长的河。','Trường Giang là con sông dài nhất TQ.','noun'],
    ['山','shān','Núi','Mountain','爱爬山的人。','Người thích leo núi.','noun'],
    ['树','shù','Cây','Tree','公园里有很多树。','Trong công viên có nhiều cây.','noun'],
    ['草','cǎo','Cỏ','Grass','草地上有人在玩。','Có người đang chơi trên thảm cỏ.','noun'],
    ['花','huā','Hoa','Flower','这束花很漂亮。','Bó hoa này rất đẹp.','noun'],
    ['月亮','yuè liang','Mặt trăng','Moon','今晚月亮很圆。','Đêm nay trăng rất tròn.','noun'],
    ['太阳','tài yáng','Mặt trời','Sun','太阳从东边升起。','Mặt trời mọc từ phía đông.','noun'],
  ]},
  { title:'Sức khỏe & Bệnh tật', title_zh:'健康与疾病', level:'HSK3', order:16, words:[
    ['感冒','gǎn mào','Cảm lạnh / Cảm cúm','Cold / Flu','我感冒了。','Tôi bị cảm rồi.','noun'],
    ['咳嗽','késou','Ho','Cough','我一直在咳嗽。','Tôi cứ ho mãi.','verb'],
    ['过敏','guò mǐn','Dị ứng','Allergy','我对花粉过敏。','Tôi bị dị ứng với phấn hoa.','noun'],
    ['健康','jiàn kāng','Khỏe mạnh / Sức khỏe','Healthy / Health','身体健康最重要。','Sức khỏe quan trọng nhất.','adjective'],
    ['药','yào','Thuốc','Medicine','吃了药就会好。','Uống thuốc vào sẽ khỏi.','noun'],
    ['手术','shǒu shù','Phẫu thuật','Surgery / Operation','他做了一个手术。','Anh ấy đã phẫu thuật.','noun'],
    ['护士','hù shi','Y tá','Nurse','护士很耐心。','Y tá rất kiên nhẫn.','noun'],
    ['检查','jiǎn chá','Kiểm tra / Khám','Check / Inspect / Examine','去医院检查一下。','Đến bệnh viện kiểm tra xem.','verb'],
    ['疼痛','téng tòng','Đau đớn','Pain / Ache','伤口很疼痛。','Vết thương đau lắm.','noun'],
    ['休息','xiū xi','Nghỉ ngơi','Rest','好好休息吧。','Hãy nghỉ ngơi cho tốt.','verb'],
    ['营养','yíng yǎng','Dinh dưỡng','Nutrition','多吃有营养的食物。','Ăn nhiều thức ăn có dinh dưỡng.','noun'],
    ['减肥','jiǎn féi','Giảm cân','Lose weight / Diet','她在减肥。','Cô ấy đang giảm cân.','verb'],
  ]},
  { title:'Giao tiếp & Liên lạc', title_zh:'交流与联系', level:'HSK3', order:17, words:[
    ['电子邮件','diàn zǐ yóu jiàn','Thư điện tử / Email','Email','我给你发了邮件。','Tôi đã gửi email cho bạn.','noun'],
    ['短信','duǎn xìn','Tin nhắn','Text message / SMS','给我发短信吧。','Hãy nhắn tin cho tôi.','noun'],
    ['地址','dì zhǐ','Địa chỉ','Address','你的地址是什么？','Địa chỉ của bạn là gì?','noun'],
    ['声音','shēng yīn','Âm thanh / Giọng nói','Sound / Voice','他的声音很好听。','Giọng anh ấy nghe rất hay.','noun'],
    ['回答','huí dá','Trả lời / Đáp lại','Answer / Reply','请回答我的问题。','Hãy trả lời câu hỏi của tôi.','verb'],
    ['讨论','tǎo lùn','Thảo luận','Discuss / Debate','大家一起讨论。','Mọi người cùng thảo luận.','verb'],
    ['解释','jiě shì','Giải thích','Explain','请解释一下。','Hãy giải thích một chút.','verb'],
    ['表达','biǎo dá','Biểu đạt / Diễn đạt','Express','用语言表达感情。','Dùng ngôn ngữ biểu đạt cảm xúc.','verb'],
    ['描述','miáo shù','Miêu tả / Mô tả','Describe','描述一下那个地方。','Miêu tả nơi đó đi.','verb'],
    ['联系','lián xì','Liên hệ / Liên lạc','Contact / Keep in touch','保持联系。','Giữ liên lạc nhé.','verb'],
    ['翻译','fān yì','Dịch / Phiên dịch','Translate / Interpretation','帮我翻译一下。','Hãy dịch hộ tôi.','verb'],
    ['句子','jù zi','Câu (ngữ pháp)','Sentence','这个句子很长。','Câu này rất dài.','noun'],
  ]},
  { title:'Học tập & Trường đại học', title_zh:'学习与大学', level:'HSK3', order:18, words:[
    ['年级','nián jí','Lớp / Năm học','Grade / Year (school)','他是几年级？','Anh ấy học lớp mấy?','noun'],
    ['复习','fù xí','Ôn tập','Review / Revise','考试前要复习。','Trước khi thi phải ôn bài.','verb'],
    ['成绩','chéng jì','Thành tích / Điểm số','Grade / Score / Achievement','他的成绩很好。','Thành tích của anh ấy rất tốt.','noun'],
    ['聪明','cōng míng','Thông minh','Smart / Clever','这个孩子很聪明。','Đứa trẻ này rất thông minh.','adjective'],
    ['图书馆','tú shū guǎn','Thư viện','Library','我在图书馆看书。','Tôi đọc sách ở thư viện.','noun'],
    ['词典','cí diǎn','Từ điển','Dictionary','查一下词典。','Tra từ điển xem.','noun'],
    ['普通话','pǔ tōng huà','Tiếng Phổ thông','Mandarin Chinese','他的普通话很好。','Tiếng phổ thông của anh ấy rất tốt.','noun'],
    ['口语','kǒu yǔ','Khẩu ngữ / Nói','Spoken language / Oral','练习口语很重要。','Luyện khẩu ngữ rất quan trọng.','noun'],
    ['数学','shù xué','Toán học','Mathematics','数学是我最难的科目。','Toán học là môn khó nhất của tôi.','noun'],
    ['科学','kē xué','Khoa học','Science','科学改变世界。','Khoa học thay đổi thế giới.','noun'],
    ['历史','lì shǐ','Lịch sử','History','我喜欢中国历史。','Tôi thích lịch sử Trung Quốc.','noun'],
    ['打算','dǎ suàn','Dự định / Tính toán','Plan to / Intend','你打算去哪里？','Bạn dự định đi đâu?','verb'],
  ]},
  { title:'Mua sắm & Tiêu dùng nâng cao', title_zh:'购物与消费进阶', level:'HSK3', order:19, words:[
    ['超市','chāo shì','Siêu thị','Supermarket','去超市买东西。','Đi siêu thị mua đồ.','noun'],
    ['收据','shōu jù','Biên lai / Hóa đơn','Receipt','给我开收据。','Hãy xuất hóa đơn cho tôi.','noun'],
    ['换','huàn','Đổi / Thay','Exchange / Change / Replace','我想换一件。','Tôi muốn đổi một cái.','verb'],
    ['退货','tuì huò','Trả hàng','Return goods / Refund','我要退货。','Tôi muốn trả hàng.','verb'],
    ['品质','pǐn zhì','Chất lượng','Quality','这件衣服品质很好。','Chiếc áo này chất lượng rất tốt.','noun'],
    ['价格','jià gé','Giá cả','Price','价格合理吗？','Giá cả có hợp lý không?','noun'],
    ['免费','miǎn fèi','Miễn phí','Free / Complimentary','这个可以免费使用。','Cái này có thể dùng miễn phí.','adjective'],
    ['服务','fú wù','Dịch vụ','Service','这里服务很好。','Dịch vụ ở đây rất tốt.','noun'],
    ['质量','zhì liàng','Chất lượng (sản phẩm)','Quality (product)','质量比价格更重要。','Chất lượng quan trọng hơn giá cả.','noun'],
    ['满意','mǎn yì','Hài lòng / Thỏa mãn','Satisfied','我对服务很满意。','Tôi rất hài lòng với dịch vụ.','adjective'],
    ['包装','bāo zhuāng','Bao gói / Đóng gói','Packaging / Package','请帮我包装一下。','Hãy giúp tôi gói lại.','noun'],
    ['快递','kuài dì','Chuyển phát nhanh','Express delivery / Courier','我在等快递。','Tôi đang đợi chuyển phát nhanh.','noun'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let tLessons=0, tWords=0;
    for (const { title,title_zh,level,order,words } of lessons) {
      let lid;
      const [ex] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[title,level]);
      if (ex.length) { lid=ex[0].id; }
      else {
        const [r] = await conn.query('INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',
          [title,title_zh,title_zh,level,order]);
        lid=r.insertId; tLessons++;
        console.log(`  ✓ ${title} (${lid})`);
      }
      for (const [h,p,vi,en,exZh,exVi,type] of words) {
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length) continue;
        await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK3',type]);
        tWords++;
      }
    }
    await conn.commit();
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK3'`);
    console.log(`\n✅ HSK3 Batch1: +${tLessons} bài, +${tWords} từ → tổng HSK3: ${s.c} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
