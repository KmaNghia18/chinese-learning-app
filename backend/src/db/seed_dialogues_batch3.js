// seed_dialogues_batch3.js — Batch 3: Thêm 18 hội thoại & đoạn văn
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Hỏi thăm sức khoẻ', title_zh:'问候身体状况',
    type:'dialogue', hsk_level:'HSK1', topic:'health', difficulty:'easy', order_index:33,
    description:'Hỏi thăm nhau hàng ngày',
    lines:[
      {speaker:'A',role:'Lan',zh:'你好吗？',pinyin:'Nǐ hǎo ma？',vi:'Bạn có khoẻ không?'},
      {speaker:'B',role:'Hoa',zh:'我很好，谢谢。你呢？',pinyin:'Wǒ hěn hǎo，xiè xiè. Nǐ ne？',vi:'Tôi khoẻ, cảm ơn. Còn bạn?'},
      {speaker:'A',role:'Lan',zh:'我不太好，我头疼。',pinyin:'Wǒ bù tài hǎo，wǒ tóu téng.',vi:'Tôi không được khoẻ lắm, tôi bị đau đầu.'},
      {speaker:'B',role:'Hoa',zh:'真的吗？你要去医院吗？',pinyin:'Zhēn de ma？Nǐ yào qù yī yuàn ma？',vi:'Thật không? Bạn có muốn đi bệnh viện không?'},
      {speaker:'A',role:'Lan',zh:'不用，我休息一下就好了。',pinyin:'Bù yòng，wǒ xiū xi yī xià jiù hǎo le.',vi:'Thôi khỏi, tôi nghỉ ngơi một chút là khỏi.'},
      {speaker:'B',role:'Hoa',zh:'好的，多喝水，早点休息。',pinyin:'Hǎo de，duō hē shuǐ，zǎo diǎn xiū xi.',vi:'Được rồi, uống nhiều nước, nghỉ ngơi sớm nhé.'},
      {speaker:'A',role:'Lan',zh:'谢谢你，你真好！',pinyin:'Xiè xiè nǐ，nǐ zhēn hǎo！',vi:'Cảm ơn bạn, bạn tốt quá!'},
    ]
  },
  {
    title:'Ngày đầu tiên đến trường', title_zh:'第一天上学',
    type:'dialogue', hsk_level:'HSK1', topic:'school', difficulty:'easy', order_index:34,
    description:'Ngày đầu tiên học tiếng Trung',
    lines:[
      {speaker:'老师',role:'Giáo viên',zh:'同学们，今天是第一天上课，大家介绍一下自己。',pinyin:'Tóng xué men，jīn tiān shì dì yī tiān shàng kè，dà jiā jiè shào yī xià zì jǐ.',vi:'Các bạn, hôm nay là ngày đầu tiên học, mọi người tự giới thiệu bản thân nhé.'},
      {speaker:'学生1',role:'Học sinh 1',zh:'我叫小明，我是越南人，我喜欢汉语。',pinyin:'Wǒ jiào Xiǎo Míng，wǒ shì Yuè nán rén，wǒ xǐ huān Hàn yǔ.',vi:'Tôi tên Tiểu Minh, tôi là người Việt Nam, tôi thích tiếng Trung.'},
      {speaker:'老师',role:'Giáo viên',zh:'很好！你学汉语多长时间了？',pinyin:'Hěn hǎo！Nǐ xué Hàn yǔ duō cháng shí jiān le？',vi:'Tốt lắm! Bạn học tiếng Trung bao lâu rồi?'},
      {speaker:'学生1',role:'Học sinh 1',zh:'我学了三个月了。',pinyin:'Wǒ xué le sān gè yuè le.',vi:'Tôi học được ba tháng rồi.'},
      {speaker:'老师',role:'Giáo viên',zh:'太棒了！汉语难吗？',pinyin:'Tài bàng le！Hàn yǔ nán ma？',vi:'Giỏi lắm! Tiếng Trung có khó không?'},
      {speaker:'学生1',role:'Học sinh 1',zh:'有一点难，但是很有意思。',pinyin:'Yǒu yī diàn nán，dàn shì hěn yǒu yì si.',vi:'Hơi khó một chút, nhưng rất thú vị.'},
      {speaker:'老师',role:'Giáo viên',zh:'非常好！我们一起加油！',pinyin:'Fēi cháng hǎo！Wǒ men yī qǐ jiā yóu！',vi:'Rất tốt! Chúng ta cùng nhau cố lên!'},
    ]
  },
  {
    title:'Động vật tôi yêu thích', title_zh:'我喜欢的动物',
    type:'passage', hsk_level:'HSK1', topic:'animals', difficulty:'easy', order_index:35,
    description:'Đoạn văn về con vật',
    lines:[
      {speaker:'',role:'',zh:'我喜欢猫，猫很可爱。',pinyin:'Wǒ xǐ huān māo，māo hěn kě ài.',vi:'Tôi thích mèo, mèo rất đáng yêu.'},
      {speaker:'',role:'',zh:'我家有一只小猫，它是白色的。',pinyin:'Wǒ jiā yǒu yī zhī xiǎo māo，tā shì bái sè de.',vi:'Nhà tôi có một con mèo nhỏ, nó màu trắng.'},
      {speaker:'',role:'',zh:'小猫叫"雪球"，它喜欢吃鱼。',pinyin:'Xiǎo māo jiào "xuě qiú"，tā xǐ huān chī yú.',vi:'Con mèo nhỏ tên "Cầu Tuyết", nó thích ăn cá.'},
      {speaker:'',role:'',zh:'每天我回家，"雪球"都来迎接我。',pinyin:'Měi tiān wǒ huí jiā，"xuě qiú" dōu lái yíng jiē wǒ.',vi:'Mỗi ngày tôi về nhà, "Cầu Tuyết" đều ra đón tôi.'},
      {speaker:'',role:'',zh:'我很爱它，它是我最好的朋友。',pinyin:'Wǒ hěn ài tā，tā shì wǒ zuì hǎo de péng you.',vi:'Tôi rất yêu nó, nó là người bạn tốt nhất của tôi.'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Kế hoạch cuối tuần', title_zh:'周末计划',
    type:'dialogue', hsk_level:'HSK2', topic:'leisure', difficulty:'easy', order_index:36,
    description:'Lên kế hoạch cho cuối tuần',
    lines:[
      {speaker:'A',role:'Minh',zh:'这个周末你有什么计划？',pinyin:'Zhè gè zhōu mò nǐ yǒu shén me jì huà？',vi:'Cuối tuần này bạn có kế hoạch gì?'},
      {speaker:'B',role:'Hùng',zh:'我打算去爬山。你要一起吗？',pinyin:'Wǒ dǎ suàn qù pá shān. Nǐ yào yī qǐ ma？',vi:'Tôi định đi leo núi. Bạn có muốn cùng không?'},
      {speaker:'A',role:'Minh',zh:'好啊！几点出发？去哪座山？',pinyin:'Hǎo ā！Jǐ diǎn chū fā？Qù nǎ zuò shān？',vi:'Được chứ! Mấy giờ xuất phát? Đi núi nào?'},
      {speaker:'B',role:'Hùng',zh:'早上六点，去香山。带上午饭，中午在山上吃。',pinyin:'Zǎo shàng liù diǎn，qù Xiāng shān. Dài shàng wǔ fàn，zhōng wǔ zài shān shàng chī.',vi:'Sáu giờ sáng, đến Hương Sơn. Mang theo cơm trưa, ăn trên núi lúc trưa.'},
      {speaker:'A',role:'Minh',zh:'听起来很好！要穿什么去？',pinyin:'Tīng qǐ lái hěn hǎo！Yào chuān shén me qù？',vi:'Nghe có vẻ hay đấy! Phải mặc gì đi?'},
      {speaker:'B',role:'Hùng',zh:'穿运动鞋，带上水和零食就够了。',pinyin:'Chuān yùn dòng xié，dài shàng shuǐ hé líng shí jiù gòu le.',vi:'Mang giày thể thao, mang theo nước và đồ ăn vặt là đủ.'},
      {speaker:'A',role:'Minh',zh:'好的，周六见！',pinyin:'Hǎo de，zhōu liù jiàn！',vi:'Được rồi, thứ Bảy gặp nhau!'},
    ]
  },
  {
    title:'Gửi bưu kiện', title_zh:'寄快递',
    type:'dialogue', hsk_level:'HSK2', topic:'services', difficulty:'medium', order_index:37,
    description:'Gửi bưu kiện ở bưu điện',
    lines:[
      {speaker:'客户',role:'Khách hàng',zh:'您好，我想寄一个包裹到上海。',pinyin:'Nín hǎo，wǒ xiǎng jì yī gè bāo guǒ dào Shàng hǎi.',vi:'Xin chào, tôi muốn gửi một bưu kiện đến Thượng Hải.'},
      {speaker:'工作人员',role:'Nhân viên',zh:'好的，请把包裹放到秤上。',pinyin:'Hǎo de，qǐng bǎ bāo guǒ fàng dào chèng shàng.',vi:'Được rồi, cho bưu kiện lên cân nhé.'},
      {speaker:'客户',role:'Khách hàng',zh:'里面是衣服和书，不是易碎品。',pinyin:'Lǐ miàn shì yī fu hé shū，bù shì yì suì pǐn.',vi:'Bên trong là quần áo và sách, không phải đồ dễ vỡ.'},
      {speaker:'工作人员',role:'Nhân viên',zh:'好的，重两公斤。普通快递三天到，加急快递明天就到。',pinyin:'Hǎo de，zhòng liǎng gōng jīn. Pǔ tōng kuài dì sān tiān dào，jiā jí kuài dì míng tiān jiù dào.',vi:'Được rồi, nặng hai ki-lô. Chuyển phát thường ba ngày đến, chuyển phát nhanh ngày mai đến.'},
      {speaker:'客户',role:'Khách hàng',zh:'普通快递多少钱？',pinyin:'Pǔ tōng kuài dì duō shǎo qián？',vi:'Chuyển phát thường bao nhiêu tiền?'},
      {speaker:'工作人员',role:'Nhân viên',zh:'十五块。请填一下收件人信息。',pinyin:'Shí wǔ kuài. Qǐng tián yī xià shōu jiàn rén xìn xī.',vi:'Mười lăm tệ. Vui lòng điền thông tin người nhận.'},
      {speaker:'客户',role:'Khách hàng',zh:'好的，给您钱和单子。',pinyin:'Hǎo de，gěi nín qián hé dān zi.',vi:'Được rồi, đây là tiền và phiếu.'},
    ]
  },
  {
    title:'Nghề nghiệp và công việc', title_zh:'职业与工作',
    type:'passage', hsk_level:'HSK2', topic:'work', difficulty:'medium', order_index:38,
    description:'Đoạn văn kể về công việc',
    lines:[
      {speaker:'',role:'',zh:'我叫阿兰，今年二十八岁，是一名护士。',pinyin:'Wǒ jiào Ā lán，jīn nián èr shí bā suì，shì yī míng hù shi.',vi:'Tôi tên A Lan, năm nay hai mươi tám tuổi, là một y tá.'},
      {speaker:'',role:'',zh:'我在市中心医院工作，每天早上七点上班。',pinyin:'Wǒ zài shì zhōng xīn yī yuàn gōng zuò，měi tiān zǎo shàng qī diǎn shàng bān.',vi:'Tôi làm ở Bệnh viện Trung tâm Thành phố, mỗi ngày bảy giờ sáng đi làm.'},
      {speaker:'',role:'',zh:'工作很忙，有时候要值夜班，很辛苦。',pinyin:'Gōng zuò hěn máng，yǒu shí hòu yào zhí yè bān，hěn xīn kǔ.',vi:'Công việc rất bận, đôi khi phải trực đêm, rất vất vả.'},
      {speaker:'',role:'',zh:'但是，看到病人康复出院，我感到很满足。',pinyin:'Dàn shì，kàn dào bìng rén kāng fù chū yuàn，wǒ gǎn dào hěn mǎn zú.',vi:'Nhưng khi thấy bệnh nhân khỏi bệnh ra viện, tôi cảm thấy rất thoả mãn.'},
      {speaker:'',role:'',zh:'我爱我的工作，因为它能帮助身边的人。',pinyin:'Wǒ ài wǒ de gōng zuò，yīn wèi tā néng bāng zhù shēn biān de rén.',vi:'Tôi yêu công việc của mình vì nó có thể giúp đỡ những người xung quanh.'},
    ]
  },
  {
    title:'Nói chuyện điện thoại', title_zh:'打电话',
    type:'dialogue', hsk_level:'HSK2', topic:'daily_life', difficulty:'medium', order_index:39,
    description:'Cuộc điện thoại thăm hỏi',
    lines:[
      {speaker:'A',role:'Hoa',zh:'喂，你好！是王明吗？',pinyin:'Wèi，nǐ hǎo！Shì Wáng Míng ma？',vi:'A lô, xin chào! Có phải Vương Minh không?'},
      {speaker:'B',role:'Vương Minh',zh:'是我。你是谁？',pinyin:'Shì wǒ. Nǐ shì shuí？',vi:'Là tôi. Bạn là ai vậy?'},
      {speaker:'A',role:'Hoa',zh:'我是阿花，你的大学同学！好久不见！',pinyin:'Wǒ shì Ā huā，nǐ de dà xué tóng xué！Hǎo jiǔ bù jiàn！',vi:'Tôi là A Hoa, bạn cùng lớp đại học của bạn! Lâu rồi không gặp!'},
      {speaker:'B',role:'Vương Minh',zh:'阿花！真是太久了，你现在在哪里？',pinyin:'Ā huā！Zhēn shì tài jiǔ le，nǐ xiàn zài zài nǎ lǐ？',vi:'A Hoa! Thật sự lâu rồi, bây giờ bạn đang ở đâu?'},
      {speaker:'A',role:'Hoa',zh:'我现在在北京工作。你呢？',pinyin:'Wǒ xiàn zài zài Běi jīng gōng zuò. Nǐ ne？',vi:'Bây giờ tôi đang làm ở Bắc Kinh. Còn bạn?'},
      {speaker:'B',role:'Vương Minh',zh:'我在上海。什么时候我们见面？',pinyin:'Wǒ zài Shàng hǎi. Shén me shí hòu wǒ men jiàn miàn？',vi:'Tôi đang ở Thượng Hải. Bao giờ chúng mình gặp nhau nhỉ?'},
      {speaker:'A',role:'Hoa',zh:'下个月我去上海出差，到时候一起吃饭！',pinyin:'Xià gè yuè wǒ qù Shàng hǎi chū chāi，dào shí hòu yī qǐ chī fàn！',vi:'Tháng tới tôi đi công tác Thượng Hải, lúc đó cùng ăn cơm nhé!'},
      {speaker:'B',role:'Vương Minh',zh:'太好了，一言为定！',pinyin:'Tài hǎo le，yī yán wéi dìng！',vi:'Tuyệt lắm, nói là làm!'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Thảo luận về sách và đọc sách', title_zh:'关于读书的讨论',
    type:'dialogue', hsk_level:'HSK3', topic:'culture', difficulty:'medium', order_index:40,
    description:'Nói về thói quen đọc sách',
    lines:[
      {speaker:'A',role:'Minh',zh:'你平时喜欢看什么书？',pinyin:'Nǐ píng shí xǐ huān kàn shén me shū？',vi:'Bình thường bạn thích đọc sách gì?'},
      {speaker:'B',role:'Hoa',zh:'我喜欢历史书和小说，特别是中国古典文学。',pinyin:'Wǒ xǐ huān lì shǐ shū hé xiǎo shuō，tè bié shì Zhōng guó gǔ diǎn wén xué.',vi:'Tôi thích sách lịch sử và tiểu thuyết, đặc biệt là văn học cổ điển Trung Quốc.'},
      {speaker:'A',role:'Minh',zh:'你读过《红楼梦》吗？',pinyin:'Nǐ dú guò "Hóng lóu mèng" ma？',vi:'Bạn đã đọc "Hồng Lâu Mộng" chưa?'},
      {speaker:'B',role:'Hoa',zh:'读过，非常精彩！故事非常复杂，人物众多，但很有意思。',pinyin:'Dú guò，fēi cháng jīng cǎi！Gù shì fēi cháng fù zá，rén wù zhòng duō，dàn hěn yǒu yì si.',vi:'Đọc rồi, rất hay! Câu chuyện rất phức tạp, nhiều nhân vật, nhưng rất thú vị.'},
      {speaker:'A',role:'Minh',zh:'现在很多人不看纸质书了，你怎么看？',pinyin:'Xiàn zài hěn duō rén bù kàn zhǐ zhì shū le，nǐ zěn me kàn？',vi:'Bây giờ nhiều người không đọc sách giấy nữa, bạn nghĩ sao?'},
      {speaker:'B',role:'Hoa',zh:'我觉得纸质书和电子书各有优缺点。纸质书更有感觉，电子书更方便。',pinyin:'Wǒ jué de zhǐ zhì shū hé diàn zǐ shū gè yǒu yōu quē diǎn. Zhǐ zhì shū gèng yǒu gǎn jué，diàn zǐ shū gèng fāng biàn.',vi:'Tôi nghĩ sách giấy và sách điện tử đều có ưu nhược điểm riêng. Sách giấy có cảm giác hơn, sách điện tử tiện lợi hơn.'},
      {speaker:'A',role:'Minh',zh:'同意。最重要的是有读书的习惯，形式不重要。',pinyin:'Tóng yì. Zuì zhòng yào de shì yǒu dú shū de xí guàn，xíng shì bù zhòng yào.',vi:'Đồng ý. Quan trọng nhất là có thói quen đọc sách, hình thức không quan trọng.'},
    ]
  },
  {
    title:'Luyện nói với người bản ngữ', title_zh:'和母语者练习口语',
    type:'dialogue', hsk_level:'HSK3', topic:'language', difficulty:'medium', order_index:41,
    description:'Luyện tiếng Trung với người Trung Quốc',
    lines:[
      {speaker:'学习者',role:'Người học',zh:'你好，我在学汉语，可以跟你练习口语吗？',pinyin:'Nǐ hǎo，wǒ zài xué Hàn yǔ，kě yǐ gēn nǐ liàn xí kǒu yǔ ma？',vi:'Xin chào, tôi đang học tiếng Trung, có thể luyện hội thoại cùng bạn không?'},
      {speaker:'中国人',role:'Người bản ngữ',zh:'当然可以！你汉语说得很好。学了多长时间了？',pinyin:'Dāng rán kě yǐ！Nǐ Hàn yǔ shuō de hěn hǎo. Xué le duō cháng shí jiān le？',vi:'Tất nhiên được! Bạn nói tiếng Trung rất tốt đấy. Học bao lâu rồi?'},
      {speaker:'学习者',role:'Người học',zh:'谢谢！我学了两年，但口语不太好，我需要多练习。',pinyin:'Xiè xiè！Wǒ xué le liǎng nián，dàn kǒu yǔ bù tài hǎo，wǒ xū yào duō liàn xí.',vi:'Cảm ơn! Tôi học hai năm rồi, nhưng hội thoại không tốt lắm, tôi cần luyện nhiều hơn.'},
      {speaker:'中国人',role:'Người bản ngữ',zh:'没关系，只要多说，自然就会进步的。你来自哪个国家？',pinyin:'Méi guān xi，zhǐ yào duō shuō，zì rán jiù huì jìn bù de. Nǐ lái zì nǎ gè guó jiā？',vi:'Không sao, chỉ cần nói nhiều là tự nhiên tiến bộ thôi. Bạn đến từ nước nào?'},
      {speaker:'学习者',role:'Người học',zh:'我来自越南。越南人学汉语有优势，因为两种语言有很多相似的词。',pinyin:'Wǒ lái zì Yuè nán. Yuè nán rén xué Hàn yǔ yǒu yōu shì，yīn wèi liǎng zhǒng yǔ yán yǒu hěn duō xiāng sì de cí.',vi:'Tôi đến từ Việt Nam. Người Việt học tiếng Trung có lợi thế vì hai ngôn ngữ có nhiều từ giống nhau.'},
      {speaker:'中国人',role:'Người bản ngữ',zh:'是的，确实如此。越南语也有声调，所以你们对汉语声调应该比较熟悉。',pinyin:'Shì de，què shí rú cǐ. Yuè nán yǔ yě yǒu shēng diào，suǒ yǐ nǐ men duì Hàn yǔ shēng diào yīng gāi bǐ jiào shú xi.',vi:'Đúng vậy, đúng là như vậy. Tiếng Việt cũng có thanh điệu nên các bạn sẽ quen hơn với thanh điệu tiếng Trung.'},
      {speaker:'学习者',role:'Người học',zh:'对！我们一起加油吧。学语言就是要克服开口的心理障碍。',pinyin:'Duì！Wǒ men yī qǐ jiā yóu ba. Xué yǔ yán jiù shì yào kè fú kāi kǒu de xīn lǐ zhàng ài.',vi:'Đúng! Chúng ta cùng cố lên. Học ngôn ngữ là phải vượt qua rào cản tâm lý khi mở miệng nói.'},
    ]
  },
  {
    title:'Thành phố Hà Nội trong mắt người Trung', title_zh:'中国人眼中的河内',
    type:'passage', hsk_level:'HSK3', topic:'culture', difficulty:'medium', order_index:42,
    description:'Cái nhìn của người Trung Quốc về Hà Nội',
    lines:[
      {speaker:'',role:'',zh:'河内是越南的首都，也是一座有着悠久历史的城市。',pinyin:'Hé nèi shì Yuè nán de shǒu dū，yě shì yī zuò yǒu zhe yōu jiǔ lì shǐ de chéng shì.',vi:'Hà Nội là thủ đô của Việt Nam, cũng là thành phố có lịch sử lâu đời.'},
      {speaker:'',role:'',zh:'河内的街道错综复杂，摩托车如同潮水般涌动，让初来乍到的人眼花缭乱。',pinyin:'Hé nèi de jiē dào cuò zōng fù zá，mó tuō chē rú tóng cháo shuǐ bān yǒng dòng，ràng chū lái zhà dào de rén yǎn huā liáo luàn.',vi:'Đường phố Hà Nội chằng chịt, xe máy như sóng trào, khiến người mới đến hoa mắt.'},
      {speaker:'',role:'',zh:'越南菜非常丰富，河粉、春卷、法棍面包都很受欢迎。',pinyin:'Yuè nán cài fēi cháng fēng fù，hé fěn、chūn juǎn、fǎ gùn miàn bāo dōu hěn shòu huān yíng.',vi:'Ẩm thực Việt Nam rất phong phú, phở, chả giò, bánh mì đều được yêu thích.'},
      {speaker:'',role:'',zh:'越南语和汉语有很多相似之处，这让中国游客感到亲切。',pinyin:'Yuè nán yǔ hé Hàn yǔ yǒu hěn duō xiāng sì zhī chù，zhè ràng Zhōng guó yóu kè gǎn dào qīn qiè.',vi:'Tiếng Việt và tiếng Trung có nhiều điểm tương đồng, khiến du khách Trung Quốc cảm thấy gần gũi.'},
      {speaker:'',role:'',zh:'河内是一座值得多次探索的城市，每次来都有新发现。',pinyin:'Hé nèi shì yī zuò zhí dé duō cì tàn suǒ de chéng shì，měi cì lái dōu yǒu xīn fā xiàn.',vi:'Hà Nội là thành phố đáng để khám phá nhiều lần, mỗi lần đến đều có điều mới mẻ.'},
    ]
  },
  {
    title:'Tập thể dục và lối sống lành mạnh', title_zh:'运动与健康生活方式',
    type:'dialogue', hsk_level:'HSK3', topic:'health', difficulty:'medium', order_index:43,
    description:'Bàn về thói quen tập thể dục',
    lines:[
      {speaker:'A',role:'Lan',zh:'你平时怎么保持健康？',pinyin:'Nǐ píng shí zěn me bǎo chí jiàn kāng？',vi:'Thường ngày bạn giữ sức khoẻ thế nào?'},
      {speaker:'B',role:'Tuấn',zh:'我每天早上跑步，晚上做瑜伽。还有，我尽量少吃油腻的东西。',pinyin:'Wǒ měi tiān zǎo shàng pǎo bù，wǎn shàng zuò yú jiā. Hái yǒu，wǒ jǐn liàng shǎo chī yóu nì de dōng xi.',vi:'Tôi mỗi sáng chạy bộ, tối làm yoga. Ngoài ra, tôi hạn chế ăn đồ nhiều dầu mỡ.'},
      {speaker:'A',role:'Lan',zh:'这么自律！我总是懒得运动。',pinyin:'Zhè me zì lǜ！Wǒ zǒng shì lǎn de yùn dòng.',vi:'Tự giác vậy! Tôi lúc nào cũng lười tập thể dục.'},
      {speaker:'B',role:'Tuấn',zh:'开始确实很难，但养成习惯就容易了。你可以从每天走路三十分钟开始。',pinyin:'Kāi shǐ què shí hěn nán，dàn yǎng chéng xí guàn jiù róng yì le. Nǐ kě yǐ cóng měi tiān zǒu lù sān shí fēn zhōng kāi shǐ.',vi:'Ban đầu đúng là khó, nhưng khi thành thói quen thì dễ hơn. Bạn có thể bắt đầu bằng cách đi bộ ba mươi phút mỗi ngày.'},
      {speaker:'A',role:'Lan',zh:'这个我还能做到。需要注意饮食吗？',pinyin:'Zhè gè wǒ hái néng zuò dào. Xū yào zhù yì yǐn shí ma？',vi:'Cái này tôi còn làm được. Có cần chú ý ăn uống không?'},
      {speaker:'B',role:'Tuấn',zh:'当然，多吃蔬菜水果，少喝含糖饮料。睡眠也很重要，最好每天睡够八小时。',pinyin:'Dāng rán，duō chī shū cài shuǐ guǒ，shǎo hē hán táng yǐn liào. Shuì mián yě hěn zhòng yào，zuì hǎo měi tiān shuì gòu bā xiǎo shí.',vi:'Tất nhiên, ăn nhiều rau quả, ít uống nước có đường. Giấc ngủ cũng rất quan trọng, tốt nhất mỗi ngày ngủ đủ tám tiếng.'},
      {speaker:'A',role:'Lan',zh:'好，我要改变一下生活方式了。谢谢你的建议！',pinyin:'Hǎo，wǒ yào gǎi biàn yī xià shēng huó fāng shì le. Xiè xiè nǐ de jiàn yì！',vi:'Được, tôi sẽ thay đổi lối sống một chút. Cảm ơn lời khuyên của bạn!'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Vấn đề nhà ở và bất động sản', title_zh:'住房与房地产问题',
    type:'dialogue', hsk_level:'HSK4', topic:'economy', difficulty:'hard', order_index:44,
    description:'Thảo luận về thị trường bất động sản',
    lines:[
      {speaker:'A',role:'Bình',zh:'现在年轻人买不起房子，你怎么看这个问题？',pinyin:'Xiàn zài nián qīng rén mǎi bù qǐ fáng zi，nǐ zěn me kàn zhè gè wèn tí？',vi:'Bây giờ người trẻ không mua nổi nhà, bạn nhìn nhận vấn đề này thế nào?'},
      {speaker:'B',role:'Tuấn',zh:'这确实是个棘手的问题。房价过高，而年轻人的收入增长速度跟不上。',pinyin:'Zhè què shí shì gè jí shǒu de wèn tí. Fáng jià guò gāo，ér nián qīng rén de shōu rù zēng zhǎng sù dù gēn bù shàng.',vi:'Đây đúng là vấn đề hóc búa. Giá nhà quá cao, mà tốc độ tăng thu nhập của người trẻ không theo kịp.'},
      {speaker:'A',role:'Bình',zh:'你觉得政府应该怎么做？',pinyin:'Nǐ jué de zhèng fǔ yīng gāi zěn me zuò？',vi:'Bạn nghĩ chính phủ nên làm gì?'},
      {speaker:'B',role:'Tuấn',zh:'一方面要加大保障房建设，另一方面要通过税收政策抑制投机炒房。',pinyin:'Yī fāng miàn yào jiā dà bǎo zhàng fáng jiàn shè，lìng yī fāng miàn yào tōng guò shuì shōu zhèng cè yì zhì tóu jī chǎo fáng.',vi:'Một mặt cần tăng cường xây dựng nhà ở xã hội, mặt khác cần dùng chính sách thuế để kiềm chế đầu cơ bất động sản.'},
      {speaker:'A',role:'Bình',zh:'但也有人说，租房未必不好，关键是租房环境要改善。',pinyin:'Dàn yě yǒu rén shuō，zū fáng wèi bì bù hǎo，guān jiàn shì zū fáng huán jìng yào gǎi shàn.',vi:'Nhưng cũng có người nói thuê nhà chưa hẳn là không tốt, quan trọng là môi trường thuê nhà phải được cải thiện.'},
      {speaker:'B',role:'Tuấn',zh:'同意。欧洲很多年轻人选择长期租房，活得也很自在。关键是完善租房法律保障。',pinyin:'Tóng yì. Ōu zhōu hěn duō nián qīng rén xuǎn zé cháng qī zū fáng，huó de yě hěn zì zài. Guān jiàn shì wán shàn zū fáng fǎ lǜ bǎo zhàng.',vi:'Đồng ý. Nhiều người trẻ ở châu Âu chọn thuê nhà dài hạn mà vẫn sống thoải mái. Quan trọng là hoàn thiện bảo đảm pháp lý cho thuê nhà.'},
    ]
  },
  {
    title:'Bảo vệ di sản văn hoá', title_zh:'保护文化遗产',
    type:'passage', hsk_level:'HSK4', topic:'culture', difficulty:'hard', order_index:45,
    description:'Bài viết về bảo tồn di sản',
    lines:[
      {speaker:'',role:'',zh:'文化遗产是一个民族历史和智慧的结晶，是不可再生的宝贵资源。',pinyin:'Wén huà yí chǎn shì yī gè mín zú lì shǐ hé zhì huì de jié jīng，shì bù kě zài shēng de bǎo guì zī yuán.',vi:'Di sản văn hoá là tinh hoa của lịch sử và trí tuệ dân tộc, là nguồn tài nguyên quý giá không thể tái tạo.'},
      {speaker:'',role:'',zh:'然而，随着现代化进程加速，许多传统文化正面临消失的威胁。',pinyin:'Rán ér，suí zhe xiàn dài huà jìn chéng jiā sù，xǔ duō chuán tǒng wén huà zhèng miàn lín xiāo shī de wēi xié.',vi:'Tuy nhiên, khi hiện đại hoá diễn ra nhanh hơn, nhiều nền văn hoá truyền thống đang đối mặt với nguy cơ biến mất.'},
      {speaker:'',role:'',zh:'中国提出了"创造性转化、创新性发展"的理念，让传统文化在现代社会焕发活力。',pinyin:'Zhōng guó tí chū le "chuàng zào xìng zhuǎn huà、chuàng xīn xìng fā zhǎn" de lǐ niàn，ràng chuán tǒng wén huà zài xiàn dài shè huì huàn fā huó lì.',vi:'Trung Quốc đưa ra lý niệm "chuyển hoá sáng tạo, phát triển đổi mới" để làm cho văn hoá truyền thống bùng sáng trong xã hội hiện đại.'},
      {speaker:'',role:'',zh:'例如，故宫博物院通过文创产品和数字化展览，让年轻人重新爱上中国传统文化。',pinyin:'Lì rú，Gù gōng bó wù yuàn tōng guò wén chuàng chǎn pǐn hé shù zì huà zhǎn lǎn，ràng nián qīng rén chóng xīn ài shàng Zhōng guó chuán tǒng wén huà.',vi:'Ví dụ, Bảo tàng Cố Cung thông qua sản phẩm văn hoá sáng tạo và triển lãm kỹ thuật số đã khiến giới trẻ yêu lại văn hoá truyền thống Trung Quốc.'},
      {speaker:'',role:'',zh:'保护文化遗产，不是将其封存在博物馆，而是让它活在当下，影响未来。',pinyin:'Bǎo hù wén huà yí chǎn，bù shì jiāng qí fēng cún zài bó wù guǎn，ér shì ràng tā huó zài dāng xià，yǐng xiǎng wèi lái.',vi:'Bảo vệ di sản văn hoá không phải là niêm phong nó trong bảo tàng, mà là để nó sống trong hiện tại và ảnh hưởng đến tương lai.'},
    ]
  },
  {
    title:'Thảo luận về hạnh phúc', title_zh:'关于幸福的讨论',
    type:'dialogue', hsk_level:'HSK4', topic:'philosophy', difficulty:'hard', order_index:46,
    description:'Triết lý về hạnh phúc và ý nghĩa cuộc sống',
    lines:[
      {speaker:'A',role:'Minh',zh:'你觉得什么是幸福？',pinyin:'Nǐ jué de shén me shì xìng fú？',vi:'Bạn nghĩ hạnh phúc là gì?'},
      {speaker:'B',role:'Lan',zh:'这个问题很深刻。我觉得幸福不是拥有很多东西，而是内心的满足感。',pinyin:'Zhè gè wèn tí hěn shēn kè. Wǒ jué de xìng fú bù shì yōng yǒu hěn duō dōng xi，ér shì nèi xīn de mǎn zú gǎn.',vi:'Câu hỏi này rất sâu sắc. Tôi nghĩ hạnh phúc không phải là có nhiều thứ, mà là cảm giác thoả mãn trong lòng.'},
      {speaker:'A',role:'Minh',zh:'但是物质条件难道不重要吗？没有钱，生活会很艰难。',pinyin:'Dàn shì wù zhì tiáo jiàn nán dào bù zhòng yào ma？Méi yǒu qián，shēng huó huì hěn jiān nán.',vi:'Nhưng điều kiện vật chất không quan trọng sao? Không có tiền cuộc sống sẽ rất khó khăn.'},
      {speaker:'B',role:'Lan',zh:'物质是基础，没错。但研究表明，收入超过一定水平后，更多的钱并不能带来更多的幸福感。',pinyin:'Wù zhì shì jī chǔ，méi cuò. Dàn yán jiū biǎo míng，shōu rù chāo guò yī dìng shuǐ píng hòu，gèng duō de qián bìng bù néng dài lái gèng duō de xìng fú gǎn.',vi:'Vật chất là nền tảng, đúng vậy. Nhưng nghiên cứu cho thấy thu nhập vượt qua một mức nhất định thì nhiều tiền hơn cũng không mang lại thêm hạnh phúc.'},
      {speaker:'A',role:'Minh',zh:'那什么才能带来真正的幸福？',pinyin:'Nà shén me cái néng dài lái zhēn zhèng de xìng fú？',vi:'Vậy điều gì mới thực sự mang lại hạnh phúc?'},
      {speaker:'B',role:'Lan',zh:'良好的人际关系、有意义的工作、健康的身体，还有对自己生活的掌控感。这些比金钱更重要。',pinyin:'Liáng hǎo de rén jì guān xi、yǒu yì yì de gōng zuò、jiàn kāng de shēn tǐ，hái yǒu duì zì jǐ shēng huó de zhǎng kòng gǎn. Zhè xiē bǐ jīn qián gèng zhòng yào.',vi:'Mối quan hệ tốt đẹp, công việc có ý nghĩa, thân thể khoẻ mạnh, và cảm giác kiểm soát được cuộc sống của mình. Những thứ này quan trọng hơn tiền bạc.'},
      {speaker:'A',role:'Minh',zh:'说得有道理。幸福是一种选择，也是一种修炼。',pinyin:'Shuō de yǒu dào lǐ. Xìng fú shì yī zhǒng xuǎn zé，yě shì yī zhǒng xiū liàn.',vi:'Nói có lý lắm. Hạnh phúc là một sự lựa chọn, cũng là một sự tu luyện.'},
    ]
  },
  {
    title:'Kinh tế số và thanh toán điện tử', title_zh:'数字经济与移动支付',
    type:'passage', hsk_level:'HSK4', topic:'technology', difficulty:'hard', order_index:47,
    description:'Bài viết về kinh tế số Trung Quốc',
    lines:[
      {speaker:'',role:'',zh:'中国已经成为全球移动支付最发达的国家之一。',pinyin:'Zhōng guó yǐ jīng chéng wéi quán qiú yí dòng zhī fù zuì fā dá de guó jiā zhī yī.',vi:'Trung Quốc đã trở thành một trong những quốc gia phát triển thanh toán di động nhất thế giới.'},
      {speaker:'',role:'',zh:'支付宝和微信支付几乎覆盖了所有消费场景，连街头小摊也接受扫码支付。',pinyin:'Zhī fù bǎo hé Wēi xìn zhī fù jī hū fù gài le suǒ yǒu xiāo fèi chǎng jǐng，lián jiē tóu xiǎo tān yě jiē shòu sǎo mǎ zhī fù.',vi:'Alipay và WeChat Pay gần như bao phủ mọi tình huống tiêu dùng, ngay cả các quán vỉa hè cũng nhận quét mã thanh toán.'},
      {speaker:'',role:'',zh:'数字经济不仅改变了人们的支付方式，也催生了新的商业模式，如直播电商、共享经济等。',pinyin:'Shù zì jīng jì bù jǐn gǎi biàn le rén men de zhī fù fāng shì，yě cuī shēng le xīn de shāng yè mó shì，rú zhí bō diàn shāng、gòng xiǎng jīng jì děng.',vi:'Kinh tế số không chỉ thay đổi cách thanh toán của mọi người, mà còn tạo ra các mô hình kinh doanh mới như thương mại điện tử livestream, kinh tế chia sẻ...'},
      {speaker:'',role:'',zh:'然而，数字化也带来了数据安全和个人隐私保护的挑战，需要完善法律法规。',pinyin:'Rán ér，shù zì huà yě dài lái le shù jù ān quán hé gè rén yǐn sī bǎo hù de tiǎo zhàn，xū yào wán shàn fǎ lǜ fǎ guī.',vi:'Tuy nhiên, số hoá cũng đem lại thách thức về bảo mật dữ liệu và bảo vệ quyền riêng tư cá nhân, cần hoàn thiện pháp luật.'},
      {speaker:'',role:'',zh:'未来，随着区块链和数字货币的发展，支付方式将继续革新，深刻影响社会经济生活。',pinyin:'Wèi lái，suí zhe qū kuài liàn hé shù zì huò bì de fā zhǎn，zhī fù fāng shì jiāng jì xù gé xīn，shēn kè yǐng xiǎng shè huì jīng jì shēng huó.',vi:'Trong tương lai, cùng với sự phát triển của blockchain và tiền tệ kỹ thuật số, phương thức thanh toán sẽ tiếp tục đổi mới, ảnh hưởng sâu sắc đến đời sống kinh tế xã hội.'},
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
    const [byLevel] = await conn.query(`SELECT hsk_level,type,COUNT(*) c FROM dialogues WHERE is_active=1 GROUP BY hsk_level,type ORDER BY hsk_level,type`);
    console.log(`\n✅ Batch 3 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})`);
    console.log('\n📊 Phân bổ:');
    byLevel.forEach(r => console.log(`   ${r.hsk_level} ${r.type}: ${r.c} bài`));
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
