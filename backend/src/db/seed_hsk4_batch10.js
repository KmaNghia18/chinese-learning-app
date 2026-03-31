// seed_hsk4_batch10.js — HSK4: Nhân sự, Logistics, Điện tử, Nội thất, Làm đẹp, Tài chính cá nhân, EdTech
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Nhân sự & Quản lý nguồn nhân lực', title_zh:'人力资源管理', level:'HSK4', order:67, words:[
    ['招聘流程','zhāo pìn liú chéng','Quy trình tuyển dụng','Recruitment process','优化招聘流程。','Tối ưu hoá quy trình tuyển dụng.','noun'],
    ['人才','rén cái','Nhân tài','Talent / Gifted person','吸引优秀人才。','Thu hút nhân tài xuất sắc.','noun'],
    ['岗位','gǎng wèi','Vị trí / Chức vụ','Position / Post (job)','空缺岗位招聘。','Tuyển dụng vị trí trống.','noun'],
    ['入职','rù zhí','Nhận việc / Bắt đầu làm việc','Onboarding / Join (company)','新员工入职培训。','Đào tạo nhân viên mới nhận việc.','verb'],
    ['离职','lí zhí','Nghỉ việc / Rời công ty','Resign / Leave a job','办理离职手续。','Làm thủ tục nghỉ việc.','verb'],
    ['试用期','shì yòng qī','Thời gian thử việc','Probation period','三个月试用期。','Thời gian thử việc ba tháng.','noun'],
    ['劳动合同','láo dòng hé tong','Hợp đồng lao động','Employment contract','签订劳动合同。','Ký kết hợp đồng lao động.','noun'],
    ['社会保险','shè huì bǎo xiǎn','Bảo hiểm xã hội','Social insurance','缴纳社会保险。','Đóng bảo hiểm xã hội.','noun'],
    ['年假','nián jià','Nghỉ phép năm','Annual leave','享受带薪年假。','Hưởng nghỉ phép năm có lương.','noun'],
    ['绩效奖金','jì xiào jiǎng jīn','Thưởng hiệu quả / Bonus','Performance bonus','发放绩效奖金。','Phát thưởng hiệu quả.','noun'],
    ['员工福利','yuán gōng fú lì','Phúc lợi nhân viên','Employee benefits','完善员工福利。','Hoàn thiện phúc lợi nhân viên.','noun'],
    ['职业发展','zhí yè fā zhǎn','Phát triển nghề nghiệp','Career development','规划职业发展路径。','Lên kế hoạch lộ trình phát triển nghề nghiệp.','noun'],
  ]},
  { title:'Logistics & Quản lý chuỗi cung ứng', title_zh:'物流与供应链管理', level:'HSK4', order:68, words:[
    ['仓库','cāng kù','Kho hàng / Nhà kho','Warehouse / Storage','建立自动化仓库。','Xây dựng kho hàng tự động hoá.','noun'],
    ['库存','kù cún','Tồn kho / Hàng tồn','Inventory / Stock','管理库存水平。','Quản lý mức tồn kho.','noun'],
    ['配送','pèi sòng','Phân phối / Giao hàng','Distribute / Deliver','配送中心设置。','Thiết lập trung tâm phân phối.','verb'],
    ['运费','yùn fèi','Phí vận chuyển','Shipping fee / Freight charge','计算运费成本。','Tính toán chi phí vận chuyển.','noun'],
    ['海关','hǎi guān','Hải quan','Customs','报关清关手续。','Thủ tục khai báo hải quan.','noun'],
    ['报关','bào guān','Khai báo hải quan','Declare customs','申报进口货物。','Khai báo hàng hoá nhập khẩu.','verb'],
    ['集装箱','jí zhuāng xiāng','Container','Container / Shipping container','装满集装箱。','Đóng đầy container.','noun'],
    ['冷链','lěng liàn','Chuỗi lạnh / Logistics lạnh','Cold chain logistics','生鲜冷链运输。','Vận chuyển thực phẩm tươi sống theo chuỗi lạnh.','noun'],
    ['时效','shí xiào','Thời hạn / Độ kịp thời','Timeliness / Delivery time','保证配送时效。','Đảm bảo tính kịp thời giao hàng.','noun'],
    ['追踪','zhuī zōng','Theo dõi / Truy dấu','Track / Trace','包裹实时追踪。','Theo dõi bưu kiện thời gian thực.','verb'],
    ['采购','cǎi gòu','Mua hàng / Thu mua','Procurement / Purchase','集中采购降成本。','Thu mua tập trung giảm chi phí.','verb'],
    ['供应商','gōng yìng shāng','Nhà cung cấp','Supplier / Vendor','筛选优质供应商。','Lựa chọn nhà cung cấp chất lượng.','noun'],
  ]},
  { title:'Điện tử & Tiêu dùng công nghệ', title_zh:'消费电子与科技产品', level:'HSK4', order:69, words:[
    ['智能手机','zhì néng shǒu jī','Điện thoại thông minh','Smartphone','智能手机普及化。','Điện thoại thông minh phổ cập.','noun'],
    ['笔记本电脑','bǐ jì běn diàn nǎo','Máy tính xách tay','Laptop / Notebook computer','工作用笔记本电脑。','Dùng laptop để làm việc.','noun'],
    ['平板电脑','píng bǎn diàn nǎo','Máy tính bảng','Tablet computer','平板电脑方便携带。','Máy tính bảng tiện mang theo.','noun'],
    ['耳机','ěr jī','Tai nghe','Earphones / Headphones','无线耳机很方便。','Tai nghe không dây rất tiện.','noun'],
    ['充电器','chōng diàn qì','Sạc / Bộ sạc','Charger','带着充电器出门。','Mang theo sạc khi ra ngoài.','noun'],
    ['电池续航','diàn chí xù háng','Tuổi thọ pin','Battery life','电池续航能力强。','Tuổi thọ pin mạnh.','noun'],
    ['像素','xiàng sù','Pixel / Độ phân giải','Pixel / Resolution','相机像素很高。','Độ phân giải camera rất cao.','noun'],
    ['存储空间','cún chǔ kōng jiān','Dung lượng lưu trữ','Storage space','扩大存储空间。','Mở rộng dung lượng lưu trữ.','noun'],
    ['操作系统','cāo zuò xì tǒng','Hệ điều hành','Operating system (OS)','更新操作系统。','Cập nhật hệ điều hành.','noun'],
    ['界面','jiè miàn','Giao diện','Interface / UI','用户界面设计。','Thiết kế giao diện người dùng.','noun'],
    ['兼容','jiān róng','Tương thích','Compatible / Compatibility','系统兼容性强。','Tính tương thích hệ thống mạnh.','adjective'],
    ['升级','shēng jí','Nâng cấp','Upgrade','硬件软件升级。','Nâng cấp phần cứng phần mềm.','verb'],
  ]},
  { title:'Giáo dục trực tuyến & EdTech', title_zh:'在线教育与教育科技', level:'HSK4', order:70, words:[
    ['在线课程','zài xiàn kè chéng','Khoá học trực tuyến','Online course','报名在线课程。','Đăng ký khoá học trực tuyến.','noun'],
    ['慕课','mù kè','Khoá học trực tuyến mở đại trà (MOOC)','MOOC (Massive Open Online Course)','免费慕课资源。','Nguồn khoá học MOOC miễn phí.','noun'],
    ['直播授课','zhí bō shòu kè','Dạy học trực tiếp trực tuyến','Live online teaching','教师直播授课。','Giáo viên dạy học trực tiếp trực tuyến.','noun'],
    ['互动','hù dòng','Tương tác / Giao lưu','Interactive / Interaction','增加课堂互动。','Tăng cường tương tác lớp học.','verb'],
    ['个性化学习','gè xìng huà xué xí','Học tập cá nhân hoá','Personalized learning','提供个性化学习。','Cung cấp học tập cá nhân hoá.','noun'],
    ['自主学习','zì zhǔ xué xí','Tự học / Học độc lập','Self-directed learning','培养自主学习能力。','Bồi dưỡng năng lực tự học.','noun'],
    ['学习平台','xué xí píng tái','Nền tảng học tập','Learning platform','使用学习平台。','Sử dụng nền tảng học tập.','noun'],
    ['虚拟教室','xū nǐ jiào shì','Lớp học ảo','Virtual classroom','加入虚拟教室上课。','Tham gia lớp học ảo để học.','noun'],
    ['学习效果','xué xí xiào guǒ','Hiệu quả học tập','Learning outcome / Effectiveness','评估学习效果。','Đánh giá hiệu quả học tập.','noun'],
    ['证书','zhèng shū','Chứng chỉ / Giấy chứng nhận','Certificate','获得在线证书。','Nhận chứng chỉ trực tuyến.','noun'],
    ['测验','cè yàn','Bài kiểm tra / Bài trắc nghiệm','Quiz / Test','完成单元测验。','Hoàn thành bài kiểm tra chương.','noun'],
    ['反馈机制','fǎn kuì jī zhì','Cơ chế phản hồi','Feedback mechanism','建立学习反馈机制。','Xây dựng cơ chế phản hồi học tập.','noun'],
  ]},
  { title:'Nông thôn & Phát triển nông thôn', title_zh:'农村与农村发展', level:'HSK4', order:71, words:[
    ['农村','nóng cūn','Nông thôn / Thôn quê','Rural area / Countryside','城市化影响农村。','Đô thị hoá ảnh hưởng nông thôn.','noun'],
    ['农民','nóng mín','Nông dân','Farmer / Peasant','支持农民增收。','Hỗ trợ nông dân tăng thu nhập.','noun'],
    ['土地改革','tǔ dì gǎi gé','Cải cách đất đai','Land reform','推进农村土地改革。','Thúc đẩy cải cách đất đai nông thôn.','noun'],
    ['乡村振兴','xiāng cūn zhèn xīng','Chấn hưng nông thôn','Rural revitalization','实施乡村振兴战略。','Thực hiện chiến lược chấn hưng nông thôn.','noun'],
    ['精准扶贫','jīng zhǔn fú pín','Xoá đói giảm nghèo chính xác','Targeted poverty alleviation','精准扶贫政策。','Chính sách xoá đói giảm nghèo chính xác.','noun'],
    ['农业合作社','nóng yè hé zuò shè','Hợp tác xã nông nghiệp','Agricultural cooperative','成立农业合作社。','Thành lập hợp tác xã nông nghiệp.','noun'],
    ['乡镇企业','xiāng zhèn qǐ yè','Doanh nghiệp hương trấn','Township and village enterprise','发展乡镇企业。','Phát triển doanh nghiệp hương trấn.','noun'],
    ['农产品','nóng chǎn pǐn','Nông sản','Agricultural products','推销优质农产品。','Tiếp thị nông sản chất lượng cao.','noun'],
    ['城乡差距','chéng xiāng chā jù','Chênh lệch thành thị - nông thôn','Urban-rural gap','缩小城乡差距。','Thu hẹp chênh lệch thành thị - nông thôn.','noun'],
    ['农业机械化','nóng yè jī xiè huà','Cơ giới hoá nông nghiệp','Agricultural mechanization','推进农业机械化。','Thúc đẩy cơ giới hoá nông nghiệp.','noun'],
    ['新型农民','xīn xíng nóng mín','Nông dân kiểu mới','New type farmer','培育新型农民。','Bồi dưỡng nông dân kiểu mới.','noun'],
    ['电商扶贫','diàn shāng fú pín','Thương mại điện tử hỗ trợ xoá nghèo','E-commerce poverty relief','利用电商扶贫。','Sử dụng TMĐT hỗ trợ xoá nghèo.','noun'],
  ]},
  { title:'Thiên văn & Thám hiểm không gian', title_zh:'天文与太空探索', level:'HSK4', order:72, words:[
    ['天文学','tiān wén xué','Thiên văn học','Astronomy','研究天文学。','Nghiên cứu thiên văn học.','noun'],
    ['望远镜','wàng yuǎn jìng','Kính viễn vọng','Telescope','用望远镜观星。','Dùng kính viễn vọng quan sát sao.','noun'],
    ['星系','xīng xì','Thiên hà','Galaxy','银河系是一个星系。','Dải Ngân Hà là một thiên hà.','noun'],
    ['超新星','chāo xīn xīng','Siêu tân tinh','Supernova','超新星爆炸。','Vụ nổ siêu tân tinh.','noun'],
    ['探测器','tàn cè qì','Tàu thăm dò / Thiết bị dò','Probe / Detector','发射行星探测器。','Phóng tàu thăm dò hành tinh.','noun'],
    ['空间站','kōng jiān zhàn','Trạm không gian','Space station','建设中国空间站。','Xây dựng trạm không gian Trung Quốc.','noun'],
    ['重力波','zhòng lì bō','Sóng hấp dẫn','Gravitational wave','探测到重力波。','Phát hiện sóng hấp dẫn.','noun'],
    ['系外行星','xì wài xíng xīng','Hành tinh ngoài hệ Mặt trời','Exoplanet','发现系外行星。','Phát hiện hành tinh ngoài hệ Mặt trời.','noun'],
    ['生命迹象','shēng mìng jì xiàng','Dấu hiệu sự sống','Signs of life','寻找生命迹象。','Tìm kiếm dấu hiệu sự sống.','noun'],
    ['太空旅行','tài kōng lǚ xíng','Du lịch vũ trụ','Space travel / Space tourism','太空旅行时代来临。','Thời đại du lịch vũ trụ đến rồi.','noun'],
    ['轨道','guǐ dào','Quỹ đạo','Orbit','进入月球轨道。','Vào quỹ đạo Mặt trăng.','noun'],
    ['星际','xīng jì','Liên sao / Giữa các vì sao','Interstellar','星际旅行的梦想。','Giấc mơ du hành liên sao.','adjective'],
  ]},
  { title:'Thời trang & Ngành may mặc', title_zh:'时尚与服装行业', level:'HSK4', order:73, words:[
    ['时装','shí zhuāng','Thời trang / Quần áo thời trang','Fashion / Haute couture','巴黎时装周。','Tuần lễ thời trang Paris.','noun'],
    ['面料','miàn liào','Chất liệu vải','Fabric / Material','高品质面料。','Chất liệu vải chất lượng cao.','noun'],
    ['品位','pǐn wèi','Gu / Sở thích thẩm mỹ','Taste / Style','有品位的穿着。','Cách ăn mặc có gu.','noun'],
    ['潮流','cháo liú','Xu hướng / Trào lưu','Trend / Fashion trend','引领时尚潮流。','Dẫn đầu xu hướng thời trang.','noun'],
    ['搭配','dā pèi','Phối đồ / Kết hợp','Match / Coordinate (clothes)','学习穿衣搭配。','Học cách phối đồ.','verb'],
    ['奢侈品','shē chǐ pǐn','Hàng xa xỉ / Đồ hiệu','Luxury goods','购买奢侈品。','Mua hàng xa xỉ.','noun'],
    ['二手','èr shǒu','Đồ cũ / Hàng second-hand','Second-hand / Used','购买二手名牌包。','Mua túi hiệu đồ cũ.','adjective'],
    ['款式','kuǎn shì','Kiểu dáng / Mẫu mã','Style / Design (clothes)','新款式上市。','Kiểu dáng mới ra mắt.','noun'],
    ['尺码','chǐ mǎ','Size / Cỡ quần áo','Size (clothing)','选对尺码很重要。','Chọn đúng size rất quan trọng.','noun'],
    ['品牌效应','pǐn pái xiào yìng','Hiệu ứng thương hiệu','Brand effect / Brand power','利用品牌效应。','Tận dụng hiệu ứng thương hiệu.','noun'],
    ['可持续时尚','kě chí xù shí shàng','Thời trang bền vững','Sustainable fashion','提倡可持续时尚。','Khuyến khích thời trang bền vững.','noun'],
    ['快时尚','kuài shí shàng','Thời trang nhanh','Fast fashion','快时尚的环境问题。','Vấn đề môi trường của thời trang nhanh.','noun'],
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
    console.log(`\n✅ Batch10: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
