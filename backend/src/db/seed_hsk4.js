// backend/src/db/seed_hsk4.js
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title: 'Công việc & Nghề nghiệp nâng cao', title_zh: '职业与工作进阶', desc: 'Từ vựng văn phòng và nghề nghiệp chuyên sâu', level: 'HSK4', order: 1 },
  { title: 'Kinh tế & Tài chính', title_zh: '经济与金融', desc: 'Từ vựng kinh tế, tài chính và thương mại', level: 'HSK4', order: 2 },
  { title: 'Giáo dục & Khoa học', title_zh: '教育与科学', desc: 'Học thuật, nghiên cứu khoa học', level: 'HSK4', order: 3 },
  { title: 'Xã hội & Văn hóa', title_zh: '社会与文化', desc: 'Phong tục, văn hóa và xã hội', level: 'HSK4', order: 4 },
  { title: 'Luật pháp & Chính trị', title_zh: '法律与政治', desc: 'Từ vựng pháp luật và chính trị cơ bản', level: 'HSK4', order: 5 },
  { title: 'Nghệ thuật & Văn học', title_zh: '艺术与文学', desc: 'Âm nhạc, hội họa và văn học', level: 'HSK4', order: 6 },
  { title: 'Giao tiếp & Ngôn ngữ', title_zh: '交流与语言', desc: 'Kỹ năng giao tiếp và diễn đạt', level: 'HSK4', order: 7 },
  { title: 'Tư duy & Cảm xúc nâng cao', title_zh: '思维与情感进阶', desc: 'Diễn đạt suy nghĩ và cảm xúc phức tạp', level: 'HSK4', order: 8 },
  { title: 'Thể thao & Sức khỏe nâng cao', title_zh: '体育与健康进阶', desc: 'Thể thao chuyên nghiệp và chăm sóc sức khỏe', level: 'HSK4', order: 9 },
  { title: 'Khoa học & Công nghệ', title_zh: '科学与技术', desc: 'Công nghệ hiện đại và khoa học ứng dụng', level: 'HSK4', order: 10 },
  { title: 'Môi trường & Thiên nhiên', title_zh: '环境与自然', desc: 'Bảo vệ môi trường và thiên nhiên', level: 'HSK4', order: 11 },
  { title: 'Du lịch & Ngoại giao', title_zh: '旅游与外交', desc: 'Du lịch quốc tế và giao lưu văn hóa', level: 'HSK4', order: 12 },
  { title: 'Gia đình & Quan hệ xã hội', title_zh: '家庭与社会关系', desc: 'Quan hệ gia đình và xã hội phức tạp', level: 'HSK4', order: 13 },
  { title: 'Triết học & Đạo đức', title_zh: '哲学与道德', desc: 'Tư tưởng, đạo đức và triết học', level: 'HSK4', order: 14 },
  { title: 'Mệnh đề & Cấu trúc nâng cao', title_zh: '语法结构进阶', desc: 'Các cấu trúc ngữ pháp và liên kết câu', level: 'HSK4', order: 15 },
];

const vocab = [
  // Bài 1: Công việc nâng cao
  [0,'合同','hé tóng','Hợp đồng','Contract','我们签了合同。','Chúng tôi đã ký hợp đồng.','noun'],
  [0,'招聘','zhāo pìn','Tuyển dụng','Recruit / Hire','公司正在招聘人员。','Công ty đang tuyển dụng.','verb'],
  [0,'应聘','yìng pìn','Ứng tuyển','Apply for a job','我去应聘这份工作。','Tôi đi ứng tuyển công việc này.','verb'],
  [0,'简历','jiǎn lì','Hồ sơ / CV','Resume','请发简历给我们。','Hãy gửi CV cho chúng tôi.','noun'],
  [0,'面试','miàn shì','Phỏng vấn','Interview','明天我有面试。','Ngày mai tôi có phỏng vấn.','noun'],
  [0,'升职','shēng zhí','Thăng chức','Promotion','他最近升职了。','Anh ấy vừa được thăng chức.','verb'],
  [0,'加班','jiā bān','Làm thêm giờ','Overtime','今天又要加班。','Hôm nay lại phải làm thêm.','verb'],
  [0,'出差','chū chāi','Công tác','Business trip','我要出差一周。','Tôi phải đi công tác một tuần.','verb'],
  [0,'汇报','huì bào','Báo cáo','Report','请汇报工作进度。','Hãy báo cáo tiến độ công việc.','verb'],
  [0,'效率','xiào lǜ','Hiệu quả / Hiệu suất','Efficiency','提高工作效率。','Nâng cao hiệu suất làm việc.','noun'],
  [0,'竞争','jìng zhēng','Cạnh tranh','Compete / Competition','市场竞争很激烈。','Cạnh tranh thị trường rất khốc liệt.','verb'],
  [0,'合作','hé zuò','Hợp tác','Cooperate / Cooperation','我们需要合作。','Chúng ta cần hợp tác.','verb'],

  // Bài 2: Kinh tế & Tài chính
  [1,'投资','tóu zī','Đầu tư','Invest / Investment','我想投资股票。','Tôi muốn đầu tư cổ phiếu.','verb'],
  [1,'利润','lì rùn','Lợi nhuận','Profit','今年利润增加了。','Năm nay lợi nhuận tăng.','noun'],
  [1,'损失','sǔn shī','Tổn thất / Thiệt hại','Loss','这次损失很大。','Lần này thiệt hại rất lớn.','noun'],
  [1,'预算','yù suàn','Ngân sách','Budget','我们的预算不够。','Ngân sách của chúng ta không đủ.','noun'],
  [1,'消费','xiāo fèi','Tiêu dùng / Chi tiêu','Consume / Spend','减少不必要的消费。','Giảm thiểu chi tiêu không cần thiết.','verb'],
  [1,'价格','jià gé','Giá cả','Price','这个价格贵了。','Giá này đắt quá.','noun'],
  [1,'市场','shì chǎng','Thị trường','Market','市场需求很大。','Nhu cầu thị trường rất lớn.','noun'],
  [1,'经济','jīng jì','Kinh tế','Economy','中国经济发展快。','Kinh tế Trung Quốc phát triển nhanh.','noun'],
  [1,'贸易','mào yì','Thương mại','Trade','两国贸易增加了。','Thương mại hai nước tăng lên.','noun'],
  [1,'出口','chū kǒu','Xuất khẩu','Export','中国出口很多商品。','Trung Quốc xuất khẩu nhiều hàng hóa.','verb'],
  [1,'进口','jìn kǒu','Nhập khẩu','Import','我们进口了很多原料。','Chúng tôi đã nhập khẩu nhiều nguyên liệu.','verb'],
  [1,'税收','shuì shōu','Thuế / Thu thuế','Tax revenue','合理缴税是公民义务。','Nộp thuế hợp lý là nghĩa vụ công dân.','noun'],

  // Bài 3: Giáo dục & Khoa học
  [2,'研究','yán jiū','Nghiên cứu','Research','我在研究中国历史。','Tôi đang nghiên cứu lịch sử Trung Quốc.','verb'],
  [2,'论文','lùn wén','Luận văn / Bài báo','Thesis / Paper','我在写毕业论文。','Tôi đang viết luận văn tốt nghiệp.','noun'],
  [2,'实验','shí yàn','Thí nghiệm','Experiment','我们做了一个实验。','Chúng tôi đã làm một thí nghiệm.','noun'],
  [2,'理论','lǐ lùn','Lý thuyết','Theory','理论和实践结合。','Lý thuyết kết hợp thực tiễn.','noun'],
  [2,'数据','shù jù','Dữ liệu','Data','我们分析数据。','Chúng tôi phân tích dữ liệu.','noun'],
  [2,'发现','fā xiàn','Phát hiện','Discover','科学家发现了新元素。','Nhà khoa học đã phát hiện nguyên tố mới.','verb'],
  [2,'发明','fā míng','Phát minh','Invent / Invention','四大发明是中国的骄傲。','Tứ đại phát minh là niềm tự hào của Trung Quốc.','verb'],
  [2,'结论','jié lùn','Kết luận','Conclusion','实验的结论很重要。','Kết luận của thí nghiệm rất quan trọng.','noun'],
  [2,'知识','zhī shi','Kiến thức','Knowledge','学习获取知识。','Học tập để thu nhận kiến thức.','noun'],
  [2,'智慧','zhì huì','Trí tuệ','Wisdom / Intelligence','老人有很多智慧。','Người già có rất nhiều trí tuệ.','noun'],
  [2,'奖学金','jiǎng xué jīn','Học bổng','Scholarship','她获得了奖学金。','Cô ấy đã nhận được học bổng.','noun'],
  [2,'留学','liú xué','Du học','Study abroad','我想去中国留学。','Tôi muốn đi du học ở Trung Quốc.','verb'],

  // Bài 4: Xã hội & Văn hóa
  [3,'传统','chuán tǒng','Truyền thống','Tradition','保持传统文化。','Giữ gìn văn hóa truyền thống.','noun'],
  [3,'习俗','xí sú','Phong tục tập quán','Custom / Tradition','春节有很多习俗。','Tết nguyên đán có nhiều phong tục.','noun'],
  [3,'民族','mín zú','Dân tộc','Ethnic group / Nation','中国有56个民族。','Trung Quốc có 56 dân tộc.','noun'],
  [3,'文明','wén míng','Văn minh / Nền văn hóa','Civilization / Civilized','中华文明历史悠久。','Văn minh Trung Hoa có lịch sử lâu đời.','noun'],
  [3,'影响','yǐng xiǎng','Ảnh hưởng','Influence / Affect','文化影响我们的生活。','Văn hóa ảnh hưởng đến cuộc sống của chúng ta.','verb'],
  [3,'价值观','jià zhí guān','Quan điểm / Giá trị','Values / Worldview','不同的价值观。','Các quan điểm giá trị khác nhau.','noun'],
  [3,'社会','shè huì','Xã hội','Society','和谐社会是我们的目标。','Xã hội hòa hợp là mục tiêu của chúng ta.','noun'],
  [3,'公民','gōng mín','Công dân','Citizen','公民有权利和义务。','Công dân có quyền và nghĩa vụ.','noun'],
  [3,'尊重','zūn zhòng','Tôn trọng','Respect','互相尊重很重要。','Tôn trọng lẫn nhau rất quan trọng.','verb'],
  [3,'包容','bāo róng','Bao dung / Khoan dung','Tolerant / Inclusive','要有包容的心态。','Cần có thái độ bao dung.','verb'],
  [3,'歧视','qí shì','Phân biệt đối xử','Discriminate','不能种族歧视。','Không được phân biệt chủng tộc.','verb'],
  [3,'平等','píng děng','Bình đẳng','Equal / Equality','人人生而平等。','Mọi người sinh ra đều bình đẳng.','adjective'],

  // Bài 5: Luật pháp & Chính trị
  [4,'法律','fǎ lǜ','Pháp luật','Law','要遵守法律。','Phải tuân thủ pháp luật.','noun'],
  [4,'规定','guī dìng','Quy định','Regulation / Stipulate','这是公司的规定。','Đây là quy định của công ty.','noun'],
  [4,'违法','wéi fǎ','Vi phạm pháp luật','Illegal / Break the law','这种行为是违法的。','Hành vi này là vi phạm pháp luật.','verb'],
  [4,'权利','quán lì','Quyền lợi / Quyền','Right','每个人都有权利。','Mỗi người đều có quyền lợi.','noun'],
  [4,'义务','yì wù','Nghĩa vụ','Duty / Obligation','公民有义务纳税。','Công dân có nghĩa vụ nộp thuế.','noun'],
  [4,'政府','zhèng fǔ','Chính phủ','Government','政府发布了新政策。','Chính phủ đã ban hành chính sách mới.','noun'],
  [4,'政策','zhèng cè','Chính sách','Policy','这个政策对大家有利。','Chính sách này có lợi cho mọi người.','noun'],
  [4,'选举','xuǎn jǔ','Bầu cử','Election','民主选举很重要。','Bầu cử dân chủ rất quan trọng.','noun'],
  [4,'民主','mín zhǔ','Dân chủ','Democracy','民主是基本权利。','Dân chủ là quyền cơ bản.','noun'],
  [4,'投票','tóu piào','Bỏ phiếu','Vote','我去投票了。','Tôi đã đi bỏ phiếu.','verb'],
  [4,'官员','guān yuán','Quan chức','Official','政府官员要廉洁。','Quan chức chính phủ phải liêm khiết.','noun'],
  [4,'腐败','fǔ bài','Tham nhũng','Corruption','反腐败是当务之急。','Chống tham nhũng là nhiệm vụ cấp bách.','noun'],

  // Bài 6: Nghệ thuật & Văn học
  [5,'作品','zuò pǐn','Tác phẩm','Work (of art)','这幅作品很有名。','Tác phẩm này rất nổi tiếng.','noun'],
  [5,'创作','chuàng zuò','Sáng tác','Create','她在创作新歌曲。','Cô ấy đang sáng tác bài hát mới.','verb'],
  [5,'风格','fēng gé','Phong cách','Style','他的画风格独特。','Phong cách tranh của anh ấy rất độc đáo.','noun'],
  [5,'欣赏','xīn shǎng','Thưởng thức / Trân trọng','Appreciate / Enjoy','我欣赏古典音乐。','Tôi thưởng thức âm nhạc cổ điển.','verb'],
  [5,'表演','biǎo yǎn','Biểu diễn','Perform','他们在表演歌剧。','Họ đang biểu diễn nhạc kịch.','verb'],
  [5,'小说','xiǎo shuō','Tiểu thuyết','Novel','这部小说很好看。','Tiểu thuyết này rất hay.','noun'],
  [5,'诗歌','shī gē','Thơ / Thi ca','Poetry','唐诗是中国文学的瑰宝。','Thơ Đường là viên ngọc của văn học Trung Quốc.','noun'],
  [5,'电视剧','diàn shì jù','Phim truyền hình','TV drama','这部电视剧很受欢迎。','Bộ phim này rất được yêu thích.','noun'],
  [5,'剧情','jù qíng','Cốt truyện','Plot','剧情很精彩。','Cốt truyện rất hay.','noun'],
  [5,'博览会','bó lǎn huì','Triển lãm','Exhibition / Expo','艺术博览会开幕了。','Triển lãm nghệ thuật đã khai mạc.','noun'],
  [5,'传统文化','chuán tǒng wén huà','Văn hóa truyền thống','Traditional culture','我们要保护传统文化。','Chúng ta cần bảo vệ văn hóa truyền thống.','noun'],
  [5,'非遗','fēi yí','Di sản phi vật thể','Intangible heritage','京剧是非遗项目。','Kinh kịch là di sản phi vật thể.','noun'],

  // Bài 7: Giao tiếp & Ngôn ngữ
  [6,'表达','biǎo dá','Diễn đạt','Express','用汉语表达想法。','Diễn đạt ý kiến bằng tiếng Trung.','verb'],
  [6,'沟通','gōu tōng','Giao tiếp / Kết nối','Communicate','有效沟通很重要。','Giao tiếp hiệu quả rất quan trọng.','verb'],
  [6,'讨论','tǎo lùn','Thảo luận','Discuss','我们讨论这个问题。','Chúng ta thảo luận về vấn đề này.','verb'],
  [6,'争论','zhēng lùn','Tranh luận','Argue / Debate','他们在争论这个话题。','Họ đang tranh luận về chủ đề này.','verb'],
  [6,'说服','shuō fú','Thuyết phục','Persuade','我说服了他。','Tôi đã thuyết phục được anh ấy.','verb'],
  [6,'批评','pī píng','Phê bình / Chỉ trích','Criticize','老师批评了学生。','Giáo viên đã phê bình học sinh.','verb'],
  [6,'夸奖','kuā jiǎng','Khen ngợi','Praise','老师夸奖了她。','Giáo viên đã khen ngợi cô ấy.','verb'],
  [6,'误解','wù jiě','Hiểu lầm','Misunderstand','这是一个误解。','Đây là một hiểu lầm.','noun'],
  [6,'解释','jiě shì','Giải thích','Explain','请解释一下。','Hãy giải thích một chút.','verb'],
  [6,'翻译','fān yì','Dịch thuật / Phiên dịch','Translate','请帮我翻译这句话。','Hãy giúp tôi dịch câu này.','verb'],
  [6,'口音','kǒu yīn','Giọng địa phương','Accent','他有广东口音。','Anh ấy có giọng Quảng Đông.','noun'],
  [6,'流利','liú lì','Lưu loát / Trôi chảy','Fluent','她的英语很流利。','Tiếng Anh của cô ấy rất lưu loát.','adjective'],

  // Bài 8: Tư duy & Cảm xúc
  [7,'想象','xiǎng xiàng','Tưởng tượng','Imagine / Imagination','你的想象力很丰富。','Trí tưởng tượng của bạn rất phong phú.','verb'],
  [7,'判断','pàn duàn','Phán đoán / Đánh giá','Judge / Determine','这个判断是对的。','Phán đoán này là đúng.','verb'],
  [7,'分析','fēn xī','Phân tích','Analyze','仔细分析问题。','Phân tích vấn đề cẩn thận.','verb'],
  [7,'比较','bǐ jiào','So sánh','Compare','比较一下两个方案。','So sánh hai phương án.','verb'],
  [7,'总结','zǒng jié','Tóm tắt / Tổng kết','Summarize','请总结一下。','Hãy tóm tắt lại.','verb'],
  [7,'纠结','jiū jié','Phân vân / Đắn đo','Tangled / Hesitate','我很纠结怎么选。','Tôi rất phân vân phải chọn thế nào.','verb'],
  [7,'嫉妒','jí dù','Ghen tị','Jealous / Envy','他嫉妒你的成功。','Anh ấy ghen tị với thành công của bạn.','verb'],
  [7,'骄傲','jiāo ào','Tự hào / Kiêu ngạo','Proud / Arrogant','我为你感到骄傲。','Tôi tự hào về bạn.','adjective'],
  [7,'后悔','hòu huǐ','Hối hận','Regret','我很后悔。','Tôi rất hối hận.','verb'],
  [7,'满足','mǎn zú','Mãn nguyện / Thỏa mãn','Satisfied / Content','我很满足现在的生活。','Tôi rất mãn nguyện với cuộc sống hiện tại.','verb'],
  [7,'感激','gǎn jī','Biết ơn','Grateful','我很感激你的帮助。','Tôi rất biết ơn sự giúp đỡ của bạn.','verb'],
  [7,'失望','shī wàng','Thất vọng','Disappointed','我很失望。','Tôi rất thất vọng.','verb'],

  // Bài 9: Thể thao nâng cao
  [8,'训练','xùn liàn','Huấn luyện / Tập luyện','Train','运动员每天训练。','Vận động viên tập luyện mỗi ngày.','verb'],
  [8,'比赛','bǐ sài','Thi đấu / Cuộc thi','Competition / Match','明天有足球比赛。','Ngày mai có trận đấu bóng đá.','noun'],
  [8,'冠军','guàn jūn','Vô địch / Quán quân','Champion','他是世界冠军。','Anh ấy là vô địch thế giới.','noun'],
  [8,'纪录','jì lù','Kỷ lục','Record','他打破了世界纪录。','Anh ấy đã phá kỷ lục thế giới.','noun'],
  [8,'奥运会','ào yùn huì','Thế vận hội Olympic','Olympic Games','中国2008年举办奥运会。','Trung Quốc tổ chức Thế vận hội năm 2008.','noun'],
  [8,'教练','jiào liàn','Huấn luyện viên','Coach','他是国家队教练。','Anh ấy là huấn luyện viên đội quốc gia.','noun'],
  [8,'志愿者','zhì yuàn zhě','Tình nguyện viên','Volunteer','他是赛事志愿者。','Anh ấy là tình nguyện viên của sự kiện.','noun'],
  [8,'健身','jiàn shēn','Tập thể hình / Gym','Fitness / Keep fit','我每天去健身房健身。','Tôi đi gym mỗi ngày.','verb'],
  [8,'体育馆','tǐ yù guǎn','Sân vận động / Nhà thi đấu','Stadium / Gymnasium','这个体育馆很大。','Sân vận động này rất lớn.','noun'],
  [8,'奖牌','jiǎng pái','Huy chương','Medal','他赢得了金牌。','Anh ấy đã giành huy chương vàng.','noun'],
  [8,'团队精神','tuán duì jīng shén','Tinh thần đồng đội','Team spirit','团队精神很重要。','Tinh thần đồng đội rất quan trọng.','noun'],
  [8,'体能','tǐ néng','Thể lực','Physical fitness','提高体能很重要。','Nâng cao thể lực rất quan trọng.','noun'],

  // Bài 10: Khoa học & Công nghệ
  [9,'人工智能','rén gōng zhì néng','Trí tuệ nhân tạo','Artificial Intelligence','人工智能改变世界。','Trí tuệ nhân tạo đang thay đổi thế giới.','noun'],
  [9,'机器人','jī qì rén','Robot','Robot','工厂用机器人生产。','Nhà máy dùng robot để sản xuất.','noun'],
  [9,'大数据','dà shù jù','Dữ liệu lớn','Big data','大数据分析市场。','Dữ liệu lớn phân tích thị trường.','noun'],
  [9,'云计算','yún jì suàn','Điện toán đám mây','Cloud computing','云计算很高效。','Điện toán đám mây rất hiệu quả.','noun'],
  [9,'区块链','qū kuài liàn','Blockchain','Blockchain','区块链技术很安全。','Công nghệ blockchain rất an toàn.','noun'],
  [9,'创新','chuàng xīn','Sáng tạo / Đổi mới','Innovate / Innovation','创新是发展的动力。','Đổi mới là động lực phát triển.','verb'],
  [9,'专利','zhuān lì','Bằng sáng chế / Bản quyền','Patent','公司申请了专利。','Công ty đã đăng ký bằng sáng chế.','noun'],
  [9,'算法','suàn fǎ','Thuật toán','Algorithm','优化算法提高效率。','Tối ưu thuật toán nâng cao hiệu quả.','noun'],
  [9,'编程','biān chéng','Lập trình','Programming / Coding','学习编程很有用。','Học lập trình rất hữu ích.','noun'],
  [9,'网络安全','wǎng luò ān quán','An ninh mạng','Cybersecurity','网络安全至关重要。','An ninh mạng cực kỳ quan trọng.','noun'],
  [9,'自动化','zì dòng huà','Tự động hóa','Automation','工厂实现了自动化。','Nhà máy đã thực hiện tự động hóa.','noun'],
  [9,'数字化','shù zì huà','Số hóa','Digitization','政府推进数字化转型。','Chính phủ thúc đẩy chuyển đổi số.','verb'],

  // Bài 11: Môi trường
  [10,'环境保护','huán jìng bǎo hù','Bảo vệ môi trường','Environmental protection','我们要保护环境。','Chúng ta cần bảo vệ môi trường.','noun'],
  [10,'污染','wū rǎn','Ô nhiễm','Pollution / Pollute','空气污染很严重。','Ô nhiễm không khí rất nghiêm trọng.','noun'],
  [10,'气候变化','qì hòu biàn huà','Biến đổi khí hậu','Climate change','气候变化影响全球。','Biến đổi khí hậu ảnh hưởng toàn cầu.','noun'],
  [10,'可持续','kě chí xù','Bền vững','Sustainable','可持续发展是目标。','Phát triển bền vững là mục tiêu.','adjective'],
  [10,'能源','néng yuán','Năng lượng','Energy','新能源很重要。','Năng lượng mới rất quan trọng.','noun'],
  [10,'太阳能','tài yáng néng','Năng lượng mặt trời','Solar energy','太阳能是清洁能源。','Năng lượng mặt trời là năng lượng sạch.','noun'],
  [10,'碳排放','tàn pái fàng','Phát thải carbon','Carbon emission','减少碳排放很重要。','Giảm phát thải carbon rất quan trọng.','noun'],
  [10,'垃圾分类','lā jī fēn lèi','Phân loại rác','Waste sorting','垃圾分类从我做起。','Phân loại rác bắt đầu từ tôi.','noun'],
  [10,'回收利用','huí shōu lì yòng','Tái chế','Recycle / Reuse','废物回收利用。','Tái chế chất thải.','verb'],
  [10,'绿色发展','lǜ sè fā zhǎn','Phát triển xanh','Green development','推动绿色发展。','Thúc đẩy phát triển xanh.','noun'],
  [10,'濒危物种','bīn wēi wù zhǒng','Loài nguy cấp','Endangered species','保护濒危物种。','Bảo vệ loài nguy cấp.','noun'],
  [10,'生态系统','shēng tài xì tǒng','Hệ sinh thái','Ecosystem','保护生态系统平衡。','Bảo vệ cân bằng hệ sinh thái.','noun'],

  // Bài 12: Du lịch & Ngoại giao
  [11,'外交','wài jiāo','Ngoại giao','Diplomacy','外交关系很重要。','Quan hệ ngoại giao rất quan trọng.','noun'],
  [11,'大使馆','dà shǐ guǎn','Đại sứ quán','Embassy','我去大使馆办签证。','Tôi đến đại sứ quán làm visa.','noun'],
  [11,'国际','guó jì','Quốc tế','International','参加国际会议。','Tham gia hội nghị quốc tế.','adjective'],
  [11,'文化交流','wén huà jiāo liú','Giao lưu văn hóa','Cultural exchange','文化交流促进友谊。','Giao lưu văn hóa tăng cường tình hữu nghị.','noun'],
  [11,'汇率','huì lǜ','Tỷ giá hối đoái','Exchange rate','今天汇率是多少？','Hôm nay tỷ giá là bao nhiêu?','noun'],
  [11,'海关','hǎi guān','Hải quan','Customs','过海关要检查行李。','Qua hải quan phải kiểm tra hành lý.','noun'],
  [11,'落地签','luò dì qiān','Visa on arrival','Visa on arrival','越南人可以落地签吗？','Người Việt Nam có thể xin visa on arrival không?','noun'],
  [11,'旅游业','lǚ yóu yè','Ngành du lịch','Tourism industry','旅游业对经济很重要。','Ngành du lịch rất quan trọng cho kinh tế.','noun'],
  [11,'民宿','mín sù','Homestay / Nhà nghỉ','Homestay / B&B','住民宿体验当地生活。','Ở homestay trải nghiệm cuộc sống địa phương.','noun'],
  [11,'打包','dǎ bāo','Đóng gói / Gói đồ mang về','Pack / Take away','行李打包好了吗？','Đồ đạc đóng gói xong chưa?','verb'],
  [11,'风土人情','fēng tǔ rén qíng','Phong thổ nhân tình (văn hóa địa phương)','Local customs','了解当地风土人情。','Tìm hiểu văn hóa phong tục địa phương.','noun'],
  [11,'攻略','gōng lüè','Cẩm nang du lịch / Mẹo','Travel guide / Tips','我看了很多旅游攻略。','Tôi đã xem nhiều cẩm nang du lịch.','noun'],

  // Bài 13: Gia đình & Quan hệ
  [12,'婚姻','hūn yīn','Hôn nhân','Marriage','婚姻是人生大事。','Hôn nhân là việc trọng đại trong đời.','noun'],
  [12,'离婚','lí hūn','Ly hôn','Divorce','他们离婚了。','Họ đã ly hôn.','verb'],
  [12,'恋爱','liàn ài','Yêu đương','Dating / Romance','他们在恋爱。','Họ đang yêu nhau.','verb'],
  [12,'失恋','shī liàn','Thất tình','Heartbreak / Breakup','她失恋了很难过。','Cô ấy thất tình rất buồn.','verb'],
  [12,'亲戚','qīn qi','Họ hàng','Relatives','过年去看亲戚。','Tết đến thăm họ hàng.','noun'],
  [12,'邻居','lín jū','Hàng xóm','Neighbor','我们和邻居关系好。','Chúng tôi có quan hệ tốt với hàng xóm.','noun'],
  [12,'朋友圈','péng you quān','Vòng bạn bè / WeChat Moments','Social circle / Moments','她在朋友圈发照片。','Cô ấy đăng ảnh lên Moments.','noun'],
  [12,'同事','tóng shì','Đồng nghiệp','Colleague','我和同事关系很好。','Tôi có quan hệ tốt với đồng nghiệp.','noun'],
  [12,'上司','shàng sī','Cấp trên / Sếp','Superior / Boss','我的上司很严格。','Cấp trên của tôi rất nghiêm khắc.','noun'],
  [12,'下属','xià shǔ','Cấp dưới / Nhân viên','Subordinate','他管理很多下属。','Anh ấy quản lý nhiều cấp dưới.','noun'],
  [12,'信任','xìn rèn','Tin tưởng','Trust','信任是友谊的基础。','Tin tưởng là nền tảng của tình bạn.','verb'],
  [12,'背叛','bèi pàn','Phản bội','Betray / Betrayal','他背叛了朋友。','Anh ấy đã phản bội bạn bè.','verb'],

  // Bài 14: Triết học & Đạo đức
  [13,'道德','dào dé','Đạo đức','Morality / Ethics','道德教育很重要。','Giáo dục đạo đức rất quan trọng.','noun'],
  [13,'诚实','chéng shí','Thành thật / Trung thực','Honest','做人要诚实。','Làm người phải thành thật.','adjective'],
  [13,'勤劳','qín láo','Cần cù / Chăm chỉ','Hardworking / Diligent','勤劳是中国人的美德。','Cần cù là đức tính của người Trung Quốc.','adjective'],
  [13,'节约','jié yuē','Tiết kiệm','Save / Economize','节约用水用电。','Tiết kiệm nước và điện.','verb'],
  [13,'谦虚','qiān xū','Khiêm tốn','Humble / Modest','谦虚使人进步。','Khiêm tốn giúp người tiến bộ.','adjective'],
  [13,'无私','wú sī','Vô tư / Không ích kỷ','Selfless / Unselfish','他很无私地帮助别人。','Anh ấy vô tư giúp đỡ người khác.','adjective'],
  [13,'公正','gōng zhèng','Công bằng / Chính trực','Fair / Just','法律要公正。','Pháp luật phải công bằng.','adjective'],
  [13,'正直','zhèng zhí','Ngay thẳng / Chính trực','Upright / Honest','他是个正直的人。','Anh ấy là người chính trực.','adjective'],
  [13,'善良','shàn liáng','Lương thiện / Tốt bụng','Kind / Good-hearted','她心地善良。','Cô ấy tốt bụng.','adjective'],
  [13,'责任感','zé rèn gǎn','Tinh thần trách nhiệm','Sense of responsibility','有责任感的人受欢迎。','Người có tinh thần trách nhiệm được yêu quý.','noun'],
  [13,'奉献','fèng xiàn','Cống hiến / Hi sinh','Dedicate / Contribute','为社会奉献。','Cống hiến cho xã hội.','verb'],
  [13,'感恩','gǎn ēn','Biết ơn / Tri ơn','Grateful / Thankful','学会感恩。','Hãy biết tri ơn.','verb'],

  // Bài 15: Ngữ pháp nâng cao
  [14,'尽管','jǐn guǎn','Mặc dù','Although / Despite','尽管很难，我还是坚持。','Mặc dù rất khó, tôi vẫn kiên trì.','conjunction'],
  [14,'即使','jí shǐ','Dù cho / Ngay cả khi','Even if','即使下雨，我也去。','Dù trời mưa, tôi vẫn đi.','conjunction'],
  [14,'除非','chú fēi','Trừ khi / Ngoại trừ khi','Unless','除非你答应，否则我不做。','Trừ khi bạn đồng ý, nếu không tôi sẽ không làm.','conjunction'],
  [14,'既然','jì rán','Đã vậy thì / Vì đã','Since / Now that','既然来了，就留下来吧。','Đã đến rồi thì ở lại đi.','conjunction'],
  [14,'不得不','bù dé bù','Không thể không / Phải','Have to / Cannot but','我不得不去。','Tôi không thể không đi.','other'],
  [14,'只好','zhǐ hǎo','Đành phải / Chỉ còn cách','Have no choice but to','天黑了，只好回家。','Trời tối rồi, đành phải về nhà.','adverb'],
  [14,'反而','fǎn ér','Ngược lại / Trái lại','Instead / On the contrary','你越解释，他反而更生气。','Bạn càng giải thích, anh ấy lại càng giận hơn.','adverb'],
  [14,'毕竟','bì jìng','Dù sao / Xét cho cùng','After all','毕竟他是你的朋友。','Dù sao anh ấy cũng là bạn bạn.','adverb'],
  [14,'况且','kuàng qiě','Hơn nữa / Vả lại','Moreover / Besides','我很忙，况且也没钱。','Tôi rất bận, hơn nữa cũng không có tiền.','conjunction'],
  [14,'何况','hé kuàng','Huống hồ / Huống chi','Let alone / Much less','大人都做不到，何况孩子？','Người lớn còn không làm được, huống hồ trẻ em?','conjunction'],
  [14,'一方面','yī fāng miàn','Một mặt','On one hand','一方面要工作，一方面要学习。','Một mặt phải làm việc, mặt khác phải học tập.','other'],
  [14,'总而言之','zǒng ér yán zhī','Tóm lại','In summary / In short','总而言之，这次活动很成功。','Tóm lại, sự kiện lần này rất thành công.','other'],
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const lessonIds = [];
    for (const l of lessons) {
      const [ex] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?', [l.title, l.level]);
      if (ex.length > 0) { lessonIds.push(ex[0].id); console.log(`  exists: ${l.title}`); continue; }
      const [r] = await conn.query(
        'INSERT INTO lessons (title, title_zh, description, hsk_level, order_index) VALUES (?,?,?,?,?)',
        [l.title, l.title_zh, l.desc, l.level, l.order]
      );
      lessonIds.push(r.insertId);
      console.log(`  ✓ ${l.title} (${r.insertId})`);
    }
    let ins = 0, skip = 0;
    for (const v of vocab) {
      const [li, hanzi, pinyin, vi, en, exZh, exVi, type] = v;
      const lid = lessonIds[li];
      const [ex] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?', [hanzi, lid]);
      if (ex.length > 0) { skip++; continue; }
      await conn.query(
        'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
        [lid, hanzi, pinyin, vi, en, exZh, exVi, 'HSK4', type]
      );
      ins++;
    }
    await conn.commit();
    console.log(`\n✅ HSK4: ${lessonIds.length} lessons, ${ins} vocab (${skip} skipped)`);
  } catch(e) { await conn.rollback(); console.error('❌', e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
