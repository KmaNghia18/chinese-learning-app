// seed_hsk4_batch7.js — HSK4 batch 7+8+9: Kiến trúc, Thể thao, Văn hoá truyền thống, Tâm lý học, Phúc lợi, Hành chính, Kinh tế vĩ mô
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Kiến trúc & Thiết kế', title_zh:'建筑设计与工程', level:'HSK4', order:50, words:[
    ['设计','shè jì','Thiết kế','Design','建筑设计图纸。','Bản vẽ thiết kế kiến trúc.','verb'],
    ['工程师','gōng chéng shī','Kỹ sư','Engineer','土木工程师。','Kỹ sư xây dựng dân dụng.','noun'],
    ['施工','shī gōng','Thi công / Xây dựng','Construction / Construction work','施工现场。','Hiện trường thi công.','noun'],
    ['蓝图','lán tú','Bản thiết kế / Kế hoạch tổng thể','Blueprint / Master plan','城市发展蓝图。','Bản kế hoạch phát triển thành phố.','noun'],
    ['装修','zhuāng xiū','Trang trí / Sửa sang','Renovate / Decorate (interior)','新房子装修。','Trang trí nhà mới.','verb'],
    ['古典','gǔ diǎn','Cổ điển','Classical / Traditional style','古典建筑风格。','Phong cách kiến trúc cổ điển.','adjective'],
    ['现代化','xiàn dài huà','Hiện đại hoá','Modernize / Modernization','城市现代化建设。','Xây dựng đô thị hiện đại hoá.','verb'],
    ['可再生','kě zài shēng','Có thể tái tạo / Tái tạo','Renewable','使用可再生材料。','Sử dụng vật liệu có thể tái tạo.','adjective'],
    ['承重','chéng zhòng','Chịu lực / Chịu tải','Load-bearing','承重墙不能拆除。','Tường chịu lực không được phá.','adjective'],
    ['安全标准','ān quán biāo zhǔn','Tiêu chuẩn an toàn','Safety standards','符合建筑安全标准。','Đáp ứng tiêu chuẩn an toàn xây dựng.','noun'],
    ['空间规划','kōng jiān guī huà','Quy hoạch không gian','Space planning','合理空间规划。','Quy hoạch không gian hợp lý.','noun'],
    ['绿色建筑','lǜ sè jiàn zhù','Kiến trúc xanh','Green building','绿色建筑节能环保。','Kiến trúc xanh tiết kiệm năng lượng bảo vệ môi trường.','noun'],
  ]},
  { title:'Ẩm thực quốc tế & Dinh dưỡng', title_zh:'国际饮食与营养学', level:'HSK4', order:51, words:[
    ['卡路里','kǎ lù lǐ','Calo','Calorie','控制卡路里摄入。','Kiểm soát lượng calo nạp vào.','noun'],
    ['蛋白质','dàn bái zhì','Protein / Chất đạm','Protein','多补充蛋白质。','Bổ sung thêm protein.','noun'],
    ['维生素','wéi shēng sù','Vitamin','Vitamin','缺乏维生素C。','Thiếu vitamin C.','noun'],
    ['膳食纤维','shàn shí xiān wéi','Chất xơ','Dietary fiber','多吃富含膳食纤维的食物。','Ăn nhiều thức ăn giàu chất xơ.','noun'],
    ['素食','sù shí','Ăn chay / Ẩm thực thuần chay','Vegetarian / Plant-based diet','选择素食生活。','Chọn lối sống ăn chay.','noun'],
    ['外卖','wài mài','Đặt đồ ăn mang về / Takeaway','Takeaway / Food delivery','点外卖真方便。','Đặt đồ ăn mang về thật tiện.','noun'],
    ['菜系','cài xì','Hệ thống ẩm thực / Ẩm thực vùng','Cuisine style / Regional cuisine','中国八大菜系。','Tám hệ ẩm thực lớn Trung Quốc.','noun'],
    ['烹饪','pēng rèn','Nấu nướng / Ẩm thực','Cook / Culinary arts','学习烹饪技巧。','Học kỹ thuật nấu nướng.','noun'],
    ['食品安全','shí pǐn ān quán','An toàn thực phẩm','Food safety','保障食品安全。','Bảo đảm an toàn thực phẩm.','noun'],
    ['过期','guò qī','Hết hạn','Expired / Past due date','食品过期不能吃。','Thực phẩm hết hạn không được ăn.','verb'],
    ['防腐剂','fáng fǔ jì','Chất bảo quản','Preservative','减少防腐剂使用。','Giảm sử dụng chất bảo quản.','noun'],
    ['均衡饮食','jūn héng yǐn shí','Chế độ ăn cân bằng','Balanced diet','保持均衡饮食。','Duy trì chế độ ăn cân bằng.','noun'],
  ]},
  { title:'Kinh tế vĩ mô & Thương mại quốc tế', title_zh:'宏观经济与国际贸易', level:'HSK4', order:52, words:[
    ['贸易','mào yì','Thương mại / Buôn bán','Trade / Commerce','推动国际贸易。','Thúc đẩy thương mại quốc tế.','noun'],
    ['出口','chū kǒu','Xuất khẩu','Export','扩大出口规模。','Mở rộng quy mô xuất khẩu.','verb'],
    ['进口','jìn kǒu','Nhập khẩu','Import','进口高科技产品。','Nhập khẩu sản phẩm công nghệ cao.','verb'],
    ['关税','guān shuì','Thuế hải quan','Tariff / Customs duty','提高进口关税。','Tăng thuế hải quan nhập khẩu.','noun'],
    ['汇率','huì lǜ','Tỷ giá hối đoái','Exchange rate','汇率波动影响贸易。','Biến động tỷ giá ảnh hưởng thương mại.','noun'],
    ['顺差','shùn chā','Thặng dư thương mại','Trade surplus','保持贸易顺差。','Duy trì thặng dư thương mại.','noun'],
    ['逆差','nì chā','Thâm hụt thương mại','Trade deficit','缩小贸易逆差。','Thu hẹp thâm hụt thương mại.','noun'],
    ['全球化','quán qiú huà','Toàn cầu hoá','Globalization','经济全球化进程。','Quá trình toàn cầu hoá kinh tế.','noun'],
    ['供应链','gōng yìng liàn','Chuỗi cung ứng','Supply chain','优化供应链管理。','Tối ưu hoá quản lý chuỗi cung ứng.','noun'],
    ['自由贸易区','zì yóu mào yì qū','Khu thương mại tự do','Free trade zone','建立自由贸易区。','Thành lập khu thương mại tự do.','noun'],
    ['经济周期','jīng jì zhōu qī','Chu kỳ kinh tế','Economic cycle','了解经济周期规律。','Hiểu quy luật chu kỳ kinh tế.','noun'],
    ['利率','lì lǜ','Lãi suất','Interest rate','央行调整利率。','Ngân hàng trung ương điều chỉnh lãi suất.','noun'],
  ]},
  { title:'Hành chính công & Chính sách', title_zh:'公共行政与政策', level:'HSK4', order:53, words:[
    ['行政','xíng zhèng','Hành chính','Administration','政府行政机构。','Cơ quan hành chính chính phủ.','noun'],
    ['审批','shěn pī','Thẩm định, phê duyệt','Approve / Examine and approve','审批行政手续。','Phê duyệt thủ tục hành chính.','verb'],
    ['公务员','gōng wù yuán','Công chức / Cán bộ nhà nước','Civil servant / Government official','参加公务员考试。','Tham gia kỳ thi công chức.','noun'],
    ['官僚','guān liáo','Quan liêu','Bureaucracy / Bureaucrat','减少官僚主义。','Giảm chủ nghĩa quan liêu.','noun'],
    ['监督','jiān dū','Giám sát / Kiểm tra','Supervise / Oversight','加强政府监督。','Tăng cường giám sát chính phủ.','verb'],
    ['透明度','tòu míng dù','Độ minh bạch','Transparency','提高政府透明度。','Nâng cao tính minh bạch của chính phủ.','noun'],
    ['腐败','fǔ bài','Tham nhũng / Hư hỏng','Corruption / Corrupt','反腐败斗争。','Cuộc đấu tranh chống tham nhũng.','noun'],
    ['廉政','lián zhèng','Liêm chính / Chính trực','Clean government / Integrity','倡导廉政建设。','Khuyến khích xây dựng liêm chính.','noun'],
    ['法规','fǎ guī','Pháp quy / Quy định pháp luật','Regulation / Law','遵守法规。','Tuân thủ pháp quy.','noun'],
    ['公告','gōng gào','Thông báo / Thông cáo công khai','Public notice / Announcement','发布官方公告。','Phát hành thông cáo chính thức.','noun'],
    ['民意','mín yì','Dân ý / Ý kiến nhân dân','Public opinion / Will of the people','倾听民意。','Lắng nghe dân ý.','noun'],
    ['征集','zhēng jí','Trưng cầu / Thu thập','Collect / Solicit','征集市民意见。','Trưng cầu ý kiến của người dân.','verb'],
  ]},
  { title:'Thẩm mỹ & Yếu tố tâm linh', title_zh:'审美与精神信仰', level:'HSK4', order:54, words:[
    ['审美','shěn měi','Thẩm mỹ / Cảm thụ thẩm mỹ','Aesthetics / Aesthetic sense','培养审美情趣。','Bồi dưỡng tình cảm thẩm mỹ.','noun'],
    ['信仰','xìn yǎng','Tín ngưỡng / Niềm tin','Belief / Faith / Religion','宗教信仰自由。','Tự do tín ngưỡng tôn giáo.','noun'],
    ['佛教','fó jiào','Phật giáo','Buddhism','信奉佛教。','Theo đạo Phật.','noun'],
    ['道教','dào jiào','Đạo giáo','Taoism','道教是中国本土宗教。','Đạo giáo là tôn giáo bản địa Trung Hoa.','noun'],
    ['儒家','rú jiā','Nho giáo / Học thuyết Khổng Tử','Confucianism','儒家思想影响深远。','Tư tưởng Nho giáo ảnh hưởng sâu rộng.','noun'],
    ['冥想','míng xiǎng','Thiền định','Meditation','每天冥想放松心情。','Thiền định mỗi ngày để thư giãn tâm trạng.','verb'],
    ['极简主义','jí jiǎn zhǔ yì','Chủ nghĩa tối giản','Minimalism','践行极简主义生活。','Thực hành lối sống chủ nghĩa tối giản.','noun'],
    ['物质主义','wù zhì zhǔ yì','Chủ nghĩa vật chất','Materialism','反对过度物质主义。','Phản đối chủ nghĩa vật chất quá mức.','noun'],
    ['幸福感','xìng fú gǎn','Cảm giác hạnh phúc','Sense of happiness / Well-being','提升幸福感。','Nâng cao cảm giác hạnh phúc.','noun'],
    ['内在','nèi zài','Nội tâm / Bên trong','Inner / Intrinsic','追求内在平静。','Tìm kiếm sự bình yên nội tâm.','adjective'],
    ['正念','zhèng niàn','Chánh niệm / Mindfulness','Mindfulness','培养正念生活。','Bồi dưỡng lối sống chánh niệm.','noun'],
    ['超脱','chāo tuō','Siêu thoát / Vượt lên trên','Transcend / Rise above','超脱世俗烦恼。','Siêu thoát khỏi phiền muộn trần tục.','verb'],
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
    console.log('\n📊 Tổng kết:');
    all.forEach(r=>{const ok=r.tu>=targets[r.hsk_level]?'✅':`⏳(${r.tu}/${targets[r.hsk_level]})`;console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ ${ok}`);grand+=Number(r.tu);});
    console.log(`   ══ TỔNG: ${grand} từ\n✅ Batch7-9: +${tL} bài, +${tW} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
