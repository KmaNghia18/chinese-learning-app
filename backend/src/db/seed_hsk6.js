// backend/src/db/seed_hsk6.js
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title: 'Ngôn ngữ học & Văn phong', title_zh: '语言学与文体', desc: 'Phong cách viết, thuật ngữ ngôn ngữ học', level: 'HSK6', order: 1 },
  { title: 'Triết học phương Đông & phương Tây', title_zh: '东西方哲学', desc: 'Tư tưởng Khổng Tử, Lão Tử và triết học hiện đại', level: 'HSK6', order: 2 },
  { title: 'Kinh tế học nâng cao', title_zh: '高级经济学', desc: 'Lý thuyết kinh tế, thị trường và toàn cầu hóa', level: 'HSK6', order: 3 },
  { title: 'Khoa học & Công nghệ tương lai', title_zh: '未来科技', desc: 'Công nghệ nano, không gian và sinh học', level: 'HSK6', order: 4 },
  { title: 'Xã hội học & Nhân loại học', title_zh: '社会学与人类学', desc: 'Cấu trúc xã hội và nghiên cứu nhân loại', level: 'HSK6', order: 5 },
  { title: 'Luật pháp quốc tế', title_zh: '国际法律', desc: 'Hiệp ước, tổ chức quốc tế và luật pháp', level: 'HSK6', order: 6 },
  { title: 'Văn học Trung Quốc cổ điển', title_zh: '中国古典文学', desc: 'Tứ đại danh tác và văn học cổ điển', level: 'HSK6', order: 7 },
  { title: 'Môi trường & Phát triển bền vững', title_zh: '环境与可持续发展', desc: 'Biến đổi khí hậu và giải pháp bền vững', level: 'HSK6', order: 8 },
  { title: 'Tâm lý xã hội & Hành vi nhóm', title_zh: '社会心理与群体行为', desc: 'Tâm lý đám đông và hành vi xã hội', level: 'HSK6', order: 9 },
  { title: 'Thành ngữ & Tục ngữ nâng cao', title_zh: '高级成语与谚语', desc: 'Thành ngữ, tục ngữ và điển cố văn học', level: 'HSK6', order: 10 },
  { title: 'Hùng biện & Diễn thuyết', title_zh: '演讲与辩论', desc: 'Kỹ năng hùng biện và diễn thuyết', level: 'HSK6', order: 11 },
  { title: 'Văn bản chính thức & Hành chính', title_zh: '正式文书与行政', desc: 'Viết văn bản chính thức và thuật ngữ hành chính', level: 'HSK6', order: 12 },
];

const vocab = [
  // Bài 1: Ngôn ngữ học
  [0,'语境','yǔ jìng','Ngữ cảnh / Bối cảnh','Context','理解语境很重要。','Hiểu ngữ cảnh rất quan trọng.','noun'],
  [0,'隐喻','yǐn yù','Ẩn dụ','Metaphor','这句话用了隐喻。','Câu này dùng ẩn dụ.','noun'],
  [0,'修辞','xiū cí','Tu từ / Biện pháp tu từ','Rhetoric / Figure of speech','善用修辞手法。','Khéo dùng biện pháp tu từ.','noun'],
  [0,'语义','yǔ yì','Ngữ nghĩa','Semantics / Meaning','分析词语的语义。','Phân tích ngữ nghĩa của từ.','noun'],
  [0,'歧义','qí yì','Nghĩa mơ hồ / Đa nghĩa','Ambiguity','这句话有歧义。','Câu này có nghĩa mơ hồ.','noun'],
  [0,'措辞','cuò cí','Dùng từ / Lựa chọn từ ngữ','Wording / Phrasing','措辞要谨慎。','Dùng từ phải cẩn thận.','noun'],
  [0,'叙述','xù shù','Kể chuyện / Trình bày','Narrate / Narrative','叙述事情要清楚。','Kể chuyện phải rõ ràng.','verb'],
  [0,'议论','yì lùn','Lập luận / Bình luận','Argumentation','这篇是议论文。','Bài này là văn nghị luận.','verb'],
  [0,'比喻','bǐ yù','Ví von / So sánh (tu từ)','Simile / Metaphor','用比喻让文章生动。','Dùng so sánh làm bài viết sinh động.','noun'],
  [0,'排比','pái bǐ','Phép điệp cú (tu từ)','Parallelism','排比句增强气势。','Câu điệp cú tăng cường khí thế.','noun'],
  [0,'引申','yǐn shēn','Mở rộng nghĩa / Dẫn dắt','Extend meaning / Elaborate','由此引申出新含义。','Từ đây mở rộng ra nghĩa mới.','verb'],
  [0,'语气','yǔ qì','Ngữ khí / Giọng điệu','Tone / Mood','用温和的语气说话。','Nói chuyện bằng giọng điệu ôn hòa.','noun'],

  // Bài 2: Triết học Đông Tây
  [1,'儒家','rú jiā','Nho giáo','Confucianism','儒家思想影响巨大。','Tư tưởng Nho giáo có ảnh hưởng lớn.','noun'],
  [1,'道家','dào jiā','Đạo giáo / Lão Tử','Taoism','道家追求自然之道。','Đạo giáo theo đuổi đạo của tự nhiên.','noun'],
  [1,'仁义礼智信','rén yì lǐ zhì xìn','Nhân Nghĩa Lễ Trí Tín','Benevolence, righteousness, courtesy, wisdom, faithfulness','儒家五常：仁义礼智信。','Ngũ thường Nho giáo: Nhân Nghĩa Lễ Trí Tín.','noun'],
  [1,'辩证法','biàn zhèng fǎ','Phép biện chứng','Dialectics','马克思主义辩证法。','Phép biện chứng Mác-xít.','noun'],
  [1,'本体论','běn tǐ lùn','Bản thể luận','Ontology','本体论研究存在本质。','Bản thể luận nghiên cứu bản chất tồn tại.','noun'],
  [1,'认识论','rèn shí lùn','Nhận thức luận','Epistemology','认识论研究知识来源。','Nhận thức luận nghiên cứu nguồn gốc tri thức.','noun'],
  [1,'存在主义','cún zài zhǔ yì','Chủ nghĩa hiện sinh','Existentialism','萨特是存在主义代表。','Sartre là đại diện của chủ nghĩa hiện sinh.','noun'],
  [1,'虚无主义','xū wú zhǔ yì','Chủ nghĩa hư vô','Nihilism','虚无主义否定一切意义。','Chủ nghĩa hư vô phủ nhận mọi ý nghĩa.','noun'],
  [1,'天人合一','tiān rén hé yī','Thiên nhân hợp nhất','Unity of heaven and man','道家主张天人合一。','Đạo giáo chủ trương thiên nhân hợp nhất.','noun'],
  [1,'无为而治','wú wéi ér zhì','Vô vi nhi trị','Govern by non-action (Taoism)','老子主张无为而治。','Lão Tử chủ trương vô vi nhi trị.','other'],
  [1,'知行合一','zhī xíng hé yī','Tri hành hợp nhất','Unity of knowing and acting','王阳明主张知行合一。','Vương Dương Minh chủ trương tri hành hợp nhất.','other'],
  [1,'克己复礼','kè jǐ fù lǐ','Khắc kỷ phục lễ','Restrain oneself and restore ritual','孔子强调克己复礼。','Khổng Tử nhấn mạnh khắc kỷ phục lễ.','other'],

  // Bài 3: Kinh tế học nâng cao
  [2,'全球化','quán qiú huà','Toàn cầu hóa','Globalization','全球化加速了贸易。','Toàn cầu hóa thúc đẩy thương mại.','noun'],
  [2,'供应链','gōng yìng liàn','Chuỗi cung ứng','Supply chain','全球供应链很复杂。','Chuỗi cung ứng toàn cầu rất phức tạp.','noun'],
  [2,'数字经济','shù zì jīng jì','Kinh tế số','Digital economy','数字经济是新引擎。','Kinh tế số là động cơ mới.','noun'],
  [2,'共享经济','gòng xiǎng jīng jì','Kinh tế chia sẻ','Sharing economy','共享经济改变生活。','Kinh tế chia sẻ thay đổi cuộc sống.','noun'],
  [2,'垄断','lǒng duàn','Độc quyền','Monopoly','反对市场垄断。','Phản đối độc quyền thị trường.','noun'],
  [2,'外汇储备','wài huì chǔ bèi','Dự trữ ngoại hối','Foreign exchange reserves','增加外汇储备。','Tăng dự trữ ngoại hối.','noun'],
  [2,'财政赤字','cái zhèng chì zì','Thâm hụt ngân sách','Fiscal deficit','控制财政赤字。','Kiểm soát thâm hụt ngân sách.','noun'],
  [2,'贸易逆差','mào yì nì chā','Thâm hụt thương mại','Trade deficit','缩小贸易逆差。','Thu hẹp thâm hụt thương mại.','noun'],
  [2,'经济体制','jīng jì tǐ zhì','Thể chế kinh tế','Economic system','改革经济体制。','Cải cách thể chế kinh tế.','noun'],
  [2,'市场化','shì chǎng huà','Thị trường hóa','Marketization','推动资源市场化配置。','Thúc đẩy phân bổ nguồn lực theo thị trường.','verb'],
  [2,'宏观调控','hóng guān tiáo kòng','Điều tiết vĩ mô','Macro regulation','政府进行宏观调控。','Chính phủ thực hiện điều tiết vĩ mô.','noun'],
  [2,'经济周期','jīng jì zhōu qī','Chu kỳ kinh tế','Economic cycle','了解经济周期规律。','Hiểu quy luật chu kỳ kinh tế.','noun'],

  // Bài 4: Khoa học tương lai
  [3,'量子计算','liàng zi jì suàn','Máy tính lượng tử','Quantum computing','量子计算将改变科技。','Máy tính lượng tử sẽ thay đổi công nghệ.','noun'],
  [3,'基因编辑','jī yīn biān jí','Chỉnh sửa gen','Gene editing','基因编辑引发伦理争议。','Chỉnh sửa gen gây ra tranh cãi đạo đức.','noun'],
  [3,'纳米技术','nà mǐ jì shù','Công nghệ nano','Nanotechnology','纳米技术应用广泛。','Công nghệ nano được ứng dụng rộng rãi.','noun'],
  [3,'航天','háng tiān','Hàng không vũ trụ','Aerospace / Astronautics','中国航天事业发展迅速。','Sự nghiệp hàng không vũ trụ Trung Quốc phát triển nhanh.','noun'],
  [3,'虚拟现实','xū nǐ xiàn shí','Thực tế ảo','Virtual reality (VR)','虚拟现实改变娱乐方式。','VR thay đổi phương thức giải trí.','noun'],
  [3,'增强现实','zēng qiáng xiàn shí','Thực tế tăng cường','Augmented reality (AR)','AR在教育中有应用。','AR có ứng dụng trong giáo dục.','noun'],
  [3,'元宇宙','yuán yǔ zhòu','Metaverse','Metaverse','元宇宙是新兴概念。','Metaverse là khái niệm mới nổi.','noun'],
  [3,'可再生能源','kě zài shēng néng yuán','Năng lượng tái tạo','Renewable energy','大力发展可再生能源。','Phát triển mạnh năng lượng tái tạo.','noun'],
  [3,'碳中和','tàn zhōng hé','Trung hòa carbon','Carbon neutrality','实现碳中和目标。','Đạt mục tiêu trung hòa carbon.','noun'],
  [3,'脑机接口','nǎo jī jiē kǒu','Giao diện não-máy tính','Brain-computer interface','马斯克研究脑机接口。','Musk nghiên cứu giao diện não-máy tính.','noun'],
  [3,'生物技术','shēng wù jì shù','Công nghệ sinh học','Biotechnology','生物技术造福人类。','Công nghệ sinh học có lợi cho nhân loại.','noun'],
  [3,'智能制造','zhì néng zhì zào','Sản xuất thông minh','Intelligent manufacturing','推进智能制造升级。','Thúc đẩy nâng cấp sản xuất thông minh.','noun'],

  // Bài 5: Xã hội học
  [4,'阶层','jiē céng','Tầng lớp / Giai cấp','Social class / Stratum','社会阶层固化问题。','Vấn đề phân tầng xã hội ngày càng cứng nhắc.','noun'],
  [4,'社会流动性','shè huì liú dòng xìng','Tính lưu động xã hội','Social mobility','提高社会流动性。','Nâng cao tính lưu động xã hội.','noun'],
  [4,'边缘化','biān yuán huà','Bị gạt ra ngoài lề','Marginalize','防止群体被边缘化。','Ngăn chặn nhóm bị gạt ra ngoài lề.','verb'],
  [4,'文化认同','wén huà rèn tóng','Bản sắc văn hóa','Cultural identity','保护文化认同。','Bảo vệ bản sắc văn hóa.','noun'],
  [4,'全球公民','quán qiú gōng mín','Công dân toàn cầu','Global citizen','培养全球公民意识。','Nuôi dưỡng ý thức công dân toàn cầu.','noun'],
  [4,'人口老龄化','rén kǒu lǎo líng huà','Già hóa dân số','Population aging','应对人口老龄化挑战。','Ứng phó thách thức già hóa dân số.','noun'],
  [4,'城镇化','chéng zhèn huà','Đô thị hóa','Urbanization','加快城镇化进程。','Đẩy nhanh quá trình đô thị hóa.','noun'],
  [4,'贫富差距','pín fù chā jù','Khoảng cách giàu nghèo','Wealth gap','缩小贫富差距。','Thu hẹp khoảng cách giàu nghèo.','noun'],
  [4,'社会保障','shè huì bǎo zhàng','An sinh xã hội','Social security','完善社会保障体系。','Hoàn thiện hệ thống an sinh xã hội.','noun'],
  [4,'数字鸿沟','shù zì hóng gōu','Khoảng cách kỹ thuật số','Digital divide','消除数字鸿沟。','Xóa bỏ khoảng cách kỹ thuật số.','noun'],
  [4,'社会契约','shè huì qì yuē','Khế ước xã hội','Social contract','遵守社会契约。','Tuân thủ khế ước xã hội.','noun'],
  [4,'集体主义','jí tǐ zhǔ yì','Chủ nghĩa tập thể','Collectivism','集体主义与个人主义。','Chủ nghĩa tập thể và chủ nghĩa cá nhân.','noun'],

  // Bài 6: Luật pháp quốc tế
  [5,'联合国','lián hé guó','Liên Hợp Quốc','United Nations','中国是联合国成员。','Trung Quốc là thành viên Liên Hợp Quốc.','noun'],
  [5,'国际条约','guó jì tiáo yuē','Điều ước quốc tế','International treaty','签署国际条约。','Ký kết điều ước quốc tế.','noun'],
  [5,'争端解决','zhēng duān jiě jué','Giải quyết tranh chấp','Dispute resolution','通过对话解决争端。','Giải quyết tranh chấp qua đối thoại.','noun'],
  [5,'人权','rén quán','Nhân quyền','Human rights','保障基本人权。','Đảm bảo quyền con người cơ bản.','noun'],
  [5,'国际刑事法庭','guó jì xíng shì fǎ tíng','Tòa hình sự quốc tế','ICC','国际刑事法庭起诉战犯。','Tòa hình sự quốc tế truy tố tội phạm chiến tranh.','noun'],
  [5,'制裁','zhì cái','Chế tài / Trừng phạt','Sanction','经济制裁对国家影响大。','Chế tài kinh tế ảnh hưởng lớn đến quốc gia.','noun'],
  [5,'领土争端','lǐng tǔ zhēng duān','Tranh chấp lãnh thổ','Territorial dispute','和平解决领土争端。','Giải quyết tranh chấp lãnh thổ hòa bình.','noun'],
  [5,'难民','nàn mín','Người tị nạn','Refugee','接纳战争难民。','Tiếp nhận người tị nạn chiến tranh.','noun'],
  [5,'双边协议','shuāng biān xié yì','Hiệp định song phương','Bilateral agreement','签订双边贸易协议。','Ký kết hiệp định thương mại song phương.','noun'],
  [5,'多边主义','duō biān zhǔ yì','Chủ nghĩa đa phương','Multilateralism','推动多边主义合作。','Thúc đẩy hợp tác đa phương.','noun'],
  [5,'主权豁免','zhǔ quán huò miǎn','Miễn trừ chủ quyền','Sovereign immunity','主权豁免原则。','Nguyên tắc miễn trừ chủ quyền.','noun'],
  [5,'国际仲裁','guó jì zhòng cái','Trọng tài quốc tế','International arbitration','通过国际仲裁解决争端。','Giải quyết tranh chấp qua trọng tài quốc tế.','noun'],

  // Bài 7: Văn học Trung Quốc cổ điển
  [6,'四大名著','sì dà míng zhù','Tứ đại danh tác','Four great classic novels','四大名著是中国文学瑰宝。','Tứ đại danh tác là viên ngọc của văn học Trung Quốc.','noun'],
  [6,'红楼梦','hóng lóu mèng','Hồng Lâu Mộng','Dream of the Red Chamber','红楼梦描写封建社会。','Hồng Lâu Mộng mô tả xã hội phong kiến.','noun'],
  [6,'西游记','xī yóu jì','Tây Du Ký','Journey to the West','西游记是神话小说。','Tây Du Ký là tiểu thuyết thần thoại.','noun'],
  [6,'三国演义','sān guó yǎn yì','Tam Quốc Diễn Nghĩa','Romance of the Three Kingdoms','三国演义描写三国时期。','Tam Quốc Diễn Nghĩa mô tả thời kỳ Tam Quốc.','noun'],
  [6,'水浒传','shuǐ hǔ zhuàn','Thủy Hử','Outlaws of the Marsh','水浒传讲述108好汉故事。','Thủy Hử kể về 108 hảo hán.','noun'],
  [6,'李白','lǐ bái','Lý Bạch','Li Bai (poet)','李白是唐代著名诗人。','Lý Bạch là nhà thơ nổi tiếng thời Đường.','noun'],
  [6,'杜甫','dù fǔ','Đỗ Phủ','Du Fu (poet)','杜甫被称为诗圣。','Đỗ Phủ được gọi là Thi Thánh.','noun'],
  [6,'诗经','shī jīng','Kinh Thi','Book of Songs','诗经是最早诗歌集。','Kinh Thi là tập thơ ca sớm nhất.','noun'],
  [6,'道德经','dào dé jīng','Đạo Đức Kinh','Tao Te Ching','老子著道德经。','Lão Tử viết Đạo Đức Kinh.','noun'],
  [6,'论语','lún yǔ','Luận Ngữ','Analects of Confucius','论语记录孔子言行。','Luận Ngữ ghi lại ngôn hành của Khổng Tử.','noun'],
  [6,'史记','shǐ jì','Sử Ký','Records of the Grand Historian','司马迁著史记。','Tư Mã Thiên viết Sử Ký.','noun'],
  [6,'唐诗宋词','táng shī sòng cí','Thơ Đường Từ Tống','Tang poetry and Song ci','唐诗宋词是文学高峰。','Thơ Đường Từ Tống là đỉnh cao văn học.','noun'],

  // Bài 8: Môi trường & Bền vững
  [7,'生态文明','shēng tài wén míng','Văn minh sinh thái','Ecological civilization','建设生态文明社会。','Xây dựng xã hội văn minh sinh thái.','noun'],
  [7,'碳达峰','tàn dá fēng','Đỉnh carbon','Carbon peak','2030年前实现碳达峰。','Đạt đỉnh carbon trước năm 2030.','noun'],
  [7,'生物多样性','shēng wù duō yàng xìng','Đa dạng sinh học','Biodiversity','保护生物多样性。','Bảo vệ đa dạng sinh học.','noun'],
  [7,'荒漠化','huāng mò huà','Sa mạc hóa','Desertification','防止土地荒漠化。','Ngăn chặn sa mạc hóa đất đai.','noun'],
  [7,'水资源短缺','shuǐ zī yuán duǎn quē','Thiếu hụt tài nguyên nước','Water scarcity','全球面临水资源短缺。','Toàn cầu đối mặt với thiếu hụt tài nguyên nước.','noun'],
  [7,'绿色经济','lǜ sè jīng jì','Kinh tế xanh','Green economy','发展绿色循环经济。','Phát triển kinh tế xanh tuần hoàn.','noun'],
  [7,'循环经济','xún huán jīng jì','Kinh tế tuần hoàn','Circular economy','推动循环经济发展。','Thúc đẩy phát triển kinh tế tuần hoàn.','noun'],
  [7,'海平面上升','hǎi píng miàn shàng shēng','Mực nước biển dâng','Sea level rise','气候变化导致海平面上升。','Biến đổi khí hậu dẫn đến mực nước biển dâng.','noun'],
  [7,'极端气候','jí duān qì hòu','Thời tiết cực đoan','Extreme weather','极端气候事件增多。','Các sự kiện thời tiết cực đoan ngày càng nhiều.','noun'],
  [7,'碳税','tàn shuì','Thuế carbon','Carbon tax','实施碳税制度。','Thực hiện chế độ thuế carbon.','noun'],
  [7,'生态补偿','shēng tài bǔ cháng','Bồi thường sinh thái','Ecological compensation','建立生态补偿机制。','Xây dựng cơ chế bồi thường sinh thái.','noun'],
  [7,'绿色转型','lǜ sè zhuǎn xíng','Chuyển đổi xanh','Green transition','推动能源绿色转型。','Thúc đẩy chuyển đổi năng lượng xanh.','noun'],

  // Bài 9: Tâm lý xã hội
  [8,'从众心理','cóng zhòng xīn lǐ','Tâm lý đám đông','Herd mentality','从众心理影响决策。','Tâm lý đám đông ảnh hưởng đến quyết định.','noun'],
  [8,'刻板印象','kè bǎn yìn xiàng','Định kiến / Rập khuôn','Stereotype','消除刻板印象。','Xóa bỏ định kiến.','noun'],
  [8,'社会影响','shè huì yǐng xiǎng','Ảnh hưởng xã hội','Social influence','研究社会影响力。','Nghiên cứu sức ảnh hưởng xã hội.','noun'],
  [8,'群体极化','qún tǐ jí huà','Cực hóa tập thể','Group polarization','互联网加剧群体极化。','Internet làm trầm trọng hơn cực hóa tập thể.','noun'],
  [8,'回音壁效应','huí yīn bì xiào yìng','Hiệu ứng buồng vang','Echo chamber effect','社交媒体有回音壁效应。','Mạng xã hội có hiệu ứng buồng vang.','noun'],
  [8,'认知失调','rèn zhī shī diào','Bất hòa nhận thức','Cognitive dissonance','认知失调引发不适。','Bất hòa nhận thức gây ra sự khó chịu.','noun'],
  [8,'社会认同','shè huì rèn tóng','Nhận đồng xã hội','Social identity','寻求社会认同。','Tìm kiếm sự nhận đồng xã hội.','noun'],
  [8,'群体思维','qún tǐ sī wéi','Tư duy tập thể','Groupthink','避免群体思维的陷阱。','Tránh bẫy tư duy tập thể.','noun'],
  [8,'边际效用','biān jì xiào yòng','Tiện ích cận biên','Marginal utility','边际效用递减规律。','Quy luật tiện ích cận biên giảm dần.','noun'],
  [8,'社会资本','shè huì zī běn','Vốn xã hội','Social capital','积累社会资本。','Tích lũy vốn xã hội.','noun'],
  [8,'替代效应','tì dài xiào yìng','Hiệu ứng thay thế','Substitution effect','替代效应改变消费。','Hiệu ứng thay thế thay đổi tiêu dùng.','noun'],
  [8,'沉没成本','chén mò chéng běn','Chi phí chìm','Sunk cost','不受沉没成本影响。','Không bị chi phí chìm ảnh hưởng.','noun'],

  // Bài 10: Thành ngữ & Tục ngữ nâng cao
  [9,'以以以以以','yǐ yǐ yǐ yǐ yǐ','Lấy X trị X','Fight fire with fire','以子之矛攻子之盾。','Lấy mâu của anh đâm lá chắn của anh.','other'],
  [9,'卧薪尝胆','wò xīn cháng dǎn','Nằm gai nếm mật','Endure hardships for future success','卧薪尝胆，终成大业。','Nằm gai nếm mật, cuối cùng thành đại nghiệp.','other'],
  [9,'破釜沉舟','pò fǔ chén zhōu','Phá nồi chìm thuyền / Quyết tâm','Burn one bridges / Determined','破釜沉舟，背水一战。','Phá nồi chìm thuyền, đánh trận lưng dựa sông.','other'],
  [9,'三顾茅庐','sān gù máo lú','Tam cố mao lư','Visit someone three times to show sincerity','刘备三顾茅庐请诸葛亮。','Lưu Bị tam cố mao lư mời Gia Cát Lượng.','other'],
  [9,'望梅止渴','wàng méi zhǐ kě','Trông mơ đỡ khát / Tự an ủi bằng hy vọng hão','console oneself with false hopes','望梅止渴是一时之计。','Trông mơ đỡ khát chỉ là kế tạm thời.','other'],
  [9,'南柯一梦','nán kē yī mèng','Giấc mộng Nam Kha / Giấc mộng hão','A fleeting dream','人生如南柯一梦。','Cuộc đời như giấc mộng Nam Kha.','other'],
  [9,'一鸣惊人','yī míng jīng rén','Một tiếng gây chấn động','Rise to fame overnight','他一鸣惊人，震惊所有人。','Anh ấy một tiếng gây chấn động, khiến mọi người kinh ngạc.','other'],
  [9,'塞翁失马','sài wēng shī mǎ','Tái ông thất mã / Họa phúc khó đoán','A blessing in disguise','塞翁失马，焉知非福。','Tái ông thất mã, chưa biết là họa hay phúc.','other'],
  [9,'刻舟求剑','kè zhōu qiú jiàn','Khắc thuyền tìm kiếm','Stubbornly cling to outmoded rules','不能刻舟求剑，要与时俱进。','Không thể cứng nhắc, phải tiến cùng thời đại.','other'],
  [9,'自相矛盾','zì xiāng máo dùn','Tự mâu thuẫn với nhau','Self-contradiction','这个说法自相矛盾。','Lập luận này tự mâu thuẫn.','other'],
  [9,'异曲同工','yì qǔ tóng gōng','Khác đường cùng công hiệu','Different methods, same result','两种方法异曲同工。','Hai phương pháp có hiệu quả như nhau.','other'],
  [9,'一劳永逸','yī láo yǒng yì','Một lần mãi mãi xong','Once and for all','找到一劳永逸的解决方案。','Tìm ra giải pháp giải quyết một lần cho xong.','other'],

  // Bài 11: Hùng biện & Diễn thuyết
  [10,'开门见山','kāi mén jiàn shān','Vào thẳng vấn đề','Get straight to the point','演讲要开门见山。','Bài phát biểu phải vào thẳng vấn đề.','other'],
  [10,'铺垫','pū diàn','Chuẩn bị / Đặt nền tảng','Set the stage / Build up','先做好铺垫。','Hãy chuẩn bị nền trước.','verb'],
  [10,'升华','shēng huá','Thăng hoa / Nâng cao tầm','Sublimate / Elevate','结尾要升华主题。','Đoạn kết cần thăng hoa chủ đề.','verb'],
  [10,'呼吁','hū yù','Kêu gọi / Kêu ca','Appeal / Call for','呼吁大家行动起来。','Kêu gọi mọi người hành động.','verb'],
  [10,'号召','hào zhào','Kêu gọi / Hiệu triệu','Call / Rally','发出号召，凝聚力量。','Phát ra lời kêu gọi, tập hợp sức mạnh.','verb'],
  [10,'感染力','gǎn rǎn lì','Sức cuốn hút / Sức lan tỏa','Infectious power / Appeal','好的演讲有感染力。','Bài phát biểu tốt có sức cuốn hút.','noun'],
  [10,'声情并茂','shēng qíng bìng mào','Giọng văn cảm xúc phong phú','Rich in voice and emotion','他的演讲声情并茂。','Bài phát biểu của anh ấy giọng văn cảm xúc phong phú.','other'],
  [10,'抑扬顿挫','yì yáng dùn cuò','Ngữ điệu lên xuống / Nhịp nhàng','Rise and fall of voice','朗读要抑扬顿挫。','Đọc to phải có ngữ điệu lên xuống.','other'],
  [10,'掷地有声','zhì dì yǒu shēng','Lời nói đanh thép / Cổ vũ mạnh mẽ','Words that ring like metal','他的话掷地有声。','Lời nói của anh ấy rất đanh thép.','other'],
  [10,'一语中的','yī yǔ zhōng dì','Một câu nói trúng tâm điểm','Hit the nail on the head','他一语中的，说出了关键。','Anh ấy nói trúng tâm điểm, nêu ra được điểm mấu chốt.','other'],
  [10,'娓娓道来','wěi wěi dào lái','Kể chuyện thủ thỉ / Lưu loát','Narrate in a smooth, engaging way','她娓娓道来，令人入迷。','Cô ấy kể chuyện lưu loát, khiến người nghe say mê.','other'],
  [10,'引经据典','yǐn jīng jù diǎn','Dẫn kinh điển / Trích dẫn','Quote classics','引经据典，增强说服力。','Trích dẫn kinh điển, tăng cường sức thuyết phục.','other'],

  // Bài 12: Văn bản chính thức
  [11,'公文','gōng wén','Công văn','Official document','发一份公文。','Gửi một công văn.','noun'],
  [11,'函件','hán jiàn','Thư từ chính thức / Hàm thư','Official letter','发函件联系对方。','Liên hệ phía đối tác bằng thư chính thức.','noun'],
  [11,'决议','jué yì','Nghị quyết','Resolution','通过了一项决议。','Đã thông qua một nghị quyết.','noun'],
  [11,'协议','xié yì','Hiệp nghị / Thỏa thuận','Agreement / Protocol','双方达成协议。','Hai bên đã đạt được thỏa thuận.','noun'],
  [11,'备忘录','bèi wàng lù','Bản ghi nhớ','Memorandum / Memo','签署备忘录。','Ký kết bản ghi nhớ.','noun'],
  [11,'声明','shēng míng','Tuyên bố / Thông cáo','Statement / Declaration','发表联合声明。','Đưa ra tuyên bố chung.','noun'],
  [11,'通告','tōng gào','Thông báo chính thức','Announcement / Notice','发布通告。','Ban hành thông báo.','noun'],
  [11,'呈报','chéng bào','Trình báo lên cấp trên','Report to superior','向上级呈报情况。','Trình báo tình hình lên cấp trên.','verb'],
  [11,'批复','pī fù','Phê duyệt / Hồi âm','Reply to a report','收到上级批复。','Nhận được phê duyệt của cấp trên.','noun'],
  [11,'议程','yì chéng','Chương trình nghị sự','Agenda','确定会议议程。','Xác định chương trình hội nghị.','noun'],
  [11,'纪要','jì yào','Biên bản / Ghi chép tóm tắt','Minutes / Summary record','整理会议纪要。','Chỉnh lý biên bản hội nghị.','noun'],
  [11,'鉴于','jiàn yú','Xét rằng / Căn cứ vào','In view of / Given that','鉴于以上情况，特此通知。','Xét rằng tình hình trên, đặc thông báo.','conjunction'],
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
        [lid, hanzi, pinyin, vi, en, exZh, exVi, 'HSK6', type]
      );
      ins++;
    }
    await conn.commit();
    console.log(`\n✅ HSK6: ${lessonIds.length} lessons, ${ins} vocab (${skip} skipped)`);
  } catch(e) { await conn.rollback(); console.error('❌', e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
