// seed_hsk4_batch5.js — HSK4 batch 5: Lịch sử, Ngôn ngữ học, Văn học, Kỹ năng sống, Gia đình nâng cao
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Lịch sử & Văn minh Trung Hoa', title_zh:'中华历史与文明', level:'HSK4', order:38, words:[
    ['朝代','cháo dài','Triều đại','Dynasty','唐朝是盛世。','Triều Đường là thời kỳ hưng thịnh.','noun'],
    ['帝王','dì wáng','Hoàng đế / Vua','Emperor / King','帝王统治国家。','Hoàng đế cai trị đất nước.','noun'],
    ['封建','fēng jiàn','Phong kiến','Feudal','封建社会制度。','Chế độ xã hội phong kiến.','adjective'],
    ['民族','mín zú','Dân tộc / Chủng tộc','Ethnic group / Nation','中国有五十六个民族。','Trung Quốc có năm mươi sáu dân tộc.','noun'],
    ['革命','gé mìng','Cách mạng','Revolution','辛亥革命推翻清朝。','Cách mạng Tân Hợi lật đổ triều Thanh.','noun'],
    ['统一','tǒng yī','Thống nhất','Unify / Unified','秦始皇统一了中国。','Tần Thủy Hoàng thống nhất Trung Quốc.','verb'],
    ['侵略','qīn lüè','Xâm lược / Xâm chiếm','Invade / Aggression','反抗外来侵略。','Chống lại xâm lược từ bên ngoài.','verb'],
    ['抵抗','dǐ kàng','Kháng cự / Chống lại','Resist / Resistance','顽强抵抗敌人。','Kiên cường kháng cự kẻ địch.','verb'],
    ['遗址','yí zhǐ','Phế tích / Di chỉ','Ruins / Archaeological site','参观历史遗址。','Tham quan phế tích lịch sử.','noun'],
    ['古迹','gǔ jī','Cổ tích / Di tích lịch sử','Historic site / Ancient monument','保护历史古迹。','Bảo vệ di tích lịch sử.','noun'],
    ['考古','kǎo gǔ','Khảo cổ học','Archaeology','考古发现新文物。','Khảo cổ phát hiện di vật mới.','noun'],
    ['传承','chuán chéng','Kế thừa / Truyền thừa','Inherit / Pass on (culture)','传承中华文化。','Kế thừa văn hóa Trung Hoa.','verb'],
  ]},
  { title:'Ngôn ngữ học & Văn học', title_zh:'语言学与文学', level:'HSK4', order:39, words:[
    ['文学','wén xué','Văn học','Literature','中国古典文学。','Văn học cổ điển Trung Quốc.','noun'],
    ['小说','xiǎo shuō','Tiểu thuyết','Novel','我喜欢读小说。','Tôi thích đọc tiểu thuyết.','noun'],
    ['诗歌','shī gē','Thơ ca / Thơ văn','Poetry / Poem','唐诗是中国文化宝藏。','Thơ Đường là kho báu văn hóa TQ.','noun'],
    ['散文','sǎn wén','Tản văn / Văn xuôi','Prose','写一篇散文。','Viết một bài tản văn.','noun'],
    ['戏剧','xì jù','Kịch nghệ / Sân khấu','Drama / Theater','中国传统戏剧。','Kịch nghệ truyền thống Trung Quốc.','noun'],
    ['作家','zuò jiā','Nhà văn','Writer / Author','他是著名作家。','Anh ấy là nhà văn nổi tiếng.','noun'],
    ['方言','fāng yán','Phương ngữ / Tiếng địa phương','Dialect','粤语是广东方言。','Tiếng Quảng Đông là phương ngữ Quảng Đông.','noun'],
    ['词汇','cí huì','Từ vựng (học thuật)','Vocabulary (linguistics)','扩大词汇量。','Mở rộng vốn từ vựng.','noun'],
    ['语境','yǔ jìng','Ngữ cảnh / Bối cảnh','Context','根据语境理解词义。','Hiểu nghĩa từ dựa vào ngữ cảnh.','noun'],
    ['修辞','xiū cí','Tu từ / Biện pháp tu từ','Rhetoric / Rhetorical device','使用比喻修辞。','Sử dụng biện pháp tu từ ẩn dụ.','noun'],
    ['隐喻','yǐn yù','Ẩn dụ / Metaphor','Metaphor','诗歌中的隐喻。','Ẩn dụ trong thơ ca.','noun'],
    ['翻译','fān yì','Dịch thuật (tổng hợp)','Translation / Interpret','文学翻译很难。','Dịch văn học rất khó.','noun'],
  ]},
  { title:'Kỹ năng sống & Phát triển cá nhân', title_zh:'生活技能与个人发展', level:'HSK4', order:40, words:[
    ['时间管理','shí jiān guǎn lǐ','Quản lý thời gian','Time management','学好时间管理。','Học cách quản lý thời gian tốt.','noun'],
    ['优先级','yōu xiān jí','Ưu tiên / Độ ưu tiên','Priority','设定工作优先级。','Đặt mức độ ưu tiên công việc.','noun'],
    ['拖延','tuō yán','Trì hoãn / Trễ nải','Procrastinate / Delay','克服拖延症。','Vượt qua chứng trì hoãn.','verb'],
    ['专注','zhuān zhù','Tập trung / Chú tâm','Focus / Concentrate','保持专注学习。','Duy trì tập trung học tập.','verb'],
    ['效率','xiào lǜ','Hiệu suất / Năng suất','Efficiency / Productivity','提高工作效率。','Nâng cao hiệu suất làm việc.','noun'],
    ['自律','zì lǜ','Tự kỷ luật / Tự giác','Self-discipline','培养自律精神。','Bồi dưỡng tinh thần tự kỉ luật.','noun'],
    ['挑战','tiǎo zhàn','Thách thức','Challenge','积极接受挑战。','Tích cực chấp nhận thách thức.','noun'],
    ['应对','yìng duì','Đối phó / Ứng phó','Cope with / Deal with','应对压力的方法。','Phương pháp đối phó với áp lực.','verb'],
    ['进化思维','jìn huà sī wéi','Tư duy phát triển','Growth mindset','培养进化思维。','Bồi dưỡng tư duy phát triển.','noun'],
    ['读书笔记','dú shū bǐ jì','Ghi chú đọc sách','Reading notes','做好读书笔记。','Ghi chú đọc sách tốt.','noun'],
    ['复盘','fù pán','Xem lại / Tổng kết (hành động)','Review / Debrief','每天复盘总结。','Mỗi ngày xem lại tổng kết.','verb'],
    ['成长型思维','chéng zhǎng xíng sī wéi','Tư duy tăng trưởng','Growth mindset (full term)','拥有成长型思维。','Sở hữu tư duy tăng trưởng.','noun'],
  ]},
  { title:'Gia đình & Cuộc sống gia đình', title_zh:'家庭与家庭生活', level:'HSK4', order:41, words:[
    ['家务','jiā wù','Việc nhà','Housework / Household chores','分担家务劳动。','Chia sẻ công việc nhà.','noun'],
    ['抚养','fǔ yǎng','Nuôi dưỡng / Cấp dưỡng','Raise / Support financially','抚养孩子长大。','Nuôi dưỡng con cái lớn lên.','verb'],
    ['赡养','shàn yǎng','Phụng dưỡng (bố mẹ)','Support elderly parents','赡养父母是义务。','Phụng dưỡng bố mẹ là nghĩa vụ.','verb'],
    ['遗产','yí chǎn','Di sản / Tài sản thừa kế','Inheritance / Heritage','继承遗产。','Thừa kế di sản.','noun'],
    ['婚姻','hūn yīn','Hôn nhân / Hôn nhân gia đình','Marriage / Matrimony','珍惜婚姻关系。','Trân trọng mối quan hệ hôn nhân.','noun'],
    ['离婚','lí hūn','Ly hôn','Divorce','办理离婚手续。','Làm thủ tục ly hôn.','verb'],
    ['单亲','dān qīn','Gia đình một bố hoặc một mẹ','Single parent','单亲家庭的孩子。','Đứa trẻ trong gia đình đơn thân.','adjective'],
    ['隔代','gé dài','Cách thế hệ (ông bà nuôi cháu)','Skipped generation','隔代教育问题。','Vấn đề giáo dục cách thế hệ.','adjective'],
    ['亲子关系','qīn zǐ guān xi','Mối quan hệ cha mẹ-con','Parent-child relationship','改善亲子关系。','Cải thiện mối quan hệ cha mẹ và con.','noun'],
    ['家庭暴力','jiā tíng bào lì','Bạo lực gia đình','Domestic violence','反对家庭暴力。','Phản đối bạo lực gia đình.','noun'],
    ['独生子女','dú shēng zǐ nǚ','Con một (chính sách)','Only child (one-child policy)','独生子女政策。','Chính sách một con.','noun'],
    ['代沟','dài gōu','Hố ngăn cách thế hệ','Generation gap','解决代沟问题。','Giải quyết vấn đề hố ngăn cách thế hệ.','noun'],
  ]},
  { title:'Digital & Công nghệ thông tin', title_zh:'数字化与信息技术', level:'HSK4', order:42, words:[
    ['大数据','dà shù jù','Dữ liệu lớn / Big Data','Big data','利用大数据分析。','Sử dụng phân tích dữ liệu lớn.','noun'],
    ['云计算','yún jì suàn','Điện toán đám mây','Cloud computing','迁移到云计算平台。','Chuyển sang nền tảng điện toán đám mây.','noun'],
    ['区块链','qū kuài liàn','Blockchain','Blockchain','区块链技术应用。','Ứng dụng công nghệ blockchain.','noun'],
    ['网络安全','wǎng luò ān quán','An ninh mạng','Cybersecurity','保障网络安全。','Bảo đảm an ninh mạng.','noun'],
    ['数字货币','shù zì huò bì','Tiền kỹ thuật số','Digital currency / Cryptocurrency','央行数字货币。','Tiền kỹ thuật số ngân hàng trung ương.','noun'],
    ['隐私保护','yǐn sī bǎo hù','Bảo vệ quyền riêng tư','Privacy protection','加强隐私保护。','Tăng cường bảo vệ quyền riêng tư.','noun'],
    ['算法','suàn fǎ','Thuật toán','Algorithm','推荐算法。','Thuật toán gợi ý.','noun'],
    ['虚拟现实','xū nǐ xiàn shí','Thực tế ảo (VR)','Virtual reality (VR)','体验虚拟现实游戏。','Trải nghiệm game thực tế ảo.','noun'],
    ['增强现实','zēng qiáng xiàn shí','Thực tế tăng cường (AR)','Augmented reality (AR)','增强现实技术。','Công nghệ thực tế tăng cường.','noun'],
    ['平台','píng tái','Nền tảng / Platform','Platform','电商平台销售。','Bán hàng trên nền tảng thương mại điện tử.','noun'],
    ['App','App','Ứng dụng (điện thoại)','App / Mobile application','下载新App。','Tải xuống ứng dụng mới.','noun'],
    ['运营','yùn yíng','Vận hành / Điều hành','Operate / Operation','平台运营管理。','Quản lý vận hành nền tảng.','verb'],
  ]},
  { title:'Môi trường & Phát triển bền vững', title_zh:'环境与可持续发展', level:'HSK4', order:43, words:[
    ['可持续','kě chí xù','Bền vững','Sustainable','可持续发展。','Phát triển bền vững.','adjective'],
    ['碳排放','tàn pái fàng','Phát thải carbon','Carbon emission','减少碳排放。','Giảm phát thải carbon.','noun'],
    ['碳中和','tàn zhōng hé','Trung hòa carbon','Carbon neutrality','实现碳中和目标。','Đạt mục tiêu trung hòa carbon.','noun'],
    ['绿色能源','lǜ sè néng yuán','Năng lượng xanh / Năng lượng sạch','Green energy','推广绿色能源。','Phổ biến năng lượng xanh.','noun'],
    ['太阳能','tài yáng néng','Năng lượng mặt trời','Solar energy','安装太阳能板。','Lắp đặt tấm pin mặt trời.','noun'],
    ['风能','fēng néng','Năng lượng gió','Wind energy','风能发电。','Phát điện bằng năng lượng gió.','noun'],
    ['生物多样性','shēng wù duō yàng xìng','Đa dạng sinh học','Biodiversity','保护生物多样性。','Bảo vệ đa dạng sinh học.','noun'],
    ['濒危','bīn wēi','Có nguy cơ tuyệt chủng','Endangered','濒危动物保护。','Bảo vệ động vật có nguy cơ tuyệt chủng.','adjective'],
    ['生态','shēng tài','Hệ sinh thái / Sinh thái','Ecology / Ecosystem','维护生态平衡。','Duy trì cân bằng sinh thái.','noun'],
    ['减排','jiǎn pái','Giảm phát thải','Emission reduction','全球减排行动。','Hành động giảm phát thải toàn cầu.','verb'],
    ['回收','huí shōu','Tái chế / Thu hồi','Recycle / Recycling','垃圾分类回收。','Phân loại tái chế rác.','verb'],
    ['足迹','zú jì','Dấu chân (carbon)','Footprint','减少碳足迹。','Giảm dấu chân carbon.','noun'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let tL=0,tW=0;
    for(const {title,title_zh,level,order,words} of lessons){
      let lid;
      const [ex]=await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?',[title,level]);
      if(ex.length){lid=ex[0].id;}
      else{
        const [r]=await conn.query('INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',[title,title_zh,title_zh,level,order]);
        lid=r.insertId;tL++;console.log(`  ✓ ${title} (${lid})`);
      }
      for(const [h,p,vi,en,exZh,exVi,type] of words){
        const [ew]=await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if(ew.length)continue;
        await conn.query('INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK4',type]);
        tW++;
      }
    }
    await conn.commit();
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK4'`);
    console.log(`\n✅ HSK4 Batch5: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
