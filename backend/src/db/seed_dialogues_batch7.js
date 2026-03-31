// seed_dialogues_batch7.js — Batch 7: 18 hội thoại & đoạn văn
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Màu sắc và mô tả', title_zh:'颜色和描述',
    type:'dialogue', hsk_level:'HSK1', topic:'description', difficulty:'easy', order_index:87,
    description:'Hội thoại mô tả đồ vật bằng màu sắc',
    lines:[
      {speaker:'A',role:'Minh',zh:'你的书包是什么颜色的？',pinyin:'Nǐ de shū bāo shì shén me yán sè de？',vi:'Cái cặp sách của bạn màu gì?'},
      {speaker:'B',role:'Hoa',zh:'是蓝色的。你的呢？',pinyin:'Shì lán sè de. Nǐ de ne？',vi:'Màu xanh. Còn của bạn?'},
      {speaker:'A',role:'Minh',zh:'我的是红色的，还有黑色的拉链。',pinyin:'Wǒ de shì hóng sè de，hái yǒu hēi sè de lā liàn.',vi:'Của tôi màu đỏ, còn có dây kéo màu đen.'},
      {speaker:'B',role:'Hoa',zh:'好看！多少钱买的？',pinyin:'Hǎo kàn！Duō shǎo qián mǎi de？',vi:'Đẹp thật! Mua bao nhiêu tiền?'},
      {speaker:'A',role:'Minh',zh:'一百五十元，在网上买的。',pinyin:'Yī bǎi wǔ shí yuán，zài wǎng shàng mǎi de.',vi:'Một trăm năm mươi tệ, mua trên mạng.'},
      {speaker:'B',role:'Hoa',zh:'真便宜！你能给我发链接吗？',pinyin:'Zhēn pián yi！Nǐ néng gěi wǒ fā liàn jiē ma？',vi:'Rẻ thật! Bạn có thể gửi đường link cho tôi không?'},
    ]
  },
  {
    title:'Học đếm và mua hàng', title_zh:'学数数和购物',
    type:'dialogue', hsk_level:'HSK1', topic:'numbers', difficulty:'easy', order_index:88,
    description:'Đếm số và thực hành mua hàng',
    lines:[
      {speaker:'卖家',role:'Người bán',zh:'你要几个苹果？',pinyin:'Nǐ yào jǐ gè píng guǒ？',vi:'Bạn muốn bao nhiêu quả táo?'},
      {speaker:'买家',role:'Người mua',zh:'我要五个。一个多少钱？',pinyin:'Wǒ yào wǔ gè. Yī gè duō shǎo qián？',vi:'Tôi muốn năm quả. Một quả bao nhiêu tiền?'},
      {speaker:'卖家',role:'Người bán',zh:'一个两块钱，五个就是十块。',pinyin:'Yī gè liǎng kuài qián，wǔ gè jiù shì shí kuài.',vi:'Một quả hai tệ, năm quả là mười tệ.'},
      {speaker:'买家',role:'Người mua',zh:'能便宜一点吗？八块可以吗？',pinyin:'Néng pián yi yī diǎn ma？Bā kuài kě yǐ ma？',vi:'Có thể rẻ hơn một chút không? Tám tệ được không?'},
      {speaker:'卖家',role:'Người bán',zh:'好吧，给你优惠，九块！',pinyin:'Hǎo ba，gěi nǐ yōu huì，jiǔ kuài！',vi:'Thôi được, giảm cho bạn, chín tệ!'},
      {speaker:'买家',role:'Người mua',zh:'好的，谢谢！给你十块，找我一块。',pinyin:'Hǎo de，xiè xiè！Gěi nǐ shí kuài，zhǎo wǒ yī kuài.',vi:'Được rồi, cảm ơn! Đây mười tệ, thối lại một tệ.'},
    ]
  },
  {
    title:'Trường học của tôi', title_zh:'我的学校',
    type:'passage', hsk_level:'HSK1', topic:'school', difficulty:'easy', order_index:89,
    description:'Đoạn văn giới thiệu trường học',
    lines:[
      {speaker:'',role:'',zh:'我在汉语学校学习。',pinyin:'Wǒ zài Hàn yǔ xué xiào xué xí.',vi:'Tôi học ở trường tiếng Trung.'},
      {speaker:'',role:'',zh:'我们学校有五百个学生，三十个老师。',pinyin:'Wǒ men xué xiào yǒu wǔ bǎi gè xué shēng，sān shí gè lǎo shī.',vi:'Trường chúng tôi có năm trăm học sinh, ba mươi giáo viên.'},
      {speaker:'',role:'',zh:'我最喜欢我们的汉语老师，他教课很有意思。',pinyin:'Wǒ zuì xǐ huān wǒ men de Hàn yǔ lǎo shī，tā jiāo kè hěn yǒu yì si.',vi:'Tôi thích nhất giáo viên tiếng Trung của chúng tôi, ông dạy rất thú vị.'},
      {speaker:'',role:'',zh:'每天早上八点上课，下午五点放学。',pinyin:'Měi tiān zǎo shàng bā diǎn shàng kè，xià wǔ wǔ diǎn fàng xué.',vi:'Mỗi ngày tám giờ sáng bắt đầu học, năm giờ chiều tan học.'},
      {speaker:'',role:'',zh:'我在学校认识了很多朋友，很快乐！',pinyin:'Wǒ zài xué xiào rèn shi le hěn duō péng you，hěn kuài lè！',vi:'Tôi đã quen được nhiều bạn bè ở trường, rất vui!'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Lên kế hoạch đi du lịch', title_zh:'计划旅行',
    type:'dialogue', hsk_level:'HSK2', topic:'travel', difficulty:'medium', order_index:90,
    description:'Lên kế hoạch một chuyến du lịch',
    lines:[
      {speaker:'A',role:'Tuấn',zh:'暑假我们去哪里旅游？',pinyin:'Shǔ jià wǒ men qù nǎ lǐ lǚ yóu？',vi:'Kỳ nghỉ hè chúng ta đi du lịch ở đâu?'},
      {speaker:'B',role:'Lan',zh:'我想去云南，听说那里风景很美，而且物价不贵。',pinyin:'Wǒ xiǎng qù Yún nán，tīng shuō nà lǐ fēng jǐng hěn měi，ér qiě wù jià bù guì.',vi:'Tôi muốn đến Vân Nam, nghe nói cảnh đẹp lắm, mà giá cả cũng không đắt.'},
      {speaker:'A',role:'Tuấn',zh:'好主意！我们要去几天？',pinyin:'Hǎo zhǔ yi！Wǒ men yào qù jǐ tiān？',vi:'Ý hay! Chúng ta đi mấy ngày?'},
      {speaker:'B',role:'Lan',zh:'至少七天，这样可以去丽江、大理和玉龙雪山。',pinyin:'Zhì shǎo qī tiān，zhè yàng kě yǐ qù Lì jiāng、Dà lǐ hé Yù lóng xuě shān.',vi:'Ít nhất bảy ngày, như vậy có thể đi Lệ Giang, Đại Lý và Ngọc Long Tuyết Sơn.'},
      {speaker:'A',role:'Tuấn',zh:'我们要预订机票和酒店吗？',pinyin:'Wǒ men yào yù dìng jī piào hé jiǔ diàn ma？',vi:'Chúng ta có cần đặt vé máy bay và khách sạn không?'},
      {speaker:'B',role:'Lan',zh:'当然，最好提前两个月订，这样比较便宜。我来查一下携程的价格。',pinyin:'Dāng rán，zuì hǎo tí qián liǎng gè yuè dìng，zhè yàng bǐ jiào pián yi. Wǒ lái chá yī xià Xié chéng de jià gé.',vi:'Tất nhiên, tốt nhất đặt trước hai tháng sẽ rẻ hơn. Để tôi xem giá trên Ctrip nhé.'},
    ]
  },
  {
    title:'Phỏng vấn xin việc (cơ bản)', title_zh:'基础面试对话',
    type:'dialogue', hsk_level:'HSK2', topic:'work', difficulty:'medium', order_index:91,
    description:'Phỏng vấn xin việc đơn giản',
    lines:[
      {speaker:'面试官',role:'Người phỏng vấn',zh:'请问你叫什么名字？',pinyin:'Qǐng wèn nǐ jiào shén me míng zi？',vi:'Xin hỏi bạn tên gì?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'您好，我叫阮文明，是应届毕业生。',pinyin:'Nín hǎo，wǒ jiào Ruǎn Wén Míng，shì yīng jiè bì yè shēng.',vi:'Xin chào, tôi tên Nguyễn Văn Minh, là sinh viên mới tốt nghiệp.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'你学的是什么专业？',pinyin:'Nǐ xué de shì shén me zhuān yè？',vi:'Bạn học chuyên ngành gì?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'我学的是国际贸易，会说汉语、英语和越南语。',pinyin:'Wǒ xué de shì guó jì mào yì，huì shuō Hàn yǔ、Yīng yǔ hé Yuè nán yǔ.',vi:'Tôi học ngành thương mại quốc tế, biết nói tiếng Trung, tiếng Anh và tiếng Việt.'},
      {speaker:'面试官',role:'Người phỏng vấn',zh:'很好！你为什么想来我们公司？',pinyin:'Hěn hǎo！Nǐ wèi shén me xiǎng lái wǒ men gōng sī？',vi:'Tốt lắm! Tại sao bạn muốn đến công ty chúng tôi?'},
      {speaker:'应聘者',role:'Ứng viên',zh:'因为贵公司在中越贸易领域很有名，我想在这里积累实际工作经验。',pinyin:'Yīn wèi guì gōng sī zài Zhōng Yuè mào yì lǐng yù hěn yǒu míng，wǒ xiǎng zài zhè lǐ jī lěi shí jì gōng zuò jīng yàn.',vi:'Vì quý công ty rất nổi tiếng trong lĩnh vực thương mại Trung-Việt, tôi muốn tích luỹ kinh nghiệm làm việc thực tế ở đây.'},
    ]
  },
  {
    title:'Chính sách một con và gia đình Trung Quốc', title_zh:'中国家庭结构变化',
    type:'passage', hsk_level:'HSK2', topic:'society', difficulty:'medium', order_index:92,
    description:'Sự thay đổi cấu trúc gia đình Trung Quốc',
    lines:[
      {speaker:'',role:'',zh:'中国过去实行"独生子女政策"，每个家庭只能有一个孩子。',pinyin:'Zhōng guó guò qù shí xíng "dú shēng zǐ nǚ zhèng cè"，měi gè jiā tíng zhǐ néng yǒu yī gè hái zi.',vi:'Trung Quốc trước đây thực hiện "chính sách một con", mỗi gia đình chỉ được có một đứa con.'},
      {speaker:'',role:'',zh:'现在这个政策已经改变，鼓励生育二孩、三孩。',pinyin:'Xiàn zài zhè gè zhèng cè yǐ jīng gǎi biàn，gǔ lì shēng yù èr hái、sān hái.',vi:'Hiện nay chính sách này đã thay đổi, khuyến khích sinh hai con, ba con.'},
      {speaker:'',role:'',zh:'现在的中国年轻人结婚比较晚，很多人二十八岁以上才结婚。',pinyin:'Xiàn zài de Zhōng guó nián qīng rén jié hūn bǐ jiào wǎn，hěn duō rén èr shí bā suì yǐ shàng cái jié hūn.',vi:'Giới trẻ Trung Quốc hiện nay kết hôn khá muộn, nhiều người trên hai mươi tám tuổi mới kết hôn.'},
      {speaker:'',role:'',zh:'越来越多的年轻人选择"不婚不育"，这让政府非常担心人口问题。',pinyin:'Yuè lái yuè duō de nián qīng rén xuǎn zé "bù hūn bù yù"，zhè ràng zhèng fǔ fēi cháng dān xīn rén kǒu wèn tí.',vi:'Ngày càng nhiều người trẻ chọn "không kết hôn, không sinh con", điều này khiến chính phủ rất lo lắng về vấn đề dân số.'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Quan hệ tình bạn và lòng trung thành', title_zh:'友谊与忠诚',
    type:'dialogue', hsk_level:'HSK3', topic:'relationships', difficulty:'medium', order_index:93,
    description:'Bàn về tình bạn và ý nghĩa của nó',
    lines:[
      {speaker:'A',role:'Hùng',zh:'你觉得什么样的人才算是真正的朋友？',pinyin:'Nǐ jué de shén me yàng de rén cái suàn shì zhēn zhèng de péng you？',vi:'Bạn nghĩ người như thế nào mới được coi là bạn bè thực sự?'},
      {speaker:'B',role:'Lan',zh:'我觉得真正的朋友，是在你最难的时候还愿意陪着你的人。',pinyin:'Wǒ jué de zhēn zhèng de péng you，shì zài nǐ zuì nán de shí hòu hái yuàn yi péi zhe nǐ de rén.',vi:'Tôi nghĩ bạn bè thực sự là người vẫn sẵn sàng ở bên bạn vào lúc bạn khó khăn nhất.'},
      {speaker:'A',role:'Hùng',zh:'说得好。我有个朋友，十几年了，他从不在背后说我坏话，这很难得。',pinyin:'Shuō de hǎo. Wǒ yǒu gè péng you，shí jǐ nián le，tā cóng bù zài bèi hòu shuō wǒ huài huà，zhè hěn nán dé.',vi:'Nói hay đấy. Tôi có một người bạn hơn mười năm rồi, anh ấy chưa bao giờ nói xấu tôi sau lưng, điều đó rất hiếm.'},
      {speaker:'B',role:'Lan',zh:'这才是真心朋友。现代社会人际关系复杂，能交到这样的朋友很幸运。',pinyin:'Zhè cái shì zhēn xīn péng you. Xiàn dài shè huì rén jì guān xi fù zá，néng jiāo dào zhè yàng de péng you hěn xìng yùn.',vi:'Đó mới là bạn thật. Xã hội hiện đại quan hệ người người phức tạp, có được người bạn như vậy là may mắn.'},
      {speaker:'A',role:'Hùng',zh:'我们越南有句话："Bạn bè tốt quý hơn vàng"。',pinyin:'Wǒ men Yuè nán yǒu jù huà："Bạn bè tốt quý hơn vàng".',vi:'Chúng ta người Việt có câu: "Bạn bè tốt quý hơn vàng".'},
      {speaker:'B',role:'Lan',zh:'中国也有类似的话："金钱难买真朋友"。',pinyin:'Zhōng guó yě yǒu lèi sì de huà："jīn qián nán mǎi zhēn péng you".',vi:'Trung Quốc cũng có câu tương tự: "Tiền bạc khó mua được bạn bè thực sự".'},
    ]
  },
  {
    title:'Thảo luận về thực phẩm hữu cơ', title_zh:'关于有机食品的讨论',
    type:'dialogue', hsk_level:'HSK3', topic:'health', difficulty:'medium', order_index:94,
    description:'Bàn về thực phẩm hữu cơ và an toàn thực phẩm',
    lines:[
      {speaker:'A',role:'Minh',zh:'你会买有机蔬菜吗？虽然贵很多，但是更健康。',pinyin:'Nǐ huì mǎi yǒu jī shū cài ma？Suī rán guì hěn duō，dàn shì gèng jiàn kāng.',vi:'Bạn có mua rau hữu cơ không? Tuy đắt hơn nhiều nhưng lành mạnh hơn.'},
      {speaker:'B',role:'Hoa',zh:'我有时候买。但坦白说，很难分清真假有机，标签上写"有机"不一定是真的。',pinyin:'Wǒ yǒu shí hòu mǎi. Dàn tǎn bái shuō，hěn nán fēn qīng zhēn jiǎ yǒu jī，biāo qiān shàng xiě "yǒu jī" bù yī dìng shì zhēn de.',vi:'Đôi khi tôi có mua. Nhưng thành thật mà nói, rất khó phân biệt hữu cơ thật giả, nhãn ghi "hữu cơ" chưa chắc là thật.'},
      {speaker:'A',role:'Minh',zh:'这是个大问题。食品安全监管需要加强。',pinyin:'Zhè shì gè dà wèn tí. Shí pǐn ān quán jiān guǎn xū yào jiā qiáng.',vi:'Đây là vấn đề lớn. Cần tăng cường giám sát an toàn thực phẩm.'},
      {speaker:'B',role:'Hoa',zh:'有人选择自己种菜，可以确保吃到真正无农药的蔬菜。',pinyin:'Yǒu rén xuǎn zé zì jǐ zhòng cài，kě yǐ quē bǎo chī dào zhēn zhèng wú nóng yào de shū cài.',vi:'Có người chọn tự trồng rau, có thể đảm bảo ăn rau thực sự không có thuốc trừ sâu.'},
      {speaker:'A',role:'Minh',zh:'城市里很难有地方种菜，但阳台种菜最近很流行，我也在试！',pinyin:'Chéng shì lǐ hěn nán yǒu dì fāng zhòng cài，dàn yáng tái zhòng cài zuì jìn hěn liú xíng，wǒ yě zài shì！',vi:'Ở thành phố khó có chỗ trồng rau, nhưng trồng rau trên ban công gần đây rất thịnh hành, tôi cũng đang thử!'},
    ]
  },
  {
    title:'Sự hình thành Thành phố Thượng Hải', title_zh:'上海的发展历程',
    type:'passage', hsk_level:'HSK3', topic:'history', difficulty:'hard', order_index:95,
    description:'Lịch sử phát triển của Thượng Hải',
    lines:[
      {speaker:'',role:'',zh:'上海在十九世纪以前只是一个普通的渔村，如今已成为亚洲最重要的金融中心之一。',pinyin:'Shàng hǎi zài shí jiǔ shì jì yǐ qián zhǐ shì yī gè pǔ tōng de yú cūn，rú jīn yǐ chéng wéi Yà zhōu zuì zhòng yào de jīn róng zhōng xīn zhī yī.',vi:'Trước thế kỷ 19, Thượng Hải chỉ là một ngôi làng chài bình thường, nay đã trở thành một trong những trung tâm tài chính quan trọng nhất châu Á.'},
      {speaker:'',role:'',zh:'1842年鸦片战争后，上海被迫开放为通商口岸，外国租界的设立带来了西方的资本和技术。',pinyin:'1842 nián Yā piàn zhàn zhēng hòu，Shàng hǎi bèi pò kāi fàng wéi tōng shāng kǒu àn，wài guó zū jiè de shè lì dài lái le Xī fāng de zī běn hé jì shù.',vi:'Sau chiến tranh Nha phiến năm 1842, Thượng Hải bị buộc mở cửa thành thương cảng, sự thành lập tô giới nước ngoài mang đến vốn và kỹ thuật phương Tây.'},
      {speaker:'',role:'',zh:'改革开放后，1990年浦东开发区的设立成为上海腾飞的关键转折点。',pinyin:'Gǎi gé kāi fàng hòu，1990 nián Pǔ dōng kāi fā qū de shè lì chéng wéi Shàng hǎi téng fēi de guān jiàn zhuǎn zhé diǎn.',vi:'Sau cải cách mở cửa, việc thành lập khu phát triển Phố Đông năm 1990 trở thành điểm ngoặt quan trọng trong sự cất cánh của Thượng Hải.'},
      {speaker:'',role:'',zh:'今天的上海，陆家嘴金融区夜景璀璨，是中国经济奇迹的最佳象征。',pinyin:'Jīn tiān de Shàng hǎi，Lù jiā zuǐ jīn róng qū yè jǐng cuǐ càn，shì Zhōng guó jīng jì qí jì de zuì jiā xiàng zhēng.',vi:'Thượng Hải ngày nay, khu tài chính Lục Gia Chủy lung linh ánh đèn về đêm, là biểu tượng tốt nhất cho kỳ tích kinh tế Trung Quốc.'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Năng lượng tái tạo và tương lai', title_zh:'可再生能源与未来',
    type:'dialogue', hsk_level:'HSK4', topic:'environment', difficulty:'hard', order_index:96,
    description:'Bàn về năng lượng tái tạo',
    lines:[
      {speaker:'A',role:'Bình',zh:'中国现在是全球最大的太阳能和风能装机国，这说明什么？',pinyin:'Zhōng guó xiàn zài shì quán qiú zuì dà de tài yáng néng hé fēng néng zhuāng jī guó，zhè shuō míng shén me？',vi:'Trung Quốc hiện là quốc gia có công suất lắp đặt năng lượng mặt trời và gió lớn nhất thế giới, điều này nói lên điều gì?'},
      {speaker:'B',role:'Hùng',zh:'说明中国在绿色转型上投入了巨大的资源，也体现了政策持续性的重要。',pinyin:'Shuō míng Zhōng guó zài lǜ sè zhuǎn xíng shàng tóu rù le jù dà de zī yuán，yě tǐ xiàn le zhèng cè chí xù xìng de zhòng yào.',vi:'Điều đó cho thấy Trung Quốc đã đầu tư nguồn lực khổng lồ vào chuyển đổi xanh, cũng thể hiện tầm quan trọng của tính nhất quán trong chính sách.'},
      {speaker:'A',role:'Bình',zh:'但有人批评说，中国同时还在建新的煤电厂，这不是矛盾吗？',pinyin:'Dàn yǒu rén pī píng shuō，Zhōng guó tóng shí hái zài jiàn xīn de méi diàn chǎng，zhè bù shì máo dùn ma？',vi:'Nhưng có người phê bình rằng Trung Quốc vừa xây thêm nhà máy nhiệt điện than mới, đây không phải là mâu thuẫn sao?'},
      {speaker:'B',role:'Hùng',zh:'确实存在这个矛盾。能源转型不可能一蹴而就，需要兼顾能源安全和经济发展。',pinyin:'Què shí cún zài zhè gè máo dùn. Néng yuán zhuǎn xíng bù kě néng yī cù ér jiù，xū yào jiān gù néng yuán ān quán hé jīng jì fā zhǎn.',vi:'Mâu thuẫn này đúng là tồn tại. Chuyển đổi năng lượng không thể thực hiện ngay một lúc, cần quan tâm cả an ninh năng lượng lẫn phát triển kinh tế.'},
      {speaker:'A',role:'Bình',zh:'那越南呢？我们水电资源丰富，风能和太阳能潜力也很大。',pinyin:'Nà Yuè nán ne？Wǒ men shuǐ diàn zī yuán fēng fù，fēng néng hé tài yáng néng qián lì yě hěn dà.',vi:'Còn Việt Nam thì sao? Chúng ta giàu tài nguyên thủy điện, tiềm năng gió và mặt trời cũng rất lớn.'},
      {speaker:'B',role:'Hùng',zh:'越南近年来风能和太阳能发展很快，已经成为东南亚可再生能源发展最快的国家之一。这是个好的开始。',pinyin:'Yuè nán jìn nián lái fēng néng hé tài yáng néng fā zhǎn hěn kuài，yǐ jīng chéng wéi dōng nán yà kě zài shēng néng yuán fā zhǎn zuì kuài de guó jiā zhī yī. Zhè shì gè hǎo de kāi shǐ.',vi:'Năng lượng gió và mặt trời của Việt Nam phát triển rất nhanh những năm gần đây, đã trở thành một trong những quốc gia phát triển năng lượng tái tạo nhanh nhất Đông Nam Á. Đây là khởi đầu tốt.'},
    ]
  },
  {
    title:'Trí tuệ nhân tạo và sáng tạo', title_zh:'人工智能与人类创造力',
    type:'passage', hsk_level:'HSK4', topic:'technology', difficulty:'hard', order_index:97,
    description:'AI có thể thay thế sáng tạo con người không?',
    lines:[
      {speaker:'',role:'',zh:'人工智能能够创作诗歌、绘画、音乐，这引发了一个根本性的问题：创造力是人类独有的吗？',pinyin:'Rén gōng zhì néng néng gòu chuàng zuò shī gē、huì huà、yīn yuè，zhè yǐn fā le yī gè gēn běn xìng de wèn tí：chuàng zào lì shì rén lèi dú yǒu de ma？',vi:'Trí tuệ nhân tạo có thể sáng tác thơ, vẽ tranh, làm nhạc, điều này đặt ra một câu hỏi căn bản: sáng tạo có phải là độc quyền của con người không?'},
      {speaker:'',role:'',zh:'支持者认为，AI只是在模仿和重组人类已有的创作，并非真正的创造。',pinyin:'Zhī chí zhě rèn wéi，AI zhǐ shì zài mó fǎng hé chóng zǔ rén lèi yǐ yǒu de chuàng zuò，bìng fēi zhēn zhèng de chuàng zào.',vi:'Những người ủng hộ cho rằng AI chỉ đang mô phỏng và tái tổ hợp các sáng tác có sẵn của con người, không phải sáng tạo thực sự.'},
      {speaker:'',role:'',zh:'批评者则担心，AI的创作会冲击艺术家的生计，让创意产业面临前所未有的挑战。',pinyin:'Pī píng zhě zé dān xīn，AI de chuàng zuò huì chōng jī yì shù jiā de shēng jì，ràng chuàng yì chǎn yè miàn lín qián suǒ wèi yǒu de tiǎo zhàn.',vi:'Những người chỉ trích lo ngại rằng sáng tác của AI sẽ ảnh hưởng đến miếng cơm của các nghệ sĩ, khiến ngành công nghiệp sáng tạo đối mặt với thách thức chưa từng có.'},
      {speaker:'',role:'',zh:'也许，最重要的不是AI能否创作，而是人类如何与AI合作，创造出前所未有的作品。',pinyin:'Yě xǔ，zuì zhòng yào de bù shì AI néng fǒu chuàng zuò，ér shì rén lèi rú hé yǔ AI hé zuò，chuàng zào chū qián suǒ wèi yǒu de zuò pǐn.',vi:'Có lẽ, điều quan trọng nhất không phải là AI có thể sáng tác không, mà là con người hợp tác với AI như thế nào để tạo ra những tác phẩm chưa từng có.'},
      {speaker:'',role:'',zh:'人机协作，而非人机对立，或许是应对AI时代最明智的态度。',pinyin:'Rén jī xié zuò，ér fēi rén jī duì lì，huò xǔ shì yìng duì AI shí dài zuì míng zhì de tài dù.',vi:'Hợp tác người-máy, thay vì đối lập người-máy, có lẽ là thái độ sáng suốt nhất để ứng phó với thời đại AI.'},
    ]
  },
  {
    title:'Học tiếng Trung — Hành trình và cảm nhận', title_zh:'学中文的旅途',
    type:'passage', hsk_level:'HSK4', topic:'language', difficulty:'hard', order_index:98,
    description:'Tâm sự của người Việt học tiếng Trung',
    lines:[
      {speaker:'',role:'',zh:'学习一门语言，不仅仅是背单词和学语法，更是了解一种文化、拓展一种思维方式。',pinyin:'Xué xí yī mén yǔ yán，bù jǐn jǐn shì bèi dān cí hé xué yǔ fǎ，gèng shì liǎo jiě yī zhǒng wén huà、tuò zhǎn yī zhǒng sī wéi fāng shì.',vi:'Học một ngôn ngữ không chỉ là học từ vựng và ngữ pháp, mà còn là hiểu một nền văn hoá, mở rộng một cách tư duy.'},
      {speaker:'',role:'',zh:'对越南人来说，汉语有着特殊的意义：历史上，汉字曾是越南的书写系统；在现代，汉语是最重要的商业语言之一。',pinyin:'Duì Yuè nán rén lái shuō，Hàn yǔ yǒu zhe tè shū de yì yì：lì shǐ shàng，Hàn zì céng shì Yuè nán de shū xiě xì tǒng；zài xiàn dài，Hàn yǔ shì zuì zhòng yào de shāng yè yǔ yán zhī yī.',vi:'Đối với người Việt, tiếng Trung có ý nghĩa đặc biệt: về mặt lịch sử, chữ Hán từng là hệ thống chữ viết của Việt Nam; trong hiện đại, tiếng Trung là một trong những ngôn ngữ thương mại quan trọng nhất.'},
      {speaker:'',role:'',zh:'学习汉语的路上，最大的挑战是汉字。每一个汉字都承载着历史和文化，写汉字是一种修行。',pinyin:'Xué xí Hàn yǔ de lù shàng，zuì dà de tiǎo zhàn shì Hàn zì. Měi yī gè Hàn zì dōu chéng zài zhe lì shǐ hé wén huà，xiě Hàn zì shì yī zhǒng xiū xíng.',vi:'Trên con đường học tiếng Trung, thách thức lớn nhất là chữ Hán. Mỗi chữ Hán đều chứa đựng lịch sử và văn hoá, viết chữ Hán là một sự tu tập.'},
      {speaker:'',role:'',zh:'但每当能用汉语和中国朋友畅聊，或者看懂一部中国电影时，那种成就感是无与伦比的。',pinyin:'Dàn měi dāng néng yòng Hàn yǔ hé Zhōng guó péng you chàng liáo，huò zhě kàn dǒng yī bù Zhōng guó diàn yǐng shí，nà zhǒng chéng jiù gǎn shì wú yǔ lún bǐ de.',vi:'Nhưng mỗi khi có thể trò chuyện thoải mái với bạn Trung Quốc bằng tiếng Trung, hay hiểu được một bộ phim Trung Quốc, cảm giác thành tựu đó là không gì sánh được.'},
      {speaker:'',role:'',zh:'加油，学习汉语的同学们！坚持就是胜利。',pinyin:'Jiā yóu，xué xí Hàn yǔ de tóng xué men！Jiān chí jiù shì shèng lì.',vi:'Cố lên, các bạn đang học tiếng Trung! Kiên trì chính là chiến thắng.'},
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
          [d.title,d.title_zh,d.type,d.hsk_level,d.topic,d.description,d.difficulty,d.order_index]);
        did=r.insertId; dCount++;
        console.log(`  ✓ [${d.hsk_level}·${d.type}] ${d.title}`);
      }
      await conn.query('DELETE FROM dialogue_lines WHERE dialogue_id=?',[did]);
      for (let i=0;i<d.lines.length;i++) {
        const l=d.lines[i];
        await conn.query(
          'INSERT INTO dialogue_lines (dialogue_id,line_order,speaker,speaker_role,text_zh,pinyin,text_vi) VALUES (?,?,?,?,?,?,?)',
          [did,i+1,l.speaker,l.role,l.zh,l.pinyin,l.vi]);
        lCount++;
      }
    }
    await conn.commit();
    const [[ds]]=await conn.query('SELECT COUNT(*) c FROM dialogues');
    const [[ls]]=await conn.query('SELECT COUNT(*) c FROM dialogue_lines');
    const [bl]=await conn.query('SELECT hsk_level,SUM(type="dialogue") hd,SUM(type="passage") ps,COUNT(*) total FROM dialogues WHERE is_active=1 GROUP BY hsk_level ORDER BY hsk_level');
    console.log(`\n✅ Batch 7 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})\n`);
    console.log('   Cấp  | Hội thoại | Đoạn văn | Tổng');
    console.log('   -----|-----------|----------|-----');
    let sumHD=0,sumPS=0;
    bl.forEach(r=>{console.log(`   ${r.hsk_level} | ${String(r.hd).padStart(9)} | ${String(r.ps).padStart(8)} | ${r.total}`);sumHD+=Number(r.hd);sumPS+=Number(r.ps);});
    console.log(`   Tổng | ${String(sumHD).padStart(9)} | ${String(sumPS).padStart(8)} | ${sumHD+sumPS}`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
