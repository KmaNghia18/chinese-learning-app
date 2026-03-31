// seed_dialogues_batch5.js — Batch 5: 18 hội thoại & đoạn văn mới
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Hỏi đường về nhà', title_zh:'问回家的路',
    type:'dialogue', hsk_level:'HSK1', topic:'directions', difficulty:'easy', order_index:61,
    description:'Hỏi đường đơn giản',
    lines:[
      {speaker:'A',role:'Minh',zh:'你好，请问附近有没有公共汽车站？',pinyin:'Nǐ hǎo，qǐng wèn fù jìn yǒu méi yǒu gōng gòng qì chē zhàn？',vi:'Xin chào, gần đây có trạm xe buýt không?'},
      {speaker:'B',role:'Người dân',zh:'有，在前面，走五分钟就到。',pinyin:'Yǒu，zài qián miàn，zǒu wǔ fēn zhōng jiù dào.',vi:'Có, ở phía trước, đi bộ năm phút là đến.'},
      {speaker:'A',role:'Minh',zh:'谢谢！请问坐几路车去火车站？',pinyin:'Xiè xiè！Qǐng wèn zuò jǐ lù chē qù huǒ chē zhàn？',vi:'Cảm ơn! Xin hỏi đi tuyến xe mấy đến ga tàu?'},
      {speaker:'B',role:'Người dân',zh:'坐八路或者十二路，都可以到。',pinyin:'Zuò bā lù huò zhě shí èr lù，dōu kě yǐ dào.',vi:'Đi tuyến số 8 hoặc số 12, đều đến được.'},
      {speaker:'A',role:'Minh',zh:'要多长时间？',pinyin:'Yào duō cháng shí jiān？',vi:'Mất bao lâu?'},
      {speaker:'B',role:'Người dân',zh:'大概二十分钟左右。',pinyin:'Dà gài èr shí fēn zhōng zuǒ yòu.',vi:'Khoảng hai mươi phút.'},
      {speaker:'A',role:'Minh',zh:'太好了，谢谢您！',pinyin:'Tài hǎo le，xiè xiè nín！',vi:'Tuyệt quá, cảm ơn bạn!'},
    ]
  },
  {
    title:'Mua sắm quần áo', title_zh:'买衣服',
    type:'dialogue', hsk_level:'HSK1', topic:'shopping', difficulty:'easy', order_index:62,
    description:'Thử và mua quần áo',
    lines:[
      {speaker:'售货员',role:'Nhân viên bán hàng',zh:'你好，你想要什么？',pinyin:'Nǐ hǎo，nǐ xiǎng yào shén me？',vi:'Xin chào, bạn muốn gì?'},
      {speaker:'顾客',role:'Khách',zh:'我想买一件红色的T恤。',pinyin:'Wǒ xiǎng mǎi yī jiàn hóng sè de T xù.',vi:'Tôi muốn mua một chiếc áo phông màu đỏ.'},
      {speaker:'售货员',role:'Nhân viên bán hàng',zh:'你穿多大号？',pinyin:'Nǐ chuān duō dà hào？',vi:'Bạn mặc cỡ bao nhiêu?'},
      {speaker:'顾客',role:'Khách',zh:'L码，可以试穿吗？',pinyin:'L mǎ，kě yǐ shì chuān ma？',vi:'Cỡ L, có thể thử mặc không?'},
      {speaker:'售货员',role:'Nhân viên bán hàng',zh:'当然可以，试衣间在那边。',pinyin:'Dāng rán kě yǐ，shì yī jiān zài nà biān.',vi:'Tất nhiên được, phòng thử đồ ở đằng kia.'},
      {speaker:'顾客',role:'Khách',zh:'（试穿后）大了一点，有M码吗？',pinyin:'（Shì chuān hòu）Dà le yī diǎn，yǒu M mǎ ma？',vi:'(Sau khi thử) Hơi rộng một chút, có cỡ M không?'},
      {speaker:'售货员',role:'Nhân viên bán hàng',zh:'有，给你。这件M码怎么样？',pinyin:'Yǒu，gěi nǐ. Zhè jiàn M mǎ zěn me yàng？',vi:'Có, đây bạn. Chiếc cỡ M này thế nào?'},
      {speaker:'顾客',role:'Khách',zh:'很合适，我买了！多少钱？',pinyin:'Hěn hé shì，wǒ mǎi le！Duō shǎo qián？',vi:'Rất vừa, tôi mua rồi! Bao nhiêu tiền?'},
    ]
  },
  {
    title:'Ngôi nhà của tôi', title_zh:'我的家',
    type:'passage', hsk_level:'HSK1', topic:'home', difficulty:'easy', order_index:63,
    description:'Đoạn văn giới thiệu về ngôi nhà',
    lines:[
      {speaker:'',role:'',zh:'我家在河内，是一栋三层楼的小房子。',pinyin:'Wǒ jiā zài Hé nèi，shì yī dòng sān céng lóu de xiǎo fáng zi.',vi:'Nhà tôi ở Hà Nội, là ngôi nhà nhỏ ba tầng.'},
      {speaker:'',role:'',zh:'一楼是客厅和厨房，二楼是卧室，三楼有一个小阳台。',pinyin:'Yī lóu shì kè tīng hé chú fáng，èr lóu shì wò shì，sān lóu yǒu yī gè xiǎo yáng tái.',vi:'Tầng một là phòng khách và bếp, tầng hai là phòng ngủ, tầng ba có một ban công nhỏ.'},
      {speaker:'',role:'',zh:'我家门前有一棵大树，夏天特别凉快。',pinyin:'Wǒ jiā mén qián yǒu yī kē dà shù，xià tiān tè bié liáng kuai.',vi:'Trước cửa nhà tôi có một cây to, mùa hè rất mát mẻ.'},
      {speaker:'',role:'',zh:'我很喜欢我的家，回家就感到安心。',pinyin:'Wǒ hěn xǐ huān wǒ de jiā，huí jiā jiù gǎn dào ān xīn.',vi:'Tôi rất thích ngôi nhà của mình, về nhà là cảm thấy an tâm.'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Ôn thi cuối kỳ', title_zh:'期末考试复习',
    type:'dialogue', hsk_level:'HSK2', topic:'school', difficulty:'medium', order_index:64,
    description:'Hai bạn ôn thi cùng nhau',
    lines:[
      {speaker:'A',role:'Hoa',zh:'下周就要期末考试了，你准备好了吗？',pinyin:'Xià zhōu jiù yào qī mò kǎo shì le，nǐ zhǔn bèi hǎo le ma？',vi:'Tuần tới đã đến kỳ thi cuối kỳ, bạn chuẩn bị xong chưa?'},
      {speaker:'B',role:'Nam',zh:'还没有，我有几章还没看完。你呢？',pinyin:'Hái méi yǒu，wǒ yǒu jǐ zhāng hái méi kàn wán. Nǐ ne？',vi:'Chưa, tôi còn mấy chương chưa đọc xong. Còn bạn?'},
      {speaker:'A',role:'Hoa',zh:'我也没准备好。我们一起复习怎么样？',pinyin:'Wǒ yě méi zhǔn bèi hǎo. Wǒ men yī qǐ fù xí zěn me yàng？',vi:'Tôi cũng chưa chuẩn bị xong. Chúng ta ôn bài cùng nhau nhé?'},
      {speaker:'B',role:'Nam',zh:'好主意！今晚你来我家还是我去你家？',pinyin:'Hǎo zhǔ yi！Jīn wǎn nǐ lái wǒ jiā hái shì wǒ qù nǐ jiā？',vi:'Ý hay! Tối nay bạn đến nhà tôi hay tôi đến nhà bạn?'},
      {speaker:'A',role:'Hoa',zh:'你来我家吧，我家比较安静，适合学习。',pinyin:'Nǐ lái wǒ jiā ba，wǒ jiā bǐ jiào ān jìng，shì hé xué xí.',vi:'Bạn đến nhà tôi đi, nhà tôi khá yên tĩnh, thích hợp để học.'},
      {speaker:'B',role:'Nam',zh:'好的，我七点到。带什么东西吗？',pinyin:'Hǎo de，wǒ qī diǎn dào. Dài shén me dōng xi ma？',vi:'Được, tôi đến lúc bảy giờ. Có cần mang gì không?'},
      {speaker:'A',role:'Hoa',zh:'带你的课本来，其他不用带了。',pinyin:'Dài nǐ de kè běn lái，qí tā bù yòng dài le.',vi:'Mang sách giáo khoa của bạn đến, còn lại không cần mang.'},
    ]
  },
  {
    title:'Đặt món qua ứng dụng', title_zh:'用手机点外卖',
    type:'dialogue', hsk_level:'HSK2', topic:'food', difficulty:'medium', order_index:65,
    description:'Gọi đồ ăn qua điện thoại',
    lines:[
      {speaker:'A',role:'Tuấn',zh:'中午我们吃什么？我不想出去。',pinyin:'Zhōng wǔ wǒ men chī shén me？Wǒ bù xiǎng chū qù.',vi:'Trưa chúng ta ăn gì? Tôi không muốn ra ngoài.'},
      {speaker:'B',role:'Lan',zh:'我们叫外卖吧！美团上有很多选择。',pinyin:'Wǒ men jiào wài mài ba！Měi tuán shàng yǒu hěn duō xuǎn zé.',vi:'Chúng ta đặt đồ ăn nhé! Trên Meituan có rất nhiều lựa chọn.'},
      {speaker:'A',role:'Tuấn',zh:'好啊，你想吃什么？',pinyin:'Hǎo ā，nǐ xiǎng chī shén me？',vi:'Được chứ, bạn muốn ăn gì?'},
      {speaker:'B',role:'Lan',zh:'我想吃炒饭或者面条都可以。你呢？',pinyin:'Wǒ xiǎng chī chǎo fàn huò zhě miàn tiáo dōu kě yǐ. Nǐ ne？',vi:'Tôi muốn ăn cơm chiên hoặc mì đều được. Còn bạn?'},
      {speaker:'A',role:'Tuấn',zh:'我要一份牛肉饭。多久能送到？',pinyin:'Wǒ yào yī fèn niú ròu fàn. Duō jiǔ néng sòng dào？',vi:'Tôi muốn một phần cơm thịt bò. Bao lâu thì được giao?'},
      {speaker:'B',role:'Lan',zh:'显示三十分钟。配送费五块，起送价二十元。',pinyin:'Xiǎn shì sān shí fēn zhōng. Pèi sòng fèi wǔ kuài，qǐ sòng jià èr shí yuán.',vi:'Hiển thị ba mươi phút. Phí giao hàng năm tệ, đơn tối thiểu hai mươi tệ.'},
      {speaker:'A',role:'Tuấn',zh:'可以，我出配送费，你出餐费怎么样？',pinyin:'Kě yǐ，wǒ chū pèi sòng fèi，nǐ chū cān fèi zěn me yàng？',vi:'Được thôi, tôi trả phí giao hàng, bạn trả tiền đồ ăn được không?'},
    ]
  },
  {
    title:'Những điều thú vị về Trung Quốc', title_zh:'有趣的中国文化知识',
    type:'passage', hsk_level:'HSK2', topic:'culture', difficulty:'medium', order_index:66,
    description:'Thông tin thú vị về Trung Quốc',
    lines:[
      {speaker:'',role:'',zh:'中国是世界上人口最多的国家，大约有十四亿人。',pinyin:'Zhōng guó shì shì jiè shàng rén kǒu zuì duō de guó jiā，dà yuē yǒu shí sì yì rén.',vi:'Trung Quốc là quốc gia đông dân nhất thế giới, có khoảng mười bốn tỉ người.'},
      {speaker:'',role:'',zh:'中国有五十六个民族，汉族是最大的民族。',pinyin:'Zhōng guó yǒu wǔ shí liù gè mín zú，Hàn zú shì zuì dà de mín zú.',vi:'Trung Quốc có năm mươi sáu dân tộc, dân tộc Hán là lớn nhất.'},
      {speaker:'',role:'',zh:'中国发明了造纸术、印刷术、指南针和火药，称为"四大发明"。',pinyin:'Zhōng guó fā míng le zào zhǐ shù、yìn shuā shù、zhǐ nán zhēn hé huǒ yào，chēng wéi "sì dà fā míng".',vi:'Trung Quốc phát minh ra giấy, in ấn, la bàn và thuốc súng, gọi là "bốn phát minh vĩ đại".'},
      {speaker:'',role:'',zh:'熊猫是中国的国宝，全世界只有在中国才能见到野生大熊猫。',pinyin:'Xióng māo shì Zhōng guó de guó bǎo，quán shì jiè zhǐ yǒu zài Zhōng guó cái néng jiàn dào yě shēng dà xióng māo.',vi:'Gấu trúc là quốc bảo của Trung Quốc, trên toàn thế giới chỉ ở Trung Quốc mới thấy gấu trúc hoang dã.'},
      {speaker:'',role:'',zh:'中国的长城是世界上最长的城墙，已有两千多年的历史。',pinyin:'Zhōng guó de Cháng chéng shì shì jiè shàng zuì cháng de chéng qiáng，yǐ yǒu liǎng qiān duō nián de lì shǐ.',vi:'Vạn Lý Trường Thành của Trung Quốc là bức tường thành dài nhất thế giới, đã có hơn hai nghìn năm lịch sử.'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Chia sẻ kinh nghiệm làm việc', title_zh:'分享工作经验',
    type:'dialogue', hsk_level:'HSK3', topic:'work', difficulty:'medium', order_index:67,
    description:'Chia sẻ kinh nghiệm nghề nghiệp',
    lines:[
      {speaker:'前辈',role:'Đàn anh',zh:'你工作多久了？',pinyin:'Nǐ gōng zuò duō jiǔ le？',vi:'Bạn làm việc được bao lâu rồi?'},
      {speaker:'新人',role:'Người mới',zh:'刚毕业三个月。工作跟想象中不太一样，很多不懂，请多关照。',pinyin:'Gāng bì yè sān gè yuè. Gōng zuò gēn xiǎng xiàng zhōng bù tài yī yàng，hěn duō bù dǒng，qǐng duō guān zhào.',vi:'Mới tốt nghiệp được ba tháng. Công việc không giống như tưởng tượng, nhiều điều không hiểu, nhờ anh chỉ bảo nhiều.'},
      {speaker:'前辈',role:'Đàn anh',zh:'没关系，谁都是从新人开始的。有什么不懂就问。',pinyin:'Méi guān xi，shuí dōu shì cóng xīn rén kāi shǐ de. Yǒu shén me bù dǒng jiù wèn.',vi:'Không sao, ai cũng bắt đầu từ người mới cả. Có gì không hiểu cứ hỏi.'},
      {speaker:'新人',role:'Người mới',zh:'谢谢！我觉得沟通技巧最难，跟客户说话经常不知道怎么开口。',pinyin:'Xiè xiè！Wǒ jué de gōu tōng jì qiǎo zuì nán，gēn kè hù shuō huà jīng cháng bù zhī dào zěn me kāi kǒu.',vi:'Cảm ơn! Tôi thấy kỹ năng giao tiếp khó nhất, nói chuyện với khách hàng thường không biết bắt đầu thế nào.'},
      {speaker:'前辈',role:'Đàn anh',zh:'这需要积累经验。先多听，少说，理解客户的需求再开口。',pinyin:'Zhè xū yào jī lěi jīng yàn. Xiān duō tīng，shǎo shuō，lǐ jiě kè hù de xū qiú zài kāi kǒu.',vi:'Điều này cần tích luỹ kinh nghiệm. Trước tiên nghe nhiều, nói ít, hiểu nhu cầu khách hàng rồi mới lên tiếng.'},
      {speaker:'新人',role:'Người mới',zh:'明白了。还有，怎么处理客户的抱怨？',pinyin:'Míng bái le. Hái yǒu，zěn me chǔ lǐ kè hù de bào yuàn？',vi:'Hiểu rồi. Còn nữa, làm thế nào để xử lý khiếu nại của khách hàng?'},
      {speaker:'前辈',role:'Đàn anh',zh:'先道歉，再解决问题，最后给补偿。记住：客户不一定都是对的，但要让他感觉被重视。',pinyin:'Xiān dào qiàn，zài jiě jué wèn tí，zuì hòu gěi bǔ cháng. Jì zhù：kè hù bù yī dìng dōu shì duì de，dàn yào ràng tā gǎn jué bèi zhòng shì.',vi:'Đầu tiên xin lỗi, sau đó giải quyết vấn đề, cuối cùng bồi thường. Nhớ nhé: khách hàng không phải lúc nào cũng đúng, nhưng phải để họ cảm thấy được coi trọng.'},
    ]
  },
  {
    title:'Văn học và thơ Đường', title_zh:'唐诗与中国文学',
    type:'passage', hsk_level:'HSK3', topic:'culture', difficulty:'hard', order_index:68,
    description:'Giới thiệu về thơ Đường',
    lines:[
      {speaker:'',role:'',zh:'唐朝（618-907年）是中国诗歌发展的黄金时代。',pinyin:'Táng cháo（618-907 nián）shì Zhōng guó shī gē fā zhǎn de huáng jīn shí dài.',vi:'Triều Đường (618-907) là thời đại hoàng kim của thơ ca Trung Quốc.'},
      {speaker:'',role:'',zh:'李白、杜甫、王维是唐朝最著名的三位诗人，各有独特风格。',pinyin:'Lǐ Bái、Dù Fǔ、Wáng Wéi shì Táng cháo zuì zhù míng de sān wèi shī rén，gè yǒu dú tè fēng gé.',vi:'Lý Bạch, Đỗ Phủ, Vương Duy là ba nhà thơ nổi tiếng nhất triều Đường, mỗi người có phong cách độc đáo riêng.'},
      {speaker:'',role:'',zh:'李白的诗豪放不羁，充满浪漫主义色彩；杜甫的诗现实主义更强，关注民生疾苦。',pinyin:'Lǐ Bái de shī háo fàng bù jī，chōng mǎn làng màn zhǔ yì sè cǎi；Dù Fǔ de shī xiàn shí zhǔ yì gèng qiáng，guān zhù mín shēng jí kǔ.',vi:'Thơ Lý Bạch phóng khoáng tự do, đầy màu sắc lãng mạn; thơ Đỗ Phủ mang tính hiện thực mạnh hơn, quan tâm đến nỗi khổ của dân.'},
      {speaker:'',role:'',zh:'"床前明月光，疑是地上霜"是李白最著名的诗句，表达了对故乡的思念。',pinyin:'"Chuáng qián míng yuè guāng，yí shì dì shàng shuāng" shì Lǐ Bái zuì zhù míng de shī jù，biǎo dá le duì gù xiāng de sī niàn.',vi:'"Đầu giường trăng sáng chiếu, ngỡ là sương trên đất" là câu thơ nổi tiếng nhất của Lý Bạch, thể hiện nỗi nhớ quê hương.'},
      {speaker:'',role:'',zh:'学习唐诗不仅是学习中文，更是了解中国传统文化和思想的重要途径。',pinyin:'Xué xí Táng shī bù jǐn shì xué xí Zhōng wén，gèng shì liǎo jiě Zhōng guó chuán tǒng wén huà hé sī xiǎng de zhòng yào tú jìng.',vi:'Học thơ Đường không chỉ là học tiếng Trung, mà còn là con đường quan trọng để hiểu văn hoá và tư tưởng truyền thống Trung Quốc.'},
    ]
  },
  {
    title:'Dự báo thời tiết và ứng phó', title_zh:'天气预报与应对',
    type:'dialogue', hsk_level:'HSK3', topic:'weather', difficulty:'medium', order_index:69,
    description:'Bàn về cơn bão và cách ứng phó',
    lines:[
      {speaker:'A',role:'Bình',zh:'刚才看了天气预报，说明天有台风，最大风力十二级。',pinyin:'Gāng cái kàn le tiān qì yù bào，shuō míng tiān yǒu tái fēng，zuì dà fēng lì shí èr jí.',vi:'Vừa xem dự báo thời tiết, nói ngày mai có bão, gió cấp mười hai mạnh nhất.'},
      {speaker:'B',role:'Hoa',zh:'那就危险了！我们要提前做什么准备？',pinyin:'Nà jiù wēi xiǎn le！Wǒ men yào tí qián zuò shén me zhǔn bèi？',vi:'Vậy là nguy hiểm rồi! Chúng ta cần chuẩn bị trước gì không?'},
      {speaker:'A',role:'Bình',zh:'要储备食物和饮用水，固定阳台上的花盆，不要把车停在树下。',pinyin:'Yào chǔ bèi shí wù hé yǐn yòng shuǐ，gù dìng yáng tái shàng de huā pén，bù yào bǎ chē tíng zài shù xià.',vi:'Cần dự trữ thực phẩm và nước uống, cố định chậu cây trên ban công, không đậu xe dưới gốc cây.'},
      {speaker:'B',role:'Hoa',zh:'政府有没有发出撤离通知？',pinyin:'Zhèng fǔ yǒu méi yǒu fā chū chè lí tōng zhī？',vi:'Chính phủ có ra thông báo di dời không?'},
      {speaker:'A',role:'Bình',zh:'沿海地区的居民需要撤离，我们住在市区，应该没问题。',pinyin:'Yán hǎi dì qū de jū mín xū yào chè lí，wǒ men zhù zài shì qū，yīng gāi méi wèn tí.',vi:'Cư dân khu vực ven biển cần di dời, chúng ta ở khu vực thành phố nên không sao.'},
      {speaker:'B',role:'Hoa',zh:'好，那明天就待在家里，尽量不要出门。',pinyin:'Hǎo，nà míng tiān jiù dāi zài jiā lǐ，jǐn liàng bù yào chū mén.',vi:'Được, vậy ngày mai ở nhà, hạn chế ra ngoài.'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Giữa truyền thống và hiện đại', title_zh:'传统与现代之间的选择',
    type:'dialogue', hsk_level:'HSK4', topic:'society', difficulty:'hard', order_index:70,
    description:'Thế hệ trẻ Trung Quốc giữa hai luồng tư tưởng',
    lines:[
      {speaker:'A',role:'Minh',zh:'你觉得现在的中国年轻人更认同传统文化还是西方文化？',pinyin:'Nǐ jué de xiàn zài de Zhōng guó nián qīng rén gèng rèn tóng chuán tǒng wén huà hái shì Xī fāng wén huà？',vi:'Bạn thấy giới trẻ Trung Quốc hiện nay đồng nhận hơn với văn hoá truyền thống hay văn hoá phương Tây?'},
      {speaker:'B',role:'Hoa',zh:'这是个很有趣的问题。我认为现在的年轻人在两者之间找到了平衡。',pinyin:'Zhè shì gè hěn yǒu qù de wèn tí. Wǒ rèn wéi xiàn zài de nián qīng rén zài liǎng zhě zhī jiān zhǎo dào le píng héng.',vi:'Đây là câu hỏi rất thú vị. Tôi nghĩ giới trẻ hiện nay đã tìm được sự cân bằng giữa hai bên.'},
      {speaker:'A',role:'Minh',zh:'怎么说？能举个例子吗？',pinyin:'Zěn me shuō？Néng jǔ gè lì zi ma？',vi:'Như thế nào? Bạn có thể lấy ví dụ không?'},
      {speaker:'B',role:'Hoa',zh:'比如汉服热，年轻人穿着传统汉服拍照，用社交媒体传播，这就是传统与现代的结合。',pinyin:'Bǐ rú Hàn fú rè，nián qīng rén chuān zhuó chuán tǒng Hàn fú pāi zhào，yòng shè jiāo méi tǐ chuán bō，zhè jiù shì chuán tǒng yǔ xiàn dài de jié hé.',vi:'Ví dụ như phong trào Hán phục, giới trẻ mặc trang phục truyền thống chụp ảnh, lan truyền qua mạng xã hội, đây là sự kết hợp giữa truyền thống và hiện đại.'},
      {speaker:'A',role:'Minh',zh:'还有国潮品牌，把中国元素融入现代设计，很受年轻人喜爱。',pinyin:'Hái yǒu guó cháo pǐn pái，bǎ Zhōng guó yuán sù róng rù xiàn dài shè jì，hěn shòu nián qīng rén xǐ ài.',vi:'Còn có thương hiệu "Quốc triều", tích hợp yếu tố Trung Quốc vào thiết kế hiện đại, rất được giới trẻ yêu thích.'},
      {speaker:'B',role:'Hoa',zh:'对，这种文化自信是近年来一个重要的社会现象，反映了中国年轻一代的身份认同。',pinyin:'Duì，zhè zhǒng wén huà zì xìn shì jìn nián lái yī gè zhòng yào de shè huì xiàn xiàng，fǎn yìng le Zhōng guó nián qīng yī dài de shēn fèn rèn tóng.',vi:'Đúng, sự tự tin văn hoá này là hiện tượng xã hội quan trọng trong những năm gần đây, phản ánh bản sắc của thế hệ trẻ Trung Quốc.'},
    ]
  },
  {
    title:'Thị trường chứng khoán', title_zh:'股票市场与投资',
    type:'dialogue', hsk_level:'HSK4', topic:'finance', difficulty:'hard', order_index:71,
    description:'Nói về đầu tư chứng khoán',
    lines:[
      {speaker:'A',role:'Bình',zh:'你最近有没有投资股市？',pinyin:'Nǐ zuì jìn yǒu méi yǒu tóu zī gǔ shì？',vi:'Gần đây bạn có đầu tư chứng khoán không?'},
      {speaker:'B',role:'Tuấn',zh:'有，但这几个月市场波动很大，我亏了不少。',pinyin:'Yǒu，dàn zhè jǐ gè yuè shì chǎng bō dòng hěn dà，wǒ kuī le bù shǎo.',vi:'Có, nhưng mấy tháng nay thị trường biến động rất mạnh, tôi lỗ khá nhiều.'},
      {speaker:'A',role:'Bình',zh:'炒股风险很大，你有没有做好风险管理？',pinyin:'Chǎo gǔ fēng xiǎn hěn dà，nǐ yǒu méi yǒu zuò hǎo fēng xiǎn guǎn lǐ？',vi:'Chơi chứng khoán rủi ro rất cao, bạn có quản lý rủi ro tốt không?'},
      {speaker:'B',role:'Tuấn',zh:'没有做好，太贪心了，把太多钱押在一只股票上。',pinyin:'Méi yǒu zuò hǎo，tài tān xīn le，bǎ tài duō qián yā zài yī zhī gǔ piào shàng.',vi:'Không quản lý tốt, quá tham, đặt quá nhiều tiền vào một cổ phiếu.'},
      {speaker:'A',role:'Bình',zh:'这是投资的大忌。分散投资才能降低风险。',pinyin:'Zhè shì tóu zī de dà jì. Fēn sàn tóu zī cái néng jiàng dī fēng xiǎn.',vi:'Đây là điều tối kỵ trong đầu tư. Đa dạng hoá đầu tư mới có thể giảm rủi ro.'},
      {speaker:'B',role:'Tuấn',zh:'我学到了教训。以后不把鸡蛋放在一个篮子里了。',pinyin:'Wǒ xué dào le jiào xùn. Yǐ hòu bù bǎ jī dàn fàng zài yī gè lán zi lǐ le.',vi:'Tôi đã học được bài học. Từ nay sẽ không bỏ tất cả trứng vào một giỏ nữa.'},
      {speaker:'A',role:'Bình',zh:'对，那句话说得对：不要把鸡蛋放在同一个篮子里。长期投资才是王道。',pinyin:'Duì，nà jù huà shuō de duì：bú yào bǎ jī dàn fàng zài tóng yī gè lán zi lǐ. Cháng qī tóu zī cái shì wáng dào.',vi:'Đúng vậy, câu nói đó đúng: đừng bỏ tất cả trứng vào một giỏ. Đầu tư dài hạn mới là đạo.'},
    ]
  },
  {
    title:'Chăm sóc người cao tuổi', title_zh:'老龄化社会与养老问题',
    type:'passage', hsk_level:'HSK4', topic:'society', difficulty:'hard', order_index:72,
    description:'Bài viết về vấn đề dân số già',
    lines:[
      {speaker:'',role:'',zh:'中国正面临人口老龄化的严峻挑战，六十岁以上的人口比例不断上升。',pinyin:'Zhōng guó zhèng miàn lín rén kǒu lǎo líng huà de yán jùn tiǎo zhàn，liù shí suì yǐ shàng de rén kǒu bǐ lì bù duàn shàng shēng.',vi:'Trung Quốc đang đối mặt với thách thức nghiêm trọng về già hoá dân số, tỉ lệ người trên sáu mươi tuổi không ngừng tăng.'},
      {speaker:'',role:'',zh:'一方面，养老金制度需要不断完善，以保障老年人的基本生活。',pinyin:'Yī fāng miàn，yǎng lǎo jīn zhì dù xū yào bù duàn wán shàn，yǐ bǎo zhàng lǎo nián rén de jī běn shēng huó.',vi:'Một mặt, chế độ lương hưu cần không ngừng hoàn thiện để đảm bảo cuộc sống cơ bản cho người cao tuổi.'},
      {speaker:'',role:'',zh:'另一方面，"421家庭"结构（四个祖父母、两个父母、一个孩子）给年轻一代带来了巨大的养老压力。',pinyin:'Lìng yī fāng miàn，"421jiā tíng" jié gòu（sì gè zǔ fù mǔ、liǎng gè fù mǔ、yī gè hái zi）gěi nián qīng yī dài dài lái le jù dà de yǎng lǎo yā lì.',vi:'Mặt khác, cơ cấu gia đình "421" (bốn ông bà ngoại/nội, hai cha mẹ, một con) đặt lên thế hệ trẻ áp lực dưỡng lão khổng lồ.'},
      {speaker:'',role:'',zh:'发展居家养老、社区养老和机构养老相结合的模式，是应对挑战的有效途径。',pinyin:'Fā zhǎn jū jiā yǎng lǎo、shè qū yǎng lǎo hé jī gòu yǎng lǎo xiāng jié hé de mó shì，shì yìng duì tiǎo zhàn de yǒu xiào tú jìng.',vi:'Phát triển mô hình kết hợp dưỡng lão tại nhà, dưỡng lão cộng đồng và dưỡng lão tại cơ sở là con đường hiệu quả để ứng phó thách thức này.'},
      {speaker:'',role:'',zh:'同时，鼓励生育、开放移民等政策，也是缓解老龄化压力的长远之计。',pinyin:'Tóng shí，gǔ lì shēng yù、kāi fàng yí mín děng zhèng cè，yě shì huǎn jiě lǎo líng huà yā lì de cháng yuǎn zhī jì.',vi:'Đồng thời, các chính sách như khuyến khích sinh sản, mở cửa di cư cũng là kế hoạch dài hạn để giảm bớt áp lực già hoá.'},
    ]
  },
  {
    title:'Triết học Nho giáo và cuộc sống', title_zh:'儒家思想与现代生活',
    type:'passage', hsk_level:'HSK4', topic:'philosophy', difficulty:'hard', order_index:73,
    description:'Bài viết về Nho giáo trong cuộc sống hiện đại',
    lines:[
      {speaker:'',role:'',zh:'儒家思想是中国传统文化的核心，由孔子创立于两千五百年前。',pinyin:'Rú jiā sī xiǎng shì Zhōng guó chuán tǒng wén huà de hé xīn，yóu Kǒng zǐ chuàng lì yú liǎng qiān wǔ bǎi nián qián.',vi:'Tư tưởng Nho giáo là cốt lõi của văn hoá truyền thống Trung Quốc, do Khổng Tử sáng lập cách đây hai nghìn năm trăm năm.'},
      {speaker:'',role:'',zh:'"仁、义、礼、智、信"是儒家的五大核心价值观，至今仍影响着中国人的行为方式。',pinyin:'"Rén、yì、lǐ、zhì、xìn" shì Rú jiā de wǔ dà hé xīn jià zhí guān，zhì jīn réng yǐng xiǎng zhe Zhōng guó rén de xíng wéi fāng shì.',vi:'"Nhân, nghĩa, lễ, trí, tín" là năm giá trị cốt lõi của Nho giáo, đến nay vẫn ảnh hưởng đến cách hành xử của người Trung Quốc.'},
      {speaker:'',role:'',zh:'家庭观念、尊老爱幼、努力读书——这些中国传统美德都植根于儒家思想。',pinyin:'Jiā tíng guān niàn、zūn lǎo ài yòu、nǔ lì dú shū——zhè xiē Zhōng guó chuán tǒng měi dé dōu zhí gēn yú Rú jiā sī xiǎng.',vi:'Quan niệm gia đình, kính trên nhường dưới, chăm chỉ học hành — những đức tính truyền thống tốt đẹp của Trung Quốc này đều bắt nguồn từ tư tưởng Nho giáo.'},
      {speaker:'',role:'',zh:'在现代社会，儒家思想也在进行创造性的转化，与当代生活相融合。',pinyin:'Zài xiàn dài shè huì，Rú jiā sī xiǎng yě zài jìn xíng chuàng zào xìng de zhuǎn huà，yǔ dāng dài shēng huó xiāng róng hé.',vi:'Trong xã hội hiện đại, tư tưởng Nho giáo cũng đang được chuyển hoá sáng tạo, hoà quyện với cuộc sống đương đại.'},
      {speaker:'',role:'',zh:'理解儒家思想，是读懂中国文化和亚洲商业文化的重要钥匙。',pinyin:'Lǐ jiě Rú jiā sī xiǎng，shì dú dǒng Zhōng guó wén huà hé Yà zhōu shāng yè wén huà de zhòng yào yào shi.',vi:'Hiểu tư tưởng Nho giáo là chìa khoá quan trọng để đọc hiểu văn hoá Trung Quốc và văn hoá kinh doanh châu Á.'},
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
    const [bl] = await conn.query('SELECT hsk_level,type,COUNT(*) c FROM dialogues WHERE is_active=1 GROUP BY hsk_level,type ORDER BY hsk_level,type');
    console.log(`\n✅ Batch 5 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})`);
    console.log('\n📊 Phân bổ cuối:');
    let dt=0, pt=0;
    bl.forEach(r=>{ console.log(`   ${r.hsk_level} ${r.type}: ${r.c}`); if(r.type==='dialogue')dt+=Number(r.c); else pt+=Number(r.c); });
    console.log(`   → Tổng hội thoại: ${dt} | Đoạn văn: ${pt}`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
