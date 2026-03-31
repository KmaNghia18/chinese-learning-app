// seed_hsk4_final.js — HSK4 hoàn thiện: +280 từ đạt 1200
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Năng lượng & Khoáng sản', title_zh:'能源与矿产资源', level:'HSK4', order:74, words:[
    ['石油','shí yóu','Dầu mỏ / Dầu lửa','Petroleum / Oil','石油是重要能源。','Dầu mỏ là nguồn năng lượng quan trọng.','noun'],
    ['天然气','tiān rán qì','Khí tự nhiên','Natural gas','使用天然气供暖。','Sử dụng khí tự nhiên để sưởi ấm.','noun'],
    ['煤炭','méi tàn','Than đá','Coal','减少煤炭使用。','Giảm sử dụng than đá.','noun'],
    ['矿产','kuàng chǎn','Khoáng sản','Mineral resources','开采矿产资源。','Khai thác tài nguyên khoáng sản.','noun'],
    ['核电','hé diàn','Điện hạt nhân','Nuclear power','核电站安全问题。','Vấn đề an toàn nhà máy điện hạt nhân.','noun'],
    ['水力发电','shuǐ lì fā diàn','Thuỷ điện','Hydroelectric power','建设水力发电站。','Xây dựng nhà máy thuỷ điện.','noun'],
    ['光伏','guāng fú','Quang điện / Pin mặt trời','Photovoltaic (PV)','光伏发电技术。','Công nghệ phát điện quang điện.','noun'],
    ['储能','chǔ néng','Lưu trữ năng lượng','Energy storage','发展储能技术。','Phát triển công nghệ lưu trữ năng lượng.','noun'],
    ['碳税','tàn shuì','Thuế carbon','Carbon tax','征收碳税政策。','Chính sách thu thuế carbon.','noun'],
    ['能耗','néng hào','Tiêu thụ năng lượng','Energy consumption','降低工业能耗。','Giảm tiêu thụ năng lượng công nghiệp.','noun'],
    ['电网','diàn wǎng','Lưới điện','Power grid','智能电网建设。','Xây dựng lưới điện thông minh.','noun'],
    ['绿氢','lǜ qīng','Hydro xanh','Green hydrogen','发展绿氢能源。','Phát triển năng lượng hydro xanh.','noun'],
  ]},
  { title:'Đô thị hoá & Quy hoạch đô thị', title_zh:'城镇化与城市规划', level:'HSK4', order:75, words:[
    ['城市规划','chéng shì guī huà','Quy hoạch đô thị','Urban planning','制定城市规划方案。','Xây dựng phương án quy hoạch đô thị.','noun'],
    ['绿化','lǜ huà','Phủ xanh / Trồng cây','Greening / Afforestation','城市绿化工程。','Công trình phủ xanh thành phố.','verb'],
    ['旧城改造','jiù chéng gǎi zào','Cải tạo khu phố cũ','Old city renovation','旧城改造计划。','Kế hoạch cải tạo khu phố cũ.','noun'],
    ['智慧城市','zhì huì chéng shì','Thành phố thông minh','Smart city','建设智慧城市。','Xây dựng thành phố thông minh.','noun'],
    ['公共交通','gōng gòng jiāo tōng','Giao thông công cộng','Public transportation','发展公共交通。','Phát triển giao thông công cộng.','noun'],
    ['步行街','bù xíng jiē','Phố đi bộ','Pedestrian street','建设步行商业街。','Xây dựng phố thương mại đi bộ.','noun'],
    ['城市热岛','chéng shì rè dǎo','Đảo nhiệt đô thị','Urban heat island','缓解城市热岛效应。','Giảm thiểu hiệu ứng đảo nhiệt đô thị.','noun'],
    ['老龄化','lǎo líng huà','Già hoá dân số','Aging / Population aging','应对城市老龄化。','Ứng phó già hoá dân số đô thị.','verb'],
    ['房价','fáng jià','Giá nhà','Housing price','控制房价过快增长。','Kiềm chế tăng giá nhà quá nhanh.','noun'],
    ['保障房','bǎo zhàng fáng','Nhà ở bảo đảm xã hội','Affordable housing','建设保障性住房。','Xây dựng nhà ở bảo đảm xã hội.','noun'],
    ['海绵城市','hǎi mián chéng shì','Thành phố bọt biển (thẩm thấu nước)','Sponge city','建设海绵城市。','Xây dựng thành phố bọt biển.','noun'],
    ['生态城市','shēng tài chéng shì','Thành phố sinh thái','Ecological city','打造生态城市。','Xây dựng thành phố sinh thái.','noun'],
  ]},
  { title:'Hàng không & Hàng hải', title_zh:'航空与航运', level:'HSK4', order:76, words:[
    ['机场','jī chǎng','Sân bay','Airport','国际机场扩建。','Mở rộng sân bay quốc tế.','noun'],
    ['跑道','pǎo dào','Đường băng','Runway / Track','飞机在跑道上起降。','Máy bay cất hạ cánh trên đường băng.','noun'],
    ['舱位','cāng wèi','Hạng ghế / Khoang ghế (máy bay)','Cabin class / Seat (air)','预订头等舱。','Đặt ghế hạng nhất.','noun'],
    ['延误','yán wù','Chậm trễ / Hoãn','Delay','航班延误两小时。','Chuyến bay hoãn hai tiếng.','verb'],
    ['转机','zhuǎn jī','Chuyển máy bay / Quá cảnh','Transfer / Layover (flight)','转机去欧洲。','Chuyển máy bay đi châu Âu.','verb'],
    ['货运','huò yùn','Vận chuyển hàng hoá','Cargo / Freight transport','空运货运很贵。','Vận chuyển hàng không rất đắt.','noun'],
    ['船舶','chuán bó','Tàu thuyền','Ship / Vessel','远洋船舶航行。','Tàu viễn dương hành trình.','noun'],
    ['港湾','gǎng wān','Cảng vịnh / Vịnh cảng','Harbor / Bay','天然港湾。','Cảng tự nhiên đẹp.','noun'],
    ['海运','hǎi yùn','Vận chuyển biển','Sea freight / Maritime shipping','海运成本低。','Chi phí vận tải biển thấp.','noun'],
    ['码头','mǎ tou','Bến cảng / Bến tàu','Dock / Wharf / Pier','在码头装卸货物。','Bốc dỡ hàng hoá tại bến cảng.','noun'],
    ['领空','lǐng kōng','Không phận','Airspace','违规进入领空。','Vi phạm xâm nhập không phận.','noun'],
    ['领海','lǐng hǎi','Lãnh hải','Territorial waters','保卫国家领海。','Bảo vệ lãnh hải quốc gia.','noun'],
  ]},
  { title:'Mỹ phẩm & Làm đẹp', title_zh:'美妆与护肤', level:'HSK4', order:77, words:[
    ['护肤','hù fū','Chăm sóc da','Skincare','重视日常护肤。','Coi trọng chăm sóc da hằng ngày.','verb'],
    ['防晒','fáng shài','Chống nắng','Sun protection / Sunscreen','外出涂防晒霜。','Ra ngoài thoa kem chống nắng.','verb'],
    ['精华液','jīng huá yè','Serum / Tinh chất dưỡng da','Serum / Essence','使用美白精华液。','Sử dụng serum trắng da.','noun'],
    ['保湿','bǎo shī','Dưỡng ẩm','Moisturize / Hydrate','保湿护肤很重要。','Dưỡng ẩm chăm sóc da rất quan trọng.','verb'],
    ['口红','kǒu hóng','Son môi','Lipstick','涂上口红更好看。','Tô son môi trông đẹp hơn.','noun'],
    ['粉底','fěn dǐ','Kem nền','Foundation (makeup)','选对粉底色号。','Chọn đúng tông màu kem nền.','noun'],
    ['眼线','yǎn xiàn','Kẻ mắt / Eyeliner','Eyeliner','画眼线增添魅力。','Kẻ mắt thêm phần quyến rũ.','noun'],
    ['卸妆','xiè zhuāng','Tẩy trang','Remove makeup','睡前必须卸妆。','Trước khi ngủ phải tẩy trang.','verb'],
    ['香水','xiāng shuǐ','Nước hoa','Perfume / Fragrance','喷上淡雅香水。','Xịt nước hoa nhẹ nhàng.','noun'],
    ['美甲','měi jiǎ','Làm móng / Nail art','Nail (art)','去美甲店做美甲。','Đến tiệm làm móng làm nail.','noun'],
    ['整容','zhěng róng','Phẫu thuật thẩm mỹ','Cosmetic surgery','整容手术越来越普遍。','Phẫu thuật thẩm mỹ ngày càng phổ biến.','noun'],
    ['天然成分','tiān rán chéng fèn','Thành phần tự nhiên','Natural ingredients','使用天然成分护肤品。','Sử dụng sản phẩm có thành phần tự nhiên.','noun'],
  ]},
  { title:'Tài chính cá nhân & Hoạch định', title_zh:'个人理财与规划', level:'HSK4', order:78, words:[
    ['收支','shōu zhī','Thu chi / Thu nhập và chi tiêu','Income and expenditure','平衡收支很重要。','Cân bằng thu chi rất quan trọng.','noun'],
    ['预算','yù suàn','Ngân sách / Lập ngân sách','Budget','制定月度预算。','Lập ngân sách hàng tháng.','noun'],
    ['应急基金','yìng jí jī jīn','Quỹ khẩn cấp','Emergency fund','建立应急基金。','Lập quỹ khẩn cấp.','noun'],
    ['复利','fù lì','Lãi kép','Compound interest','复利的力量巨大。','Sức mạnh của lãi kép rất lớn.','noun'],
    ['分散投资','fēn sàn tóu zī','Đa dạng hoá đầu tư','Diversify investments','分散投资降低风险。','Đa dạng hoá đầu tư giảm rủi ro.','verb'],
    ['被动收入','bèi dòng shōu rù','Thu nhập thụ động','Passive income','建立被动收入来源。','Xây dựng nguồn thu nhập thụ động.','noun'],
    ['净资产','jìng zī chǎn','Tài sản ròng','Net worth','计算个人净资产。','Tính tài sản ròng cá nhân.','noun'],
    ['信用评分','xìn yòng píng fēn','Điểm tín dụng','Credit score','维护良好信用评分。','Duy trì điểm tín dụng tốt.','noun'],
    ['债务','zhài wù','Nợ / Công nợ','Debt','尽快还清债务。','Trả hết nợ càng sớm càng tốt.','noun'],
    ['退休规划','tuì xiū guī huà','Kế hoạch nghỉ hưu','Retirement planning','提早做退休规划。','Lên kế hoạch nghỉ hưu sớm.','noun'],
    ['财富管理','cái fù guǎn lǐ','Quản lý tài sản','Wealth management','专业财富管理服务。','Dịch vụ quản lý tài sản chuyên nghiệp.','noun'],
    ['通货紧缩','tōng huò jǐn suō','Giảm phát','Deflation','防止通货紧缩。','Ngăn chặn giảm phát.','noun'],
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

    const [all]=await conn.query(`SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let grand=0;
    const targets={HSK1:150,HSK2:300,HSK3:600,HSK4:1200,HSK5:2500,HSK6:5000};
    console.log('\n📊 Tổng kết toàn bộ:');
    all.forEach(r=>{const ok=r.tu>=targets[r.hsk_level]?'✅':`⏳(${r.tu}/${targets[r.hsk_level]})`;console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${ok}`);grand+=Number(r.tu);});
    console.log(`   ══ TỔNG: ${grand} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
