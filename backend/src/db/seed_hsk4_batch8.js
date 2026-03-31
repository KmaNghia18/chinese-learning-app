// seed_hsk4_batch8.js — HSK4: Xã hội nâng cao, Sức khoẻ, Đổi mới, Liên văn hoá, Lễ hội TQ, Ngôn ngữ
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Phong trào xã hội & Nhân quyền', title_zh:'社会运动与人权', level:'HSK4', order:55, words:[
    ['人权','rén quán','Nhân quyền','Human rights','保障人权。','Bảo đảm nhân quyền.','noun'],
    ['平权','píng quán','Bình quyền','Equal rights / Equity','争取平权运动。','Phong trào đấu tranh bình quyền.','noun'],
    ['抗议','kàng yì','Phản đối / Kháng nghị','Protest / Object','举行抗议活动。','Tổ chức hoạt động phản đối.','verb'],
    ['示威','shì wēi','Biểu tình','Demonstration','和平示威游行。','Biểu tình tuần hành hoà bình.','verb'],
    ['倡导','chàng dǎo','Ủng hộ / Vận động','Advocate / Champion','倡导环保事业。','Vận động cho sự nghiệp bảo vệ môi trường.','verb'],
    ['包容','bāo róng','Bao dung / Khoan dung','Tolerant / Inclusive','文化包容多元。','Bao dung đa dạng văn hoá.','adjective'],
    ['多元化','duō yuán huà','Đa dạng hoá','Diversify / Diversification','促进社会多元化。','Thúc đẩy đa dạng hoá xã hội.','verb'],
    ['边缘化','biān yuán huà','Bên lề hoá / Ngoại lệ hoá','Marginalize','防止边缘化群体。','Ngăn chặn việc bên lề hoá các nhóm.','verb'],
    ['弱势群体','ruò shì qún tǐ','Nhóm dễ bị tổn thương','Vulnerable groups','帮助弱势群体。','Giúp đỡ các nhóm dễ bị tổn thương.','noun'],
    ['社会公正','shè huì gōng zhèng','Công bằng xã hội','Social justice','追求社会公正。','Theo đuổi công bằng xã hội.','noun'],
    ['性别平等','xìng bié píng děng','Bình đẳng giới','Gender equality','推动性别平等。','Thúc đẩy bình đẳng giới.','noun'],
    ['残障','cán zhàng','Khuyết tật','Disability','帮助残障人士。','Giúp đỡ người khuyết tật.','noun'],
  ]},
  { title:'Wellness & Sức khoẻ toàn diện', title_zh:'健康与全面养生', level:'HSK4', order:56, words:[
    ['养生','yǎng shēng','Dưỡng sinh / Giữ gìn sức khoẻ','Health preservation','注重养生保健。','Chú trọng dưỡng sinh bảo vệ sức khoẻ.','noun'],
    ['体检','tǐ jiǎn','Khám sức khoẻ định kỳ','Physical examination / Health check','定期进行体检。','Định kỳ khám sức khoẻ.','noun'],
    ['亚健康','yà jiàn kāng','Tình trạng sức khoẻ nửa vời','Sub-optimal health','处于亚健康状态。','Đang ở trạng thái sức khoẻ chưa tốt.','noun'],
    ['失眠','shī mián','Mất ngủ','Insomnia','长期失眠很危险。','Mất ngủ lâu dài rất nguy hiểm.','noun'],
    ['冥想','míng xiǎng','Thiền / Thiền định','Meditation','每天十分钟冥想。','Thiền mười phút mỗi ngày.','verb'],
    ['有氧运动','yǒu yǎng yùn dòng','Bài tập aerobic','Aerobic exercise','坚持有氧运动。','Kiên trì bài tập aerobic.','noun'],
    ['肌肉','jī ròu','Cơ bắp / Cơ','Muscle','锻炼肌肉力量。','Rèn luyện sức mạnh cơ bắp.','noun'],
    ['脊椎','jǐ zhuī','Cột sống / Đốt sống','Spine / Vertebra','保护脊椎健康。','Bảo vệ sức khoẻ cột sống.','noun'],
    ['血压','xuè yā','Huyết áp','Blood pressure','控制血压水平。','Kiểm soát mức huyết áp.','noun'],
    ['血糖','xuè táng','Đường huyết','Blood sugar / Glucose level','监测血糖指数。','Theo dõi chỉ số đường huyết.','noun'],
    ['排毒','pái dú','Thải độc / Giải độc','Detox / Detoxify','身体自然排毒。','Cơ thể tự nhiên thải độc.','verb'],
    ['抗衰老','kàng shuāi lǎo','Chống lão hoá','Anti-aging','抗衰老保养。','Bảo dưỡng chống lão hoá.','adjective'],
  ]},
  { title:'Khởi nghiệp & Hệ sinh thái đổi mới', title_zh:'创业与创新生态', level:'HSK4', order:57, words:[
    ['独角兽','dú jiǎo shòu','Kỳ lân (công ty khởi nghiệp)','Unicorn (startup)','成为独角兽企业。','Trở thành công ty kỳ lân.','noun'],
    ['融资','róng zī','Gọi vốn / Huy động vốn','Fundraising / Financing','A轮融资成功。','Gọi vốn vòng A thành công.','verb'],
    ['孵化器','fū huà qì','Vườn ươm khởi nghiệp','Business incubator','加入创业孵化器。','Tham gia vườn ươm khởi nghiệp.','noun'],
    ['风险投资','fēng xiǎn tóu zī','Đầu tư mạo hiểm / VC','Venture capital (VC)','获得风险投资。','Nhận đầu tư mạo hiểm.','noun'],
    ['商业模式','shāng yè mó shì','Mô hình kinh doanh','Business model','创新商业模式。','Đổi mới mô hình kinh doanh.','noun'],
    ['试错','shì cuò','Thử nghiệm và sai lầm','Trial and error','快速试错迭代。','Thử nghiệm và sai lầm nhanh chóng.','verb'],
    ['迭代','dié dài','Lặp đi lặp lại / Cải tiến liên tục','Iterate / Iteration','产品快速迭代。','Sản phẩm cải tiến liên tục nhanh chóng.','verb'],
    ['用户痛点','yòng hù tòng diǎn','Điểm đau của người dùng','User pain point','解决用户痛点。','Giải quyết điểm đau của người dùng.','noun'],
    ['产品经理','chǎn pǐn jīng lǐ','Người quản lý sản phẩm / PM','Product manager (PM)','优秀的产品经理。','Người quản lý sản phẩm xuất sắc.','noun'],
    ['市场调研','shì chǎng diào yán','Nghiên cứu thị trường','Market research','做市场调研分析。','Thực hiện phân tích nghiên cứu thị trường.','noun'],
    ['变现','biàn xiàn','Thu tiền / Kiếm tiền từ','Monetize','内容如何变现？','Nội dung kiếm tiền bằng cách nào?','verb'],
    ['增长黑客','zēng zhǎng hēi kè','Tăng trưởng hack / Growth hacking','Growth hacking','运用增长黑客策略。','Áp dụng chiến lược tăng trưởng hack.','noun'],
  ]},
  { title:'Giao tiếp liên văn hoá', title_zh:'跨文化交流', level:'HSK4', order:58, words:[
    ['跨文化','kuà wén huà','Liên văn hoá / Xuyên văn hoá','Cross-cultural','跨文化交流技巧。','Kỹ năng giao tiếp liên văn hoá.','adjective'],
    ['文化差异','wén huà chā yì','Khác biệt văn hoá','Cultural difference','了解文化差异。','Hiểu biết khác biệt văn hoá.','noun'],
    ['刻板印象','kè bǎn yìn xiàng','Định kiến khuôn mẫu / Stereotype','Stereotype','打破文化刻板印象。','Phá vỡ định kiến khuôn mẫu văn hoá.','noun'],
    ['文化冲击','wén huà chōng jī','Sốc văn hoá / Cú sốc văn hoá','Culture shock','经历了文化冲击。','Trải qua sốc văn hoá.','noun'],
    ['适应','shì yìng','Thích nghi / Thích ứng','Adapt / Adjust','适应新文化环境。','Thích nghi với môi trường văn hoá mới.','verb'],
    ['文化融合','wén huà róng hé','Hoà nhập văn hoá','Cultural integration','促进文化融合。','Thúc đẩy hoà nhập văn hoá.','noun'],
    ['礼节','lǐ jié','Lễ nghi / Phép tắc','Etiquette / Propriety','了解各国礼节。','Hiểu biết về lễ nghi từng nước.','noun'],
    ['禁忌','jìn jì','Điều cấm kỵ / Taboo','Taboo / Forbidden','了解当地禁忌。','Hiểu biết điều cấm kỵ địa phương.','noun'],
    ['语言障碍','yǔ yán zhàng ài','Rào cản ngôn ngữ','Language barrier','克服语言障碍。','Vượt qua rào cản ngôn ngữ.','noun'],
    ['全球公民','quán qiú gōng mín','Công dân toàn cầu','Global citizen','培养全球公民意识。','Bồi dưỡng ý thức công dân toàn cầu.','noun'],
    ['国际视野','guó jì shì yě','Tầm nhìn quốc tế','International perspective','拓展国际视野。','Mở rộng tầm nhìn quốc tế.','noun'],
    ['文化软实力','wén huà ruǎn shí lì','Sức mạnh mềm văn hoá','Cultural soft power','提升文化软实力。','Nâng cao sức mạnh mềm văn hoá.','noun'],
  ]},
  { title:'Lễ hội Trung Quốc & Phong tục', title_zh:'中国传统节日与风俗', level:'HSK4', order:59, words:[
    ['除夕','chú xī','Đêm Giao thừa','New Year Eve','除夕全家团圆。','Đêm Giao thừa cả nhà đoàn tụ.','noun'],
    ['拜年','bài nián','Chúc Tết / Thăm hỏi Tết','Pay New Year visit','给长辈拜年。','Chúc Tết bề trên.','verb'],
    ['红包','hóng bāo','Phong bì đỏ / Lì xì','Red envelope (money gift)','发红包给孩子。','Lì xì cho trẻ em.','noun'],
    ['舞龙','wǔ lóng','Múa rồng','Dragon dance','春节舞龙表演。','Biểu diễn múa rồng dịp Tết.','noun'],
    ['舞狮','wǔ shī','Múa lân','Lion dance','舞狮表演热闹。','Biểu diễn múa lân sôi nổi.','noun'],
    ['灯笼','dēng lóng','Đèn lồng','Lantern','挂红灯笼。','Treo đèn lồng đỏ.','noun'],
    ['清明节','qīng míng jié','Tết Thanh Minh','Tomb-Sweeping Day (Qingming)','清明节祭祖扫墓。','Tết Thanh Minh tảo mộ cúng tổ tiên.','noun'],
    ['端午节','duān wǔ jié','Tết Đoan Ngọ','Dragon Boat Festival','端午节赛龙舟。','Tết Đoan Ngọ đua thuyền rồng.','noun'],
    ['中秋节','zhōng qiū jié','Tết Trung Thu','Mid-Autumn Festival','中秋节赏月吃月饼。','Tết Trung Thu ngắm trăng ăn bánh trung thu.','noun'],
    ['重阳节','chóng yáng jié','Tết Trùng Dương (9/9)','Double Ninth Festival','重阳节登高望远。','Tết Trùng Dương leo núi ngắm xa.','noun'],
    ['七夕','qī xī','Thất Tịch / Ngày lễ tình nhân TQ','Qixi Festival (Chinese Valentine)','七夕是中国情人节。','Thất Tịch là ngày lễ tình nhân Trung Quốc.','noun'],
    ['元宵节','yuán xiāo jié','Tết Nguyên Tiêu','Lantern Festival','元宵节吃汤圆。','Tết Nguyên Tiêu ăn bánh trôi.','noun'],
  ]},
  { title:'Toán học & Thống kê nâng cao', title_zh:'数学与统计学进阶', level:'HSK4', order:60, words:[
    ['概率','gài lǜ','Xác suất','Probability','计算事件概率。','Tính xác suất sự kiện.','noun'],
    ['统计','tǒng jì','Thống kê','Statistics / Statistical','数据统计分析。','Phân tích thống kê dữ liệu.','noun'],
    ['平均值','píng jūn zhí','Giá trị trung bình','Average / Mean','计算平均值。','Tính giá trị trung bình.','noun'],
    ['方差','fāng chā','Phương sai','Variance','计算数据方差。','Tính phương sai dữ liệu.','noun'],
    ['函数','hán shù','Hàm số','Function (math)','线性函数图像。','Biểu đồ hàm số tuyến tính.','noun'],
    ['变量','biàn liàng','Biến số','Variable','确定研究变量。','Xác định biến số nghiên cứu.','noun'],
    ['相关性','xiāng guān xìng','Tương quan / Mối liên hệ','Correlation','分析变量相关性。','Phân tích mối tương quan biến số.','noun'],
    ['模型','mó xíng','Mô hình','Model','建立预测模型。','Xây dựng mô hình dự đoán.','noun'],
    ['抽样','chōu yàng','Lấy mẫu / Chọn mẫu','Sampling','随机抽样调查。','Điều tra lấy mẫu ngẫu nhiên.','verb'],
    ['误差','wù chā','Sai số','Error / Margin of error','减少实验误差。','Giảm sai số thí nghiệm.','noun'],
    ['图表','tú biǎo','Biểu đồ / Đồ thị','Chart / Graph','制作数据图表。','Tạo biểu đồ dữ liệu.','noun'],
    ['趋势','qū shì','Xu hướng','Trend','分析市场趋势。','Phân tích xu hướng thị trường.','noun'],
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
    console.log(`\n✅ Batch8: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
