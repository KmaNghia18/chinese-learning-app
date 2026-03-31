// seed_dialogues_batch4.js — Batch 4: 20 hội thoại & đoạn văn chuyên sâu
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Chúc mừng sinh nhật', title_zh:'生日快乐',
    type:'dialogue', hsk_level:'HSK1', topic:'celebration', difficulty:'easy', order_index:48,
    description:'Hội thoại chúc mừng sinh nhật',
    lines:[
      {speaker:'A',role:'Minh',zh:'今天是你的生日吗？',pinyin:'Jīn tiān shì nǐ de shēng rì ma？',vi:'Hôm nay là sinh nhật của bạn à?'},
      {speaker:'B',role:'Hoa',zh:'是的！我今天二十岁了。',pinyin:'Shì de！Wǒ jīn tiān èr shí suì le.',vi:'Đúng rồi! Hôm nay tôi tròn hai mươi tuổi.'},
      {speaker:'A',role:'Minh',zh:'生日快乐！这是送你的礼物。',pinyin:'Shēng rì kuài lè！Zhè shì sòng nǐ de lǐ wù.',vi:'Chúc mừng sinh nhật! Đây là quà tặng bạn.'},
      {speaker:'B',role:'Hoa',zh:'哇，谢谢！你真好！',pinyin:'Wā，xiè xiè！Nǐ zhēn hǎo！',vi:'Ồ, cảm ơn bạn! Bạn tốt quá!'},
      {speaker:'A',role:'Minh',zh:'你今天有什么计划？',pinyin:'Nǐ jīn tiān yǒu shén me jì huà？',vi:'Hôm nay bạn có kế hoạch gì không?'},
      {speaker:'B',role:'Hoa',zh:'晚上和家人一起吃饭，很开心！',pinyin:'Wǎn shàng hé jiā rén yī qǐ chī fàn，hěn kāi xīn！',vi:'Tối ăn cơm cùng gia đình, vui lắm!'},
      {speaker:'A',role:'Minh',zh:'祝你天天快乐！',pinyin:'Zhù nǐ tiān tiān kuài lè！',vi:'Chúc bạn ngày nào cũng vui!'},
    ]
  },
  {
    title:'Xin lỗi và tha thứ', title_zh:'道歉与原谅',
    type:'dialogue', hsk_level:'HSK1', topic:'emotions', difficulty:'easy', order_index:49,
    description:'Thực hành xin lỗi bằng tiếng Trung',
    lines:[
      {speaker:'A',role:'Nam',zh:'对不起，我来晚了！',pinyin:'Duì bu qǐ，wǒ lái wǎn le！',vi:'Xin lỗi, tôi đến muộn!'},
      {speaker:'B',role:'Lan',zh:'没关系，你来了就好。',pinyin:'Méi guān xi，nǐ lái le jiù hǎo.',vi:'Không sao, bạn đến là tốt rồi.'},
      {speaker:'A',role:'Nam',zh:'路上堵车，我等了三十分钟。',pinyin:'Lù shàng dǔ chē，wǒ děng le sān shí fēn zhōng.',vi:'Đường bị tắc, tôi chờ ba mươi phút.'},
      {speaker:'B',role:'Lan',zh:'我知道，北京的交通很糟糕。',pinyin:'Wǒ zhī dào，Běi jīng de jiāo tōng hěn zāo gāo.',vi:'Tôi biết, giao thông ở Bắc Kinh rất tệ.'},
      {speaker:'A',role:'Nam',zh:'下次我早点出发。再次对不起！',pinyin:'Xià cì wǒ zǎo diǎn chū fā. Zài cì duì bu qǐ！',vi:'Lần sau tôi sẽ xuất phát sớm hơn. Xin lỗi lần nữa!'},
      {speaker:'B',role:'Lan',zh:'好了好了，我们去吃饭吧！',pinyin:'Hǎo le hǎo le，wǒ men qù chī fàn ba！',vi:'Thôi thôi, chúng ta đi ăn cơm đi!'},
    ]
  },
  {
    title:'Mùa và thời tiết', title_zh:'四季与天气',
    type:'passage', hsk_level:'HSK1', topic:'weather', difficulty:'easy', order_index:50,
    description:'Đoạn văn về bốn mùa',
    lines:[
      {speaker:'',role:'',zh:'中国有四个季节：春、夏、秋、冬。',pinyin:'Zhōng guó yǒu sì gè jì jié：chūn、xià、qiū、dōng.',vi:'Trung Quốc có bốn mùa: xuân, hạ, thu, đông.'},
      {speaker:'',role:'',zh:'春天很美，花开了，天气不冷不热。',pinyin:'Chūn tiān hěn měi，huā kāi le，tiān qì bù lěng bù rè.',vi:'Mùa xuân rất đẹp, hoa nở, thời tiết không lạnh không nóng.'},
      {speaker:'',role:'',zh:'夏天很热，北京有时候四十度。',pinyin:'Xià tiān hěn rè，Běi jīng yǒu shí hòu sì shí dù.',vi:'Mùa hè rất nóng, đôi khi Bắc Kinh lên đến bốn mươi độ.'},
      {speaker:'',role:'',zh:'秋天很舒服，天高气爽，是旅游的好季节。',pinyin:'Qiū tiān hěn shū fu，tiān gāo qì shuǎng，shì lǚ yóu de hǎo jì jié.',vi:'Mùa thu rất dễ chịu, trời cao gió mát, là mùa du lịch tốt nhất.'},
      {speaker:'',role:'',zh:'冬天很冷，北方会下雪。我最喜欢冬天。',pinyin:'Dōng tiān hěn lěng，běi fāng huì xià xuě. Wǒ zuì xǐ huān dōng tiān.',vi:'Mùa đông rất lạnh, miền Bắc sẽ có tuyết. Tôi thích mùa đông nhất.'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Hỏi thăm người thân', title_zh:'询问家人情况',
    type:'dialogue', hsk_level:'HSK2', topic:'family', difficulty:'easy', order_index:51,
    description:'Nói chuyện về gia đình',
    lines:[
      {speaker:'A',role:'Hoa',zh:'你爸爸妈妈还好吗？',pinyin:'Nǐ bà ba mā ma hái hǎo ma？',vi:'Bố mẹ bạn có khoẻ không?'},
      {speaker:'B',role:'Minh',zh:'都很好，谢谢你问。你的家人呢？',pinyin:'Dōu hěn hǎo，xiè xiè nǐ wèn. Nǐ de jiā rén ne？',vi:'Đều khoẻ cả, cảm ơn bạn đã hỏi. Còn gia đình bạn?'},
      {speaker:'A',role:'Hoa',zh:'我妈妈最近有点不舒服，在吃药。',pinyin:'Wǒ mā ma zuì jìn yǒu diǎn bù shū fu，zài chī yào.',vi:'Mẹ tôi gần đây hơi khó chịu, đang uống thuốc.'},
      {speaker:'B',role:'Minh',zh:'是吗？严重吗？',pinyin:'Shì ma？Yán zhòng ma？',vi:'Vậy à? Có nghiêm trọng không?'},
      {speaker:'A',role:'Hoa',zh:'不严重，就是普通感冒。医生说休息几天就好了。',pinyin:'Bù yán zhòng，jiù shì pǔ tōng gǎn mào. Yī shēng shuō xiū xi jǐ tiān jiù hǎo le.',vi:'Không nghiêm trọng, chỉ bị cảm thường. Bác sĩ nói nghỉ ngơi vài ngày là khỏi.'},
      {speaker:'B',role:'Minh',zh:'那就好。请代我问候令堂。',pinyin:'Nà jiù hǎo. Qǐng dài wǒ wèn hòu lìng táng.',vi:'Vậy thì tốt. Nhờ bạn chuyển lời hỏi thăm mẹ bạn từ tôi nhé.'},
      {speaker:'A',role:'Hoa',zh:'好的，谢谢！',pinyin:'Hǎo de，xiè xiè！',vi:'Được rồi, cảm ơn!'},
    ]
  },
  {
    title:'Trên phương tiện giao thông công cộng', title_zh:'乘坐公共交通',
    type:'dialogue', hsk_level:'HSK2', topic:'transport', difficulty:'medium', order_index:52,
    description:'Đi tàu điện ngầm ở Bắc Kinh',
    lines:[
      {speaker:'外国人',role:'Người nước ngoài',zh:'请问，去天安门广场坐几号线？',pinyin:'Qǐng wèn，qù Tiān ān mén guǎng chǎng zuò jǐ hào xiàn？',vi:'Xin hỏi, đến Quảng trường Thiên An Môn đi tuyến số mấy?'},
      {speaker:'市民',role:'Người dân',zh:'坐一号线，在天安门东站下车。',pinyin:'Zuò yī hào xiàn，zài Tiān ān mén dōng zhàn xià chē.',vi:'Đi tuyến số 1, xuống ở ga Thiên An Môn Đông.'},
      {speaker:'外国人',role:'Người nước ngoài',zh:'从这里要几站？',pinyin:'Cóng zhè lǐ yào jǐ zhàn？',vi:'Từ đây đi mấy trạm?'},
      {speaker:'市民',role:'Người dân',zh:'三站，大概八分钟。',pinyin:'Sān zhàn，dà gài bā fēn zhōng.',vi:'Ba trạm, khoảng tám phút.'},
      {speaker:'外国人',role:'Người nước ngoài',zh:'票价多少钱？',pinyin:'Piào jià duō shǎo qián？',vi:'Vé giá bao nhiêu?'},
      {speaker:'市民',role:'Người dân',zh:'三块钱。你可以用手机扫码进站，很方便的。',pinyin:'Sān kuài qián. Nǐ kě yǐ yòng shǒu jī sǎo mǎ jìn zhàn，hěn fāng biàn de.',vi:'Ba tệ. Bạn có thể dùng điện thoại quét mã vào ga, rất tiện lợi.'},
      {speaker:'外国人',role:'Người nước ngoài',zh:'好的，谢谢您的帮助！',pinyin:'Hǎo de，xiè xiè nín de bāng zhù！',vi:'Được rồi, cảm ơn sự giúp đỡ của bạn!'},
    ]
  },
  {
    title:'Ở ngân hàng', title_zh:'在银行',
    type:'dialogue', hsk_level:'HSK2', topic:'finance', difficulty:'medium', order_index:53,
    description:'Mở tài khoản ngân hàng',
    lines:[
      {speaker:'客户',role:'Khách hàng',zh:'你好，我想开一个银行账户。',pinyin:'Nǐ hǎo，wǒ xiǎng kāi yī gè yín háng zhàng hù.',vi:'Xin chào, tôi muốn mở một tài khoản ngân hàng.'},
      {speaker:'银行员',role:'Nhân viên ngân hàng',zh:'好的，请把护照给我看一下。',pinyin:'Hǎo de，qǐng bǎ hù zhào gěi wǒ kàn yī xià.',vi:'Được rồi, nhờ bạn cho tôi xem hộ chiếu.'},
      {speaker:'客户',role:'Khách hàng',zh:'给您。请问需要多长时间？',pinyin:'Gěi nín. Qǐng wèn xū yào duō cháng shí jiān？',vi:'Đây ạ. Xin hỏi mất bao lâu?'},
      {speaker:'银行员',role:'Nhân viên ngân hàng',zh:'大概二十分钟。请填一下这张表格。',pinyin:'Dà gài èr shí fēn zhōng. Qǐng tián yī xià zhè zhāng biǎo gé.',vi:'Khoảng hai mươi phút. Nhờ bạn điền vào tờ mẫu này.'},
      {speaker:'客户',role:'Khách hàng',zh:'可以网上银行吗？',pinyin:'Kě yǐ wǎng shàng yín háng ma？',vi:'Có thể dùng ngân hàng trực tuyến không?'},
      {speaker:'银行员',role:'Nhân viên ngân hàng',zh:'可以，开户后我们会帮您开通网上银行和手机银行。',pinyin:'Kě yǐ，kāi hù hòu wǒ men huì bāng nín kāi tōng wǎng shàng yín háng hé shǒu jī yín háng.',vi:'Được, sau khi mở tài khoản chúng tôi sẽ giúp bạn đăng ký ngân hàng trực tuyến và ngân hàng di động.'},
    ]
  },
  {
    title:'Truyền thống Tết Nguyên Đán', title_zh:'春节传统习俗',
    type:'passage', hsk_level:'HSK2', topic:'culture', difficulty:'medium', order_index:54,
    description:'Đoạn văn về phong tục Tết',
    lines:[
      {speaker:'',role:'',zh:'春节是中国最重要的传统节日，相当于越南的"Tết"。',pinyin:'Chūn jié shì Zhōng guó zuì zhòng yào de chuán tǒng jié rì，xiāng dāng yú Yuè nán de "Tết".',vi:'Tết Nguyên Đán là lễ tết truyền thống quan trọng nhất của Trung Quốc, tương đương với Tết của Việt Nam.'},
      {speaker:'',role:'',zh:'过年时，家人要团聚，一起吃年夜饭，包饺子。',pinyin:'Guò nián shí，jiā rén yào tuán jù，yī qǐ chī nián yè fàn，bāo jiǎo zi.',vi:'Trong năm mới, gia đình phải đoàn tụ, cùng nhau ăn cơm tất niên, gói sủi cảo.'},
      {speaker:'',role:'',zh:'长辈会给孩子们压岁钱，装在红包里，象征好运。',pinyin:'Zhǎng bèi huì gěi hái zi men yā suì qián，zhuāng zài hóng bāo lǐ，xiàng zhēng hǎo yùn.',vi:'Người lớn sẽ tặng tiền mừng tuổi cho trẻ em, đựng trong phong bì đỏ, tượng trưng cho may mắn.'},
      {speaker:'',role:'',zh:'街上会有舞龙舞狮表演，还有烟火，非常热闹。',pinyin:'Jiē shàng huì yǒu wǔ lóng wǔ shī biǎo yǎn，hái yǒu yān huǒ，fēi cháng rè nào.',vi:'Ngoài đường sẽ có múa rồng múa lân, còn có pháo hoa, rất nhộn nhịp.'},
      {speaker:'',role:'',zh:'贴春联和"福"字也是重要的春节习俗，祈求新年平安幸福。',pinyin:'Tiē chūn lián hé "fú" zì yě shì zhòng yào de Chūn jié xí sú，qí qiú xīn nián píng ān xìng fú.',vi:'Dán câu đối và chữ "Phúc" cũng là phong tục Tết quan trọng, cầu chúc năm mới bình an hạnh phúc.'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Thảo luận về du học', title_zh:'关于留学的讨论',
    type:'dialogue', hsk_level:'HSK3', topic:'education', difficulty:'medium', order_index:55,
    description:'Bàn về việc đi du học',
    lines:[
      {speaker:'A',role:'Tuấn',zh:'你有没有想过去中国留学？',pinyin:'Nǐ yǒu méi yǒu xiǎng guò qù Zhōng guó liú xué？',vi:'Bạn có bao giờ nghĩ đến việc đi du học ở Trung Quốc không?'},
      {speaker:'B',role:'Hoa',zh:'想过，但担心语言不够好，还有生活费也很贵。',pinyin:'Xiǎng guò，dàn dān xīn yǔ yán bù gòu hǎo，hái yǒu shēng huó fèi yě hěn guì.',vi:'Có nghĩ đến, nhưng lo ngôn ngữ chưa đủ tốt, với lại chi phí sinh hoạt cũng khá đắt.'},
      {speaker:'A',role:'Tuấn',zh:'实际上有很多奖学金，而且中国生活费比欧洲便宜多了。',pinyin:'Shí jì shàng yǒu hěn duō jiǎng xué jīn，ér qiě Zhōng guó shēng huó fèi bǐ Ōu zhōu pián yi duō le.',vi:'Thực ra có nhiều học bổng lắm, với lại chi phí sinh hoạt ở Trung Quốc rẻ hơn châu Âu nhiều.'},
      {speaker:'B',role:'Hoa',zh:'你说的有道理。去哪所大学比较好？',pinyin:'Nǐ shuō de yǒu dào lǐ. Qù nǎ suǒ dà xué bǐ jiào hǎo？',vi:'Bạn nói có lý đấy. Nên đến trường đại học nào thì tốt?'},
      {speaker:'A',role:'Tuấn',zh:'北京大学、清华大学和复旦大学都很有名。选择取决于你学什么专业。',pinyin:'Běi jīng dà xué、Qīng huá dà xué hé Fù dàn dà xué dōu hěn yǒu míng. Xuǎn zé qǔ jué yú nǐ xué shén me zhuān yè.',vi:'Đại học Bắc Kinh, Thanh Hoa và Phúc Đán đều rất nổi tiếng. Lựa chọn phụ thuộc vào bạn học chuyên ngành gì.'},
      {speaker:'B',role:'Hoa',zh:'我学商务管理，听说复旦的商学院很好。',pinyin:'Wǒ xué shāng wù guǎn lǐ，tīng shuō Fù dàn de shāng xué yuàn hěn hǎo.',vi:'Tôi học quản trị kinh doanh, nghe nói khoa thương mại của Phúc Đán rất tốt.'},
      {speaker:'A',role:'Tuấn',zh:'那你去申请吧！机会留给准备好的人。',pinyin:'Nà nǐ qù shēn qǐng ba！Jī huì liú gěi zhǔn bèi hǎo de rén.',vi:'Vậy thì bạn cứ nộp hồ sơ đi! Cơ hội dành cho người đã chuẩn bị sẵn sàng.'},
    ]
  },
  {
    title:'Phim ảnh và giải trí', title_zh:'电影与娱乐',
    type:'dialogue', hsk_level:'HSK3', topic:'entertainment', difficulty:'medium', order_index:56,
    description:'Nói về phim và giải trí',
    lines:[
      {speaker:'A',role:'Nam',zh:'上周末你去看电影了吗？',pinyin:'Shàng zhōu mò nǐ qù kàn diàn yǐng le ma？',vi:'Cuối tuần trước bạn có đi xem phim không?'},
      {speaker:'B',role:'Lan',zh:'去了，看了《流浪地球》，非常震撼！',pinyin:'Qù le，kàn le "Liú làng dì qiú"，fēi cháng zhèn hàn！',vi:'Có đi, xem phim "Wandering Earth", rất ấn tượng!'},
      {speaker:'A',role:'Nam',zh:'我也很想看！故事主要讲什么？',pinyin:'Wǒ yě hěn xiǎng kàn！Gù shì zhǔ yào jiǎng shén me？',vi:'Tôi cũng rất muốn xem! Câu chuyện chủ yếu kể về gì?'},
      {speaker:'B',role:'Lan',zh:'讲的是未来太阳要爆炸，人类驾驶地球逃离太阳系的故事，充满科幻色彩。',pinyin:'Jiǎng de shì wèi lái tài yáng yào bào zhà，rén lèi jià shǐ dì qiú táo lí tài yáng xì de gù shì，chōng mǎn kē huàn sè cǎi.',vi:'Kể về tương lai mặt trời sắp nổ, loài người lái trái đất trốn thoát khỏi hệ mặt trời, đầy màu sắc khoa học viễn tưởng.'},
      {speaker:'A',role:'Nam',zh:'中国的科幻电影越来越厉害了！特效怎么样？',pinyin:'Zhōng guó de kē huàn diàn yǐng yuè lái yuè lì hai le！Tè xiào zěn me yàng？',vi:'Phim khoa học viễn tưởng của Trung Quốc ngày càng xuất sắc! Hiệu ứng hình ảnh thế nào?'},
      {speaker:'B',role:'Lan',zh:'特效非常好，不输好莱坞大片。强烈推荐你去看！',pinyin:'Tè xiào fēi cháng hǎo，bù shū Hǎo lái wù dà piàn. Qiáng liè tuī jiàn nǐ qù kàn！',vi:'Hiệu ứng rất tốt, không thua gì phim bom tấn Hollywood. Tôi cực lực giới thiệu bạn đi xem!'},
    ]
  },
  {
    title:'Người Việt Nam học tiếng Trung', title_zh:'越南人学汉语的优势',
    type:'passage', hsk_level:'HSK3', topic:'language', difficulty:'medium', order_index:57,
    description:'Ưu thế của người Việt khi học tiếng Trung',
    lines:[
      {speaker:'',role:'',zh:'越南语和汉语同属"汉藏语系"，有着深厚的历史渊源。',pinyin:'Yuè nán yǔ hé Hàn yǔ tóng shǔ "Hàn Zàng yǔ xì"，yǒu zhe shēn hòu de lì shǐ yuān yuán.',vi:'Tiếng Việt và tiếng Trung cùng thuộc "hệ ngôn ngữ Hán-Tạng", có nguồn gốc lịch sử sâu xa.'},
      {speaker:'',role:'',zh:'越南语中有大量来自汉语的借词，称为"汉越词"，如："电话"（điện thoại）、"大学"（đại học）。',pinyin:'Yuè nán yǔ zhōng yǒu dà liàng lái zì Hàn yǔ de jiè cí，chēng wéi "Hàn Yuè cí"，rú："diàn huà"（điện thoại）、"dà xué"（đại học）.',vi:'Trong tiếng Việt có rất nhiều từ vay mượn từ tiếng Trung, gọi là "từ Hán Việt", như: "điện thoại", "đại học".'},
      {speaker:'',role:'',zh:'越南语有六个声调，比汉语的四个声调更复杂，所以越南人学汉语的声调相对容易。',pinyin:'Yuè nán yǔ yǒu liù gè shēng diào，bǐ Hàn yǔ de sì gè shēng diào gèng fù zá，suǒ yǐ Yuè nán rén xué Hàn yǔ de shēng diào xiāng duì rōng yì.',vi:'Tiếng Việt có sáu thanh điệu, phức tạp hơn bốn thanh điệu trong tiếng Trung, nên người Việt học thanh điệu tiếng Trung tương đối dễ hơn.'},
      {speaker:'',role:'',zh:'当然，汉字对越南人来说是最大的挑战，需要大量的记忆和练习。',pinyin:'Dāng rán，Hàn zì duì Yuè nán rén lái shuō shì zuì dà de tiǎo zhàn，xū yào dà liàng de jì yì hé liàn xí.',vi:'Tất nhiên, chữ Hán đối với người Việt là thách thức lớn nhất, cần nhiều ghi nhớ và luyện tập.'},
      {speaker:'',role:'',zh:'总体而言，越南人学汉语有先天优势，只要坚持，一定能学好！',pinyin:'Zǒng tǐ ér yán，Yuè nán rén xué Hàn yǔ yǒu xiān tiān yōu shì，zhǐ yào jiān chí，yī dìng néng xué hǎo！',vi:'Nhìn chung, người Việt học tiếng Trung có lợi thế bẩm sinh, chỉ cần kiên trì nhất định sẽ học được!'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Thảo luận về đô thị hoá', title_zh:'城镇化发展的讨论',
    type:'dialogue', hsk_level:'HSK4', topic:'society', difficulty:'hard', order_index:58,
    description:'Thảo luận về đô thị hóa và vấn đề xã hội',
    lines:[
      {speaker:'A',role:'Bình',zh:'中国的城镇化率已经超过了百分之六十五，你觉得这是好事吗？',pinyin:'Zhōng guó de chéng zhèn huà lǜ yǐ jīng chāo guò le bǎi fēn zhī liù shí wǔ，nǐ jué de zhè shì hǎo shì ma？',vi:'Tỉ lệ đô thị hoá của Trung Quốc đã vượt 65%, bạn nghĩ đây có phải là điều tốt không?'},
      {speaker:'B',role:'Hùng',zh:'总体来说是好的，城镇化带来了经济发展和生活水平的提高。',pinyin:'Zǒng tǐ lái shuō shì hǎo de，chéng zhèn huà dài lái le jīng jì fā zhǎn hé shēng huó shuǐ píng de tí gāo.',vi:'Nhìn chung là tốt, đô thị hoá mang lại phát triển kinh tế và nâng cao mức sống.'},
      {speaker:'A',role:'Bình',zh:'但农村的空心化问题怎么解决？大量年轻人涌入城市，乡村日益衰败。',pinyin:'Dàn nóng cūn de kōng xīn huà wèn tí zěn me jiě jué？Dà liàng nián qīng rén yǒng rù chéng shì，xiāng cūn rì yì shuāi bài.',vi:'Nhưng vấn đề làng quê trống rỗng thì giải quyết thế nào? Lượng lớn người trẻ đổ vào thành phố, nông thôn ngày càng suy tàn.'},
      {speaker:'B',role:'Hùng',zh:'这确实是个矛盾。需要推进乡村振兴战略，让农村也有发展机会。',pinyin:'Zhè què shí shì gè máo dùn. Xū yào tuī jìn xiāng cūn zhèn xīng zhàn lüè，ràng nóng cūn yě yǒu fā zhǎn jī huì.',vi:'Đây đúng là mâu thuẫn. Cần thúc đẩy chiến lược phục hưng nông thôn, để nông thôn cũng có cơ hội phát triển.'},
      {speaker:'A',role:'Bình',zh:'对，发展特色农业、乡村旅游，让农村也有竞争力。',pinyin:'Duì，fā zhǎn tè sè nóng yè、xiāng cūn lǚ yóu，ràng nóng cūn yě yǒu jìng zhēng lì.',vi:'Đúng, phát triển nông nghiệp đặc trưng, du lịch nông thôn, để nông thôn cũng có sức cạnh tranh.'},
      {speaker:'B',role:'Hùng',zh:'城乡协调发展才是真正的可持续发展，不能只顾城市而忽视农村。',pinyin:'Chéng xiāng xié tiáo fā zhǎn cái shì zhēn zhèng de kě chí xù fā zhǎn，bù néng zhǐ gù chéng shì ér hū shì nóng cūn.',vi:'Phát triển hài hoà thành thị-nông thôn mới là phát triển bền vững thực sự, không thể chỉ chăm lo thành phố mà bỏ quên nông thôn.'},
    ]
  },
  {
    title:'Nghệ thuật hiện đại Trung Quốc', title_zh:'中国当代艺术',
    type:'passage', hsk_level:'HSK4', topic:'arts', difficulty:'hard', order_index:59,
    description:'Bài viết về nghệ thuật đương đại Trung Quốc',
    lines:[
      {speaker:'',role:'',zh:'中国当代艺术在过去几十年里经历了翻天覆地的变化。',pinyin:'Zhōng guó dāng dài yì shù zài guò qù jǐ shí nián lǐ jīng lì le fān tiān fù dì de biàn huà.',vi:'Nghệ thuật đương đại Trung Quốc đã trải qua những thay đổi to lớn trong mấy thập kỷ qua.'},
      {speaker:'',role:'',zh:'从传统水墨画到当代装置艺术，中国艺术家在不断探索传统与现代的融合。',pinyin:'Cóng chuán tǒng shuǐ mò huà dào dāng dài zhuāng zhì yì shù，Zhōng guó yì shù jiā zài bù duàn tàn suǒ chuán tǒng yǔ xiàn dài de róng hé.',vi:'Từ tranh thuỷ mặc truyền thống đến nghệ thuật sắp đặt đương đại, các nghệ sĩ Trung Quốc không ngừng khám phá sự hoà quyện giữa truyền thống và hiện đại.'},
      {speaker:'',role:'',zh:'艾未未、曾梵志等艺术家将中国元素与西方现代艺术理念巧妙结合，在国际艺术界引起广泛关注。',pinyin:'Ài Wèi wèi、Zēng Fàn zhì děng yì shù jiā jiāng Zhōng guó yuán sù yǔ Xī fāng xiàn dài yì shù lǐ niàn qiǎo miào jié hé，zài guó jì yì shù jiè yǐn qǐ guǎng fàn guān zhù.',vi:'Các nghệ sĩ như Ngải Vị Vị, Tăng Phạm Chí khéo léo kết hợp yếu tố Trung Hoa với lý niệm nghệ thuật hiện đại phương Tây, gây chú ý rộng rãi trên trường quốc tế.'},
      {speaker:'',role:'',zh:'中国的拍卖市场蓬勃发展，北京和上海已成为亚洲重要的艺术交易中心。',pinyin:'Zhōng guó de pāi mài shì chǎng péng bó fā zhǎn，Běi jīng hé Shàng hǎi yǐ chéng wéi Yà zhōu zhòng yào de yì shù jiāo yì zhōng xīn.',vi:'Thị trường đấu giá Trung Quốc phát triển mạnh mẽ, Bắc Kinh và Thượng Hải đã trở thành trung tâm giao dịch nghệ thuật quan trọng của châu Á.'},
      {speaker:'',role:'',zh:'当代中国艺术不仅讲述中国故事，也在向世界传递中国文化的独特魅力。',pinyin:'Dāng dài Zhōng guó yì shù bù jǐn jiǎng shù Zhōng guó gù shì，yě zài xiàng shì jiè chuán dì Zhōng guó wén huà de dú tè mèi lì.',vi:'Nghệ thuật đương đại Trung Quốc không chỉ kể câu chuyện Trung Quốc, mà còn truyền tải vẻ đẹp độc đáo của văn hoá Trung Hoa đến thế giới.'},
    ]
  },
  {
    title:'Phát triển bền vững', title_zh:'可持续发展',
    type:'dialogue', hsk_level:'HSK4', topic:'environment', difficulty:'hard', order_index:60,
    description:'Bàn về phát triển bền vững và năng lượng xanh',
    lines:[
      {speaker:'A',role:'Lan',zh:'中国宣布要在2060年实现碳中和，你觉得这个目标现实吗？',pinyin:'Zhōng guó xuān bù yào zài 2060 nián shí xiàn tàn zhōng hé，nǐ jué de zhè gè mù biāo xiàn shí ma？',vi:'Trung Quốc tuyên bố muốn đạt trung hoà carbon vào năm 2060, bạn thấy mục tiêu này có thực tế không?'},
      {speaker:'B',role:'Minh',zh:'有挑战，但并非不可能。中国在太阳能和风能领域已经走在世界前列。',pinyin:'Yǒu tiǎo zhàn，dàn bìng fēi bù kě néng. Zhōng guó zài tài yáng néng hé fēng néng lǐng yù yǐ jīng zǒu zài shì jiè qián liè.',vi:'Có thách thức, nhưng không phải là không thể. Trung Quốc trong lĩnh vực năng lượng mặt trời và gió đã đứng đầu thế giới.'},
      {speaker:'A',role:'Lan',zh:'但煤炭仍然占中国能源消耗的很大比重，转型需要时间。',pinyin:'Dàn méi tàn réng rán zhàn Zhōng guó néng yuán xiāo hào de hěn dà bǐ zhòng，zhuǎn xíng xū yào shí jiān.',vi:'Nhưng than đá vẫn chiếm tỉ trọng lớn trong tiêu thụ năng lượng của Trung Quốc, chuyển đổi cần có thời gian.'},
      {speaker:'B',role:'Minh',zh:'没错，但电动汽车的普及速度超出预期，这是个好信号。',pinyin:'Méi cuò，dàn diàn dòng qì chē de pǔ jí sù dù chāo chū yù qī，zhè shì gè hǎo xìn hào.',vi:'Đúng vậy, nhưng tốc độ phổ cập xe điện vượt quá kỳ vọng, đây là tín hiệu tốt.'},
      {speaker:'A',role:'Lan',zh:'技术创新是关键。如果储能技术和氢能技术有突破，转型就会加速。',pinyin:'Jì shù chuàng xīn shì guān jiàn. Rú guǒ chǔ néng jì shù hé qīng néng jì shù yǒu tū pò，zhuǎn xíng jiù huì jiā sù.',vi:'Đổi mới công nghệ là chìa khoá. Nếu công nghệ lưu trữ năng lượng và năng lượng hydro có đột phá, quá trình chuyển đổi sẽ tăng tốc.'},
      {speaker:'B',role:'Minh',zh:'所以加大对绿色科技的投入，是中国实现碳中和的必由之路。',pinyin:'Suǒ yǐ jiā dà duì lǜ sè kē jì de tóu rù，shì Zhōng guó shí xiàn tàn zhōng hé de bì yóu zhī lù.',vi:'Vì vậy tăng đầu tư vào công nghệ xanh là con đường tất yếu để Trung Quốc đạt được trung hoà carbon.'},
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
    const [byLevel] = await conn.query(
      'SELECT hsk_level, type, COUNT(*) c FROM dialogues WHERE is_active=1 GROUP BY hsk_level, type ORDER BY hsk_level, type');
    console.log(`\n✅ Batch 4 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})`);
    console.log('\n📊 Phân bổ:');
    byLevel.forEach(r => console.log(`   ${r.hsk_level} ${r.type}: ${r.c}`));
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
