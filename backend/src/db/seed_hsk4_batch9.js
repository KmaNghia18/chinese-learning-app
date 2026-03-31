// seed_hsk4_batch9.js — HSK4 batch 9: Vật lý/Hoá, Tự động hoá, Tâm lý tổ chức, Kinh doanh QT, Truyện dài, Phúc lợi, Viễn thông
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Vật lý & Hoá học ứng dụng', title_zh:'物理与应用化学', level:'HSK4', order:61, words:[
    ['导体','dǎo tǐ','Chất dẫn điện','Conductor (electricity)','铜是良好导体。','Đồng là chất dẫn điện tốt.','noun'],
    ['绝缘体','jué yuán tǐ','Chất cách điện','Insulator','橡胶是绝缘体。','Cao su là chất cách điện.','noun'],
    ['电路','diàn lù','Mạch điện','Electric circuit','设计电路图。','Thiết kế sơ đồ mạch điện.','noun'],
    ['频率','pín lǜ','Tần số','Frequency','声波频率。','Tần số sóng âm.','noun'],
    ['波长','bō cháng','Bước sóng','Wavelength','光的波长。','Bước sóng của ánh sáng.','noun'],
    ['氧化','yǎng huà','Oxy hoá','Oxidize / Oxidation','金属氧化生锈。','Kim loại oxy hoá bị rỉ sét.','verb'],
    ['酸碱度','suān jiǎn dù','Độ axit/bazơ / pH','pH / Acidity','测量溶液酸碱度。','Đo độ pH của dung dịch.','noun'],
    ['催化剂','cuī huà jì','Chất xúc tác','Catalyst','加入催化剂加速反应。','Thêm chất xúc tác để đẩy nhanh phản ứng.','noun'],
    ['聚合物','jù hé wù','Polyme / Chất tổng hợp','Polymer','塑料是聚合物。','Nhựa là polyme.','noun'],
    ['熔点','róng diǎn','Điểm nóng chảy','Melting point','铁的熔点很高。','Điểm nóng chảy của sắt rất cao.','noun'],
    ['沸点','fèi diǎn','Điểm sôi','Boiling point','水的沸点是100度。','Điểm sôi của nước là 100 độ.','noun'],
    ['密度','mì dù','Mật độ / Tỷ trọng','Density','铅的密度很大。','Mật độ của chì rất lớn.','noun'],
  ]},
  { title:'Cơ khí & Tự động hoá', title_zh:'机械与自动化', level:'HSK4', order:62, words:[
    ['自动化','zì dòng huà','Tự động hoá','Automation','工厂自动化生产。','Nhà máy sản xuất tự động hoá.','noun'],
    ['机器学习','jī qì xué xí','Học máy / Machine learning','Machine learning','机器学习算法。','Thuật toán học máy.','noun'],
    ['传感器','chuán gǎn qì','Cảm biến','Sensor','安装智能传感器。','Lắp đặt cảm biến thông minh.','noun'],
    ['控制系统','kòng zhì xì tǒng','Hệ thống điều khiển','Control system','智能控制系统。','Hệ thống điều khiển thông minh.','noun'],
    ['数控','shù kòng','Điều khiển số / CNC','Numerical control (CNC)','数控机床加工。','Gia công máy CNC.','noun'],
    ['精度','jīng dù','Độ chính xác / Độ tinh vi','Precision / Accuracy','高精度加工。','Gia công độ chính xác cao.','noun'],
    ['零件','líng jiàn','Linh kiện / Phụ tùng','Part / Component','替换损坏零件。','Thay thế linh kiện hỏng.','noun'],
    ['装配','zhuāng pèi','Lắp ráp','Assemble','流水线装配。','Lắp ráp dây chuyền.','verb'],
    ['维修','wéi xiū','Bảo trì / Sửa chữa','Maintain / Repair','定期维修设备。','Định kỳ bảo trì thiết bị.','verb'],
    ['故障','gù zhàng','Hỏng hóc / Sự cố','Malfunction / Breakdown','排除系统故障。','Khắc phục sự cố hệ thống.','noun'],
    ['效能','xiào néng','Hiệu năng / Năng lực hoạt động','Performance / Effectiveness','提升设备效能。','Nâng cao hiệu năng thiết bị.','noun'],
    ['耗能','hào néng','Tiêu hao năng lượng','Energy consumption','降低耗能标准。','Giảm tiêu chuẩn tiêu hao năng lượng.','noun'],
  ]},
  { title:'Kinh doanh quốc tế & Chuỗi giá trị', title_zh:'国际商务与价值链', level:'HSK4', order:63, words:[
    ['价值链','jià zhí liàn','Chuỗi giá trị','Value chain','优化价值链管理。','Tối ưu quản lý chuỗi giá trị.','noun'],
    ['跨国公司','kuà guó gōng sī','Công ty đa quốc gia','Multinational company (MNC)','跨国公司全球布局。','Công ty đa quốc gia bố trí toàn cầu.','noun'],
    ['本土化','běn tǔ huà','Địa phương hoá','Localize / Localization','产品本土化策略。','Chiến lược địa phương hoá sản phẩm.','verb'],
    ['知识产权','zhī shi chǎn quán','Sở hữu trí tuệ','Intellectual property (IP)','保护知识产权。','Bảo vệ sở hữu trí tuệ.','noun'],
    ['授权','shòu quán','Cấp phép / Ủy quyền','License / Authorize','品牌授权合作。','Hợp tác cấp phép thương hiệu.','verb'],
    ['核心竞争力','hé xīn jìng zhēng lì','Năng lực cạnh tranh cốt lõi','Core competency','打造核心竞争力。','Xây dựng năng lực cạnh tranh cốt lõi.','noun'],
    ['差异化','chā yì huà','Khác biệt hoá','Differentiate / Differentiation','产品差异化战略。','Chiến lược khác biệt hoá sản phẩm.','verb'],
    ['并购','bìng gòu','Sáp nhập và mua lại / M&A','Merger and acquisition (M&A)','企业并购重组。','Sáp nhập tái cơ cấu doanh nghiệp.','noun'],
    ['上市','shàng shì','Niêm yết (chứng khoán)','List / IPO','公司成功上市。','Công ty niêm yết thành công.','verb'],
    ['股东','gǔ dōng','Cổ đông','Shareholder','保护股东利益。','Bảo vệ lợi ích cổ đông.','noun'],
    ['营业额','yíng yè é','Doanh thu','Revenue / Turnover','年营业额增加。','Doanh thu hàng năm tăng.','noun'],
    ['市值','shì zhí','Vốn hoá thị trường','Market capitalization','企业市值破万亿。','Vốn hoá thị trường doanh nghiệp vượt nghìn tỷ.','noun'],
  ]},
  { title:'Tâm lý học tổ chức & Lãnh đạo', title_zh:'组织心理学与领导力', level:'HSK4', order:64, words:[
    ['领导力','lǐng dǎo lì','Năng lực lãnh đạo','Leadership','培养领导力。','Bồi dưỡng năng lực lãnh đạo.','noun'],
    ['执行力','zhí xíng lì','Khả năng thực thi','Execution ability','提高团队执行力。','Nâng cao khả năng thực thi của đội.','noun'],
    ['凝聚力','níng jù lì','Sức đoàn kết / Sự gắn kết','Cohesion / Team cohesion','增强团队凝聚力。','Tăng cường sức đoàn kết đội ngũ.','noun'],
    ['企业文化','qǐ yè wén huà','Văn hoá doanh nghiệp','Corporate culture','塑造积极企业文化。','Xây dựng văn hoá doanh nghiệp tích cực.','noun'],
    ['激励机制','jī lì jī zhì','Cơ chế khích lệ','Incentive mechanism','建立激励机制。','Xây dựng cơ chế khích lệ.','noun'],
    ['决策','jué cè','Ra quyết định','Decision-making','科学决策很重要。','Ra quyết định khoa học rất quan trọng.','noun'],
    ['授权管理','shòu quán guǎn lǐ','Quản lý ủy quyền','Delegated management','实行授权管理。','Thực hiện quản lý ủy quyền.','noun'],
    ['绩效考核','jì xiào kǎo hé','Đánh giá hiệu quả công việc','Performance appraisal','定期绩效考核。','Định kỳ đánh giá hiệu quả.','noun'],
    ['职业倦怠','zhí yè juàn dài','Kiệt sức nghề nghiệp / Burnout','Burnout / Job burnout','预防职业倦怠。','Phòng ngừa kiệt sức nghề nghiệp.','noun'],
    ['工作满意度','gōng zuò mǎn yì dù','Sự hài lòng với công việc','Job satisfaction','提高员工工作满意度。','Nâng cao sự hài lòng công việc của nhân viên.','noun'],
    ['跨部门','kuà bù mén','Liên phòng ban','Cross-departmental','跨部门协作。','Phối hợp liên phòng ban.','adjective'],
    ['变革管理','biàn gé guǎn lǐ','Quản lý thay đổi','Change management','推进变革管理。','Thúc đẩy quản lý thay đổi.','noun'],
  ]},
  { title:'Viễn thông & Mạng lưới', title_zh:'电信与网络通信', level:'HSK4', order:65, words:[
    ['5G','5G','Mạng 5G','5G network','5G网络覆盖全国。','Mạng 5G phủ sóng toàn quốc.','noun'],
    ['宽带','kuān dài','Băng thông rộng','Broadband','安装高速宽带。','Lắp đặt băng thông rộng tốc độ cao.','noun'],
    ['信号','xìn hào','Tín hiệu','Signal','信号很差。','Tín hiệu rất yếu.','noun'],
    ['协议','xié yì','Giao thức / Hiệp nghị','Protocol / Agreement','网络通信协议。','Giao thức truyền thông mạng.','noun'],
    ['服务器','fú wù qì','Máy chủ / Server','Server','部署云服务器。','Triển khai máy chủ đám mây.','noun'],
    ['数据中心','shù jù zhōng xīn','Trung tâm dữ liệu','Data center','建设数据中心。','Xây dựng trung tâm dữ liệu.','noun'],
    ['带宽','dài kuān','Băng thông','Bandwidth','增加网络带宽。','Tăng băng thông mạng.','noun'],
    ['延迟','yán chí','Độ trễ / Latency','Latency / Delay','降低网络延迟。','Giảm độ trễ mạng.','noun'],
    ['无线网络','wú xiàn wǎng luò','Mạng không dây / Wi-Fi','Wireless network','连接无线网络。','Kết nối mạng không dây.','noun'],
    ['物联网','wù lián wǎng','Internet of Things (IoT)','Internet of Things (IoT)','物联网智能家居。','Nhà thông minh IoT.','noun'],
    ['边缘计算','biān yuán jì suàn','Điện toán biên','Edge computing','边缘计算降低延迟。','Điện toán biên giảm độ trễ.','noun'],
    ['加密','jiā mì','Mã hoá / Mã hóa','Encrypt / Encryption','数据加密保护。','Mã hoá bảo vệ dữ liệu.','verb'],
  ]},
  { title:'Nghiên cứu & Phát triển (R&D)', title_zh:'研究与开发(R&D)', level:'HSK4', order:66, words:[
    ['专利','zhuān lì','Bằng sáng chế / Patent','Patent','申请技术专利。','Đăng ký bằng sáng chế công nghệ.','noun'],
    ['科研','kē yán','Nghiên cứu khoa học','Scientific research','开展科研合作。','Triển khai hợp tác nghiên cứu khoa học.','noun'],
    ['实验室','shí yàn shì','Phòng thí nghiệm','Laboratory','在实验室做实验。','Làm thí nghiệm trong phòng thí nghiệm.','noun'],
    ['成果转化','chéng guǒ zhuǎn huà','Chuyển giao kết quả nghiên cứu','Technology transfer','加快科研成果转化。','Đẩy nhanh chuyển giao kết quả khoa học.','noun'],
    ['突破性创新','tū pò xìng chuàng xīn','Đổi mới đột phá','Disruptive innovation','追求突破性创新。','Theo đuổi đổi mới đột phá.','noun'],
    ['原型','yuán xíng','Nguyên mẫu / Prototype','Prototype','制作产品原型。','Tạo nguyên mẫu sản phẩm.','noun'],
    ['测试','cè shì','Kiểm thử / Thử nghiệm','Test / Testing','产品测试阶段。','Giai đoạn kiểm thử sản phẩm.','verb'],
    ['质量控制','zhì liàng kòng zhì','Kiểm soát chất lượng / QC','Quality Control (QC)','严格质量控制。','Kiểm soát chất lượng nghiêm ngặt.','noun'],
    ['反馈','fǎn kuì','Phản hồi','Feedback','收集用户反馈。','Thu thập phản hồi người dùng.','noun'],
    ['优化','yōu huà','Tối ưu hoá','Optimize / Optimization','持续优化产品。','Liên tục tối ưu hoá sản phẩm.','verb'],
    ['迭代开发','dié dài kāi fā','Phát triển lặp','Iterative development','采用迭代开发模式。','Áp dụng mô hình phát triển lặp.','noun'],
    ['开源','kāi yuán','Mã nguồn mở','Open source','使用开源代码。','Sử dụng mã nguồn mở.','adjective'],
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
    console.log(`\n✅ Batch9: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
