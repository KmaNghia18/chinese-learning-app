// backend/src/db/seed_hsk5.js
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title: 'Triết học & Nhân sinh quan', title_zh: '哲学与人生观', desc: 'Quan điểm sống, triết lý và nhân sinh', level: 'HSK5', order: 1 },
  { title: 'Chính trị & Quản trị', title_zh: '政治与治理', desc: 'Chính sách nhà nước và quản trị xã hội', level: 'HSK5', order: 2 },
  { title: 'Kinh tế vĩ mô', title_zh: '宏观经济', desc: 'Kinh tế toàn cầu và vĩ mô', level: 'HSK5', order: 3 },
  { title: 'Nghiên cứu & Học thuật', title_zh: '研究与学术', desc: 'Phương pháp nghiên cứu và ngôn ngữ học thuật', level: 'HSK5', order: 4 },
  { title: 'Truyền thông & Báo chí', title_zh: '传媒与新闻', desc: 'Báo chí, truyền thông và thông tin đại chúng', level: 'HSK5', order: 5 },
  { title: 'Y học & Sức khỏe nâng cao', title_zh: '医学与健康进阶', desc: 'Y học hiện đại và chăm sóc sức khỏe', level: 'HSK5', order: 6 },
  { title: 'Lịch sử & Địa lý', title_zh: '历史与地理', desc: 'Lịch sử Trung Quốc và địa lý thế giới', level: 'HSK5', order: 7 },
  { title: 'Văn hóa & Nghệ thuật nâng cao', title_zh: '文化艺术进阶', desc: 'Nghệ thuật cao cấp và di sản văn hóa', level: 'HSK5', order: 8 },
  { title: 'Tâm lý học', title_zh: '心理学', desc: 'Tâm lý, hành vi con người và xã hội', level: 'HSK5', order: 9 },
  { title: 'Luận điểm & Lập luận', title_zh: '论点与论证', desc: 'Kỹ năng lập luận và diễn đạt phức tạp', level: 'HSK5', order: 10 },
  { title: 'Thành ngữ thông dụng', title_zh: '常用成语', desc: 'Thành ngữ 4 chữ phổ biến trong tiếng Trung', level: 'HSK5', order: 11 },
  { title: 'Kinh doanh & Khởi nghiệp', title_zh: '商业与创业', desc: 'Từ vựng kinh doanh và khởi nghiệp', level: 'HSK5', order: 12 },
];

const vocab = [
  // Bài 1: Triết học & Nhân sinh
  [0,'观念','guān niàn','Quan niệm / Khái niệm','Concept / Notion','更新观念很重要。','Cập nhật quan niệm rất quan trọng.','noun'],
  [0,'意识','yì shí','Ý thức','Consciousness / Awareness','提高环保意识。','Nâng cao ý thức bảo vệ môi trường.','noun'],
  [0,'本质','běn zhì','Bản chất','Essence / Nature','事情的本质是什么？','Bản chất của sự việc là gì?','noun'],
  [0,'现象','xiàn xiàng','Hiện tượng','Phenomenon','这是普遍现象。','Đây là hiện tượng phổ biến.','noun'],
  [0,'规律','guī lǜ','Quy luật','Law / Pattern','遵循自然规律。','Tuân theo quy luật tự nhiên.','noun'],
  [0,'矛盾','máo dùn','Mâu thuẫn','Contradiction','这个说法有矛盾。','Lập luận này có mâu thuẫn.','noun'],
  [0,'辩证','biàn zhèng','Biện chứng','Dialectical','辩证地看问题。','Nhìn nhận vấn đề một cách biện chứng.','adjective'],
  [0,'逻辑','luó ji','Logic','Logic','思维要有逻辑。','Tư duy phải có logic.','noun'],
  [0,'抽象','chōu xiàng','Trừu tượng','Abstract','这个概念很抽象。','Khái niệm này rất trừu tượng.','adjective'],
  [0,'具体','jù tǐ','Cụ thể','Concrete / Specific','请举个具体例子。','Hãy đưa ra ví dụ cụ thể.','adjective'],
  [0,'相对','xiāng duì','Tương đối','Relative','一切都是相对的。','Mọi thứ đều là tương đối.','adjective'],
  [0,'绝对','jué duì','Tuyệt đối','Absolute','绝对的真理存在吗？','Có tồn tại chân lý tuyệt đối không?','adjective'],

  // Bài 2: Chính trị & Quản trị
  [1,'主权','zhǔ quán','Chủ quyền','Sovereignty','维护国家主权。','Bảo vệ chủ quyền quốc gia.','noun'],
  [1,'改革','gǎi gé','Cải cách','Reform','推进制度改革。','Thúc đẩy cải cách thể chế.','noun'],
  [1,'开放','kāi fàng','Mở cửa / Cởi mở','Open / Open up','改革开放40年。','40 năm cải cách mở cửa.','verb'],
  [1,'治理','zhì lǐ','Trị lý / Quản trị','Govern / Governance','社会治理现代化。','Hiện đại hóa quản trị xã hội.','verb'],
  [1,'监督','jiān dū','Giám sát / Kiểm soát','Supervise / Oversee','加强监督机制。','Tăng cường cơ chế giám sát.','verb'],
  [1,'执行','zhí xíng','Thực thi / Chấp hành','Execute / Carry out','严格执行法律。','Thực thi pháp luật nghiêm khắc.','verb'],
  [1,'协商','xié shāng','Hiệp thương / Thương lượng','Consult / Negotiate','双方协商解决问题。','Hai bên thương lượng giải quyết vấn đề.','verb'],
  [1,'民意','mín yì','Dân ý / Ý kiến nhân dân','Public opinion','尊重民意。','Tôn trọng ý kiến nhân dân.','noun'],
  [1,'透明','tòu míng','Minh bạch','Transparent','政策要透明。','Chính sách phải minh bạch.','adjective'],
  [1,'廉洁','lián jié','Liêm khiết','Honest / Incorruptible','廉洁奉公是美德。','Liêm khiết phụng sự là đức tính.','adjective'],
  [1,'稳定','wěn dìng','Ổn định','Stable / Stabilize','保持社会稳定。','Duy trì sự ổn định xã hội.','adjective'],
  [1,'秩序','zhì xù','Trật tự','Order','维护社会秩序。','Duy trì trật tự xã hội.','noun'],

  // Bài 3: Kinh tế vĩ mô
  [2,'通货膨胀','tōng huò péng zhàng','Lạm phát','Inflation','控制通货膨胀。','Kiểm soát lạm phát.','noun'],
  [2,'国内生产总值','guó nèi shēng chǎn zǒng zhí','GDP','GDP','GDP增长了5%。','GDP tăng trưởng 5%.','noun'],
  [2,'失业率','shī yè lǜ','Tỷ lệ thất nghiệp','Unemployment rate','降低失业率。','Giảm tỷ lệ thất nghiệp.','noun'],
  [2,'供给','gōng jǐ','Cung cấp / Nguồn cung','Supply','供给和需求平衡。','Cân bằng cung và cầu.','noun'],
  [2,'需求','xū qiú','Nhu cầu','Demand','市场需求旺盛。','Nhu cầu thị trường mạnh mẽ.','noun'],
  [2,'利率','lì lǜ','Lãi suất','Interest rate','央行调整利率。','Ngân hàng trung ương điều chỉnh lãi suất.','noun'],
  [2,'货币','huò bì','Tiền tệ','Currency','人民币国际化。','Quốc tế hóa đồng nhân dân tệ.','noun'],
  [2,'债务','zhài wù','Nợ / Khoản nợ','Debt','国家债务增加了。','Nợ quốc gia đã tăng lên.','noun'],
  [2,'股市','gǔ shì','Thị trường chứng khoán','Stock market','股市波动很大。','Thị trường chứng khoán biến động nhiều.','noun'],
  [2,'通缩','tōng suō','Giảm phát','Deflation','防止经济通缩。','Ngăn chặn giảm phát kinh tế.','noun'],
  [2,'财政','cái zhèng','Tài chính (nhà nước)','Finance / Fiscal','财政政策很重要。','Chính sách tài chính rất quan trọng.','noun'],
  [2,'资本','zī běn','Vốn / Tư bản','Capital','吸引外资。','Thu hút vốn đầu tư nước ngoài.','noun'],

  // Bài 4: Nghiên cứu & Học thuật
  [3,'方法论','fāng fǎ lùn','Phương pháp luận','Methodology','研究需要方法论。','Nghiên cứu cần phương pháp luận.','noun'],
  [3,'假设','jiǎ shè','Giả thuyết','Hypothesis','提出一个假设。','Đưa ra một giả thuyết.','noun'],
  [3,'证明','zhèng míng','Chứng minh','Prove / Proof','用数据证明观点。','Dùng dữ liệu để chứng minh quan điểm.','verb'],
  [3,'反驳','fǎn bó','Phản bác / Bác bỏ','Refute / Counter','他反驳了我的观点。','Anh ấy đã phản bác quan điểm của tôi.','verb'],
  [3,'综合','zōng hé','Tổng hợp','Synthesize / Comprehensive','综合分析各方数据。','Tổng hợp phân tích dữ liệu các bên.','verb'],
  [3,'客观','kè guān','Khách quan','Objective','保持客观态度。','Giữ thái độ khách quan.','adjective'],
  [3,'主观','zhǔ guān','Chủ quan','Subjective','避免主观判断。','Tránh phán đoán chủ quan.','adjective'],
  [3,'参考','cān kǎo','Tham khảo','Reference / Refer to','请参考这份报告。','Hãy tham khảo bản báo cáo này.','verb'],
  [3,'引用','yǐn yòng','Trích dẫn','Quote / Cite','论文需要引用文献。','Luận văn cần trích dẫn tài liệu.','verb'],
  [3,'文献','wén xiàn','Tài liệu / Văn bản','Literature / Document','查阅相关文献。','Tra cứu tài liệu liên quan.','noun'],
  [3,'结果','jié guǒ','Kết quả','Result / Outcome','实验结果很意外。','Kết quả thí nghiệm rất bất ngờ.','noun'],
  [3,'影响力','yǐng xiǎng lì','Sức ảnh hưởng','Influence / Impact','这位学者影响力很大。','Học giả này có tầm ảnh hưởng lớn.','noun'],

  // Bài 5: Truyền thông & Báo chí
  [4,'媒体','méi tǐ','Truyền thông / Phương tiện','Media','社交媒体很流行。','Mạng xã hội rất phổ biến.','noun'],
  [4,'报道','bào dào','Đưa tin / Phóng sự','Report / Cover','记者报道了事件。','Phóng viên đã đưa tin về sự kiện.','verb'],
  [4,'舆论','yú lùn','Dư luận','Public opinion','引起广泛舆论。','Gây ra dư luận rộng rãi.','noun'],
  [4,'谣言','yáo yán','Tin đồn','Rumor','不要传播谣言。','Đừng lan truyền tin đồn.','noun'],
  [4,'真相','zhēn xiàng','Sự thật','Truth','追求真相。','Theo đuổi sự thật.','noun'],
  [4,'审查','shěn chá','Kiểm duyệt','Censor / Review','媒体内容受审查。','Nội dung truyền thông bị kiểm duyệt.','verb'],
  [4,'信息量','xìn xī liàng','Lượng thông tin','Amount of information','信息量太大了。','Lượng thông tin quá lớn.','noun'],
  [4,'版权','bǎn quán','Bản quyền','Copyright','保护原创版权。','Bảo vệ bản quyền gốc.','noun'],
  [4,'自媒体','zì méi tǐ','Tự truyền thông / Kênh cá nhân','Self-media / Vlogger','自媒体时代已来临。','Thời đại tự truyền thông đã đến.','noun'],
  [4,'算法推送','suàn fǎ tuī sòng','Gợi ý thuật toán','Algorithm recommendation','算法推送影响信息获取。','Gợi ý thuật toán ảnh hưởng đến tiếp nhận thông tin.','noun'],
  [4,'新闻自由','xīn wén zì yóu','Tự do báo chí','Press freedom','新闻自由是基本权利。','Tự do báo chí là quyền cơ bản.','noun'],
  [4,'假新闻','jiǎ xīn wén','Tin tức giả','Fake news','假新闻危害社会。','Tin tức giả gây hại cho xã hội.','noun'],

  // Bài 6: Y học nâng cao
  [5,'基因','jī yīn','Gen / Gene','Gene','基因研究很重要。','Nghiên cứu gen rất quan trọng.','noun'],
  [5,'免疫','miǎn yì','Miễn dịch','Immunity / Immune','增强免疫力。','Tăng cường khả năng miễn dịch.','noun'],
  [5,'疫苗','yì miáo','Vaccine','Vaccine','接种疫苗预防疾病。','Tiêm vaccine để phòng bệnh.','noun'],
  [5,'慢性病','màn xìng bìng','Bệnh mãn tính','Chronic disease','慢性病需要长期治疗。','Bệnh mãn tính cần điều trị lâu dài.','noun'],
  [5,'诊断','zhěn duàn','Chẩn đoán','Diagnose','医生诊断了病情。','Bác sĩ đã chẩn đoán bệnh tình.','verb'],
  [5,'治疗','zhì liáo','Điều trị / Chữa trị','Treat / Treatment','接受正规治疗。','Tiếp nhận điều trị chính quy.','verb'],
  [5,'预防','yù fáng','Phòng ngừa','Prevent / Prevention','预防胜于治疗。','Phòng bệnh hơn chữa bệnh.','verb'],
  [5,'传染病','chuán rǎn bìng','Bệnh truyền nhiễm','Infectious disease','防控传染病。','Phòng chống bệnh truyền nhiễm.','noun'],
  [5,'心理健康','xīn lǐ jiàn kāng','Sức khỏe tâm lý','Mental health','重视心理健康。','Coi trọng sức khỏe tâm lý.','noun'],
  [5,'临床','lín chuáng','Lâm sàng','Clinical','临床试验结果良好。','Kết quả thử nghiệm lâm sàng tốt.','adjective'],
  [5,'病历','bìng lì','Hồ sơ bệnh án','Medical record','查看病历。','Xem hồ sơ bệnh án.','noun'],
  [5,'康复','kāng fù','Hồi phục / Phục hồi','Recover / Rehabilitation','术后康复需要时间。','Phục hồi sau phẫu thuật cần thời gian.','verb'],

  // Bài 7: Lịch sử & Địa lý
  [6,'朝代','cháo dài','Triều đại','Dynasty','唐朝是盛世。','Nhà Đường là thời kỳ thịnh vượng.','noun'],
  [6,'皇帝','huáng dì','Hoàng đế','Emperor','秦始皇是第一位皇帝。','Tần Thủy Hoàng là hoàng đế đầu tiên.','noun'],
  [6,'历史遗迹','lì shǐ yí jī','Di tích lịch sử','Historical site','长城是著名历史遗迹。','Vạn Lý Trường Thành là di tích lịch sử nổi tiếng.','noun'],
  [6,'地理位置','dì lǐ wèi zhì','Vị trí địa lý','Geographical location','中国地理位置优越。','Vị trí địa lý của Trung Quốc rất thuận lợi.','noun'],
  [6,'气候带','qì hòu dài','Đới khí hậu','Climate zone','中国跨多个气候带。','Trung Quốc trải dài qua nhiều đới khí hậu.','noun'],
  [6,'文化遗产','wén huà yí chǎn','Di sản văn hóa','Cultural heritage','保护文化遗产。','Bảo vệ di sản văn hóa.','noun'],
  [6,'古迹','gǔ jì','Cổ tích / Di tích cổ','Ancient site','参观古迹很有意义。','Tham quan di tích cổ rất có ý nghĩa.','noun'],
  [6,'移民','yí mín','Di dân / Di cư','Immigrant / Emigrate','历史上有很多移民。','Trong lịch sử có rất nhiều người di cư.','noun'],
  [6,'殖民','zhí mín','Thuộc địa hóa','Colonize','反对殖民主义。','Phản đối chủ nghĩa thực dân.','verb'],
  [6,'革命','gé mìng','Cách mạng','Revolution','工业革命改变世界。','Cách mạng công nghiệp thay đổi thế giới.','noun'],
  [6,'改朝换代','gǎi cháo huàn dài','Triều đại thay đổi','Change of dynasty','历史上多次改朝换代。','Trong lịch sử đã nhiều lần thay đổi triều đại.','verb'],
  [6,'丝绸之路','sī chóu zhī lù','Con đường tơ lụa','Silk Road','丝绸之路连接东西方。','Con đường tơ lụa kết nối Đông và Tây.','noun'],

  // Bài 8: Văn hóa & Nghệ thuật
  [7,'京剧','jīng jù','Kinh kịch','Peking Opera','京剧是中国国粹。','Kinh kịch là quốc túy Trung Quốc.','noun'],
  [7,'书法','shū fǎ','Thư pháp','Calligraphy','书法是一门艺术。','Thư pháp là một môn nghệ thuật.','noun'],
  [7,'国画','guó huà','Quốc họa (tranh thủy mặc)','Chinese painting','国画意境深远。','Quốc họa có ý cảnh sâu xa.','noun'],
  [7,'太极拳','tài jí quán','Thái cực quyền','Tai Chi','老人练太极拳健身。','Người già tập thái cực quyền để khỏe.','noun'],
  [7,'功夫','gōng fu','Công phu / Võ thuật','Kung Fu / Skill','中国功夫举世闻名。','Công phu Trung Quốc nổi tiếng thế giới.','noun'],
  [7,'陶瓷','táo cí','Gốm sứ','Pottery / Ceramics','景德镇陶瓷很有名。','Gốm sứ Cảnh Đức Trấn rất nổi tiếng.','noun'],
  [7,'刺绣','cì xiù','Thêu thùa','Embroidery','苏绣是中国名绣之一。','Thêu Tô Châu là một trong những thêu nổi tiếng của Trung Quốc.','noun'],
  [7,'剪纸','jiǎn zhǐ','Cắt giấy (nghệ thuật)','Paper cutting','剪纸是民间艺术。','Cắt giấy là nghệ thuật dân gian.','noun'],
  [7,'春节','chūn jié','Tết Nguyên Đán','Spring Festival / Chinese New Year','春节是最重要的节日。','Tết Nguyên Đán là ngày lễ quan trọng nhất.','noun'],
  [7,'中秋节','zhōng qiū jié','Tết Trung Thu','Mid-Autumn Festival','中秋节吃月饼。','Tết Trung Thu ăn bánh trung thu.','noun'],
  [7,'端午节','duān wǔ jié','Tết Đoan Ngọ','Dragon Boat Festival','端午节赛龙舟。','Tết Đoan Ngọ đua thuyền rồng.','noun'],
  [7,'年夜饭','nián yè fàn','Bữa cơm tất niên','New Year Eve dinner','全家一起吃年夜饭。','Cả gia đình cùng ăn bữa cơm tất niên.','noun'],

  // Bài 9: Tâm lý học
  [8,'行为','xíng wéi','Hành vi','Behavior','分析人类行为。','Phân tích hành vi con người.','noun'],
  [8,'动机','dòng jī','Động cơ / Mục tiêu','Motivation','了解做事的动机。','Hiểu động cơ làm việc.','noun'],
  [8,'潜意识','qián yì shí','Tiềm thức','Subconscious','潜意识影响行为。','Tiềm thức ảnh hưởng đến hành vi.','noun'],
  [8,'认知','rèn zhī','Nhận thức','Cognition / Perception','认知影响决策。','Nhận thức ảnh hưởng đến quyết định.','noun'],
  [8,'情绪管理','qíng xù guǎn lǐ','Quản lý cảm xúc','Emotional management','学会情绪管理。','Học cách quản lý cảm xúc.','noun'],
  [8,'抗压','kàng yā','Chịu áp lực','Stress resistance','提高抗压能力。','Nâng cao khả năng chịu áp lực.','verb'],
  [8,'焦虑','jiāo lǜ','Lo âu / Bồn chồn','Anxiety','现代人容易焦虑。','Người hiện đại dễ bị lo âu.','noun'],
  [8,'抑郁','yì yù','Trầm cảm','Depression','关注抑郁症患者。','Quan tâm đến người bị trầm cảm.','noun'],
  [8,'自我认知','zì wǒ rèn zhī','Tự nhận thức','Self-awareness','提高自我认知。','Nâng cao tự nhận thức.','noun'],
  [8,'同理心','tóng lǐ xīn','Đồng cảm / Empathy','Empathy','培养同理心。','Nuôi dưỡng sự đồng cảm.','noun'],
  [8,'心理韧性','xīn lǐ rèn xìng','Sức bền tâm lý','Psychological resilience','增强心理韧性。','Tăng cường sức bền tâm lý.','noun'],
  [8,'原生家庭','yuán shēng jiā tíng','Gia đình gốc','Family of origin','原生家庭影响性格。','Gia đình gốc ảnh hưởng đến tính cách.','noun'],

  // Bài 10: Luận điểm & Lập luận
  [9,'观点','guān diǎn','Quan điểm','Viewpoint / Standpoint','请说明你的观点。','Hãy trình bày quan điểm của bạn.','noun'],
  [9,'立场','lì chǎng','Lập trường','Position / Stance','坚持自己的立场。','Kiên trì lập trường của mình.','noun'],
  [9,'论据','lùn jù','Luận cứ / Bằng chứng','Argument / Evidence','提供充分的论据。','Cung cấp luận cứ đầy đủ.','noun'],
  [9,'推断','tuī duàn','Suy luận / Suy đoán','Infer / Deduce','从现象推断本质。','Từ hiện tượng suy luận bản chất.','verb'],
  [9,'归纳','guī nà','Quy nạp / Tổng kết','Induce / Sum up','归纳各种情况。','Quy nạp các tình huống.','verb'],
  [9,'演绎','yǎn yì','Diễn dịch','Deduce /演绎','用演绎法解题。','Dùng phương pháp diễn dịch để giải.','verb'],
  [9,'批判性思维','pī pàn xìng sī wéi','Tư duy phản biện','Critical thinking','培养批判性思维。','Nuôi dưỡng tư duy phản biện.','noun'],
  [9,'辩论','biàn lùn','Tranh luận / Biện luận','Debate','他们进行了激烈辩论。','Họ đã tranh luận gay gắt.','verb'],
  [9,'驳斥','bó chì','Bác bỏ / Phản bác','Refute / Rebut','用证据驳斥谣言。','Dùng bằng chứng bác bỏ tin đồn.','verb'],
  [9,'折中','zhé zhōng','Trung dung / Thỏa hiệp','Compromise / Middle ground','找到折中方案。','Tìm ra giải pháp thỏa hiệp.','verb'],
  [9,'两难','liǎng nán','Tiến thoái lưỡng nan','Dilemma','面临两难选择。','Đối mặt với lựa chọn tiến thoái lưỡng nan.','noun'],
  [9,'权衡','quán héng','Cân nhắc / Cân bằng','Weigh / Balance','权衡利弊再决定。','Cân nhắc lợi hại rồi quyết định.','verb'],

  // Bài 11: Thành ngữ
  [10,'一石二鸟','yī shí èr niǎo','Một mũi tên trúng hai đích','Kill two birds with one stone','这个方案一石二鸟。','Phương án này một mũi tên trúng hai đích.','other'],
  [10,'半途而废','bàn tú ér fèi','Bỏ dở giữa chừng','Give up halfway','做事不能半途而废。','Làm việc không được bỏ dở giữa chừng.','other'],
  [10,'马到成功','mǎ dào chéng gōng','Chúc thành công / Thắng lợi ngay','Immediate success','祝你马到成功！','Chúc bạn thành công ngay!','other'],
  [10,'守株待兔','shǒu zhū dài tù','Thủ chu đãi thố / Ngồi chờ sung rụng','Wait for a windfall','不能守株待兔。','Không thể ngồi chờ sung rụng.','other'],
  [10,'掩耳盗铃','yǎn ěr dào líng','Bịt tai trộm chuông / Tự lừa dối','Self-deception','掩耳盗铃是不行的。','Tự lừa dối là không được.','other'],
  [10,'井底之蛙','jǐng dǐ zhī wā','Ếch ngồi đáy giếng','A frog in the well','不要做井底之蛙。','Đừng làm ếch ngồi đáy giếng.','other'],
  [10,'画蛇添足','huà shé tiān zú','Vẽ rắn thêm chân / Làm thừa','Add legs to a snake','不要画蛇添足。','Đừng làm thừa không cần thiết.','other'],
  [10,'亡羊补牢','wáng yáng bǔ láo','Mất bò mới lo làm chuồng','Better late than never','亡羊补牢，犹未晚矣。','Mất bò mới lo làm chuồng, vẫn chưa muộn.','other'],
  [10,'三人成虎','sān rén chéng hǔ','Ba người thành cọp / Tin đồn','Rumor becomes reality','三人成虎，谣言可怕。','Tin đồn lan rộng rất đáng sợ.','other'],
  [10,'功亏一篑','gōng kuī yī kuì','Công dã tràng / Gần thành công lại thất bại','Fail at the last moment','不能功亏一篑。','Không thể thất bại khi gần thành công.','other'],
  [10,'有备无患','yǒu bèi wú huàn','Có chuẩn bị không lo hoạn nạn','Preparedness averts peril','有备无患，提前准备。','Chuẩn bị trước để không lo hoạn nạn.','other'],
  [10,'因地制宜','yīn dì zhì yí','Tùy địa phương mà ứng xử','Adapt to local conditions','因地制宜，灵活应对。','Tùy địa phương mà linh hoạt ứng phó.','other'],

  // Bài 12: Kinh doanh & Khởi nghiệp
  [11,'创业','chuàng yè','Khởi nghiệp','Start a business / Entrepreneurship','他辞职去创业了。','Anh ấy đã từ chức để khởi nghiệp.','verb'],
  [11,'融资','róng zī','Gọi vốn / Huy động vốn','Finance / Raise funds','初创公司需要融资。','Công ty khởi nghiệp cần gọi vốn.','verb'],
  [11,'风险投资','fēng xiǎn tóu zī','Đầu tư mạo hiểm','Venture capital','获得风险投资支持。','Nhận được hỗ trợ đầu tư mạo hiểm.','noun'],
  [11,'商业模式','shāng yè mó shì','Mô hình kinh doanh','Business model','这家公司商业模式独特。','Mô hình kinh doanh của công ty này rất độc đáo.','noun'],
  [11,'品牌','pǐn pái','Thương hiệu','Brand','建立强大品牌。','Xây dựng thương hiệu mạnh.','noun'],
  [11,'营销','yíng xiāo','Tiếp thị / Marketing','Marketing','做好产品营销。','Làm tốt tiếp thị sản品.','verb'],
  [11,'用户体验','yòng hù tǐ yàn','Trải nghiệm người dùng','User experience','提升用户体验。','Nâng cao trải nghiệm người dùng.','noun'],
  [11,'盈利','yíng lì','Có lợi nhuận / Sinh lời','Profitable / Make profit','公司开始盈利了。','Công ty bắt đầu có lợi nhuận.','verb'],
  [11,'亏损','kuī sǔn','Thua lỗ','Loss-making','公司出现亏损。','Công ty xuất hiện thua lỗ.','noun'],
  [11,'转型','zhuǎn xíng','Chuyển đổi / Tái cơ cấu','Transform / Transition','企业数字化转型。','Chuyển đổi số của doanh nghiệp.','verb'],
  [11,'战略','zhàn lüè','Chiến lược','Strategy','制定长期战略。','Đặt ra chiến lược dài hạn.','noun'],
  [11,'核心竞争力','hé xīn jìng zhēng lì','Năng lực cạnh tranh cốt lõi','Core competitiveness','打造核心竞争力。','Xây dựng năng lực cạnh tranh cốt lõi.','noun'],
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
        [lid, hanzi, pinyin, vi, en, exZh, exVi, 'HSK5', type]
      );
      ins++;
    }
    await conn.commit();
    console.log(`\n✅ HSK5: ${lessonIds.length} lessons, ${ins} vocab (${skip} skipped)`);
  } catch(e) { await conn.rollback(); console.error('❌', e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
