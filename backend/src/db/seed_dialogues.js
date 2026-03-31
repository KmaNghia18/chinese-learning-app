// seed_dialogues.js — Hội thoại & Đoạn văn song ngữ Trung-Việt
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════════════════════════════════════════════
  // HSK1 — HỘI THOẠI
  // ══════════════════════════════════════════════════════════
  {
    title:'Chào hỏi lần đầu gặp mặt', title_zh:'初次见面打招呼',
    type:'dialogue', hsk_level:'HSK1', topic:'greetings', difficulty:'easy', order_index:1,
    description:'Hai người gặp nhau lần đầu và giới thiệu bản thân',
    lines:[
      {speaker:'A',role:'Minh',zh:'你好！',pinyin:'Nǐ hǎo！',vi:'Xin chào!'},
      {speaker:'B',role:'Hoa',zh:'你好！你叫什么名字？',pinyin:'Nǐ hǎo！Nǐ jiào shén me míng zi？',vi:'Xin chào! Bạn tên là gì?'},
      {speaker:'A',role:'Minh',zh:'我叫明。你呢？',pinyin:'Wǒ jiào Míng. Nǐ ne？',vi:'Tôi tên là Minh. Còn bạn?'},
      {speaker:'B',role:'Hoa',zh:'我叫花。很高兴认识你！',pinyin:'Wǒ jiào Huā. Hěn gāo xìng rèn shi nǐ！',vi:'Tôi tên là Hoa. Rất vui được gặp bạn!'},
      {speaker:'A',role:'Minh',zh:'我也很高兴认识你！',pinyin:'Wǒ yě hěn gāo xìng rèn shi nǐ！',vi:'Tôi cũng rất vui được gặp bạn!'},
      {speaker:'B',role:'Hoa',zh:'你是哪国人？',pinyin:'Nǐ shì nǎ guó rén？',vi:'Bạn là người nước nào?'},
      {speaker:'A',role:'Minh',zh:'我是越南人。你呢？',pinyin:'Wǒ shì Yuè nán rén. Nǐ ne？',vi:'Tôi là người Việt Nam. Còn bạn?'},
      {speaker:'B',role:'Hoa',zh:'我是中国人。再见！',pinyin:'Wǒ shì Zhōng guó rén. Zài jiàn！',vi:'Tôi là người Trung Quốc. Tạm biệt!'},
      {speaker:'A',role:'Minh',zh:'再见！',pinyin:'Zài jiàn！',vi:'Tạm biệt!'},
    ]
  },
  {
    title:'Trong lớp học', title_zh:'在教室里',
    type:'dialogue', hsk_level:'HSK1', topic:'school', difficulty:'easy', order_index:2,
    description:'Học sinh và giáo viên trong lớp học',
    lines:[
      {speaker:'老师',role:'Giáo viên',zh:'同学们好！',pinyin:'Tóng xué men hǎo！',vi:'Chào các bạn học sinh!'},
      {speaker:'学生',role:'Học sinh',zh:'老师好！',pinyin:'Lǎo shī hǎo！',vi:'Chào thầy/cô giáo!'},
      {speaker:'老师',role:'Giáo viên',zh:'今天学什么？',pinyin:'Jīn tiān xué shén me？',vi:'Hôm nay học gì?'},
      {speaker:'学生',role:'Học sinh',zh:'今天学数字。',pinyin:'Jīn tiān xué shù zì.',vi:'Hôm nay học số.'},
      {speaker:'老师',role:'Giáo viên',zh:'好的。一、二、三……',pinyin:'Hǎo de. Yī、èr、sān……',vi:'Được rồi. Một, hai, ba...'},
      {speaker:'学生',role:'Học sinh',zh:'一、二、三、四、五！',pinyin:'Yī、èr、sān、sì、wǔ！',vi:'Một, hai, ba, bốn, năm!'},
      {speaker:'老师',role:'Giáo viên',zh:'很好！你们很棒！',pinyin:'Hěn hǎo！Nǐ men hěn bàng！',vi:'Rất tốt! Các bạn giỏi lắm!'},
    ]
  },
  {
    title:'Đặt đồ ăn tại nhà hàng', title_zh:'在餐厅点餐',
    type:'dialogue', hsk_level:'HSK1', topic:'food', difficulty:'easy', order_index:3,
    description:'Gọi món ăn tại nhà hàng Trung Quốc',
    lines:[
      {speaker:'服务员',role:'Nhân viên',zh:'你好！你要什么？',pinyin:'Nǐ hǎo！Nǐ yào shén me？',vi:'Xin chào! Bạn muốn gì?'},
      {speaker:'客人',role:'Khách',zh:'我要一碗米饭。',pinyin:'Wǒ yào yī wǎn mǐ fàn.',vi:'Tôi muốn một bát cơm.'},
      {speaker:'服务员',role:'Nhân viên',zh:'还要什么？',pinyin:'Hái yào shén me？',vi:'Còn muốn gì nữa?'},
      {speaker:'客人',role:'Khách',zh:'我要一杯茶。',pinyin:'Wǒ yào yī bēi chá.',vi:'Tôi muốn một cốc trà.'},
      {speaker:'服务员',role:'Nhân viên',zh:'好的。一共二十块。',pinyin:'Hǎo de. Yī gòng èr shí kuài.',vi:'Được rồi. Tổng cộng hai mươi tệ.'},
      {speaker:'客人',role:'Khách',zh:'给你钱。谢谢！',pinyin:'Gěi nǐ qián. Xiè xiè！',vi:'Đây tiền cho bạn. Cảm ơn!'},
      {speaker:'服务员',role:'Nhân viên',zh:'不客气！慢用！',pinyin:'Bù kè qi！Màn yòng！',vi:'Không có gì! Mời dùng bữa!'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK1 — ĐOẠN VĂN
  // ══════════════════════════════════════════════════════════
  {
    title:'Gia đình tôi', title_zh:'我的家人',
    type:'passage', hsk_level:'HSK1', topic:'family', difficulty:'easy', order_index:4,
    description:'Đoạn văn giới thiệu về gia đình',
    lines:[
      {speaker:'',role:'',zh:'我家有五口人。',pinyin:'Wǒ jiā yǒu wǔ kǒu rén.',vi:'Gia đình tôi có năm người.'},
      {speaker:'',role:'',zh:'爸爸是医生，妈妈是老师。',pinyin:'Bà ba shì yī shēng，mā ma shì lǎo shī.',vi:'Bố là bác sĩ, mẹ là giáo viên.'},
      {speaker:'',role:'',zh:'我有一个哥哥和一个妹妹。',pinyin:'Wǒ yǒu yī gè gē ge hé yī gè mèi mei.',vi:'Tôi có một anh trai và một em gái.'},
      {speaker:'',role:'',zh:'哥哥很高，妹妹很可爱。',pinyin:'Gē ge hěn gāo，mèi mei hěn kě ài.',vi:'Anh trai rất cao, em gái rất đáng yêu.'},
      {speaker:'',role:'',zh:'我们家很幸福。',pinyin:'Wǒ men jiā hěn xìng fú.',vi:'Gia đình chúng tôi rất hạnh phúc.'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK2 — HỘI THOẠI
  // ══════════════════════════════════════════════════════════
  {
    title:'Hỏi đường', title_zh:'问路',
    type:'dialogue', hsk_level:'HSK2', topic:'directions', difficulty:'easy', order_index:5,
    description:'Hỏi đường đến nhà hàng',
    lines:[
      {speaker:'A',role:'Du khách',zh:'你好，请问附近有餐厅吗？',pinyin:'Nǐ hǎo，qǐng wèn fù jìn yǒu cān tīng ma？',vi:'Xin chào, xin hỏi gần đây có nhà hàng không?'},
      {speaker:'B',role:'Người dân',zh:'有的，前面直走，然后左转。',pinyin:'Yǒu de，qián miàn zhí zǒu，rán hòu zuǒ zhuǎn.',vi:'Có, đi thẳng phía trước, rồi rẽ trái.'},
      {speaker:'A',role:'Du khách',zh:'要走多长时间？',pinyin:'Yào zǒu duō cháng shí jiān？',vi:'Đi bộ mất bao lâu?'},
      {speaker:'B',role:'Người dân',zh:'大概五分钟。不远的。',pinyin:'Dà gài wǔ fēn zhōng. Bù yuǎn de.',vi:'Khoảng năm phút. Không xa đâu.'},
      {speaker:'A',role:'Du khách',zh:'那家餐厅叫什么名字？',pinyin:'Nà jiā cān tīng jiào shén me míng zi？',vi:'Nhà hàng đó tên là gì?'},
      {speaker:'B',role:'Người dân',zh:'叫"北京饭店"，很好吃的。',pinyin:'Jiào "Běi jīng fàn diàn"，hěn hǎo chī de.',vi:'Tên là "Nhà hàng Bắc Kinh", rất ngon.'},
      {speaker:'A',role:'Du khách',zh:'谢谢你！',pinyin:'Xiè xiè nǐ！',vi:'Cảm ơn bạn!'},
      {speaker:'B',role:'Người dân',zh:'不客气，祝你用餐愉快！',pinyin:'Bù kè qi，zhù nǐ yòng cān yú kuài！',vi:'Không có gì, chúc bạn dùng bữa ngon miệng!'},
    ]
  },
  {
    title:'Mua sắm tại chợ', title_zh:'在市场买东西',
    type:'dialogue', hsk_level:'HSK2', topic:'shopping', difficulty:'easy', order_index:6,
    description:'Mặc cả và mua đồ tại chợ',
    lines:[
      {speaker:'买家',role:'Người mua',zh:'你好，这件衣服多少钱？',pinyin:'Nǐ hǎo，zhè jiàn yī fu duō shǎo qián？',vi:'Xin chào, chiếc áo này bao nhiêu tiền?'},
      {speaker:'卖家',role:'Người bán',zh:'这件一百五十块。',pinyin:'Zhè jiàn yī bǎi wǔ shí kuài.',vi:'Chiếc này một trăm năm mươi tệ.'},
      {speaker:'买家',role:'Người mua',zh:'太贵了，可以便宜一点吗？',pinyin:'Tài guì le，kě yǐ pián yi yī diǎn ma？',vi:'Đắt quá, có thể rẻ hơn một chút không?'},
      {speaker:'卖家',role:'Người bán',zh:'好吧，一百二十块，不能再少了。',pinyin:'Hǎo ba，yī bǎi èr shí kuài，bù néng zài shǎo le.',vi:'Thôi được, một trăm hai mươi tệ, không thể ít hơn nữa.'},
      {speaker:'买家',role:'Người mua',zh:'还有别的颜色吗？我想要蓝色。',pinyin:'Hái yǒu bié de yán sè ma？Wǒ xiǎng yào lán sè.',vi:'Còn màu khác không? Tôi muốn màu xanh.'},
      {speaker:'卖家',role:'Người bán',zh:'有，你稍等，我去找。',pinyin:'Yǒu，nǐ shāo děng，wǒ qù zhǎo.',vi:'Có, bạn đợi một chút, tôi đi tìm.'},
      {speaker:'买家',role:'Người mua',zh:'好的，谢谢！',pinyin:'Hǎo de，xiè xiè！',vi:'Được rồi, cảm ơn!'},
      {speaker:'卖家',role:'Người bán',zh:'这是蓝色的。怎么样？',pinyin:'Zhè shì lán sè de. Zěn me yàng？',vi:'Đây là màu xanh. Thế nào?'},
      {speaker:'买家',role:'Người mua',zh:'很好！我买了。',pinyin:'Hěn hǎo！Wǒ mǎi le.',vi:'Rất đẹp! Tôi mua rồi.'},
    ]
  },
  {
    title:'Đặt vé tàu', title_zh:'买火车票',
    type:'dialogue', hsk_level:'HSK2', topic:'travel', difficulty:'medium', order_index:7,
    description:'Mua vé tàu tại ga',
    lines:[
      {speaker:'旅客',role:'Hành khách',zh:'你好，我想买两张去上海的票。',pinyin:'Nǐ hǎo，wǒ xiǎng mǎi liǎng zhāng qù Shàng hǎi de piào.',vi:'Xin chào, tôi muốn mua hai vé đi Thượng Hải.'},
      {speaker:'售票员',role:'Nhân viên bán vé',zh:'什么时候出发？',pinyin:'Shén me shí hòu chū fā？',vi:'Bao giờ khởi hành?'},
      {speaker:'旅客',role:'Hành khách',zh:'明天上午九点的。',pinyin:'Míng tiān shàng wǔ jiǔ diǎn de.',vi:'Chuyến ngày mai lúc chín giờ sáng.'},
      {speaker:'售票员',role:'Nhân viên bán vé',zh:'一等座还是二等座？',pinyin:'Yī děng zuò hái shì èr děng zuò？',vi:'Ghế hạng một hay hạng hai?'},
      {speaker:'旅客',role:'Hành khách',zh:'二等座就可以了，多少钱？',pinyin:'Èr děng zuò jiù kě yǐ le，duō shǎo qián？',vi:'Hạng hai là được, bao nhiêu tiền?'},
      {speaker:'售票员',role:'Nhân viên bán vé',zh:'两张共三百块。',pinyin:'Liǎng zhāng gòng sān bǎi kuài.',vi:'Hai vé tổng cộng ba trăm tệ.'},
      {speaker:'旅客',role:'Hành khách',zh:'好，这是钱。几号站台？',pinyin:'Hǎo，zhè shì qián. Jǐ hào zhàn tái？',vi:'Được, đây là tiền. Sân ga số mấy?'},
      {speaker:'售票员',role:'Nhân viên bán vé',zh:'三号站台。提前十分钟上车。',pinyin:'Sān hào zhàn tái. Tí qián shí fēn zhōng shàng chē.',vi:'Sân ga số ba. Lên tàu trước mười phút.'},
      {speaker:'旅客',role:'Hành khách',zh:'谢谢，祝您工作顺利！',pinyin:'Xiè xiè，zhù nín gōng zuò shùn lì！',vi:'Cảm ơn, chúc bạn công việc thuận lợi!'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK2 — ĐOẠN VĂN
  // ══════════════════════════════════════════════════════════
  {
    title:'Một ngày của tôi', title_zh:'我的一天',
    type:'passage', hsk_level:'HSK2', topic:'daily_life', difficulty:'easy', order_index:8,
    description:'Đoạn văn kể về một ngày bình thường',
    lines:[
      {speaker:'',role:'',zh:'我每天早上七点起床。',pinyin:'Wǒ měi tiān zǎo shàng qī diǎn qǐ chuáng.',vi:'Mỗi ngày tôi thức dậy lúc bảy giờ sáng.'},
      {speaker:'',role:'',zh:'先洗澡，然后吃早饭。',pinyin:'Xiān xǐ zǎo，rán hòu chī zǎo fàn.',vi:'Trước tiên tắm rửa, sau đó ăn sáng.'},
      {speaker:'',role:'',zh:'八点半去公司上班。',pinyin:'Bā diǎn bàn qù gōng sī shàng bān.',vi:'Tám rưỡi đi làm ở công ty.'},
      {speaker:'',role:'',zh:'中午和同事一起吃午饭。',pinyin:'Zhōng wǔ hé tóng shì yī qǐ chī wǔ fàn.',vi:'Buổi trưa ăn cơm trưa cùng đồng nghiệp.'},
      {speaker:'',role:'',zh:'下午五点下班，然后去超市买菜。',pinyin:'Xià wǔ wǔ diǎn xià bān，rán hòu qù chāo shì mǎi cài.',vi:'Năm giờ chiều tan làm, sau đó đi siêu thị mua đồ.'},
      {speaker:'',role:'',zh:'晚上看书或者看电视。',pinyin:'Wǎn shàng kàn shū huò zhě kàn diàn shì.',vi:'Buổi tối đọc sách hoặc xem tivi.'},
      {speaker:'',role:'',zh:'十一点睡觉。我的生活很充实。',pinyin:'Shí yī diǎn shuì jiào. Wǒ de shēng huó hěn chōng shí.',vi:'Mười một giờ đi ngủ. Cuộc sống của tôi rất phong phú.'},
    ]
  },
  {
    title:'Thành phố Bắc Kinh', title_zh:'北京城市介绍',
    type:'passage', hsk_level:'HSK2', topic:'culture', difficulty:'medium', order_index:9,
    description:'Giới thiệu về thành phố Bắc Kinh',
    lines:[
      {speaker:'',role:'',zh:'北京是中国的首都。',pinyin:'Běi jīng shì Zhōng guó de shǒu dū.',vi:'Bắc Kinh là thủ đô của Trung Quốc.'},
      {speaker:'',role:'',zh:'这座城市有三千多年的历史。',pinyin:'Zhè zuò chéng shì yǒu sān qiān duō nián de lì shǐ.',vi:'Thành phố này có hơn ba nghìn năm lịch sử.'},
      {speaker:'',role:'',zh:'北京有很多著名的景点。',pinyin:'Běi jīng yǒu hěn duō zhù míng de jǐng diǎn.',vi:'Bắc Kinh có rất nhiều điểm tham quan nổi tiếng.'},
      {speaker:'',role:'',zh:'长城和故宫是最有名的地方。',pinyin:'Cháng chéng hé Gù gōng shì zuì yǒu míng de dì fāng.',vi:'Vạn Lý Trường Thành và Tử Cấm Thành là những nơi nổi tiếng nhất.'},
      {speaker:'',role:'',zh:'北京的烤鸭非常好吃，值得一试。',pinyin:'Běi jīng de kǎo yā fēi cháng hǎo chī，zhí dé yī shì.',vi:'Vịt quay Bắc Kinh rất ngon, đáng để thử một lần.'},
      {speaker:'',role:'',zh:'如果你来中国，一定要去北京！',pinyin:'Rú guǒ nǐ lái Zhōng guó，yī dìng yào qù Běi jīng！',vi:'Nếu bạn đến Trung Quốc, nhất định phải đến Bắc Kinh!'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK3 — HỘI THOẠI
  // ══════════════════════════════════════════════════════════
  {
    title:'Phỏng vấn xin việc', title_zh:'求职面试',
    type:'dialogue', hsk_level:'HSK3', topic:'work', difficulty:'medium', order_index:10,
    description:'Cuộc phỏng vấn tại một công ty Trung Quốc',
    lines:[
      {speaker:'面试官',role:'Người phỏng vấn',zh:'请坐。你能介绍一下你自己吗？',pinyin:'Qǐng zuò. Nǐ néng jiè shào yī xià nǐ zì jǐ ma？',vi:'Mời ngồi. Bạn có thể tự giới thiệu bản thân không?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'当然可以。我叫王明，毕业于河内大学，学的是国际贸易。',pinyin:'Dāng rán kě yǐ. Wǒ jiào Wáng Míng，bì yè yú Hé nèi dà xué，xué de shì guó jì mào yì.',vi:'Tất nhiên. Tôi tên Vương Minh, tốt nghiệp Đại học Hà Nội, chuyên ngành thương mại quốc tế.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'你有什么工作经验？',pinyin:'Nǐ yǒu shén me gōng zuò jīng yàn？',vi:'Bạn có kinh nghiệm làm việc gì?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'我在一家越南公司工作了两年，负责对中国的业务。',pinyin:'Wǒ zài yī jiā Yuè nán gōng sī gōng zuò le liǎng nián，fù zé duì Zhōng guó de yè wù.',vi:'Tôi đã làm việc tại một công ty Việt Nam hai năm, phụ trách nghiệp vụ với Trung Quốc.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'你的汉语水平怎么样？',pinyin:'Nǐ de Hàn yǔ shuǐ píng zěn me yàng？',vi:'Trình độ tiếng Trung của bạn thế nào?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'我通过了HSK四级考试，可以用汉语进行商务谈判。',pinyin:'Wǒ tōng guò le HSK sì jí kǎo shì，kě yǐ yòng Hàn yǔ jìn xíng shāng wù tán pàn.',vi:'Tôi đã vượt qua kỳ thi HSK cấp 4, có thể đàm phán thương mại bằng tiếng Trung.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'很好。你对我们公司有什么了解？',pinyin:'Hěn hǎo. Nǐ duì wǒ men gōng sī yǒu shén me liǎo jiě？',vi:'Rất tốt. Bạn hiểu gì về công ty chúng tôi?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'贵公司是行业领先企业，产品出口到东南亚各国。我很希望能加入这个团队。',pinyin:'Guì gōng sī shì háng yè lǐng xiān qǐ yè，chǎn pǐn chū kǒu dào Dōng nán yà gè guó. Wǒ hěn xī wàng néng jiā rù zhè gè tuán duì.',vi:'Công ty của các bạn là doanh nghiệp dẫn đầu ngành, sản phẩm xuất khẩu sang các nước Đông Nam Á. Tôi rất muốn được gia nhập đội ngũ này.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'好的，我们会尽快通知你结果。',pinyin:'Hǎo de，wǒ men huì jǐn kuài tōng zhī nǐ jié guǒ.',vi:'Được rồi, chúng tôi sẽ thông báo kết quả cho bạn sớm nhất có thể.'},
    ]
  },
  {
    title:'Ở bệnh viện', title_zh:'在医院看病',
    type:'dialogue', hsk_level:'HSK3', topic:'health', difficulty:'medium', order_index:11,
    description:'Bệnh nhân đến khám bác sĩ',
    lines:[
      {speaker:'医生',role:'Bác sĩ',zh:'你哪里不舒服？',pinyin:'Nǐ nǎ lǐ bù shū fu？',vi:'Bạn khó chịu ở đâu?'},
      {speaker:'患者',role:'Bệnh nhân',zh:'我头疼，而且发烧了。已经两天了。',pinyin:'Wǒ tóu téng，ér qiě fā shāo le. Yǐ jīng liǎng tiān le.',vi:'Tôi bị đau đầu và sốt. Đã hai ngày rồi.'},
      {speaker:'医生',role:'Bác sĩ',zh:'我给你量一下体温。哦，三十八度五。',pinyin:'Wǒ gěi nǐ liáng yī xià tǐ wēn. Ō，sān shí bā dù wǔ.',vi:'Tôi đo nhiệt độ cho bạn nhé. Ồ, ba mươi tám độ rưỡi.'},
      {speaker:'患者',role:'Bệnh nhân',zh:'严重吗？',pinyin:'Yán zhòng ma？',vi:'Có nghiêm trọng không?'},
      {speaker:'医生',role:'Bác sĩ',zh:'不太严重，是普通感冒。需要休息和多喝水。',pinyin:'Bù tài yán zhòng，shì pǔ tōng gǎn mào. Xū yào xiū xi hé duō hē shuǐ.',vi:'Không quá nghiêm trọng, chỉ là cảm lạnh thông thường. Cần nghỉ ngơi và uống nhiều nước.'},
      {speaker:'患者',role:'Bệnh nhân',zh:'需要吃药吗？',pinyin:'Xū yào chī yào ma？',vi:'Có cần uống thuốc không?'},
      {speaker:'医生',role:'Bác sĩ',zh:'我给你开一些退烧药和感冒药。三天后如果还没好，再来复查。',pinyin:'Wǒ gěi nǐ kāi yī xiē tuì shāo yào hé gǎn mào yào. Sān tiān hòu rú guǒ hái méi hǎo，zài lái fù chá.',vi:'Tôi sẽ kê thuốc hạ sốt và thuốc cảm cho bạn. Ba ngày sau nếu chưa khỏi, hãy đến tái khám.'},
      {speaker:'患者',role:'Bệnh nhân',zh:'好的，谢谢医生。',pinyin:'Hǎo de，xiè xiè yī shēng.',vi:'Được rồi, cảm ơn bác sĩ.'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK3 — ĐOẠN VĂN
  // ══════════════════════════════════════════════════════════
  {
    title:'Học tiếng Trung như thế nào', title_zh:'如何学好汉语',
    type:'passage', hsk_level:'HSK3', topic:'education', difficulty:'medium', order_index:12,
    description:'Bài viết về phương pháp học tiếng Trung hiệu quả',
    lines:[
      {speaker:'',role:'',zh:'学好汉语需要时间和努力，但并不是不可能的事情。',pinyin:'Xué hǎo Hàn yǔ xū yào shí jiān hé nǔ lì，dàn bìng bù shì bù kě néng de shì qíng.',vi:'Học giỏi tiếng Trung cần thời gian và nỗ lực, nhưng không phải là điều không thể.'},
      {speaker:'',role:'',zh:'首先，每天坚持学习是最重要的。即使只有三十分钟也好。',pinyin:'Shǒu xiān，měi tiān jiān chí xué xí shì zuì zhòng yào de. Jí shǐ zhǐ yǒu sān shí fēn zhōng yě hǎo.',vi:'Đầu tiên, kiên trì học mỗi ngày là quan trọng nhất. Dù chỉ ba mươi phút cũng được.'},
      {speaker:'',role:'',zh:'其次，多听多说。可以听中文歌，看中文电影。',pinyin:'Qí cì，duō tīng duō shuō. Kě yǐ tīng Zhōng wén gē，kàn Zhōng wén diàn yǐng.',vi:'Thứ hai, nghe nhiều nói nhiều. Có thể nghe nhạc Trung, xem phim Trung.'},
      {speaker:'',role:'',zh:'第三，找一个中文学习伙伴，互相练习会话。',pinyin:'Dì sān，zhǎo yī gè Zhōng wén xué xí huǒ bàn，hù xiāng liàn xí huì huà.',vi:'Thứ ba, tìm một người bạn học tiếng Trung, cùng nhau luyện hội thoại.'},
      {speaker:'',role:'',zh:'最后，不要害怕犯错。错误是进步的阶梯。',pinyin:'Zuì hòu，bù yào hài pà fàn cuò. Cuò wù shì jìn bù de jiē tī.',vi:'Cuối cùng, đừng sợ mắc lỗi. Lỗi là bậc thang của tiến bộ.'},
      {speaker:'',role:'',zh:'只要坚持不懈，你的汉语水平一定会进步的！',pinyin:'Zhǐ yào jiān chí bù xiè，nǐ de Hàn yǔ shuǐ píng yī dìng huì jìn bù de！',vi:'Chỉ cần kiên trì không nản, trình độ tiếng Trung của bạn nhất định sẽ tiến bộ!'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK4 — HỘI THOẠI
  // ══════════════════════════════════════════════════════════
  {
    title:'Đàm phán hợp đồng kinh doanh', title_zh:'商务合同谈判',
    type:'dialogue', hsk_level:'HSK4', topic:'business', difficulty:'hard', order_index:13,
    description:'Cuộc đàm phán thương mại giữa hai công ty',
    lines:[
      {speaker:'张总',role:'Giám đốc Zhang',zh:'感谢贵公司对这次合作的重视。请问，您对我们的合作方案有什么看法？',pinyin:'Gǎn xiè guì gōng sī duì zhè cì hé zuò de zhòng shì. Qǐng wèn，nín duì wǒ men de hé zuò fāng àn yǒu shén me kàn fǎ？',vi:'Cảm ơn quý công ty đã coi trọng cuộc hợp tác lần này. Xin hỏi, bạn có nhận xét gì về phương án hợp tác của chúng tôi?'},
      {speaker:'阮总',role:'Giám đốc Nguyễn',zh:'总体来说，方案不错。但是价格方面，我们希望能再优惠一些。',pinyin:'Zǒng tǐ lái shuō，fāng àn bù cuò. Dàn shì jià gé fāng miàn，wǒ men xī wàng néng zài yōu huì yī xiē.',vi:'Nhìn chung, phương án khá tốt. Nhưng về giá cả, chúng tôi hy vọng có thể ưu đãi thêm một chút.'},
      {speaker:'张总',role:'Giám đốc Zhang',zh:'可以理解。如果你们的订单量达到五千件以上，我们可以给八五折的优惠。',pinyin:'Kě yǐ lǐ jiě. Rú guǒ nǐ men de dìng dān liàng dá dào wǔ qiān jiàn yǐ shàng，wǒ men kě yǐ gěi bā wǔ zhé de yōu huì.',vi:'Có thể hiểu được. Nếu số lượng đơn hàng của bạn đạt năm nghìn chiếc trở lên, chúng tôi có thể giảm mười lăm phần trăm.'},
      {speaker:'阮总',role:'Giám đốc Nguyễn',zh:'那帮贷款条件呢？我们希望能有九十天的账期。',pinyin:'Nà bāng dài kuǎn tiáo jiàn ne？Wǒ men xī wàng néng yǒu jiǔ shí tiān de zhàng qī.',vi:'Còn về điều khoản thanh toán thì sao? Chúng tôi muốn có thời hạn thanh toán chín mươi ngày.'},
      {speaker:'张总',role:'Giám đốc Zhang',zh:'九十天有些困难，我们通常给六十天。但针对你们，可以考虑七十五天。',pinyin:'Jiǔ shí tiān yǒu xiē kùn nán，wǒ men tōng cháng gěi liù shí tiān. Dàn zhēn duì nǐ men，kě yǐ kǎo lǜ qī shí wǔ tiān.',vi:'Chín mươi ngày hơi khó, chúng tôi thường cho sáu mươi ngày. Nhưng với các bạn, có thể cân nhắc bảy mươi lăm ngày.'},
      {speaker:'阮总',role:'Giám đốc Nguyễn',zh:'好的，七十五天可以接受。那么关于售后服务……',pinyin:'Hǎo de，qī shí wǔ tiān kě yǐ jiē shòu. Nà me guān yú shòu hòu fú wù……',vi:'Được rồi, bảy mươi lăm ngày chúng tôi chấp nhận được. Vậy về dịch vụ hậu mãi...'},
      {speaker:'张总',role:'Giám đốc Zhang',zh:'售后我们承诺提供两年质保和全程技术支持。',pinyin:'Shòu hòu wǒ men chéng nuò tí gōng liǎng nián zhì bǎo hé quán chéng jì shù zhī chí.',vi:'Về hậu mãi, chúng tôi cam kết cung cấp bảo hành hai năm và hỗ trợ kỹ thuật toàn trình.'},
      {speaker:'阮总',role:'Giám đốc Nguyễn',zh:'很好。我想我们可以达成这次合作。请准备合同，我们下周签字。',pinyin:'Hěn hǎo. Wǒ xiǎng wǒ men kě yǐ dá chéng zhè cì hé zuò. Qǐng zhǔn bèi hé tong，wǒ men xià zhōu qiān zì.',vi:'Rất tốt. Tôi nghĩ chúng ta có thể đạt được hợp tác này. Hãy chuẩn bị hợp đồng, tuần tới chúng ta ký.'},
    ]
  },
  {
    title:'Thảo luận về biến đổi khí hậu', title_zh:'讨论气候变化',
    type:'dialogue', hsk_level:'HSK4', topic:'environment', difficulty:'hard', order_index:14,
    description:'Hai sinh viên thảo luận về vấn đề môi trường',
    lines:[
      {speaker:'李明',role:'Lý Minh',zh:'你知道吗？根据最新报告，全球气温比工业革命前高了一点二度。',pinyin:'Nǐ zhī dào ma？Gēn jù zuì xīn bào gào，quán qiú qì wēn bǐ gōng yè gé mìng qián gāo le yī diǎn èr dù.',vi:'Bạn có biết không? Theo báo cáo mới nhất, nhiệt độ toàn cầu đã tăng 1,2 độ so với trước cuộc cách mạng công nghiệp.'},
      {speaker:'王芳',role:'Vương Phương',zh:'这真的很让人担忧。如果超过一点五度，后果将不堪设想。',pinyin:'Zhè zhēn de hěn ràng rén dān yōu. Rú guǒ chāo guò yī diǎn wǔ dù，hòu guǒ jiāng bù kān shè xiǎng.',vi:'Điều này thật sự rất đáng lo ngại. Nếu vượt quá 1,5 độ, hậu quả sẽ không thể tưởng tượng nổi.'},
      {speaker:'李明',role:'Lý Minh',zh:'是的，极端天气、海平面上升、生物多样性减少……这些问题互相关联。',pinyin:'Shì de，jí duān tiān qì、hǎi píng miàn shàng shēng、shēng wù duō yàng xìng jiǎn shǎo……zhè xiē wèn tí hù xiāng guān lián.',vi:'Đúng vậy, thời tiết cực đoan, mực nước biển dâng, đa dạng sinh học giảm... Những vấn đề này liên kết với nhau.'},
      {speaker:'王芳',role:'Vương Phương',zh:'我觉得个人的力量也很重要。减少碳排放，从日常生活开始做起。',pinyin:'Wǒ jué de gè rén de lì liàng yě hěn zhòng yào. Jiǎn shǎo tàn pái fàng，cóng rì cháng shēng huó kāi shǐ zuò qǐ.',vi:'Tôi nghĩ sức mạnh cá nhân cũng rất quan trọng. Giảm phát thải carbon, bắt đầu từ cuộc sống hàng ngày.'},
      {speaker:'李明',role:'Lý Minh',zh:'没错，但光靠个人远远不够。政府和企业必须承担更大的责任。',pinyin:'Méi cuò，dàn guāng kào gè rén yuǎn yuǎn bù gòu. Zhèng fǔ hé qǐ yè bì xū chéng dān gèng dà de zé rèn.',vi:'Đúng vậy, nhưng chỉ dựa vào cá nhân thì không đủ. Chính phủ và doanh nghiệp phải gánh vác trách nhiệm lớn hơn.'},
      {speaker:'王芳',role:'Vương Phương',zh:'所以我们要积极参与环保活动，向政策制定者表达我们的诉求。',pinyin:'Suǒ yǐ wǒ men yào jī jí cān yù huán bǎo huó dòng，xiàng zhèng cè zhì dìng zhě biǎo dá wǒ men de sù qiú.',vi:'Vì vậy chúng ta phải tích cực tham gia hoạt động bảo vệ môi trường, bày tỏ yêu cầu của chúng ta với người hoạch định chính sách.'},
      {speaker:'李明',role:'Lý Minh',zh:'说得对。行动起来，为子孙后代保护好这颗蓝色星球。',pinyin:'Shuō de duì. Xíng dòng qǐ lái，wèi zǐ sūn hòu dài bǎo hù hǎo zhè kē lán sè xīng qiú.',vi:'Nói đúng lắm. Hành động thôi, bảo vệ hành tinh xanh này cho con cháu chúng ta.'},
    ]
  },

  // ══════════════════════════════════════════════════════════
  // HSK4 — ĐOẠN VĂN
  // ══════════════════════════════════════════════════════════
  {
    title:'Công nghệ trí tuệ nhân tạo', title_zh:'人工智能技术的发展',
    type:'passage', hsk_level:'HSK4', topic:'technology', difficulty:'hard', order_index:15,
    description:'Đoạn văn về sự phát triển của AI',
    lines:[
      {speaker:'',role:'',zh:'人工智能（AI）是当今世界发展最快的技术领域之一。',pinyin:'Rén gōng zhì néng（AI）shì dāng jīn shì jiè fā zhǎn zuì kuài de jì shù lǐng yù zhī yī.',vi:'Trí tuệ nhân tạo (AI) là một trong những lĩnh vực công nghệ phát triển nhanh nhất thế giới hiện nay.'},
      {speaker:'',role:'',zh:'从语音识别到图像分析，AI已经渗透到我们生活的各个方面。',pinyin:'Cóng yǔ yīn shí bié dào tú xiàng fēn xī，AI yǐ jīng shèn tòu dào wǒ men shēng huó de gè gè fāng miàn.',vi:'Từ nhận dạng giọng nói đến phân tích hình ảnh, AI đã thẩm thấu vào mọi mặt của cuộc sống chúng ta.'},
      {speaker:'',role:'',zh:'医疗领域，AI能够帮助医生诊断疾病，提高准确率。',pinyin:'Yī liáo lǐng yù，AI néng gòu bāng zhù yī shēng zhěn duàn jí bìng，tí gāo zhǔn què lǜ.',vi:'Trong lĩnh vực y tế, AI có thể giúp bác sĩ chẩn đoán bệnh, nâng cao độ chính xác.'},
      {speaker:'',role:'',zh:'教育方面，个性化的AI学习系统可以根据每个学生的情况制定学习计划。',pinyin:'Jiào yù fāng miàn，gè xìng huà de AI xué xí xì tǒng kě yǐ gēn jù měi gè xué shēng de qíng kuàng zhì dìng xué xí jì huà.',vi:'Về giáo dục, hệ thống học tập AI cá nhân hoá có thể lập kế hoạch học tập dựa trên tình hình của từng học sinh.'},
      {speaker:'',role:'',zh:'然而，AI的发展也带来了一些挑战，如隐私保护、就业替代等问题。',pinyin:'Rán ér，AI de fā zhǎn yě dài lái le yī xiē tiǎo zhàn，rú yǐn sī bǎo hù、jiù yè tì dài děng wèn tí.',vi:'Tuy nhiên, sự phát triển của AI cũng đem lại một số thách thức, như vấn đề bảo vệ quyền riêng tư, thay thế việc làm, v.v.'},
      {speaker:'',role:'',zh:'如何让AI为人类服务，而不是控制人类，是我们这一代人需要认真思考的问题。',pinyin:'Rú hé ràng AI wèi rén lèi fú wù，ér bù shì kòng zhì rén lèi，shì wǒ men zhè yī dài rén xū yào rèn zhēn sī kǎo de wèn tí.',vi:'Làm thế nào để AI phục vụ con người chứ không kiểm soát con người, là vấn đề thế hệ chúng ta cần suy nghĩ nghiêm túc.'},
    ]
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let dCount=0, lCount=0;
    for (const d of dialogues) {
      // Kiểm tra trùng
      const [ex] = await conn.query('SELECT id FROM dialogues WHERE title=? AND hsk_level=?', [d.title, d.hsk_level]);
      let did;
      if (ex.length) {
        did = ex[0].id;
      } else {
        const [r] = await conn.query(
          'INSERT INTO dialogues (title,title_zh,type,hsk_level,topic,description,difficulty,order_index) VALUES (?,?,?,?,?,?,?,?)',
          [d.title, d.title_zh, d.type, d.hsk_level, d.topic, d.description, d.difficulty, d.order_index]
        );
        did = r.insertId; dCount++;
        console.log(`  ✓ [${d.hsk_level}·${d.type}] ${d.title}`);
      }
      // Xoá và thêm lại dòng (để tránh trùng)
      await conn.query('DELETE FROM dialogue_lines WHERE dialogue_id=?', [did]);
      for (let i=0; i<d.lines.length; i++) {
        const l = d.lines[i];
        await conn.query(
          'INSERT INTO dialogue_lines (dialogue_id,line_order,speaker,speaker_role,text_zh,pinyin,text_vi) VALUES (?,?,?,?,?,?,?)',
          [did, i+1, l.speaker, l.role, l.zh, l.pinyin, l.vi]
        );
        lCount++;
      }
    }
    await conn.commit();
    const [[ds]] = await conn.query('SELECT COUNT(*) c FROM dialogues');
    const [[ls]] = await conn.query('SELECT COUNT(*) c FROM dialogue_lines');
    console.log(`\n✅ Seed hoàn tất!`);
    console.log(`   • ${ds.c} hội thoại/đoạn văn`);
    console.log(`   • ${ls.c} dòng nội dung`);
    console.log(`   • Thêm mới: ${dCount} bài, ${lCount} dòng`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
