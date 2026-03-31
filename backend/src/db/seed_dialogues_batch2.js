// seed_dialogues_batch2.js — Thêm nhiều hội thoại & đoạn văn song ngữ
require('dotenv').config();
const pool = require('./connection');

const dialogues = [
  // ══════════════════ HSK1 ══════════════════
  {
    title:'Thời tiết hôm nay', title_zh:'今天天气怎么样',
    type:'dialogue', hsk_level:'HSK1', topic:'weather', difficulty:'easy', order_index:16,
    description:'Nói chuyện về thời tiết',
    lines:[
      {speaker:'A',role:'Linh',zh:'今天天气怎么样？',pinyin:'Jīn tiān tiān qì zěn me yàng？',vi:'Hôm nay thời tiết thế nào?'},
      {speaker:'B',role:'Nam',zh:'今天很热。',pinyin:'Jīn tiān hěn rè.',vi:'Hôm nay rất nóng.'},
      {speaker:'A',role:'Linh',zh:'明天呢？',pinyin:'Míng tiān ne？',vi:'Còn ngày mai?'},
      {speaker:'B',role:'Nam',zh:'明天下雨。',pinyin:'Míng tiān xià yǔ.',vi:'Ngày mai trời mưa.'},
      {speaker:'A',role:'Linh',zh:'要带雨伞吗？',pinyin:'Yào dài yǔ sǎn ma？',vi:'Có cần mang ô không?'},
      {speaker:'B',role:'Nam',zh:'要，最好带一把。',pinyin:'Yào，zuì hǎo dài yī bǎ.',vi:'Cần, tốt nhất nên mang một cái.'},
    ]
  },
  {
    title:'Đi siêu thị', title_zh:'去超市买东西',
    type:'dialogue', hsk_level:'HSK1', topic:'shopping', difficulty:'easy', order_index:17,
    description:'Mua đồ ở siêu thị',
    lines:[
      {speaker:'妈妈',role:'Mẹ',zh:'我们去超市买东西。',pinyin:'Wǒ men qù chāo shì mǎi dōng xi.',vi:'Chúng ta đi siêu thị mua đồ.'},
      {speaker:'孩子',role:'Con',zh:'好的！我想要苹果。',pinyin:'Hǎo de！Wǒ xiǎng yào píng guǒ.',vi:'Được! Con muốn táo.'},
      {speaker:'妈妈',role:'Mẹ',zh:'还要什么？',pinyin:'Hái yào shén me？',vi:'Còn muốn gì nữa không?'},
      {speaker:'孩子',role:'Con',zh:'我想要橙汁。',pinyin:'Wǒ xiǎng yào chéng zhī.',vi:'Con muốn nước cam.'},
      {speaker:'妈妈',role:'Mẹ',zh:'好，我们走吧。',pinyin:'Hǎo，wǒ men zǒu ba.',vi:'Được, chúng ta đi thôi.'},
      {speaker:'孩子',role:'Con',zh:'妈妈，我爱你！',pinyin:'Mā ma，wǒ ài nǐ！',vi:'Mẹ ơi, con yêu mẹ!'},
      {speaker:'妈妈',role:'Mẹ',zh:'我也爱你，宝贝！',pinyin:'Wǒ yě ài nǐ，bǎo bèi！',vi:'Mẹ cũng yêu con, bé cưng!'},
    ]
  },
  {
    title:'Giới thiệu sở thích', title_zh:'介绍爱好',
    type:'dialogue', hsk_level:'HSK1', topic:'hobbies', difficulty:'easy', order_index:18,
    description:'Nói về sở thích cá nhân',
    lines:[
      {speaker:'A',role:'Tuấn',zh:'你喜欢什么？',pinyin:'Nǐ xǐ huān shén me？',vi:'Bạn thích gì?'},
      {speaker:'B',role:'Mai',zh:'我喜欢唱歌。你呢？',pinyin:'Wǒ xǐ huān chàng gē. Nǐ ne？',vi:'Tôi thích hát. Còn bạn?'},
      {speaker:'A',role:'Tuấn',zh:'我喜欢踢足球。',pinyin:'Wǒ xǐ huān tī zú qiú.',vi:'Tôi thích đá bóng.'},
      {speaker:'B',role:'Mai',zh:'你每天踢吗？',pinyin:'Nǐ měi tiān tī ma？',vi:'Bạn đá mỗi ngày không?'},
      {speaker:'A',role:'Tuấn',zh:'不，周末踢。你唱歌唱得好吗？',pinyin:'Bù，zhōu mò tī. Nǐ chàng gē chàng de hǎo ma？',vi:'Không, cuối tuần mới đá. Bạn hát có hay không?'},
      {speaker:'B',role:'Mai',zh:'还好。你想听我唱吗？',pinyin:'Hái hǎo. Nǐ xiǎng tīng wǒ chàng ma？',vi:'Cũng được. Bạn có muốn nghe tôi hát không?'},
      {speaker:'A',role:'Tuấn',zh:'当然想！',pinyin:'Dāng rán xiǎng！',vi:'Tất nhiên muốn!'},
    ]
  },
  {
    title:'Con số và tuổi tác', title_zh:'数字和年龄',
    type:'passage', hsk_level:'HSK1', topic:'numbers', difficulty:'easy', order_index:19,
    description:'Đoạn văn về số và tuổi',
    lines:[
      {speaker:'',role:'',zh:'我今年二十岁。',pinyin:'Wǒ jīn nián èr shí suì.',vi:'Năm nay tôi hai mươi tuổi.'},
      {speaker:'',role:'',zh:'我的电话号码是一三八零零一二三四五六。',pinyin:'Wǒ de diàn huà hào mǎ shì yī sān bā líng líng yī èr sān sì wǔ liù.',vi:'Số điện thoại của tôi là 138-0001-2345-6.'},
      {speaker:'',role:'',zh:'我家有五口人，爸爸、妈妈、哥哥、妹妹和我。',pinyin:'Wǒ jiā yǒu wǔ kǒu rén，bà ba、mā ma、gē ge、mèi mei hé wǒ.',vi:'Nhà tôi có năm người: bố, mẹ, anh trai, em gái và tôi.'},
      {speaker:'',role:'',zh:'爸爸四十八岁，妈妈四十五岁。',pinyin:'Bà ba sì shí bā suì，mā ma sì shí wǔ suì.',vi:'Bố bốn mươi tám tuổi, mẹ bốn mươi lăm tuổi.'},
      {speaker:'',role:'',zh:'哥哥二十三岁，妹妹十五岁。',pinyin:'Gē ge èr shí sān suì，mèi mei shí wǔ suì.',vi:'Anh trai hai mươi ba tuổi, em gái mười lăm tuổi.'},
    ]
  },

  // ══════════════════ HSK2 ══════════════════
  {
    title:'Đặt bàn nhà hàng qua điện thoại', title_zh:'打电话预订餐厅',
    type:'dialogue', hsk_level:'HSK2', topic:'restaurant', difficulty:'easy', order_index:20,
    description:'Gọi điện đặt bàn',
    lines:[
      {speaker:'顾客',role:'Khách',zh:'你好，我想预订今晚的位子。',pinyin:'Nǐ hǎo，wǒ xiǎng yù dìng jīn wǎn de wèi zi.',vi:'Xin chào, tôi muốn đặt bàn tối nay.'},
      {speaker:'餐厅',role:'Nhà hàng',zh:'好的，请问几位？',pinyin:'Hǎo de，qǐng wèn jǐ wèi？',vi:'Được, xin hỏi bao nhiêu người?'},
      {speaker:'顾客',role:'Khách',zh:'四个人。晚上七点可以吗？',pinyin:'Sì gè rén. Wǎn shàng qī diǎn kě yǐ ma？',vi:'Bốn người. Bảy giờ tối được không?'},
      {speaker:'餐厅',role:'Nhà hàng',zh:'可以，请问贵姓？',pinyin:'Kě yǐ，qǐng wèn guì xìng？',vi:'Được, xin hỏi tên quý khách?'},
      {speaker:'顾客',role:'Khách',zh:'我姓阮，叫阮明。',pinyin:'Wǒ xìng Ruǎn，jiào Ruǎn Míng.',vi:'Tôi họ Nguyễn, tên Nguyễn Minh.'},
      {speaker:'餐厅',role:'Nhà hàng',zh:'好的，阮先生。今晚七点，四位，已经为您预订好了。',pinyin:'Hǎo de，Ruǎn xiān sheng. Jīn wǎn qī diǎn，sì wèi，yǐ jīng wèi nín yù dìng hǎo le.',vi:'Được rồi, anh Nguyễn. Tối nay bảy giờ, bốn người, đã đặt xong cho anh.'},
      {speaker:'顾客',role:'Khách',zh:'太好了，谢谢！',pinyin:'Tài hǎo le，xiè xiè！',vi:'Tuyệt quá, cảm ơn!'},
    ]
  },
  {
    title:'Học cùng nhau', title_zh:'一起学习',
    type:'dialogue', hsk_level:'HSK2', topic:'school', difficulty:'easy', order_index:21,
    description:'Hai bạn học cùng nhau',
    lines:[
      {speaker:'小红',role:'Tiểu Hồng',zh:'你在学什么？',pinyin:'Nǐ zài xué shén me？',vi:'Bạn đang học gì vậy?'},
      {speaker:'小明',role:'Tiểu Minh',zh:'我在学汉语。汉语很难。',pinyin:'Wǒ zài xué Hàn yǔ. Hàn yǔ hěn nán.',vi:'Tôi đang học tiếng Trung. Tiếng Trung rất khó.'},
      {speaker:'小红',role:'Tiểu Hồng',zh:'哪里难？语法还是发音？',pinyin:'Nǎ lǐ nán？Yǔ fǎ hái shì fā yīn？',vi:'Khó ở đâu? Ngữ pháp hay phát âm?'},
      {speaker:'小明',role:'Tiểu Minh',zh:'声调最难，四个声调我总是搞错。',pinyin:'Shēng diào zuì nán，sì gè shēng diào wǒ zǒng shì gǎo cuò.',vi:'Thanh điệu khó nhất, bốn thanh điệu tôi hay nhầm hoài.'},
      {speaker:'小红',role:'Tiểu Hồng',zh:'没关系，我能帮你。我的汉语比较好。',pinyin:'Méi guān xi，wǒ néng bāng nǐ. Wǒ de Hàn yǔ bǐ jiào hǎo.',vi:'Không sao, tôi có thể giúp bạn. Tiếng Trung của tôi khá tốt.'},
      {speaker:'小明',role:'Tiểu Minh',zh:'真的吗？太好了！我们一起学吧。',pinyin:'Zhēn de ma？Tài hǎo le！Wǒ men yī qǐ xué ba.',vi:'Thật không? Tuyệt quá! Chúng ta cùng học nhé.'},
      {speaker:'小红',role:'Tiểu Hồng',zh:'好，从明天开始，每天一小时。',pinyin:'Hǎo，cóng míng tiān kāi shǐ，měi tiān yī xiǎo shí.',vi:'Được, bắt đầu từ ngày mai, mỗi ngày một tiếng.'},
    ]
  },
  {
    title:'Khám phá ẩm thực Trung Hoa', title_zh:'探索中国美食',
    type:'passage', hsk_level:'HSK2', topic:'food', difficulty:'medium', order_index:22,
    description:'Đoạn văn về các món ăn Trung Quốc',
    lines:[
      {speaker:'',role:'',zh:'中国的饮食文化非常丰富，每个地方都有自己的特色菜。',pinyin:'Zhōng guó de yǐn shí wén huà fēi cháng fēng fù，měi gè dì fāng dōu yǒu zì jǐ de tè sè cài.',vi:'Văn hoá ẩm thực Trung Quốc rất phong phú, mỗi nơi đều có món đặc sản riêng.'},
      {speaker:'',role:'',zh:'北京的烤鸭、上海的小笼包、四川的麻婆豆腐都很有名。',pinyin:'Běi jīng de kǎo yā、Shàng hǎi de xiǎo lóng bāo、Sì chuān de má pó dòu fu dōu hěn yǒu míng.',vi:'Vịt quay Bắc Kinh, bánh bao nhỏ Thượng Hải, đậu hũ Ma Bà Tứ Xuyên đều nổi tiếng.'},
      {speaker:'',role:'',zh:'北方人喜欢吃面条和馒头，南方人更喜欢吃米饭。',pinyin:'Běi fāng rén xǐ huān chī miàn tiáo hé mán tou，nán fāng rén gèng xǐ huān chī mǐ fàn.',vi:'Người phía Bắc thích ăn mì và bánh bao hấp, người phía Nam thích ăn cơm hơn.'},
      {speaker:'',role:'',zh:'中国人吃饭用筷子，这是从古代流传下来的习惯。',pinyin:'Zhōng guó rén chī fàn yòng kuài zi，zhè shì cóng gǔ dài liú chuán xià lái de xí guàn.',vi:'Người Trung Quốc ăn bằng đũa, đây là thói quen được lưu truyền từ thời cổ đại.'},
      {speaker:'',role:'',zh:'如果你来中国，一定要多尝试不同地方的美食！',pinyin:'Rú guǒ nǐ lái Zhōng guó，yī dìng yào duō cháng shì bù tóng dì fāng de měi shí！',vi:'Nếu bạn đến Trung Quốc, nhất định phải thử nhiều món ăn của các vùng khác nhau!'},
    ]
  },
  {
    title:'Thuê nhà', title_zh:'租房子',
    type:'dialogue', hsk_level:'HSK2', topic:'housing', difficulty:'medium', order_index:23,
    description:'Hỏi thuê căn hộ',
    lines:[
      {speaker:'租客',role:'Người thuê',zh:'请问这套房子还租吗？',pinyin:'Qǐng wèn zhè tào fáng zi hái zū ma？',vi:'Cho hỏi căn nhà này còn cho thuê không?'},
      {speaker:'房东',role:'Chủ nhà',zh:'还租，你有兴趣吗？',pinyin:'Hái zū，nǐ yǒu xìng qù ma？',vi:'Còn cho thuê, bạn có quan tâm không?'},
      {speaker:'租客',role:'Người thuê',zh:'有。请问多少钱一个月？',pinyin:'Yǒu. Qǐng wèn duō shǎo qián yī gè yuè？',vi:'Có. Cho hỏi một tháng bao nhiêu tiền?'},
      {speaker:'房东',role:'Chủ nhà',zh:'三千块一个月，包含水电费。',pinyin:'Sān qiān kuài yī gè yuè，bāo hán shuǐ diàn fèi.',vi:'Ba nghìn tệ một tháng, bao gồm tiền điện nước.'},
      {speaker:'租客',role:'Người thuê',zh:'可以看看房间吗？',pinyin:'Kě yǐ kàn kàn fáng jiān ma？',vi:'Có thể xem phòng được không?'},
      {speaker:'房东',role:'Chủ nhà',zh:'当然可以，请进！有两间卧室，一个厨房，一个卫生间。',pinyin:'Dāng rán kě yǐ，qǐng jìn！Yǒu liǎng jiān wò shì，yī gè chú fáng，yī gè wèi shēng jiān.',vi:'Tất nhiên được, mời vào! Có hai phòng ngủ, một bếp, một nhà vệ sinh.'},
      {speaker:'租客',role:'Người thuê',zh:'很好。我什么时候可以搬进来？',pinyin:'Hěn hǎo. Wǒ shén me shí hòu kě yǐ bān jìn lái？',vi:'Rất tốt. Tôi có thể dọn vào lúc nào?'},
      {speaker:'房东',role:'Chủ nhà',zh:'下周就可以。先付一个月押金，可以吗？',pinyin:'Xià zhōu jiù kě yǐ. Xiān fù yī gè yuè yā jīn，kě yǐ ma？',vi:'Tuần tới là được. Đặt cọc một tháng trước, được không?'},
    ]
  },
  {
    title:'Du lịch Thượng Hải', title_zh:'游览上海',
    type:'passage', hsk_level:'HSK2', topic:'travel', difficulty:'medium', order_index:24,
    description:'Giới thiệu về Thượng Hải',
    lines:[
      {speaker:'',role:'',zh:'上海是中国最大的城市，也是经济中心。',pinyin:'Shàng hǎi shì Zhōng guó zuì dà de chéng shì，yě shì jīng jì zhōng xīn.',vi:'Thượng Hải là thành phố lớn nhất Trung Quốc, cũng là trung tâm kinh tế.'},
      {speaker:'',role:'',zh:'外滩是上海最著名的景点，可以看到美丽的黄浦江风景。',pinyin:'Wài tān shì Shàng hǎi zuì zhù míng de jǐng diǎn，kě yǐ kàn dào měi lì de Huáng pǔ jiāng fēng jǐng.',vi:'Thượng Hải Bund là điểm tham quan nổi tiếng nhất Thượng Hải, có thể ngắm cảnh sông Hoàng Phố đẹp.'},
      {speaker:'',role:'',zh:'豫园是一座有四百多年历史的古典园林，值得一游。',pinyin:'Yù yuán shì yī zuò yǒu sì bǎi duō nián lì shǐ de gǔ diǎn yuán lín，zhí dé yī yóu.',vi:'Vườn Dự Viên là khu vườn cổ điển có hơn bốn trăm năm lịch sử, đáng để tham quan.'},
      {speaker:'',role:'',zh:'上海的地铁非常发达，坐地铁去哪儿都很方便。',pinyin:'Shàng hǎi de dì tiě fēi cháng fā dá，zuò dì tiě qù nǎ ér dōu hěn fāng biàn.',vi:'Tàu điện ngầm Thượng Hải rất phát triển, đi tàu điện ngầm đến đâu cũng thuận tiện.'},
      {speaker:'',role:'',zh:'小笼包是上海最有名的小吃，一定要品尝。',pinyin:'Xiǎo lóng bāo shì Shàng hǎi zuì yǒu míng de xiǎo chī，yī dìng yào pǐn cháng.',vi:'Bánh bao nhỏ là món ăn đường phố nổi tiếng nhất Thượng Hải, nhất định phải thử.'},
    ]
  },

  // ══════════════════ HSK3 ══════════════════
  {
    title:'Chia sẻ kế hoạch tương lai', title_zh:'分享未来计划',
    type:'dialogue', hsk_level:'HSK3', topic:'future', difficulty:'medium', order_index:25,
    description:'Hai bạn chia sẻ về dự định',
    lines:[
      {speaker:'A',role:'Hùng',zh:'你毕业后想做什么？',pinyin:'Nǐ bì yè hòu xiǎng zuò shén me？',vi:'Sau khi tốt nghiệp bạn muốn làm gì?'},
      {speaker:'B',role:'Lan',zh:'我想去中国工作，用汉语做生意。你呢？',pinyin:'Wǒ xiǎng qù Zhōng guó gōng zuò，yòng Hàn yǔ zuò shēng yi. Nǐ ne？',vi:'Tôi muốn đến Trung Quốc làm việc, dùng tiếng Trung để kinh doanh. Còn bạn?'},
      {speaker:'A',role:'Hùng',zh:'我想在越南开一家中餐馆。',pinyin:'Wǒ xiǎng zài Yuè nán kāi yī jiā Zhōng cān guǎn.',vi:'Tôi muốn mở một quán cơm Trung Quốc ở Việt Nam.'},
      {speaker:'B',role:'Lan',zh:'好主意！现在越南人很喜欢中国菜。',pinyin:'Hǎo zhǔ yi！Xiàn zài Yuè nán rén hěn xǐ huān Zhōng guó cài.',vi:'Ý hay đấy! Bây giờ người Việt rất thích đồ ăn Trung Quốc.'},
      {speaker:'A',role:'Hùng',zh:'是的，而且会说汉语的话，可以吸引更多中国游客。',pinyin:'Shì de，ér qiě huì shuō Hàn yǔ de huà，kě yǐ xī yǐn gèng duō Zhōng guó yóu kè.',vi:'Đúng vậy, với lại nếu biết nói tiếng Trung thì có thể thu hút nhiều khách du lịch Trung Quốc hơn.'},
      {speaker:'B',role:'Lan',zh:'那我们努力学习，共同实现各自的梦想！',pinyin:'Nà wǒ men nǔ lì xué xí，gòng tóng shí xiàn gè zì de mèng xiǎng！',vi:'Vậy chúng ta cùng chăm chỉ học tập, cùng nhau thực hiện ước mơ của mình!'},
    ]
  },
  {
    title:'Đặt phòng khách sạn', title_zh:'预订酒店',
    type:'dialogue', hsk_level:'HSK3', topic:'travel', difficulty:'medium', order_index:26,
    description:'Check-in và đặt phòng khách sạn',
    lines:[
      {speaker:'前台',role:'Lễ tân',zh:'您好，欢迎光临！请问需要什么帮助？',pinyin:'Nín hǎo，huān yíng guāng lín！Qǐng wèn xū yào shén me bāng zhù？',vi:'Xin chào, hân hạnh được phục vụ! Xin hỏi cần giúp gì ạ?'},
      {speaker:'客人',role:'Khách',zh:'我预订了一间双人间，名字是李华。',pinyin:'Wǒ yù dìng le yī jiān shuāng rén jiān，míng zi shì Lǐ Huá.',vi:'Tôi đã đặt một phòng đôi, tên là Lý Hoa.'},
      {speaker:'前台',role:'Lễ tân',zh:'请稍等……是的，三一八号房间，住三晚，对吗？',pinyin:'Qǐng shāo děng……Shì de，sān yī bā hào fáng jiān，zhù sān wǎn，duì ma？',vi:'Xin chờ một chút... Đúng rồi, phòng số 318, ở ba đêm, phải không ạ?'},
      {speaker:'客人',role:'Khách',zh:'对，请问房间有Wi-Fi吗？',pinyin:'Duì，qǐng wèn fáng jiān yǒu Wi-Fi ma？',vi:'Đúng rồi, xin hỏi phòng có Wi-Fi không?'},
      {speaker:'前台',role:'Lễ tân',zh:'有的，密码在房卡上。早餐是七点到十点，在一楼餐厅。',pinyin:'Yǒu de，mì mǎ zài fáng kǎ shàng. Zǎo cān shì qī diǎn dào shí diǎn，zài yī lóu cān tīng.',vi:'Có ạ, mật khẩu ghi trên thẻ phòng. Bữa sáng từ bảy đến mười giờ, tại nhà hàng tầng một.'},
      {speaker:'客人',role:'Khách',zh:'好的，谢谢。还有，几点退房？',pinyin:'Hǎo de，xiè xiè. Hái yǒu，jǐ diǎn tuì fáng？',vi:'Được rồi, cảm ơn. À, mấy giờ trả phòng?'},
      {speaker:'前台',role:'Lễ tân',zh:'中午十二点退房。祝您住宿愉快！',pinyin:'Zhōng wǔ shí èr diǎn tuì fáng. Zhù nín zhù sù yú kuài！',vi:'Trưa mười hai giờ trả phòng. Chúc quý khách có kỳ nghỉ vui vẻ!'},
    ]
  },
  {
    title:'Văn hoá trà Trung Quốc', title_zh:'中国茶文化',
    type:'passage', hsk_level:'HSK3', topic:'culture', difficulty:'medium', order_index:27,
    description:'Giới thiệu về văn hoá uống trà',
    lines:[
      {speaker:'',role:'',zh:'茶是中国最重要的传统饮料，已有几千年的历史。',pinyin:'Chá shì Zhōng guó zuì zhòng yào de chuán tǒng yǐn liào，yǐ yǒu jǐ qiān nián de lì shǐ.',vi:'Trà là thức uống truyền thống quan trọng nhất của Trung Quốc, đã có hàng nghìn năm lịch sử.'},
      {speaker:'',role:'',zh:'中国有很多种茶，如绿茶、红茶、乌龙茶和普洱茶。',pinyin:'Zhōng guó yǒu hěn duō zhǒng chá，rú lǜ chá、hóng chá、wū lóng chá hé pǔ ěr chá.',vi:'Trung Quốc có nhiều loại trà như trà xanh, trà đen, trà ô long và trà phổ nhĩ.'},
      {speaker:'',role:'',zh:'喝茶不只是解渴，更是一种生活艺术和社交方式。',pinyin:'Hē chá bù zhǐ shì jiě kě，gèng shì yī zhǒng shēng huó yì shù hé shè jiāo fāng shì.',vi:'Uống trà không chỉ để giải khát, mà còn là một nghệ thuật sống và cách giao tiếp xã hội.'},
      {speaker:'',role:'',zh:'茶道强调"静、雅、和"，饮茶时要保持平静的心情。',pinyin:'Chá dào qiáng diào "jìng、yǎ、hé"，yǐn chá shí yào bǎo chí píng jìng de xīn qíng.',vi:'Trà đạo nhấn mạnh "tĩnh, nhã, hoà", khi uống trà cần giữ tâm trạng bình tĩnh.'},
      {speaker:'',role:'',zh:'在中国，给长辈倒茶是一种传统礼节，表示尊重。',pinyin:'Zài Zhōng guó，gěi zhǎng bèi dào chá shì yī zhǒng chuán tǒng lǐ jié，biǎo shì zūn zhòng.',vi:'Ở Trung Quốc, rót trà cho bề trên là một nghi lễ truyền thống, thể hiện sự tôn trọng.'},
      {speaker:'',role:'',zh:'了解茶文化，有助于更深入地理解中国社会和人际关系。',pinyin:'Liǎo jiě chá wén huà，yǒu zhù yú gèng shēn rù de lǐ jiě Zhōng guó shè huì hé rén jì guān xi.',vi:'Hiểu văn hoá trà giúp hiểu sâu hơn về xã hội và quan hệ giữa người với người của Trung Quốc.'},
    ]
  },
  {
    title:'Tranh luận về mạng xã hội', title_zh:'关于社交媒体的讨论',
    type:'dialogue', hsk_level:'HSK3', topic:'technology', difficulty:'hard', order_index:28,
    description:'Hai bạn tranh luận về ưu nhược mạng xã hội',
    lines:[
      {speaker:'阿强',role:'A Cường',zh:'你觉得社交媒体对年轻人有什么影响？',pinyin:'Nǐ jué de shè jiāo méi tǐ duì nián qīng rén yǒu shén me yǐng xiǎng？',vi:'Bạn nghĩ mạng xã hội ảnh hưởng thế nào đến người trẻ?'},
      {speaker:'小丽',role:'Tiểu Lệ',zh:'我认为有好有坏。好处是能快速获取信息，联系朋友。',pinyin:'Wǒ rèn wéi yǒu hǎo yǒu huài. Hǎo chù shì néng kuài sù huò qǔ xìn xī，lián xi péng you.',vi:'Tôi nghĩ có cả tốt lẫn xấu. Điểm tốt là có thể nhanh chóng tiếp cận thông tin, liên lạc bạn bè.'},
      {speaker:'阿强',role:'A Cường',zh:'坏处呢？我觉得很多人玩手机上瘾了。',pinyin:'Huài chù ne？Wǒ jué de hěn duō rén wán shǒu jī shàng yǐn le.',vi:'Còn điểm xấu? Tôi thấy nhiều người nghiện điện thoại rồi.'},
      {speaker:'小丽',role:'Tiểu Lệ',zh:'对，还有网络暴力和虚假信息的问题。',pinyin:'Duì，hái yǒu wǎng luò bào lì hé xū jiǎ xìn xī de wèn tí.',vi:'Đúng, còn vấn đề bạo lực mạng và thông tin sai lệch nữa.'},
      {speaker:'阿强',role:'A Cường',zh:'所以家长需要引导孩子合理使用社交媒体。',pinyin:'Suǒ yǐ jiā zhǎng xū yào yǐn dǎo hái zi hé lǐ shǐ yòng shè jiāo méi tǐ.',vi:'Vì vậy cha mẹ cần hướng dẫn con cái sử dụng mạng xã hội hợp lý.'},
      {speaker:'小丽',role:'Tiểu Lệ',zh:'同意。关键是自律，什么都要有节制。',pinyin:'Tóng yì. Guān jiàn shì zì lǜ，shén me dōu yào yǒu jié zhì.',vi:'Đồng ý. Điều quan trọng là tự giác, cái gì cũng cần có chừng mực.'},
    ]
  },

  // ══════════════════ HSK4 ══════════════════
  {
    title:'Thảo luận về giáo dục', title_zh:'教育方式的讨论',
    type:'dialogue', hsk_level:'HSK4', topic:'education', difficulty:'hard', order_index:29,
    description:'Phụ huynh và giáo viên thảo luận về phương pháp giáo dục',
    lines:[
      {speaker:'家长',role:'Phụ huynh',zh:'老师，我担心孩子学习压力太大，成绩虽然好，但不快乐。',pinyin:'Lǎo shī，wǒ dān xīn hái zi xué xí yā lì tài dà，chéng jì suī rán hǎo，dàn bù kuài lè.',vi:'Thầy ơi, tôi lo con chịu áp lực học tập quá lớn, thành tích tuy tốt nhưng không vui.'},
      {speaker:'老师',role:'Giáo viên',zh:'您说得很有道理。现在的教育确实容易走入唯成绩论的误区。',pinyin:'Nín shuō de hěn yǒu dào lǐ. Xiàn zài de jiào yù què shí róng yì zǒu rù wéi chéng jì lùn de wù qū.',vi:'Bạn nói rất có lý. Giáo dục hiện nay đúng là dễ rơi vào cạm bẫy chỉ coi trọng thành tích.'},
      {speaker:'家长',role:'Phụ huynh',zh:'我希望孩子能全面发展，不只是学习，还有兴趣爱好。',pinyin:'Wǒ xī wàng hái zi néng quán miàn fā zhǎn，bù zhǐ shì xué xí，hái yǒu xìng qù ài hào.',vi:'Tôi muốn con phát triển toàn diện, không chỉ học tập mà còn cả sở thích.'},
      {speaker:'老师',role:'Giáo viên',zh:'完全支持。我们在学校也在努力推行素质教育，鼓励学生参加各种活动。',pinyin:'Wán quán zhī chí. Wǒ men zài xué xiào yě zài nǔ lì tuī xíng sù zhì jiào yù，gǔ lì xué shēng cān jiā gè zhǒng huó dòng.',vi:'Hoàn toàn ủng hộ. Chúng tôi ở trường cũng đang nỗ lực thúc đẩy giáo dục toàn diện, khuyến khích học sinh tham gia nhiều hoạt động.'},
      {speaker:'家长',role:'Phụ huynh',zh:'很好。我也会在家里减少对成绩的过度关注，多陪孩子做他喜欢的事。',pinyin:'Hěn hǎo. Wǒ yě huì zài jiā lǐ jiǎn shǎo duì chéng jì de guò dù guān zhù，duō péi hái zi zuò tā xǐ huān de shì.',vi:'Tốt quá. Ở nhà tôi cũng sẽ bớt quá quan tâm đến thành tích, dành thêm thời gian cùng con làm những việc nó thích.'},
      {speaker:'老师',role:'Giáo viên',zh:'家校合作是最好的教育方式。我们共同努力，孩子一定会健康成长的。',pinyin:'Jiā xiào hé zuò shì zuì hǎo de jiào yù fāng shì. Wǒ men gòng tóng nǔ lì，hái zi yī dìng huì jiàn kāng chéng zhǎng de.',vi:'Gia đình-trường học phối hợp là phương thức giáo dục tốt nhất. Chúng ta cùng cố gắng, trẻ nhất định sẽ phát triển lành mạnh.'},
    ]
  },
  {
    title:'Khởi nghiệp và thách thức', title_zh:'创业路上的挑战',
    type:'dialogue', hsk_level:'HSK4', topic:'business', difficulty:'hard', order_index:30,
    description:'Người khởi nghiệp chia sẻ kinh nghiệm',
    lines:[
      {speaker:'采访者',role:'Phóng viên',zh:'请问您当初为什么决定创业？',pinyin:'Qǐng wèn nín dāng chū wèi shén me jué dìng chuàng yè？',vi:'Xin hỏi ban đầu vì sao bạn quyết định khởi nghiệp?'},
      {speaker:'创业者',role:'Doanh nhân',zh:'我在传统企业工作了五年，觉得体制内很难实现自己的想法，所以决定出来闯一闯。',pinyin:'Wǒ zài chuán tǒng qǐ yè gōng zuò le wǔ nián，jué de tǐ zhì nèi hěn nán shí xiàn zì jǐ de xiǎng fǎ，suǒ yǐ jué dìng chū lái chuǎng yī chuǎng.',vi:'Tôi làm ở doanh nghiệp truyền thống năm năm, thấy trong hệ thống rất khó thực hiện ý tưởng của mình, nên quyết định ra ngoài thử sức.'},
      {speaker:'采访者',role:'Phóng viên',zh:'创业最大的挑战是什么？',pinyin:'Chuàng yè zuì dà de tiǎo zhàn shì shén me？',vi:'Thách thức lớn nhất khi khởi nghiệp là gì?'},
      {speaker:'创业者',role:'Doanh nhân',zh:'最难的是资金和人才。刚开始没有钱，只能先用自己的积蓄，同时要找志同道合的伙伴。',pinyin:'Zuì nán de shì zī jīn hé rén cái. Gāng kāi shǐ méi yǒu qián，zhǐ néng xiān yòng zì jǐ de jī xù，tóng shí yào zhǎo zhì tóng dào hé de huǒ bàn.',vi:'Khó nhất là vốn và nhân tài. Ban đầu không có tiền, chỉ có thể dùng tiền tiết kiệm của mình, đồng thời phải tìm người cùng chí hướng.'},
      {speaker:'采访者',role:'Phóng viên',zh:'您有什么建议给想创业的年轻人？',pinyin:'Nín yǒu shén me jiàn yì gěi xiǎng chuàng yè de nián qīng rén？',vi:'Bạn có lời khuyên gì cho những người trẻ muốn khởi nghiệp?'},
      {speaker:'创业者',role:'Doanh nhân',zh:'三点：第一，解决真实的用户痛点；第二，快速试错，不断迭代；第三，坚持，大多数创业在成功前都会经历失败。',pinyin:'Sān diǎn：Dì yī，jiě jué zhēn shí de yòng hù tòng diǎn；dì èr，kuài sù shì cuò，bù duàn dié dài；dì sān，jiān chí，dà duō shù chuàng yè zài chéng gōng qián dōu huì jīng lì shī bài.',vi:'Ba điểm: Thứ nhất, giải quyết điểm đau thực sự của người dùng; thứ hai, thử nghiệm nhanh, cải tiến liên tục; thứ ba, kiên trì, hầu hết các startup trước khi thành công đều trải qua thất bại.'},
    ]
  },
  {
    title:'Toàn cầu hoá và bản sắc văn hoá', title_zh:'全球化与文化认同',
    type:'passage', hsk_level:'HSK4', topic:'culture', difficulty:'hard', order_index:31,
    description:'Bài viết về tác động của toàn cầu hoá',
    lines:[
      {speaker:'',role:'',zh:'全球化是当今世界最深刻的变革之一，它深刻地影响着每个国家的文化。',pinyin:'Quán qiú huà shì dāng jīn shì jiè zuì shēn kè de biàn gé zhī yī，tā shēn kè de yǐng xiǎng zhe měi gè guó jiā de wén huà.',vi:'Toàn cầu hoá là một trong những biến đổi sâu sắc nhất thế giới hiện nay, nó tác động mạnh mẽ đến văn hoá của mỗi quốc gia.'},
      {speaker:'',role:'',zh:'一方面，全球化促进了文化交流，让人们了解不同地区的风俗习惯和价值观。',pinyin:'Yī fāng miàn，quán qiú huà cù jìn le wén huà jiāo liú，ràng rén men liǎo jiě bù tóng dì qū de fēng sú xí guàn hé jià zhí guān.',vi:'Một mặt, toàn cầu hoá thúc đẩy giao lưu văn hoá, giúp mọi người hiểu phong tục tập quán và quan niệm giá trị của các vùng khác nhau.'},
      {speaker:'',role:'',zh:'另一方面，强势文化的扩张也威胁着一些弱小文化的生存。',pinyin:'Lìng yī fāng miàn，qiáng shì wén huà de kuò zhāng yě wēi xié zhe yī xiē ruò xiǎo wén huà de shēng cún.',vi:'Mặt khác, sự bành trướng của văn hoá mạnh cũng đe doạ sự tồn tại của một số nền văn hoá yếu thế.'},
      {speaker:'',role:'',zh:'如何在拥抱全球化的同时，保护本民族的文化特色，是许多国家面临的挑战。',pinyin:'Rú hé zài yōng bào quán qiú huà de tóng shí，bǎo hù běn mín zú de wén huà tè sè，shì xǔ duō guó jiā miàn lín de tiǎo zhàn.',vi:'Làm thế nào để vừa đón nhận toàn cầu hoá, vừa bảo vệ bản sắc văn hoá dân tộc, là thách thức mà nhiều quốc gia đang đối mặt.'},
      {speaker:'',role:'',zh:'中国的做法是"和而不同"——在参与全球化的同时，坚守中华文化的根基。',pinyin:'Zhōng guó de zuò fǎ shì "hé ér bù tóng"——zài cān yù quán qiú huà de tóng shí，jiān shǒu Zhōng huá wén huà de gēn jī.',vi:'Cách làm của Trung Quốc là "hoà mà khác" — trong khi tham gia toàn cầu hoá, vẫn giữ vững nền tảng văn hoá Trung Hoa.'},
      {speaker:'',role:'',zh:'这种平衡的智慧，值得其他国家借鉴。',pinyin:'Zhè zhǒng píng héng de zhì huì，zhí dé qí tā guó jiā jiè jiàn.',vi:'Trí tuệ cân bằng này đáng để các quốc gia khác học hỏi.'},
    ]
  },
  {
    title:'Sức khoẻ tâm thần ở người trẻ', title_zh:'年轻人的心理健康',
    type:'passage', hsk_level:'HSK4', topic:'health', difficulty:'hard', order_index:32,
    description:'Bài đọc về sức khoẻ tâm thần',
    lines:[
      {speaker:'',role:'',zh:'近年来，年轻人的心理健康问题日益受到社会关注。',pinyin:'Jìn nián lái，nián qīng rén de xīn lǐ jiàn kāng wèn tí rì yì shòu dào shè huì guān zhù.',vi:'Những năm gần đây, vấn đề sức khoẻ tâm thần của người trẻ ngày càng được xã hội quan tâm.'},
      {speaker:'',role:'',zh:'研究表明，焦虑、抑郁等心理问题在大学生和职场新人中相当普遍。',pinyin:'Yán jiū biǎo míng，jiāo lǜ、yì yù děng xīn lǐ wèn tí zài dà xué shēng hé zhí chǎng xīn rén zhōng xiāng dāng pǔ biàn.',vi:'Nghiên cứu cho thấy, các vấn đề tâm lý như lo âu, trầm cảm khá phổ biến trong sinh viên đại học và người mới đi làm.'},
      {speaker:'',role:'',zh:'造成这些问题的原因是多方面的：学业和工作压力、社会竞争激烈、社交媒体带来的比较心理等。',pinyin:'Zào chéng zhè xiē wèn tí de yuán yīn shì duō fāng miàn de：xué yè hé gōng zuò yā lì、shè huì jìng zhēng jī liè、shè jiāo méi tǐ dài lái de bǐ jiào xīn lǐ děng.',vi:'Nguyên nhân gây ra những vấn đề này rất đa dạng: áp lực học tập và công việc, cạnh tranh xã hội gay gắt, tâm lý so sánh do mạng xã hội...'},
      {speaker:'',role:'',zh:'重要的是，心理问题不是软弱的表现，而是需要关注和治疗的健康问题。',pinyin:'Zhòng yào de shì，xīn lǐ wèn tí bù shì ruǎn ruò de biǎo xiàn，ér shì xū yào guān zhù hé zhì liáo de jiàn kāng wèn tí.',vi:'Điều quan trọng là, vấn đề tâm lý không phải là biểu hiện của sự yếu đuối, mà là vấn đề sức khoẻ cần được quan tâm và điều trị.'},
      {speaker:'',role:'',zh:'如果感到持续的压力和负面情绪，应该主动寻求专业帮助，不要独自承受。',pinyin:'Rú guǒ gǎn dào chí xù de yā lì hé fù miàn qíng xù，yīng gāi zhǔ dòng xún qiú zhuān yè bāng zhù，bù yào dú zì chéng shòu.',vi:'Nếu cảm thấy áp lực và cảm xúc tiêu cực kéo dài, hãy chủ động tìm kiếm sự giúp đỡ chuyên nghiệp, đừng chịu đựng một mình.'},
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
          [d.title, d.title_zh, d.type, d.hsk_level, d.topic, d.description, d.difficulty, d.order_index]
        );
        did = r.insertId; dCount++;
        console.log(`  ✓ [${d.hsk_level}·${d.type}] ${d.title}`);
      }
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
    console.log(`\n✅ Batch 2 hoàn tất!`);
    console.log(`   📚 Tổng: ${ds.c} bài (${dCount} mới) · ${ls.c} dòng (+${lCount})`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
