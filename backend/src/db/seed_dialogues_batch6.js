// seed_dialogues_batch6.js — Batch 6: 16 hội thoại & đoạn văn
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Hỏi giờ và ngày tháng', title_zh:'问时间和日期',
    type:'dialogue', hsk_level:'HSK1', topic:'time', difficulty:'easy', order_index:74,
    description:'Hỏi thăm giờ giấc và thời gian',
    lines:[
      {speaker:'A',role:'Minh',zh:'请问现在几点了？',pinyin:'Qǐng wèn xiàn zài jǐ diǎn le？',vi:'Xin hỏi bây giờ là mấy giờ rồi?'},
      {speaker:'B',role:'Hoa',zh:'现在下午三点半。',pinyin:'Xiàn zài xià wǔ sān diǎn bàn.',vi:'Bây giờ là ba giờ rưỡi chiều.'},
      {speaker:'A',role:'Minh',zh:'谢谢。今天是几号？',pinyin:'Xiè xiè. Jīn tiān shì jǐ hào？',vi:'Cảm ơn. Hôm nay là ngày mấy?'},
      {speaker:'B',role:'Hoa',zh:'今天是三月十五号，星期一。',pinyin:'Jīn tiān shì sān yuè shí wǔ hào，xīng qī yī.',vi:'Hôm nay là ngày mười lăm tháng ba, thứ Hai.'},
      {speaker:'A',role:'Minh',zh:'我忘了！明天有课吗？',pinyin:'Wǒ wàng le！Míng tiān yǒu kè ma？',vi:'Tôi quên mất! Ngày mai có lớp học không?'},
      {speaker:'B',role:'Hoa',zh:'有，早上九点，别迟到！',pinyin:'Yǒu，zǎo shàng jiǔ diǎn，bié chí dào！',vi:'Có, chín giờ sáng, đừng đến muộn nhé!'},
      {speaker:'A',role:'Minh',zh:'好的，谢谢提醒！',pinyin:'Hǎo de，xiè xiè tí xǐng！',vi:'Được rồi, cảm ơn bạn nhắc nhở!'},
    ]
  },
  {
    title:'Đặt phòng khách sạn đơn giản', title_zh:'订酒店房间',
    type:'dialogue', hsk_level:'HSK1', topic:'travel', difficulty:'easy', order_index:75,
    description:'Check-in khách sạn bằng tiếng Trung đơn giản',
    lines:[
      {speaker:'客人',role:'Khách',zh:'你好，我叫李明，我订了房间。',pinyin:'Nǐ hǎo，wǒ jiào Lǐ Míng，wǒ dìng le fáng jiān.',vi:'Xin chào, tôi tên Lý Minh, tôi đã đặt phòng.'},
      {speaker:'前台',role:'Lễ tân',zh:'好的，请稍等……是的，您订的是双人间，住两晚。',pinyin:'Hǎo de，qǐng shāo děng……Shì de，nín dìng de shì shuāng rén jiān，zhù liǎng wǎn.',vi:'Được, xin chờ... Đúng rồi, bạn đặt phòng đôi, ở hai đêm.'},
      {speaker:'客人',role:'Khách',zh:'对，房间在几楼？',pinyin:'Duì，fáng jiān zài jǐ lóu？',vi:'Đúng rồi, phòng ở tầng mấy?'},
      {speaker:'前台',role:'Lễ tân',zh:'五楼，五零三号房。给您房卡。',pinyin:'Wǔ lóu，wǔ líng sān hào fáng. Gěi nín fáng kǎ.',vi:'Tầng năm, phòng năm không ba. Đây là thẻ phòng cho bạn.'},
      {speaker:'客人',role:'Khách',zh:'谢谢。WiFi密码是多少？',pinyin:'Xiè xiè. WiFi mì mǎ shì duō shǎo？',vi:'Cảm ơn. Mật khẩu WiFi là gì?'},
      {speaker:'前台',role:'Lễ tân',zh:'密码在房卡背面。祝您住得愉快！',pinyin:'Mì mǎ zài fáng kǎ bèi miàn. Zhù nín zhù de yú kuài！',vi:'Mật khẩu ở mặt sau thẻ phòng. Chúc bạn có kỳ nghỉ vui vẻ!'},
    ]
  },
  {
    title:'Thói quen buổi sáng', title_zh:'早晨的日常习惯',
    type:'passage', hsk_level:'HSK1', topic:'daily_life', difficulty:'easy', order_index:76,
    description:'Đoạn văn về thói quen buổi sáng',
    lines:[
      {speaker:'',role:'',zh:'我每天早上六点起床。',pinyin:'Wǒ měi tiān zǎo shàng liù diǎn qǐ chuáng.',vi:'Tôi mỗi ngày thức dậy lúc sáu giờ sáng.'},
      {speaker:'',role:'',zh:'起床后，我先喝一杯水，然后去跑步二十分钟。',pinyin:'Qǐ chuáng hòu，wǒ xiān hē yī bēi shuǐ，rán hòu qù pǎo bù èr shí fēn zhōng.',vi:'Sau khi dậy, tôi uống một ly nước trước, rồi đi chạy bộ hai mươi phút.'},
      {speaker:'',role:'',zh:'回来后洗澡，穿好衣服，吃早饭。',pinyin:'Huí lái hòu xǐ zǎo，chuān hǎo yī fu，chī zǎo fàn.',vi:'Về nhà tắm rửa, mặc quần áo, ăn sáng.'},
      {speaker:'',role:'',zh:'早饭我喝粥和吃鸡蛋，很简单但很健康。',pinyin:'Zǎo fàn wǒ hē zhōu hé chī jī dàn，hěn jiǎn dān dàn hěn jiàn kāng.',vi:'Bữa sáng tôi ăn cháo và trứng, rất đơn giản nhưng lành mạnh.'},
      {speaker:'',role:'',zh:'七点半出门，坐地铁去上班。',pinyin:'Qī diǎn bàn chū mén，zuò dì tiě qù shàng bān.',vi:'Bảy rưỡi ra khỏi nhà, đi tàu điện ngầm đến chỗ làm.'},
      {speaker:'',role:'',zh:'有一个好的早晨习惯，一天都会很有精神！',pinyin:'Yǒu yī gè hǎo de zǎo chén xí guàn，yī tiān dōu huì hěn yǒu jīng shén！',vi:'Có thói quen buổi sáng tốt, cả ngày sẽ rất tinh thần!'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Ở phòng khám nha khoa', title_zh:'在牙科诊所',
    type:'dialogue', hsk_level:'HSK2', topic:'health', difficulty:'medium', order_index:77,
    description:'Khám răng tại phòng nha',
    lines:[
      {speaker:'患者',role:'Bệnh nhân',zh:'医生，我牙疼了三天，睡不着觉。',pinyin:'Yī shēng，wǒ yá téng le sān tiān，shuì bu zháo jiào.',vi:'Bác sĩ, tôi bị đau răng ba ngày rồi, không ngủ được.'},
      {speaker:'牙医',role:'Nha sĩ',zh:'张嘴看看……哪颗牙疼？',pinyin:'Zhāng zuǐ kàn kàn……Nǎ kē yá téng？',vi:'Há miệng ra xem... Răng nào đau vậy?'},
      {speaker:'患者',role:'Bệnh nhân',zh:'右边下面那颗，一直跳痛。',pinyin:'Yòu biān xià miàn nà kē，yī zhí tiào tòng.',vi:'Cái dưới bên phải, đau theo nhịp liên tục.'},
      {speaker:'牙医',role:'Nha sĩ',zh:'是智齿发炎了，需要拔掉。你对麻药过敏吗？',pinyin:'Shì zhì chǐ fā yán le，xū yào bá diào. Nǐ duì má yào guò mǐn ma？',vi:'Răng khôn bị viêm rồi, cần nhổ đi. Bạn có dị ứng với thuốc tê không?'},
      {speaker:'患者',role:'Bệnh nhân',zh:'不过敏。拔牙很疼吗？',pinyin:'Bù guò mǐn. Bá yá hěn téng ma？',vi:'Không dị ứng. Nhổ răng có đau lắm không?'},
      {speaker:'牙医',role:'Nha sĩ',zh:'打麻药之后就不疼了。操作大概三十分钟，你别紧张。',pinyin:'Dǎ má yào zhī hòu jiù bù téng le. Cāo zuò dà gài sān shí fēn zhōng，nǐ bié jǐn zhāng.',vi:'Sau khi tiêm thuốc tê sẽ không đau nữa. Thủ thuật khoảng ba mươi phút, bạn đừng căng thẳng.'},
      {speaker:'患者',role:'Bệnh nhân',zh:'好的，谢谢医生，请开始吧。',pinyin:'Hǎo de，xiè xiè yī shēng，qǐng kāi shǐ ba.',vi:'Được rồi, cảm ơn bác sĩ, bắt đầu đi ạ.'},
    ]
  },
  {
    title:'Nói về thể thao yêu thích', title_zh:'谈论喜欢的运动',
    type:'dialogue', hsk_level:'HSK2', topic:'sports', difficulty:'easy', order_index:78,
    description:'Chia sẻ về môn thể thao',
    lines:[
      {speaker:'A',role:'Tuấn',zh:'你平时喜欢做什么运动？',pinyin:'Nǐ píng shí xǐ huān zuò shén me yùn dòng？',vi:'Bình thường bạn thích tập môn thể thao nào?'},
      {speaker:'B',role:'Bình',zh:'我喜欢打篮球，每周末去打两个小时。你呢？',pinyin:'Wǒ xǐ huān dǎ lán qiú，měi zhōu mò qù dǎ liǎng gè xiǎo shí. Nǐ ne？',vi:'Tôi thích chơi bóng rổ, mỗi cuối tuần đi chơi hai tiếng. Còn bạn?'},
      {speaker:'A',role:'Tuấn',zh:'我喜欢游泳，夏天每天都去。你会游泳吗？',pinyin:'Wǒ xǐ huān yóu yǒng，xià tiān měi tiān dōu qù. Nǐ huì yóu yǒng ma？',vi:'Tôi thích bơi lội, mùa hè ngày nào cũng đi. Bạn biết bơi không?'},
      {speaker:'B',role:'Bình',zh:'不太会，只会基本的蛙泳。你能教我吗？',pinyin:'Bù tài huì，zhǐ huì jī běn de wā yǒng. Nǐ néng jiāo wǒ ma？',vi:'Không giỏi lắm, chỉ biết bơi ếch cơ bản thôi. Bạn có thể dạy tôi không?'},
      {speaker:'A',role:'Tuấn',zh:'当然可以！下周六我们一起去游泳池，我来教你。',pinyin:'Dāng rán kě yǐ！Xià zhōu liù wǒ men yī qǐ qù yóu yǒng chí，wǒ lái jiāo nǐ.',vi:'Tất nhiên được! Thứ Bảy tuần tới chúng ta cùng đi bể bơi, tôi sẽ dạy bạn.'},
      {speaker:'B',role:'Bình',zh:'太好了！运动让人心情愉快，我以后要多锻炼。',pinyin:'Tài hǎo le！Yùn dòng ràng rén xīn qíng yú kuài，wǒ yǐ hòu yào duō duàn liàn.',vi:'Tuyệt thật! Thể thao giúp người ta vui vẻ, sau này tôi phải tập nhiều hơn.'},
    ]
  },
  {
    title:'Mùa xuân ở Hàng Châu', title_zh:'杭州的春天',
    type:'passage', hsk_level:'HSK2', topic:'travel', difficulty:'medium', order_index:79,
    description:'Đoạn văn về cảnh đẹp Hàng Châu',
    lines:[
      {speaker:'',role:'',zh:'杭州是中国最美的城市之一，常说"上有天堂，下有苏杭"。',pinyin:'Háng zhōu shì Zhōng guó zuì měi de chéng shì zhī yī，cháng shuō "shàng yǒu tiān táng，xià yǒu Sū Háng".',vi:'Hàng Châu là một trong những thành phố đẹp nhất Trung Quốc, thường nói "trên có thiên đường, dưới có Tô Hàng".'},
      {speaker:'',role:'',zh:'西湖是杭州最著名的景点，湖光山色，美不胜收。',pinyin:'Xī hú shì Háng zhōu zuì zhù míng de jǐng diǎn，hú guāng shān sè，měi bù shèng shōu.',vi:'Tây Hồ là điểm tham quan nổi tiếng nhất Hàng Châu, cảnh hồ núi tuyệt đẹp vô cùng.'},
      {speaker:'',role:'',zh:'春天，西湖边的桃花和樱花争相开放，粉红色的花朵非常漂亮。',pinyin:'Chūn tiān，Xī hú biān de táo huā hé yīng huā zhēng xiāng kāi fàng，fěn hóng sè de huā duǒ fēi cháng piào liang.',vi:'Mùa xuân, hoa đào và hoa anh đào ven Tây Hồ đua nhau khoe sắc, những bông hoa màu hồng rất đẹp.'},
      {speaker:'',role:'',zh:'乘坐游船在湖上游览，可以远眺雷峰塔，感受千年历史的沉淀。',pinyin:'Chéng zuò yóu chuán zài hú shàng yóu lǎn，kě yǐ yuǎn tiào Léi fēng tǎ，gǎn shòu qiān nián lì shǐ de chén diàn.',vi:'Du ngoạn trên hồ bằng thuyền, có thể nhìn xa Tháp Lôi Phong, cảm nhận sự tích tụ của nghìn năm lịch sử.'},
      {speaker:'',role:'',zh:'如果你喜欢大自然和历史文化，杭州是你不可错过的目的地。',pinyin:'Rú guǒ nǐ xǐ huān dà zì rán hé lì shǐ wén huà，Háng zhōu shì nǐ bù kě cuò guò de mù dì dì.',vi:'Nếu bạn yêu thiên nhiên và lịch sử văn hoá, Hàng Châu là điểm đến bạn không thể bỏ qua.'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Phát triển cá nhân và học tập suốt đời', title_zh:'个人发展与终身学习',
    type:'dialogue', hsk_level:'HSK3', topic:'education', difficulty:'medium', order_index:80,
    description:'Tầm quan trọng của học suốt đời',
    lines:[
      {speaker:'A',role:'Hùng',zh:'你工作这么忙，还怎么有时间学习？',pinyin:'Nǐ gōng zuò zhè me máng，hái zěn me yǒu shí jiān xué xí？',vi:'Bạn làm việc bận như vậy, còn lấy đâu thời gian học?'},
      {speaker:'B',role:'Lan',zh:'我觉得学习和工作不矛盾。利用碎片时间，每天半小时，积累下来很可观。',pinyin:'Wǒ jué de xué xí hé gōng zuò bù máo dùn. Lì yòng suì piàn shí jiān，měi tiān bàn xiǎo shí，jī lěi xià lái hěn kě guān.',vi:'Tôi nghĩ học tập và công việc không mâu thuẫn. Tận dụng thời gian rảnh rỗi, mỗi ngày nửa tiếng, tích luỹ lại cũng rất đáng kể.'},
      {speaker:'A',role:'Hùng',zh:'你现在在学什么？',pinyin:'Nǐ xiàn zài zài xué shén me？',vi:'Bây giờ bạn đang học gì?'},
      {speaker:'B',role:'Lan',zh:'汉语和数据分析。前者对工作有帮助，后者是未来职场的必备技能。',pinyin:'Hàn yǔ hé shù jù fēn xī. Qián zhě duì gōng zuò yǒu bāng zhù，hòu zhě shì wèi lái zhí chǎng de bì bèi jì néng.',vi:'Tiếng Trung và phân tích dữ liệu. Cái trước hữu ích cho công việc, cái sau là kỹ năng thiết yếu trong thị trường việc làm tương lai.'},
      {speaker:'A',role:'Hùng',zh:'你用什么平台学习？',pinyin:'Nǐ yòng shén me píng tái xué xí？',vi:'Bạn dùng nền tảng nào để học?'},
      {speaker:'B',role:'Lan',zh:'主要用网络课程，还有YouTube和播客。现在好的学习资源太多了，关键是坚持。',pinyin:'Zhǔ yào yòng wǎng luò kè chéng，hái yǒu YouTube hé bō kè. Xiàn zài hǎo de xué xí zī yuán tài duō le，guān jiàn shì jiān chí.',vi:'Chủ yếu dùng khóa học trực tuyến, còn có YouTube và podcast. Bây giờ tài nguyên học tập tốt rất nhiều, quan trọng là kiên trì.'},
      {speaker:'A',role:'Hùng',zh:'说得对！我应该向你学习，不能只会工作，要全面发展。',pinyin:'Shuō de duì！Wǒ yīng gāi xiàng nǐ xué xí，bù néng zhǐ huì gōng zuò，yào quán miàn fā zhǎn.',vi:'Nói đúng lắm! Tôi nên học theo bạn, không thể chỉ biết làm việc mà phải phát triển toàn diện.'},
    ]
  },
  {
    title:'Cơm nhà mẹ nấu', title_zh:'妈妈做的饭',
    type:'passage', hsk_level:'HSK3', topic:'family', difficulty:'medium', order_index:81,
    description:'Cảm xúc về bữa cơm nhà và tình mẫu tử',
    lines:[
      {speaker:'',role:'',zh:'无论走到哪里，最让人想念的永远是妈妈做的饭。',pinyin:'Wú lùn zǒu dào nǎ lǐ，zuì ràng rén xiǎng niàn de yǒng yuǎn shì mā ma zuò de fàn.',vi:'Dù đi đến đâu, điều khiến người ta nhớ nhung nhất mãi mãi là cơm mẹ nấu.'},
      {speaker:'',role:'',zh:'我妈妈做的红烧肉和西红柿炒鸡蛋，是我童年最美好的记忆。',pinyin:'Wǒ mā ma zuò de hóng shāo ròu hé xī hóng shì chǎo jī dàn，shì wǒ tóng nián zuì měi hǎo de jì yì.',vi:'Thịt kho tàu và cà chua xào trứng mẹ nấu là ký ức đẹp nhất của tuổi thơ tôi.'},
      {speaker:'',role:'',zh:'出去工作后，每次回家，妈妈总是提前准备我喜欢吃的菜。',pinyin:'Chū qù gōng zuò hòu，měi cì huí jiā，mā ma zǒng shì tí qián zhǔn bèi wǒ xǐ huān chī de cài.',vi:'Sau khi ra ngoài làm việc, mỗi lần về nhà, mẹ luôn chuẩn bị trước những món tôi thích ăn.'},
      {speaker:'',role:'',zh:'那一桌子热腾腾的饭菜，是语言无法描述的爱。',pinyin:'Nà yī zhuō zi rè téng téng de fàn cài，shì yǔ yán wú fǎ miáo shù de ài.',vi:'Bàn cơm đầy ắp thức ăn nóng hổi đó là tình yêu mà ngôn ngữ không thể diễn tả.'},
      {speaker:'',role:'',zh:'趁父母还健在，多回家吃饭，陪伴就是最好的孝顺。',pinyin:'Chèn fù mǔ hái jiàn zài，duō huí jiā chī fàn，péi bàn jiù shì zuì hǎo de xiào shùn.',vi:'Tranh thủ khi cha mẹ còn khoẻ, hãy về nhà ăn cơm nhiều hơn, ở bên cạnh chính là chữ hiếu tốt nhất.'},
    ]
  },
  {
    title:'Du lịch bụi và trải nghiệm văn hoá', title_zh:'背包旅行与文化体验',
    type:'dialogue', hsk_level:'HSK3', topic:'travel', difficulty:'medium', order_index:82,
    description:'Chia sẻ kinh nghiệm du lịch bụi',
    lines:[
      {speaker:'A',role:'Minh',zh:'你去中国旅游的时候，最难忘的经历是什么？',pinyin:'Nǐ qù Zhōng guó lǚ yóu de shí hòu，zuì nán wàng de jīng lì shì shén me？',vi:'Khi bạn du lịch Trung Quốc, trải nghiệm đáng nhớ nhất là gì?'},
      {speaker:'B',role:'Hoa',zh:'是在西藏的经历。海拔四千多米，呼吸困难，但风景太壮观了！',pinyin:'Shì zài Xī zàng de jīng lì. Hǎi bá sì qiān duō mǐ，hū xī kùn nán，dàn fēng jǐng tài zhuàng guān le！',vi:'Là trải nghiệm ở Tây Tạng. Độ cao hơn bốn nghìn mét, thở khó khăn, nhưng phong cảnh quá hùng vĩ!'},
      {speaker:'A',role:'Minh',zh:'你有没有高原反应？',pinyin:'Nǐ yǒu méi yǒu gāo yuán fǎn yìng？',vi:'Bạn có bị say độ cao không?'},
      {speaker:'B',role:'Hoa',zh:'有，第一天头疼、恶心，但第二天就适应了。要多喝水，少运动。',pinyin:'Yǒu，dì yī tiān tóu téng、ě xīn，dàn dì èr tiān jiù shì yìng le. Yào duō hē shuǐ，shǎo yùn dòng.',vi:'Có, ngày đầu đau đầu, buồn nôn, nhưng ngày thứ hai là quen rồi. Phải uống nhiều nước, ít vận động.'},
      {speaker:'A',role:'Minh',zh:'藏族人怎么样？',pinyin:'Zàng zú rén zěn me yàng？',vi:'Người Tạng thế nào?'},
      {speaker:'B',role:'Hoa',zh:'非常热情好客！我住在藏族家庭，吃了酥油茶和糌粑，体验了他们的日常生活。',pinyin:'Fēi cháng rè qíng hào kè！Wǒ zhù zài Zàng zú jiā tíng，chī le sū yóu chá hé zān bā，tǐ yàn le tā men de rì cháng shēng huó.',vi:'Rất nhiệt tình hiếu khách! Tôi ở nhà gia đình người Tạng, uống trà bơ và ăn tsamba, trải nghiệm cuộc sống hàng ngày của họ.'},
      {speaker:'A',role:'Minh',zh:'这才是真正的旅行——不只是看风景，而是深入了解当地文化。',pinyin:'Zhè cái shì zhēn zhèng de lǚ xíng——bù zhǐ shì kàn fēng jǐng，ér shì shēn rù liǎo jiě dāng dì wén huà.',vi:'Đây mới là du lịch thực sự — không chỉ ngắm cảnh mà là hiểu sâu về văn hoá địa phương.'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Tự động hoá và tương lai việc làm', title_zh:'自动化与就业的未来',
    type:'dialogue', hsk_level:'HSK4', topic:'technology', difficulty:'hard', order_index:83,
    description:'Bàn về tác động của tự động hoá đến việc làm',
    lines:[
      {speaker:'A',role:'Bình',zh:'有研究预测，未来二十年内，约半数工作会被人工智能或机器人取代，你怎么看？',pinyin:'Yǒu yán jiū yù cè，wèi lái èr shí nián nèi，yuē bàn shù gōng zuò huì bèi rén gōng zhì néng huò jī qì rén qǔ dài，nǐ zěn me kàn？',vi:'Có nghiên cứu dự đoán trong hai mươi năm tới khoảng một nửa số việc làm sẽ bị AI hoặc robot thay thế, bạn nghĩ sao?'},
      {speaker:'B',role:'Hùng',zh:'这个数字可能有些夸张，但趋势是明确的——重复性强的工作确实面临被取代的风险。',pinyin:'Zhè gè shù zì kě néng yǒu xiē kuā zhāng，dàn qū shì shì míng què de——chóng fù xìng qiáng de gōng zuò què shí miàn lín bèi qǔ dài de fēng xiǎn.',vi:'Con số này có thể hơi phóng đại, nhưng xu hướng rõ ràng — những công việc lặp đi lặp lại đúng là đối mặt với nguy cơ bị thay thế.'},
      {speaker:'A',role:'Bình',zh:'那我们应该怎么应对？',pinyin:'Nà wǒ men yīng gāi zěn me yìng duì？',vi:'Vậy chúng ta nên ứng phó thế nào?'},
      {speaker:'B',role:'Hùng',zh:'重点是培养机器难以替代的能力：创造力、批判性思维、情感智商和复杂问题的解决能力。',pinyin:'Zhòng diǎn shì péi yǎng jī qì nán yǐ tì dài de néng lì：chuàng zào lì、pī pàn xìng sī wéi、qíng gǎn zhì shāng hé fù zá wèn tí de jiě jué néng lì.',vi:'Trọng tâm là phát triển những năng lực mà máy móc khó thay thế: sáng tạo, tư duy phản biện, trí thông minh cảm xúc và khả năng giải quyết vấn đề phức tạp.'},
      {speaker:'A',role:'Bình',zh:'教育系统是不是也需要相应地改革？',pinyin:'Jiào yù xì tǒng shì bù shì yě xū yào xiāng yìng de gǎi gé？',vi:'Hệ thống giáo dục có cần cải cách tương ứng không?'},
      {speaker:'B',role:'Hùng',zh:'当然，从死记硬背转向培养学生解决实际问题的能力，是教育改革的关键方向。',pinyin:'Dāng rán，cóng sǐ jì yìng bèi zhuǎn xiàng péi yǎng xué shēng jiě jué shí jì wèn tí de néng lì，shì jiào yù gǎi gé de guān jiàn fāng xiàng.',vi:'Tất nhiên, chuyển từ học vẹt sang bồi dưỡng năng lực giải quyết vấn đề thực tiễn của học sinh là hướng cải cách giáo dục then chốt.'},
    ]
  },
  {
    title:'Thành công và ý nghĩa cuộc sống', title_zh:'成功的定义与生命的意义',
    type:'passage', hsk_level:'HSK4', topic:'philosophy', difficulty:'hard', order_index:84,
    description:'Suy nghĩ về định nghĩa thành công',
    lines:[
      {speaker:'',role:'',zh:'在这个竞争激烈的时代，"成功"往往被简单地等同于金钱、地位和名誉。',pinyin:'Zài zhè gè jìng zhēng jī liè de shí dài，"chéng gōng" wǎng wǎng bèi jiǎn dān de děng tóng yú jīn qián、dì wèi hé míng yù.',vi:'Trong thời đại cạnh tranh gay gắt này, "thành công" thường được đơn giản đánh đồng với tiền bạc, địa vị và danh tiếng.'},
      {speaker:'',role:'',zh:'然而，这种单一的成功观正在导致越来越多的人陷入焦虑与空虚。',pinyin:'Rán ér，zhè zhǒng dān yī de chéng gōng guān zhèng zài dǎo zhì yuè lái yuè duō de rén xiàn rù jiāo lǜ yǔ kōng xū.',vi:'Tuy nhiên, quan niệm thành công một chiều này đang khiến ngày càng nhiều người rơi vào lo âu và trống rỗng.'},
      {speaker:'',role:'',zh:'哲学家认为，真正的成功应该包含三个维度：做有意义的工作、建立深厚的关系、持续地成长。',pinyin:'Zhé xué jiā rèn wéi，zhēn zhèng de chéng gōng yīng gāi bāo hán sān gè wéi dù：zuò yǒu yì yì de gōng zuò、jiàn lì shēn hòu de guān xi、chí xù de chéng zhǎng.',vi:'Các nhà triết học cho rằng thành công thực sự nên bao gồm ba chiều: làm công việc có ý nghĩa, xây dựng mối quan hệ sâu sắc, và không ngừng phát triển bản thân.'},
      {speaker:'',role:'',zh:'中国古典智慧中，"修身、齐家、治国、平天下"提供了一种由内而外的成功路径。',pinyin:'Zhōng guó gǔ diǎn zhì huì zhōng，"xiū shēn、qí jiā、zhì guó、píng tiān xià" tí gōng le yī zhǒng yóu nèi ér wài de chéng gōng lù jìng.',vi:'Trong triết lý cổ điển Trung Hoa, "tu thân, tề gia, trị quốc, bình thiên hạ" cung cấp một con đường thành công từ trong ra ngoài.'},
      {speaker:'',role:'',zh:'每个人的成功定义可以不同，重要的是找到属于自己的意义，并为之持续努力。',pinyin:'Měi gè rén de chéng gōng dìng yì kě yǐ bù tóng，zhòng yào de shì zhǎo dào shǔ yú zì jǐ de yì yì，bìng wèi zhī chí xù nǔ lì.',vi:'Định nghĩa thành công của mỗi người có thể khác nhau, quan trọng là tìm ra ý nghĩa riêng của mình và không ngừng phấn đấu vì nó.'},
    ]
  },
  {
    title:'Y học cổ truyền Trung Hoa', title_zh:'中医与传统医学',
    type:'dialogue', hsk_level:'HSK4', topic:'health', difficulty:'hard', order_index:85,
    description:'Thảo luận về Y học cổ truyền Trung Hoa',
    lines:[
      {speaker:'A',role:'Lan',zh:'你平时会看中医吗？',pinyin:'Nǐ píng shí huì kàn Zhōng yī ma？',vi:'Bình thường bạn có đi khám Đông y không?'},
      {speaker:'B',role:'Minh',zh:'会，我有时候用针灸治疗颈椎痛，效果挺好的。',pinyin:'Huì，wǒ yǒu shí hòu yòng zhēn jiǔ zhì liáo jǐng zhuī tòng，xiào guǒ tǐng hǎo de.',vi:'Có, đôi khi tôi dùng châm cứu để trị đau cổ, hiệu quả khá tốt.'},
      {speaker:'A',role:'Lan',zh:'中医和西医有什么根本区别？',pinyin:'Zhōng yī hé Xī yī yǒu shén me gēn běn qū bié？',vi:'Đông y và Tây y có sự khác biệt căn bản nào?'},
      {speaker:'B',role:'Minh',zh:'中医注重整体论，认为人体是一个系统，治病要调节阴阳平衡；西医更注重精确诊断和靶向治疗。',pinyin:'Zhōng yī zhù zhòng zhěng tǐ lùn，rèn wéi rén tǐ shì yī gè xì tǒng，zhì bìng yào tiáo jié yīn yáng píng héng；Xī yī gèng zhù zhòng jīng què zhěn duàn hé bǎ xiàng zhì liáo.',vi:'Đông y chú trọng quan điểm toàn thể, cho rằng cơ thể là một hệ thống, chữa bệnh cần điều hoà âm dương cân bằng; Tây y chú trọng hơn vào chẩn đoán chính xác và điều trị đích.'},
      {speaker:'A',role:'Lan',zh:'那中西医结合是不是更好？',pinyin:'Nà Zhōng Xī yī jié hé shì bù shì gèng hǎo？',vi:'Vậy kết hợp Đông-Tây y có tốt hơn không?'},
      {speaker:'B',role:'Minh',zh:'很多中国医院都在推行中西医结合，比如用西医诊断，用中药和针灸辅助治疗，效果往往更全面。',pinyin:'Hěn duō Zhōng guó yī yuàn dōu zài tuī xíng Zhōng Xī yī jié hé，bǐ rú yòng Xī yī zhěn duàn，yòng Zhōng yào hé zhēn jiǔ fǔ zhù zhì liáo，xiào guǒ wǎng wǎng gèng quán miàn.',vi:'Nhiều bệnh viện Trung Quốc đang thúc đẩy kết hợp Đông-Tây y, ví dụ dùng Tây y chẩn đoán, dùng thuốc Đông y và châm cứu hỗ trợ điều trị, hiệu quả thường toàn diện hơn.'},
    ]
  },
  {
    title:'Biển Đông và quan hệ quốc tế', title_zh:'国际关系与外交',
    type:'dialogue', hsk_level:'HSK4', topic:'politics', difficulty:'hard', order_index:86,
    description:'Bàn về quan hệ ngoại giao và hợp tác quốc tế',
    lines:[
      {speaker:'A',role:'Bình',zh:'你认为中越两国的关系前景如何？',pinyin:'Nǐ rèn wéi Zhōng Yuè liǎng guó de guān xi qián jǐng rú hé？',vi:'Bạn nghĩ triển vọng quan hệ hai nước Trung-Việt như thế nào?'},
      {speaker:'B',role:'Hùng',zh:'总体来看，两国的经济关系非常密切，中国是越南最大的贸易伙伴。',pinyin:'Zǒng tǐ lái kàn，liǎng guó de jīng jì guān xi fēi cháng mì qiè，Zhōng guó shì Yuè nán zuì dà de mào yì huǒ bàn.',vi:'Nhìn chung, quan hệ kinh tế hai nước rất mật thiết, Trung Quốc là đối tác thương mại lớn nhất của Việt Nam.'},
      {speaker:'A',role:'Bình',zh:'但两国之间也存在一些历史和领土方面的争议。',pinyin:'Dàn liǎng guó zhī jiān yě cún zài yī xiē lì shǐ hé lǐng tǔ fāng miàn de zhēng yì.',vi:'Nhưng giữa hai nước cũng tồn tại một số tranh chấp về lịch sử và lãnh thổ.'},
      {speaker:'B',role:'Hùng',zh:'是的，这确实是复杂的历史遗留问题。但近年来双方都在寻求通过对话和外交途径妥善处理。',pinyin:'Shì de，zhè què shí shì fù zá de lì shǐ yí liú wèn tí. Dàn jìn nián lái shuāng fāng dōu zài xún qiú tōng guò duì huà hé wài jiāo tú jìng tuǒ shàn chǔ lǐ.',vi:'Đúng vậy, đây đúng là vấn đề tồn đọng lịch sử phức tạp. Nhưng những năm gần đây cả hai phía đều đang tìm cách giải quyết thỏa đáng qua đối thoại và con đường ngoại giao.'},
      {speaker:'A',role:'Bình',zh:'我希望两国人民能维护友好关系，毕竟我们是"山水相连、唇齿相依"的邻邦。',pinyin:'Wǒ xī wàng liǎng guó rén mín néng wéi hù yǒu hǎo guān xi，bì jìng wǒ men shì "shān shuǐ xiāng lián、chún chǐ xiāng yī" de lín bāng.',vi:'Tôi hy vọng nhân dân hai nước có thể duy trì quan hệ hữu nghị, bởi chúng ta là láng giềng "núi sông liền nhau, môi hở răng lạnh".'},
    ]
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let dCount=0, lCount=0;
    for (const d of dialogues) {
      const [ex] = await conn.query('SELECT id FROM dialogues WHERE title=? AND hsk_level=?', [d.title, d.hsk_level]);
      let did;
      if (ex.length) { did = ex[0].id; }
      else {
        const [r] = await conn.query(
          'INSERT INTO dialogues (title,title_zh,type,hsk_level,topic,description,difficulty,order_index) VALUES (?,?,?,?,?,?,?,?)',
          [d.title, d.title_zh, d.type, d.hsk_level, d.topic, d.description, d.difficulty, d.order_index]);
        did = r.insertId; dCount++;
        console.log(`  ✓ [${d.hsk_level}·${d.type}] ${d.title}`);
      }
      await conn.query('DELETE FROM dialogue_lines WHERE dialogue_id=?', [did]);
      for (let i=0; i<d.lines.length; i++) {
        const l = d.lines[i];
        await conn.query(
          'INSERT INTO dialogue_lines (dialogue_id,line_order,speaker,speaker_role,text_zh,pinyin,text_vi) VALUES (?,?,?,?,?,?,?)',
          [did, i+1, l.speaker, l.role, l.zh, l.pinyin, l.vi]);
        lCount++;
      }
    }
    await conn.commit();
    const [[ds]] = await conn.query('SELECT COUNT(*) c FROM dialogues');
    const [[ls]] = await conn.query('SELECT COUNT(*) c FROM dialogue_lines');
    const [bl] = await conn.query(
      'SELECT hsk_level, SUM(type="dialogue") hd, SUM(type="passage") ps, COUNT(*) total FROM dialogues WHERE is_active=1 GROUP BY hsk_level ORDER BY hsk_level');
    console.log(`\n✅ Batch 6 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})\n`);
    console.log('   Cấp  | Hội thoại | Đoạn văn | Tổng');
    console.log('   -----|-----------|----------|-----');
    let sumHD=0, sumPS=0;
    bl.forEach(r=>{ console.log(`   ${r.hsk_level} | ${String(r.hd).padStart(9)} | ${String(r.ps).padStart(8)} | ${r.total}`); sumHD+=Number(r.hd); sumPS+=Number(r.ps); });
    console.log(`   Tổng | ${String(sumHD).padStart(9)} | ${String(sumPS).padStart(8)} | ${sumHD+sumPS}`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
