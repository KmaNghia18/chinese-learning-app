// seed_hsk4_batch1.js — HSK4 mở rộng (batch 1): Kinh doanh, Chính trị, Khoa học
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Kinh tế & Kinh doanh', title_zh:'经济与商业', level:'HSK4', order:16, words:[
    ['经济','jīng jì','Kinh tế','Economy','中国经济快速发展。','Kinh tế Trung Quốc phát triển nhanh.','noun'],
    ['市场','shì chǎng','Thị trường','Market','市场竞争激烈。','Cạnh tranh thị trường khốc liệt.','noun'],
    ['企业','qǐ yè','Doanh nghiệp / Xí nghiệp','Enterprise / Company','他创建了一家企业。','Anh ấy thành lập một doanh nghiệp.','noun'],
    ['产品','chǎn pǐn','Sản phẩm','Product','这个产品质量很好。','Sản phẩm này chất lượng rất tốt.','noun'],
    ['竞争','jìng zhēng','Cạnh tranh','Compete / Competition','市场竞争很激烈。','Cạnh tranh thị trường rất gay gắt.','verb'],
    ['合作','hé zuò','Hợp tác','Cooperate / Cooperation','我们一起合作。','Chúng ta cùng hợp tác.','verb'],
    ['谈判','tán pàn','Đàm phán / Thương lượng','Negotiate / Negotiation','价格谈判顺利。','Đàm phán giá cả thuận lợi.','verb'],
    ['利润','lì rùn','Lợi nhuận','Profit','这项目利润很高。','Dự án này lợi nhuận rất cao.','noun'],
    ['损失','sǔn shī','Tổn thất / Thiệt hại','Loss / Damage','减少损失。','Giảm thiểu tổn thất.','noun'],
    ['成本','chéng běn','Chi phí / Giá thành','Cost','降低生产成本。','Giảm chi phí sản xuất.','noun'],
    ['品牌','pǐn pái','Thương hiệu','Brand','创建强大的品牌。','Xây dựng thương hiệu mạnh.','noun'],
    ['营销','yíng xiāo','Tiếp thị / Marketing','Marketing','制定营销策略。','Xây dựng chiến lược tiếp thị.','noun'],
    ['广告','guǎng gào','Quảng cáo','Advertisement / Advertising','做广告宣传。','Làm quảng cáo tuyên truyền.','noun'],
    ['客户','kè hù','Khách hàng','Customer / Client','优质服务留住客户。','Dịch vụ tốt giữ chân khách hàng.','noun'],
    ['合同','hé tong','Hợp đồng','Contract','签署合同。','Ký hợp đồng.','noun'],
  ]},
  { title:'Khoa học & Công nghệ', title_zh:'科学与技术', level:'HSK4', order:17, words:[
    ['技术','jì shù','Kỹ thuật / Công nghệ','Technology / Technique','高科技技术。','Kỹ thuật công nghệ cao.','noun'],
    ['创新','chuàng xīn','Đổi mới / Sáng tạo','Innovation / Innovate','不断创新进步。','Liên tục đổi mới tiến bộ.','verb'],
    ['研究','yán jiū','Nghiên cứu','Research / Study','科学研究很重要。','Nghiên cứu khoa học rất quan trọng.','verb'],
    ['实验','shí yàn','Thí nghiệm','Experiment / Test','做科学实验。','Làm thí nghiệm khoa học.','noun'],
    ['数据','shù jù','Dữ liệu / Số liệu','Data','分析数据结果。','Phân tích kết quả dữ liệu.','noun'],
    ['系统','xì tǒng','Hệ thống','System','建立完善的系统。','Xây dựng hệ thống hoàn thiện.','noun'],
    ['程序','chéng xù','Chương trình / Tiến trình','Program / Procedure','写计算机程序。','Viết chương trình máy tính.','noun'],
    ['人工智能','rén gōng zhì néng','Trí tuệ nhân tạo','Artificial Intelligence / AI','人工智能改变世界。','AI thay đổi thế giới.','noun'],
    ['机器人','jī qì rén','Robot','Robot','机器人代替人类工作。','Robot thay thế công việc của con người.','noun'],
    ['互联网','hù lián wǎng','Internet','Internet','互联网连接了世界。','Internet kết nối cả thế giới.','noun'],
    ['卫星','wèi xīng','Vệ tinh / Sao nhân tạo','Satellite','发射卫星。','Phóng vệ tinh.','noun'],
    ['核能','hé néng','Năng lượng hạt nhân','Nuclear energy','核能发电。','Phát điện bằng năng lượng hạt nhân.','noun'],
    ['环保','huán bǎo','Bảo vệ môi trường','Environmental protection','倡导环保生活。','Khuyến khích lối sống bảo vệ môi trường.','noun'],
    ['再生能源','zài shēng néng yuán','Năng lượng tái tạo','Renewable energy','使用再生能源。','Sử dụng năng lượng tái tạo.','noun'],
    ['发明','fā míng','Phát minh','Invention / Invent','这个发明改变历史。','Phát minh này thay đổi lịch sử.','noun'],
  ]},
  { title:'Chính trị & Xã hội', title_zh:'政治与社会', level:'HSK4', order:18, words:[
    ['社会','shè huì','Xã hội','Society','构建和谐社会。','Xây dựng xã hội hài hòa.','noun'],
    ['法律','fǎ lǜ','Pháp luật / Luật pháp','Law / Legal','遵守法律。','Tuân thủ pháp luật.','noun'],
    ['权利','quán lì','Quyền lợi / Quyền','Right / Entitlement','保护公民权利。','Bảo vệ quyền công dân.','noun'],
    ['责任','zé rèn','Trách nhiệm','Responsibility / Duty','承担社会责任。','Chịu trách nhiệm xã hội.','noun'],
    ['义务','yì wù','Nghĩa vụ','Obligation / Duty','履行公民义务。','Thực hiện nghĩa vụ công dân.','noun'],
    ['民主','mín zhǔ','Dân chủ','Democracy / Democratic','民主是人民的权利。','Dân chủ là quyền của nhân dân.','noun'],
    ['平等','píng děng','Bình đẳng','Equal / Equality','人人平等。','Mọi người bình đẳng.','adjective'],
    ['公平','gōng píng','Công bằng','Fair / Fairness','公平竞争。','Cạnh tranh công bằng.','adjective'],
    ['自由','zì yóu','Tự do','Freedom / Free','言论自由。','Tự do ngôn luận.','noun'],
    ['和平','hé píng','Hòa bình','Peace','世界和平。','Hòa bình thế giới.','noun'],
    ['战争','zhàn zhēng','Chiến tranh','War','反对战争。','Phản đối chiến tranh.','noun'],
    ['国际','guó jì','Quốc tế','International','国际合作。','Hợp tác quốc tế.','adjective'],
    ['外交','wài jiāo','Ngoại giao','Diplomacy','推动外交关系。','Thúc đẩy quan hệ ngoại giao.','noun'],
    ['政策','zhèng cè','Chính sách','Policy','制定经济政策。','Hoạch định chính sách kinh tế.','noun'],
    ['改革','gǎi gé','Cải cách','Reform','推行改革措施。','Thực hiện biện pháp cải cách.','noun'],
  ]},
  { title:'Tâm lý & Nhận thức nâng cao', title_zh:'心理与认知进阶', level:'HSK4', order:19, words:[
    ['意识','yì shi','Ý thức / Nhận thức','Consciousness / Awareness','增强环保意识。','Nâng cao ý thức bảo vệ môi trường.','noun'],
    ['思想','sī xiǎng','Tư tưởng / Suy nghĩ','Thought / Ideology / Idea','思想进步。','Tư tưởng tiến bộ.','noun'],
    ['观点','guān diǎn','Quan điểm / Ý kiến','Viewpoint / Opinion','不同的观点。','Quan điểm khác nhau.','noun'],
    ['理论','lǐ lùn','Lý thuyết / Lý luận','Theory','理论联系实际。','Lý thuyết gắn với thực tế.','noun'],
    ['逻辑','luó ji','Logic / Lô-gíc','Logic','思维要有逻辑。','Tư duy phải có logic.','noun'],
    ['印象','yìn xiàng','Ấn tượng','Impression','给人留下好印象。','Tạo ấn tượng tốt với người khác.','noun'],
    ['想象','xiǎng xiàng','Tưởng tượng / Hình dung','Imagine / Imagination','发挥想象力。','Phát huy sức tưởng tượng.','verb'],
    ['判断','pàn duàn','Phán đoán / Đánh giá','Judge / Judgment','做出正确判断。','Đưa ra phán đoán đúng đắn.','verb'],
    ['预测','yù cè','Dự đoán / Dự báo','Predict / Forecast','预测市场趋势。','Dự đoán xu hướng thị trường.','verb'],
    ['评估','píng gū','Đánh giá / Thẩm định','Evaluate / Assess','评估风险。','Đánh giá rủi ro.','verb'],
    ['假设','jiǎ shè','Giả sử / Giả thiết','Assume / Hypothesis','假设这个成立。','Giả sử điều này đúng.','verb'],
    ['证据','zhèng jù','Bằng chứng','Evidence / Proof','没有证据。','Không có bằng chứng.','noun'],
    ['结论','jié lùn','Kết luận','Conclusion','得出结论。','Đưa ra kết luận.','noun'],
    ['不得不','bù dé bù','Phải / Bắt buộc phải','Have no choice but to','我不得不同意。','Tôi phải đồng ý thôi.','other'],
    ['不仅','bù jǐn','Không chỉ','Not only','不仅如此。','Không chỉ như vậy.','conjunction'],
  ]},
  { title:'Môi trường làm việc & Quản lý', title_zh:'职场环境与管理', level:'HSK4', order:20, words:[
    ['管理','guǎn lǐ','Quản lý / Quản trị','Manage / Management','企业管理很重要。','Quản lý doanh nghiệp rất quan trọng.','verb'],
    ['领导','lǐng dǎo','Lãnh đạo / Dẫn dắt','Lead / Leadership','优秀的领导。','Người lãnh đạo xuất sắc.','verb'],
    ['团队','tuán duì','Đội nhóm / Tập thể','Team','团队合作精神。','Tinh thần hợp tác đội nhóm.','noun'],
    ['效率','xiào lǜ','Hiệu quả / Hiệu suất','Efficiency','提高工作效率。','Nâng cao hiệu quả làm việc.','noun'],
    ['规定','guī dìng','Quy định / Điều khoản','Rule / Regulation','遵守公司规定。','Tuân thủ quy định của công ty.','noun'],
    ['计划','jì huà','Kế hoạch / Lên kế hoạch','Plan / Schedule','落实工作计划。','Thực hiện kế hoạch công việc.','noun'],
    ['汇报','huì bào','Báo cáo (cấp trên)','Report to superior','向领导汇报工作。','Báo cáo công việc với lãnh đạo.','verb'],
    ['会议','huì yì','Cuộc họp / Hội nghị','Meeting / Conference','参加重要会议。','Tham dự cuộc họp quan trọng.','noun'],
    ['部门','bù mén','Bộ phận / Phòng ban','Department / Division','各个部门合作。','Các bộ phận hợp tác với nhau.','noun'],
    ['职位','zhí wèi','Chức vụ / Vị trí','Position / Post','申请高级职位。','Ứng tuyển vị trí cấp cao.','noun'],
    ['升职','shēng zhí','Được thăng chức','Get promoted','努力工作争取升职。','Nỗ lực làm việc để được thăng chức.','verb'],
    ['辞职','cí zhí','Từ chức / Nghỉ việc','Resign / Quit','他辞职了。','Anh ấy đã từ chức.','verb'],
    ['招聘','zhāo pìn','Tuyển dụng','Recruit / Hire','公司正在招聘。','Công ty đang tuyển dụng.','verb'],
    ['培训','péi xùn','Đào tạo / Huấn luyện','Train / Training','参加职业培训。','Tham gia đào tạo nghề.','verb'],
    ['绩效','jì xiào','Hiệu quả thực tế / KPI','Performance','绩效考核。','Đánh giá hiệu quả.','noun'],
  ]},
  { title:'Giáo dục đại học & Học thuật', title_zh:'高等教育与学术', level:'HSK4', order:21, words:[
    ['大学','dà xué','Đại học','University / College','考上名牌大学。','Đỗ vào đại học danh tiếng.','noun'],
    ['专业','zhuān yè','Chuyên ngành','Major / Specialization','你学什么专业？','Bạn học chuyên ngành gì?','noun'],
    ['奖学金','jiǎng xué jīn','Học bổng','Scholarship','获得奖学金。','Nhận học bổng.','noun'],
    ['研究生','yán jiū shēng','Nghiên cứu sinh / Học viên cao học','Graduate student / Master student','考研究生。','Thi vào nghiên cứu sinh.','noun'],
    ['博士','bó shì','Tiến sĩ','PhD / Doctor (academic)','攻读博士学位。','Học lấy bằng tiến sĩ.','noun'],
    ['导师','dǎo shī','Giáo viên hướng dẫn','Supervisor / Advisor (academic)','我有一位很好的导师。','Tôi có một giáo viên hướng dẫn rất tốt.','noun'],
    ['毕业','bì yè','Tốt nghiệp','Graduate','毕业后找工作。','Sau khi tốt nghiệp đi tìm việc.','verb'],
    ['学位','xué wèi','Học vị / Bằng cấp','Academic degree','获得学士学位。','Lấy bằng cử nhân.','noun'],
    ['课程','kè chéng','Khóa học / Chương trình học','Curriculum / Course','选修课程。','Chọn khóa học.','noun'],
    ['学期','xué qī','Học kỳ','Semester / Academic term','这学期很忙。','Học kỳ này rất bận.','noun'],
    ['实习','shí xí','Thực tập','Internship / Practice','参加实习项目。','Tham gia chương trình thực tập.','verb'],
    ['论文答辩','lùn wén dá biàn','Bảo vệ luận văn','Thesis defense','论文答辩顺利通过。','Bảo vệ luận văn thành công.','noun'],
    ['发表','fā biǎo','Phát biểu / Công bố','Publish / Announce','发表学术论文。','Công bố bài báo khoa học.','verb'],
    ['引用','yǐn yòng','Trích dẫn','Cite / Quote','正确引用文献。','Trích dẫn tài liệu đúng chuẩn.','verb'],
    ['参考文献','cān kǎo wén xiàn','Tài liệu tham khảo','Bibliography / References','列出参考文献。','Liệt kê tài liệu tham khảo.','noun'],
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
    console.log(`\n✅ HSK4 Batch1: +${tL} bài, +${tW} từ → HSK4 tổng: ${s.c} từ / 1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
