// backend/src/db/seed_hsk3.js
// Chạy: node src/db/seed_hsk3.js
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title: 'Cuộc sống hàng ngày', title_zh: '日常生活', desc: 'Từ vựng về sinh hoạt hàng ngày', level: 'HSK3', order: 1 },
  { title: 'Nhà ở & Không gian', title_zh: '住所和空间', desc: 'Phòng ốc, đồ nội thất và vị trí', level: 'HSK3', order: 2 },
  { title: 'Giáo dục & Học tập', title_zh: '教育和学习', desc: 'Trường học, môn học và việc học', level: 'HSK3', order: 3 },
  { title: 'Sở thích & Hoạt động', title_zh: '爱好和活动', desc: 'Hoạt động giải trí và sở thích cá nhân', level: 'HSK3', order: 4 },
  { title: 'Du lịch & Địa điểm', title_zh: '旅游和地点', desc: 'Địa danh, du lịch và phương hướng', level: 'HSK3', order: 5 },
  { title: 'Thức ăn & Nhà hàng', title_zh: '饮食和饭馆', desc: 'Món ăn, nhà hàng và đặt đồ ăn', level: 'HSK3', order: 6 },
  { title: 'Thời gian & Kế hoạch', title_zh: '时间和计划', desc: 'Lịch trình, kế hoạch và thời gian', level: 'HSK3', order: 7 },
  { title: 'Con người & Ngoại hình', title_zh: '人物和外貌', desc: 'Mô tả người, ngoại hình và tính cách', level: 'HSK3', order: 8 },
  { title: 'Tự nhiên & Môi trường', title_zh: '自然和环境', desc: 'Thiên nhiên, động vật và thực vật', level: 'HSK3', order: 9 },
  { title: 'Mua sắm & Dịch vụ', title_zh: '购物和服务', desc: 'Mua sắm, dịch vụ và ngân hàng', level: 'HSK3', order: 10 },
  { title: 'Sức khỏe & Bệnh tật', title_zh: '健康和疾病', desc: 'Bệnh viện, triệu chứng và điều trị', level: 'HSK3', order: 11 },
  { title: 'Công nghệ & Truyền thông', title_zh: '科技和媒体', desc: 'Internet, điện thoại và truyền thông', level: 'HSK3', order: 12 },
];

// vocab: [lesson_idx(0-based), hanzi, pinyin, vi, en, example_zh, example_vi, type]
const vocab = [
  // Bài 1: Cuộc sống hàng ngày
  [0,'起床','qǐ chuáng','Thức dậy','Get up','我每天七点起床。','Tôi thức dậy lúc 7 giờ mỗi ngày.','verb'],
  [0,'洗澡','xǐ zǎo','Tắm','Take a shower','晚上我洗澡。','Buổi tối tôi đi tắm.','verb'],
  [0,'刷牙','shuā yá','Đánh răng','Brush teeth','早上记得刷牙。','Buổi sáng nhớ đánh răng.','verb'],
  [0,'做饭','zuò fàn','Nấu ăn','Cook','妈妈在做饭。','Mẹ đang nấu ăn.','verb'],
  [0,'扫地','sǎo dì','Quét nhà','Sweep the floor','请帮我扫地。','Hãy giúp tôi quét nhà.','verb'],
  [0,'洗衣服','xǐ yī fu','Giặt quần áo','Wash clothes','今天我洗衣服。','Hôm nay tôi giặt quần áo.','verb'],
  [0,'购物','gòu wù','Mua sắm','Shopping','周末我去购物。','Cuối tuần tôi đi mua sắm.','verb'],
  [0,'散步','sàn bù','Đi dạo','Take a walk','饭后我去散步。','Sau bữa ăn tôi đi dạo.','verb'],
  [0,'休息','xiū xi','Nghỉ ngơi','Rest','我需要休息一下。','Tôi cần nghỉ ngơi một chút.','verb'],
  [0,'准备','zhǔn bèi','Chuẩn bị','Prepare','我在准备晚饭。','Tôi đang chuẩn bị bữa tối.','verb'],
  [0,'习惯','xí guàn','Thói quen','Habit','这是我的习惯。','Đây là thói quen của tôi.','noun'],
  [0,'生活','shēng huó','Cuộc sống','Life','我的生活很幸福。','Cuộc sống của tôi rất hạnh phúc.','noun'],

  // Bài 2: Nhà ở
  [1,'房间','fáng jiān','Phòng','Room','我的房间很干净。','Phòng của tôi rất sạch.','noun'],
  [1,'厨房','chú fáng','Nhà bếp','Kitchen','厨房在左边。','Nhà bếp ở bên trái.','noun'],
  [1,'卧室','wò shì','Phòng ngủ','Bedroom','我的卧室很大。','Phòng ngủ của tôi rất lớn.','noun'],
  [1,'客厅','kè tīng','Phòng khách','Living room','我们在客厅看电视。','Chúng tôi xem TV ở phòng khách.','noun'],
  [1,'卫生间','wèi shēng jiān','Nhà vệ sinh','Bathroom','卫生间在哪里？','Nhà vệ sinh ở đâu?','noun'],
  [1,'桌子','zhuō zi','Bàn','Table','桌子上有书。','Trên bàn có sách.','noun'],
  [1,'椅子','yǐ zi','Ghế','Chair','请坐椅子。','Mời ngồi ghế.','noun'],
  [1,'床','chuáng','Giường','Bed','我的床很舒服。','Giường của tôi rất thoải mái.','noun'],
  [1,'窗户','chuāng hu','Cửa sổ','Window','窗户开着。','Cửa sổ đang mở.','noun'],
  [1,'门','mén','Cửa','Door','请关门。','Hãy đóng cửa.','noun'],
  [1,'楼','lóu','Tầng / Tòa nhà','Floor / Building','我住在三楼。','Tôi sống ở tầng ba.','noun'],
  [1,'隔壁','gé bì','Bên cạnh / Nhà hàng xóm','Next door','隔壁是超市。','Bên cạnh là siêu thị.','noun'],

  // Bài 3: Giáo dục
  [2,'作业','zuò yè','Bài tập về nhà','Homework','我做完作业了。','Tôi đã làm xong bài tập.','noun'],
  [2,'考试','kǎo shì','Kỳ thi / Thi','Exam','明天有考试。','Ngày mai có kỳ thi.','noun'],
  [2,'成绩','chéng jì','Kết quả / Điểm số','Grade / Result','我的成绩很好。','Kết quả của tôi rất tốt.','noun'],
  [2,'复习','fù xí','Ôn tập','Review / Revise','我在复习功课。','Tôi đang ôn tập bài.','verb'],
  [2,'预习','yù xí','Chuẩn bị bài trước','Preview / Prepare lesson','上课前要预习。','Trước khi học cần chuẩn bị bài.','verb'],
  [2,'笔记','bǐ jì','Ghi chú','Notes','我记了很多笔记。','Tôi đã ghi nhiều ghi chú.','noun'],
  [2,'问题','wèn tí','Câu hỏi / Vấn đề','Question / Problem','我有一个问题。','Tôi có một câu hỏi.','noun'],
  [2,'回答','huí dá','Trả lời','Answer','请回答我的问题。','Hãy trả lời câu hỏi của tôi.','verb'],
  [2,'练习','liàn xí','Luyện tập / Bài tập','Practice / Exercise','我每天练习汉字。','Tôi luyện viết chữ Hán mỗi ngày.','noun'],
  [2,'课本','kè běn','Sách giáo khoa','Textbook','忘记带课本了。','Quên mang sách giáo khoa.','noun'],
  [2,'图书馆','tú shū guǎn','Thư viện','Library','我在图书馆学习。','Tôi học ở thư viện.','noun'],
  [2,'毕业','bì yè','Tốt nghiệp','Graduate','我明年毕业。','Năm sau tôi tốt nghiệp.','verb'],

  // Bài 4: Sở thích
  [3,'爱好','ài hào','Sở thích','Hobby','你有什么爱好？','Bạn có sở thích gì?','noun'],
  [3,'唱歌','chàng gē','Hát','Sing','她唱歌很好听。','Cô ấy hát rất hay.','verb'],
  [3,'画画','huà huà','Vẽ tranh','Draw / Paint','我喜欢画画。','Tôi thích vẽ tranh.','verb'],
  [3,'弹钢琴','tán gāng qín','Chơi đàn piano','Play piano','她会弹钢琴。','Cô ấy biết chơi đàn piano.','verb'],
  [3,'摄影','shè yǐng','Chụp ảnh','Photography','摄影是我的爱好。','Nhiếp ảnh là sở thích của tôi.','noun'],
  [3,'爬山','pá shān','Leo núi','Climb mountain','周末我们去爬山。','Cuối tuần chúng ta đi leo núi.','verb'],
  [3,'打球','dǎ qiú','Đánh/chơi bóng','Play ball sports','我们去打球吧。','Chúng ta đi chơi bóng nhé.','verb'],
  [3,'钓鱼','diào yú','Câu cá','Fish / Go fishing','爷爷喜欢钓鱼。','Ông thích câu cá.','verb'],
  [3,'集邮','jí yóu','Sưu tập tem','Collect stamps','他有集邮的习惯。','Anh ấy có thói quen sưu tập tem.','verb'],
  [3,'逛街','guàng jiē','Dạo phố','Window shopping','我喜欢逛街。','Tôi thích dạo phố.','verb'],
  [3,'看小说','kàn xiǎo shuō','Đọc tiểu thuyết','Read novels','我在看小说。','Tôi đang đọc tiểu thuyết.','verb'],
  [3,'园艺','yuán yì','Làm vườn','Gardening','妈妈喜欢做园艺。','Mẹ thích làm vườn.','noun'],

  // Bài 5: Du lịch
  [4,'护照','hù zhào','Hộ chiếu','Passport','我的护照在哪？','Hộ chiếu của tôi đâu?','noun'],
  [4,'签证','qiān zhèng','Visa','Visa','我需要申请签证。','Tôi cần xin visa.','noun'],
  [4,'机场','jī chǎng','Sân bay','Airport','我去机场接你。','Tôi ra sân bay đón bạn.','noun'],
  [4,'旅馆','lǚ guǎn','Khách sạn','Hotel','这家旅馆很舒服。','Khách sạn này rất thoải mái.','noun'],
  [4,'地图','dì tú','Bản đồ','Map','请给我看地图。','Hãy cho tôi xem bản đồ.','noun'],
  [4,'景点','jǐng diǎn','Điểm du lịch','Tourist spot','这里有很多景点。','Nơi đây có nhiều điểm du lịch.','noun'],
  [4,'导游','dǎo yóu','Hướng dẫn viên','Tour guide','导游介绍这里的历史。','Hướng dẫn viên giới thiệu lịch sử nơi này.','noun'],
  [4,'行李','xíng li','Hành lý','Luggage','我的行李很重。','Hành lý của tôi rất nặng.','noun'],
  [4,'风景','fēng jǐng','Phong cảnh','Scenery','这里的风景很美。','Phong cảnh nơi đây rất đẹp.','noun'],
  [4,'博物馆','bó wù guǎn','Bảo tàng','Museum','我们去博物馆参观。','Chúng ta đi tham quan bảo tàng.','noun'],
  [4,'购物中心','gòu wù zhōng xīn','Trung tâm thương mại','Shopping mall','购物中心里有很多店。','Trong trung tâm thương mại có nhiều cửa hàng.','noun'],
  [4,'出发','chū fā','Khởi hành / Xuất phát','Depart','我们明天出发。','Chúng ta khởi hành ngày mai.','verb'],

  // Bài 6: Đồ ăn & Nhà hàng
  [5,'菜单','cài dān','Thực đơn','Menu','请给我看菜单。','Hãy cho tôi xem thực đơn.','noun'],
  [5,'点菜','diǎn cài','Gọi món','Order food','我们可以点菜了吗？','Chúng ta có thể gọi món rồi không?','verb'],
  [5,'服务员','fú wù yuán','Nhân viên phục vụ','Waiter / Waitress','服务员，买单！','Bạn ơi, tính tiền!','noun'],
  [5,'买单','mǎi dān','Thanh toán','Pay the bill','我来买单。','Tôi trả tiền.','verb'],
  [5,'好吃','hǎo chī','Ngon','Delicious','这个菜好吃极了！','Món này ngon tuyệt!','adjective'],
  [5,'辣','là','Cay','Spicy','这个太辣了。','Cái này cay quá.','adjective'],
  [5,'甜','tián','Ngọt','Sweet','这个蛋糕很甜。','Cái bánh này rất ngọt.','adjective'],
  [5,'酸','suān','Chua','Sour','柠檬很酸。','Chanh rất chua.','adjective'],
  [5,'咸','xián','Mặn','Salty','这个菜太咸了。','Món này mặn quá.','adjective'],
  [5,'饺子','jiǎo zi','Sủi cảo','Dumplings','我喜欢吃饺子。','Tôi thích ăn sủi cảo.','noun'],
  [5,'包子','bāo zi','Bánh bao','Steamed bun','早饭吃包子。','Ăn bánh bao buổi sáng.','noun'],
  [5,'火锅','huǒ guō','Lẩu','Hotpot','冬天吃火锅很好。','Mùa đông ăn lẩu rất tốt.','noun'],

  // Bài 7: Thời gian & Kế hoạch
  [6,'以前','yǐ qián','Trước đây / Trước','Before / Previously','以前我不喜欢蔬菜。','Trước đây tôi không thích rau.','other'],
  [6,'以后','yǐ hòu','Sau này / Sau đó','After / Later','以后我想去中国。','Sau này tôi muốn đến Trung Quốc.','other'],
  [6,'已经','yǐ jīng','Đã (rồi)','Already','我已经吃了。','Tôi đã ăn rồi.','adverb'],
  [6,'还没','hái méi','Chưa','Not yet','我还没准备好。','Tôi chưa chuẩn bị xong.','adverb'],
  [6,'刚才','gāng cái','Vừa rồi','Just now','他刚才来过。','Anh ấy vừa rồi có đến.','other'],
  [6,'马上','mǎ shàng','Ngay bây giờ / Lập tức','Right away','我马上来。','Tôi đến ngay.','adverb'],
  [6,'突然','tū rán','Đột nhiên','Suddenly','他突然离开了。','Anh ấy đột nhiên rời đi.','adverb'],
  [6,'计划','jì huà','Kế hoạch / Lên kế hoạch','Plan','我有一个计划。','Tôi có một kế hoạch.','noun'],
  [6,'安排','ān pái','Sắp xếp / Bố trí','Arrange / Schedule','这周的安排很满。','Lịch tuần này rất dày.','noun'],
  [6,'按时','àn shí','Đúng giờ','On time','请按时完成作业。','Hãy hoàn thành bài tập đúng hạn.','adverb'],
  [6,'提前','tí qián','Trước hạn / Sớm hơn','In advance','请提前通知我。','Hãy thông báo cho tôi trước.','adverb'],
  [6,'推迟','tuī chí','Hoãn lại','Postpone','会议推迟了。','Cuộc họp bị hoãn lại.','verb'],

  // Bài 8: Con người & Ngoại hình
  [7,'个子','gè zi','Chiều cao / Vóc người','Height / Stature','他个子很高。','Anh ấy rất cao.','noun'],
  [7,'长相','zhǎng xiàng','Ngoại hình / Diện mạo','Appearance / Looks','她长相很漂亮。','Cô ấy có ngoại hình rất đẹp.','noun'],
  [7,'头发','tóu fa','Tóc','Hair','她的头发很长。','Tóc cô ấy rất dài.','noun'],
  [7,'脸','liǎn','Khuôn mặt','Face','她的脸很圆。','Khuôn mặt cô ấy rất tròn.','noun'],
  [7,'胖','pàng','Béo / Mập','Fat / Chubby','我最近胖了。','Dạo này tôi béo hơn.','adjective'],
  [7,'瘦','shòu','Gầy / Ốm','Thin / Slim','她很苗条。','Cô ấy rất thon thả.','adjective'],
  [7,'年轻','nián qīng','Trẻ trung','Young','他看起来很年轻。','Anh ấy trông rất trẻ.','adjective'],
  [7,'成熟','chéng shú','Chín chắn / Trưởng thành','Mature','她很成熟。','Cô ấy rất chín chắn.','adjective'],
  [7,'性格','xìng gé','Tính cách','Personality','他的性格很好。','Tính cách của anh ấy rất tốt.','noun'],
  [7,'脾气','pí qì','Tính khí / Cơn giận','Temper','他的脾气不好。','Tính khí của anh ấy không tốt.','noun'],
  [7,'耐心','nài xīn','Kiên nhẫn','Patient','老师很有耐心。','Giáo viên rất kiên nhẫn.','noun'],
  [7,'幽默','yōu mò','Hài hước','Humorous','他很幽默。','Anh ấy rất hài hước.','adjective'],

  // Bài 9: Tự nhiên & Môi trường
  [8,'山','shān','Núi','Mountain','这座山很高。','Ngọn núi này rất cao.','noun'],
  [8,'河','hé','Sông','River','这条河很长。','Con sông này rất dài.','noun'],
  [8,'海','hǎi','Biển','Sea / Ocean','我喜欢海边。','Tôi thích bờ biển.','noun'],
  [8,'森林','sēn lín','Rừng','Forest','森林里有很多动物。','Trong rừng có nhiều động vật.','noun'],
  [8,'花','huā','Hoa','Flower','春天花开了。','Mùa xuân hoa nở.','noun'],
  [8,'树','shù','Cây','Tree','这棵树很高。','Cái cây này rất cao.','noun'],
  [8,'草','cǎo','Cỏ','Grass','草是绿色的。','Cỏ màu xanh.','noun'],
  [8,'动物','dòng wù','Động vật','Animal','我喜欢动物。','Tôi thích động vật.','noun'],
  [8,'猫','māo','Mèo','Cat','我有一只猫。','Tôi có một con mèo.','noun'],
  [8,'狗','gǒu','Chó','Dog','这只狗很可爱。','Con chó này rất đáng yêu.','noun'],
  [8,'鸟','niǎo','Chim','Bird','我喜欢听鸟叫。','Tôi thích nghe tiếng chim hót.','noun'],
  [8,'鱼','yú','Cá','Fish','这条鱼很大。','Con cá này rất to.','noun'],

  // Bài 10: Mua sắm & Dịch vụ
  [9,'打折','dǎ zhé','Giảm giá','Discount','今天打折吗？','Hôm nay có giảm giá không?','verb'],
  [9,'优惠','yōu huì','Ưu đãi / Khuyến mãi','Discount / Offer','有没有优惠？','Có ưu đãi gì không?','noun'],
  [9,'退款','tuì kuǎn','Hoàn tiền','Refund','我想退款。','Tôi muốn hoàn tiền.','noun'],
  [9,'换货','huàn huò','Đổi hàng','Exchange goods','可以换货吗？','Có thể đổi hàng không?','verb'],
  [9,'收据','shōu jù','Biên lai / Hóa đơn','Receipt','请给我收据。','Hãy cho tôi biên lai.','noun'],
  [9,'信用卡','xìn yòng kǎ','Thẻ tín dụng','Credit card','可以刷信用卡吗？','Có thể quẹt thẻ tín dụng không?','noun'],
  [9,'现金','xiàn jīn','Tiền mặt','Cash','我只有现金。','Tôi chỉ có tiền mặt.','noun'],
  [9,'送货','sòng huò','Giao hàng','Delivery','多久送货？','Giao hàng mất bao lâu?','verb'],
  [9,'银行','yín háng','Ngân hàng','Bank','我去银行取钱。','Tôi đến ngân hàng rút tiền.','noun'],
  [9,'邮局','yóu jú','Bưu điện','Post office','邮局在哪里？','Bưu điện ở đâu?','noun'],
  [9,'网购','wǎng gòu','Mua sắm online','Online shopping','我喜欢网购。','Tôi thích mua sắm online.','verb'],
  [9,'快递','kuài dì','Chuyển phát nhanh','Express delivery','我收到快递了。','Tôi nhận được bưu kiện rồi.','noun'],

  // Bài 11: Sức khỏe & Bệnh tật
  [10,'感冒','gǎn mào','Cảm cúm','Cold / Flu','我感冒了。','Tôi bị cảm rồi.','verb'],
  [10,'咳嗽','ké sòu','Ho','Cough','我一直咳嗽。','Tôi cứ ho mãi.','verb'],
  [10,'肚子疼','dù zi téng','Đau bụng','Stomachache','我肚子疼。','Tôi đau bụng.','adjective'],
  [10,'过敏','guò mǐn','Dị ứng','Allergy','我对花粉过敏。','Tôi bị dị ứng với phấn hoa.','verb'],
  [10,'手术','shǒu shù','Phẫu thuật','Surgery','医生做手术了。','Bác sĩ đã phẫu thuật.','noun'],
  [10,'检查','jiǎn chá','Kiểm tra / Khám bệnh','Check / Examine','去医院检查一下。','Đến bệnh viện kiểm tra đi.','verb'],
  [10,'营养','yíng yǎng','Dinh dưỡng','Nutrition','食物要有营养。','Thức ăn cần có dinh dưỡng.','noun'],
  [10,'锻炼','duàn liàn','Tập thể dục (thể chất)','Exercise / Work out','每天锻炼身体好。','Tập thể dục mỗi ngày rất tốt cho sức khỏe.','verb'],
  [10,'保健','bǎo jiàn','Chăm sóc sức khỏe','Health care','注意保健很重要。','Chú ý chăm sóc sức khỏe rất quan trọng.','noun'],
  [10,'注意','zhù yì','Chú ý / Để ý','Pay attention / Notice','请注意安全。','Hãy chú ý an toàn.','verb'],
  [10,'危险','wēi xiǎn','Nguy hiểm','Dangerous','这很危险。','Điều này rất nguy hiểm.','adjective'],
  [10,'安全','ān quán','An toàn','Safe / Safety','这里很安全。','Nơi này rất an toàn.','adjective'],

  // Bài 12: Công nghệ & Truyền thông
  [11,'网络','wǎng luò','Mạng internet','Internet / Network','没有网络怎么办？','Không có mạng phải làm sao?','noun'],
  [11,'软件','ruǎn jiàn','Phần mềm','Software','你用什么软件？','Bạn dùng phần mềm gì?','noun'],
  [11,'应用','yìng yòng','Ứng dụng (app)','Application / App','这个应用很好用。','Ứng dụng này rất dễ dùng.','noun'],
  [11,'密码','mì mǎ','Mật khẩu','Password','我忘记密码了。','Tôi quên mật khẩu rồi.','noun'],
  [11,'下载','xià zài','Tải xuống','Download','我在下载文件。','Tôi đang tải file xuống.','verb'],
  [11,'上传','shàng chuán','Tải lên','Upload','帮我上传照片。','Giúp tôi tải ảnh lên.','verb'],
  [11,'视频','shì pín','Video','Video','我看了一个视频。','Tôi đã xem một video.','noun'],
  [11,'直播','zhí bō','Phát sóng trực tiếp','Live stream','他在直播。','Anh ấy đang livestream.','verb'],
  [11,'评论','píng lùn','Bình luận / Nhận xét','Comment / Review','这条评论很有趣。','Bình luận này rất thú vị.','noun'],
  [11,'分享','fēn xiǎng','Chia sẻ','Share','我想分享这篇文章。','Tôi muốn chia sẻ bài viết này.','verb'],
  [11,'搜索','sōu suǒ','Tìm kiếm','Search','我搜索了这个词。','Tôi đã tìm kiếm từ này.','verb'],
  [11,'数据','shù jù','Dữ liệu','Data','这些数据很重要。','Những dữ liệu này rất quan trọng.','noun'],
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Insert lessons
    const lessonIds = [];
    for (const l of lessons) {
      // Check if exists
      const [existing] = await conn.query(
        'SELECT id FROM lessons WHERE title=? AND hsk_level=?', [l.title, l.level]
      );
      if (existing.length > 0) {
        lessonIds.push(existing[0].id);
        console.log(`  Lesson exists: ${l.title}`);
        continue;
      }
      const [res] = await conn.query(
        'INSERT INTO lessons (title, title_zh, description, hsk_level, order_index) VALUES (?,?,?,?,?)',
        [l.title, l.title_zh, l.desc, l.level, l.order]
      );
      lessonIds.push(res.insertId);
      console.log(`  ✓ Lesson: ${l.title} (id=${res.insertId})`);
    }

    // Insert vocab
    let inserted = 0, skipped = 0;
    for (const v of vocab) {
      const [lessonIdx, hanzi, pinyin, vi, en, ex_zh, ex_vi, type] = v;
      const lessonId = lessonIds[lessonIdx];
      const [existing] = await conn.query(
        'SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?', [hanzi, lessonId]
      );
      if (existing.length > 0) { skipped++; continue; }
      await conn.query(
        `INSERT INTO vocabulary (lesson_id, hanzi, pinyin, meaning_vi, meaning_en, example_sentence_zh, example_sentence_vi, hsk_level, word_type)
         VALUES (?,?,?,?,?,?,?,?,?)`,
        [lessonId, hanzi, pinyin, vi, en, ex_zh, ex_vi, 'HSK3', type]
      );
      inserted++;
    }

    await conn.commit();
    console.log(`\n✅ HSK3 DONE: ${lessonIds.length} lessons, ${inserted} vocab (${skipped} skipped)`);
  } catch(e) {
    await conn.rollback();
    console.error('❌ Error:', e.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
