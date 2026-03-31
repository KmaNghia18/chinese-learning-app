// seed_hsk4_batch4.js — HSK4 batch 4: Giao thông, Xây dựng, Y học cổ truyền, Tài chính, Ngoại giao, Xã hội
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Giao thông hiện đại & Đô thị hóa', title_zh:'现代交通与城镇化', level:'HSK4', order:32, words:[
    ['高铁','gāo tiě','Tàu cao tốc','High-speed rail','坐高铁去北京。','Đi tàu cao tốc đến Bắc Kinh.','noun'],
    ['地铁站','dì tiě zhàn','Ga tàu điện ngầm','Metro station','在地铁站等你。','Đợi bạn ở ga tàu điện ngầm.','noun'],
    ['高速公路','gāo sù gōng lù','Đường cao tốc','Expressway / Highway','走高速公路省时间。','Đi đường cao tốc tiết kiệm thời gian.','noun'],
    ['拥堵','yōng dǔ','Kẹt xe / Tắc nghẽn','Traffic congestion','早高峰严重拥堵。','Giờ cao điểm sáng kẹt xe nghiêm trọng.','noun'],
    ['无人驾驶','wú rén jià shǐ','Xe tự lái / Lái không người','Self-driving / Autonomous','无人驾驶汽车技术。','Công nghệ xe tự lái.','noun'],
    ['共享单车','gòng xiǎng dān chē','Xe đạp chia sẻ','Shared bicycle / Bike sharing','骑共享单车出行。','Đi lại bằng xe đạp chia sẻ.','noun'],
    ['网约车','wǎng yuē chē','Xe dịch vụ đặt qua mạng','Ride-hailing / Rideshare','用APP叫网约车。','Dùng APP gọi xe đặt qua mạng.','noun'],
    ['城镇化','chéng zhèn huà','Đô thị hóa','Urbanization','加快城镇化进程。','Đẩy nhanh quá trình đô thị hóa.','noun'],
    ['基础设施','jī chǔ shè shī','Cơ sở hạ tầng','Infrastructure','完善基础设施建设。','Hoàn thiện xây dựng cơ sở hạ tầng.','noun'],
    ['隧道','suì dào','Đường hầm / Hầm','Tunnel','穿山隧道很长。','Đường hầm xuyên núi rất dài.','noun'],
    ['桥梁','qiáo liáng','Cầu (công trình)','Bridge','修建跨海大桥。','Xây dựng cầu vượt biển.','noun'],
    ['港口','gǎng kǒu','Cảng biển / Bến cảng','Port / Harbor','上海港是大港口。','Cảng Thượng Hải là cảng lớn.','noun'],
  ]},
  { title:'Y học cổ truyền Trung Hoa', title_zh:'中医与传统医学', level:'HSK4', order:33, words:[
    ['中医','zhōng yī','Đông y / Y học cổ truyền TQ','Traditional Chinese Medicine (TCM)','他学中医。','Anh ấy học Đông y.','noun'],
    ['针灸','zhēn jiǔ','Châm cứu','Acupuncture','针灸治腰痛。','Châm cứu chữa đau lưng.','noun'],
    ['草药','cǎo yào','Thảo dược','Herbal medicine','用草药治病。','Dùng thảo dược chữa bệnh.','noun'],
    ['阴阳','yīn yáng','Âm dương','Yin and Yang','阴阳平衡很重要。','Cân bằng âm dương rất quan trọng.','noun'],
    ['气功','qì gōng','Khí công','Qigong','练习气功健身。','Luyện khí công để rèn luyện sức khỏe.','noun'],
    ['太极拳','tài jí quán','Thái cực quyền','Tai Chi','老人练太极拳。','Người già tập thái cực quyền.','noun'],
    ['食疗','shí liáo','Ăn uống trị liệu','Dietary therapy / Food therapy','食疗养生。','Ăn uống trị liệu dưỡng sinh.','noun'],
    ['穴位','xué wèi','Huyệt đạo / Huyệt vị','Acupuncture point','刺激穴位治病。','Kích thích huyệt đạo chữa bệnh.','noun'],
    ['脉搏','mài bó','Mạch đập / Nhịp mạch','Pulse','把脉诊断。','Bắt mạch chẩn đoán.','noun'],
    ['调养','diào yǎng','Bồi dưỡng / Điều dưỡng','Recuperate / Nourish','慢慢调养身体。','Từ từ bồi dưỡng sức khỏe.','verb'],
    ['祛湿','qū shī','Trừ thấp / Loại bỏ độ ẩm','Remove dampness (TCM)','祛湿排毒。','Trừ thấp thải độc.','verb'],
    ['滋补','zī bǔ','Bổ dưỡng / Tẩm bổ','Nourishing / Nutritious (TCM)','用滋补食物调养。','Dùng thức ăn bổ dưỡng để điều dưỡng.','adjective'],
  ]},
  { title:'Tài chính & Thị trường vốn', title_zh:'金融与资本市场', level:'HSK4', order:34, words:[
    ['股票','gǔ piào','Cổ phiếu','Stock / Share','炒股要谨慎。','Đầu tư chứng khoán phải thận trọng.','noun'],
    ['基金','jī jīn','Quỹ đầu tư','Fund / Investment fund','购买指数基金。','Mua quỹ chỉ số.','noun'],
    ['债券','zhài quàn','Trái phiếu','Bond','购买国债。','Mua trái phiếu chính phủ.','noun'],
    ['通货膨胀','tōng huò péng zhàng','Lạm phát','Inflation','控制通货膨胀。','Kiểm soát lạm phát.','noun'],
    ['贷款','dài kuǎn','Vay vốn / Tín dụng','Loan','向银行申请贷款。','Xin vay vốn từ ngân hàng.','noun'],
    ['抵押','dǐ yā','Thế chấp','Mortgage / Collateral','用房子做抵押。','Dùng nhà làm tài sản thế chấp.','verb'],
    ['保险','bǎo xiǎn','Bảo hiểm','Insurance','买人寿保险。','Mua bảo hiểm nhân thọ.','noun'],
    ['房地产','fáng dì chǎn','Bất động sản','Real estate','房地产市场活跃。','Thị trường bất động sản sôi động.','noun'],
    ['税收','shuì shōu','Thuế / Thu thuế','Tax / Tax revenue','缴纳个人所得税。','Nộp thuế thu nhập cá nhân.','noun'],
    ['外汇','wài huì','Ngoại hối','Foreign exchange','外汇储备充足。','Dự trữ ngoại hối dồi dào.','noun'],
    ['赤字','chì zì','Thâm hụt / Thâm hụt ngân sách','Deficit','财政赤字很大。','Thâm hụt tài chính rất lớn.','noun'],
    ['盈利','yíng lì','Sinh lời / Có lãi','Profit / Make profit','公司盈利增长。','Lợi nhuận công ty tăng trưởng.','verb'],
  ]},
  { title:'Quan hệ quốc tế & Ngoại giao', title_zh:'国际关系与外交', level:'HSK4', order:35, words:[
    ['条约','tiáo yuē','Hiệp ước / Điều ước','Treaty','签订双边条约。','Ký kết hiệp ước song phương.','noun'],
    ['制裁','zhì cái','Trừng phạt / Trừng chế','Sanction','实施经济制裁。','Áp đặt biện pháp trừng phạt kinh tế.','verb'],
    ['谈判','tán pàn','Đàm phán / Thương lượng (cao cấp)','Negotiate / Negotiation','外交谈判。','Đàm phán ngoại giao.','verb'],
    ['峰会','fēng huì','Hội nghị thượng đỉnh','Summit / Summit meeting','举办G20峰会。','Tổ chức hội nghị thượng đỉnh G20.','noun'],
    ['联合国','lián hé guó','Liên Hợp Quốc','United Nations','加入联合国。','Gia nhập Liên Hợp Quốc.','noun'],
    ['大使馆','dà shǐ guǎn','Đại sứ quán','Embassy','去大使馆申请签证。','Đến đại sứ quán xin visa.','noun'],
    ['领事馆','lǐng shì guǎn','Lãnh sự quán','Consulate','在领事馆办理手续。','Làm thủ tục tại lãnh sự quán.','noun'],
    ['主权','zhǔ quyán','Chủ quyền','Sovereignty','捍卫国家主权。','Bảo vệ chủ quyền quốc gia.','noun'],
    ['争端','zhēng duān','Tranh chấp','Dispute / Conflict','领土争端。','Tranh chấp lãnh thổ.','noun'],
    ['合作框架','hé zuò kuàng jià','Khung hợp tác','Cooperation framework','建立合作框架。','Xây dựng khung hợp tác.','noun'],
    ['共识','gòng shí','Sự đồng thuận / Sự nhất trí','Consensus','寻求各方共识。','Tìm kiếm sự đồng thuận từ các bên.','noun'],
    ['双边','shuāng biān','Song phương','Bilateral','双边贸易额增加。','Kim ngạch thương mại song phương tăng.','adjective'],
  ]},
  { title:'Vấn đề xã hội & Phúc lợi', title_zh:'社会问题与福利', level:'HSK4', order:36, words:[
    ['贫富差距','pín fù chā jù','Chênh lệch giàu nghèo','Income inequality / Wealth gap','缩小贫富差距。','Thu hẹp chênh lệch giàu nghèo.','noun'],
    ['失业','shī yè','Thất nghiệp','Unemployment','失业率下降。','Tỷ lệ thất nghiệp giảm.','noun'],
    ['社会保障','shè huì bǎo zhàng','Bảo đảm xã hội','Social security','完善社会保障制度。','Hoàn thiện chế độ bảo đảm xã hội.','noun'],
    ['养老金','yǎng lǎo jīn','Lương hưu','Pension','领取养老金生活。','Sống bằng lương hưu.','noun'],
    ['医疗保险','yī liáo bǎo xiǎn','Bảo hiểm y tế','Health insurance','参加医疗保险。','Tham gia bảo hiểm y tế.','noun'],
    ['脱贫','tuō pín','Thoát nghèo','Poverty alleviation','帮助农村脱贫。','Giúp nông thôn thoát nghèo.','verb'],
    ['扶贫','fú pín','Xóa đói giảm nghèo','Poverty reduction / Help the poor','开展扶贫工作。','Triển khai công tác xóa đói giảm nghèo.','verb'],
    ['歧视','qí shì','Kỳ thị / Phân biệt đối xử','Discriminate / Discrimination','反对种族歧视。','Chống phân biệt chủng tộc.','verb'],
    ['志愿者','zhì yuàn zhě','Tình nguyện viên','Volunteer','参加志愿者活动。','Tham gia hoạt động tình nguyện.','noun'],
    ['公益','gōng yì','Công ích / Phục vụ cộng đồng','Public welfare','参与公益活动。','Tham gia hoạt động công ích.','noun'],
    ['慈善','cí shàn','Từ thiện','Charity / Philanthropy','捐款做慈善。','Quyên góp làm từ thiện.','noun'],
    ['社区','shè qū','Cộng đồng / Khu dân cư','Community','建设和谐社区。','Xây dựng cộng đồng hài hòa.','noun'],
  ]},
  { title:'Tâm lý xã hội & Hành vi con người', title_zh:'社会心理与人类行为', level:'HSK4', order:37, words:[
    ['从众','cóng zhòng','Tâm lý đám đông / Theo số đông','Conformity / Follow the crowd','从众心理影响决策。','Tâm lý đám đông ảnh hưởng ra quyết định.','noun'],
    ['偏见','piān jiàn','Thành kiến / Định kiến','Bias / Prejudice','克服偏见。','Vượt qua thành kiến.','noun'],
    ['动机','dòng jī','Động cơ / Động lực','Motivation / Motive','了解行为动机。','Hiểu được động cơ hành vi.','noun'],
    ['自尊','zì zūn','Tự tôn / Lòng tự trọng','Self-esteem / Pride','建立良好自尊。','Xây dựng lòng tự trọng tốt.','noun'],
    ['压力','yā lì','Áp lực / Sức ép','Pressure / Stress','承受工作压力。','Chịu áp lực công việc.','noun'],
    ['应激','yìng jī','Phản ứng căng thẳng (tâm lý học)','Stress response','应激反应。','Phản ứng với áp lực.','noun'],
    ['信任','xìn rèn','Tin tưởng / Tín nhiệm','Trust / Confidence','建立互信关系。','Xây dựng mối quan hệ tin tưởng.','noun'],
    ['沟通','gōu tōng','Giao tiếp / Trao đổi','Communicate / Communication','有效沟通很重要。','Giao tiếp hiệu quả rất quan trọng.','verb'],
    ['同理心','tóng lǐ xīn','Sự đồng cảm / Empathy','Empathy','培养同理心。','Bồi dưỡng sự đồng cảm.','noun'],
    ['人格','rén gé','Nhân cách / Tính cách','Personality / Character','塑造健全人格。','Xây dựng nhân cách toàn vẹn.','noun'],
    ['潜意识','qián yì shí','Tiềm thức','Subconscious','潜意识影响行为。','Tiềm thức ảnh hưởng hành vi.','noun'],
    ['成瘾','chéng yǐn','Nghiện / Phụ thuộc','Addicted / Addiction','预防网络成瘾。','Phòng ngừa nghiện internet.','verb'],
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
    console.log(`\n✅ HSK4 Batch4: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
