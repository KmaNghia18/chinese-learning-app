// seed_hsk4_finish.js — HSK4 hoàn thiện cuối: +220 từ để đạt 1200
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Thể thao & Thể dục tổng hợp', title_zh:'综合运动与健身', level:'HSK4', order:79, words:[
    ['健身房','jiàn shēn fáng','Phòng gym / Phòng tập thể dục','Gym / Fitness center','每天去健身房锻炼。','Mỗi ngày đến phòng gym tập luyện.','noun'],
    ['瑜伽','yú jiā','Yoga','Yoga','练习瑜伽放松身心。','Tập yoga thư giãn tâm trí.','noun'],
    ['跑步机','pǎo bù jī','Máy chạy bộ','Treadmill','在跑步机上跑步。','Chạy trên máy chạy bộ.','noun'],
    ['哑铃','yǎ líng','Tạ tay','Dumbbell','用哑铃练手臂。','Dùng tạ tay tập cánh tay.','noun'],
    ['拉伸','lā shēn','Căng cơ / Giãn cơ','Stretch','运动前做拉伸。','Trước khi tập thể dục căng cơ.','verb'],
    ['热身','rè shēn','Khởi động','Warm up','运动前热身很重要。','Khởi động trước khi tập rất quan trọng.','verb'],
    ['卡路里消耗','kǎ lù lǐ xiāo hào','Đốt calo','Calorie burn','增加卡路里消耗。','Tăng lượng calo tiêu thụ.','noun'],
    ['核心力量','hé xīn lì liàng','Sức mạnh cốt lõi / Core','Core strength','训练核心力量。','Huấn luyện sức mạnh cốt lõi.','noun'],
    ['有氧','yǒu yǎng','Aerobic / Có oxy','Aerobic','有氧运动燃脂。','Bài tập aerobic đốt mỡ.','adjective'],
    ['无氧','wú yǎng','Anaerobic / Không oxy','Anaerobic','无氧运动增肌。','Bài tập kỵ khí tăng cơ.','adjective'],
    ['运动营养','yùn dòng yíng yǎng','Dinh dưỡng thể thao','Sports nutrition','运动营养补充剂。','Thực phẩm bổ sung dinh dưỡng thể thao.','noun'],
    ['恢复训练','huī fù xùn liàn','Tập luyện hồi phục','Recovery training','肌肉恢复训练。','Tập luyện hồi phục cơ bắp.','noun'],
  ]},
  { title:'Biến đổi khí hậu & Ứng phó', title_zh:'气候变化与应对', level:'HSK4', order:80, words:[
    ['温室效应','wēn shì xiào yìng','Hiệu ứng nhà kính','Greenhouse effect','加剧温室效应。','Làm trầm trọng thêm hiệu ứng nhà kính.','noun'],
    ['极端天气','jí duān tiān qì','Thời tiết cực đoan','Extreme weather','极端天气越来越频繁。','Thời tiết cực đoan ngày càng thường xuyên.','noun'],
    ['海平面上升','hǎi píng miàn shàng shēng','Nước biển dâng','Sea level rise','海平面上升威胁沿岸。','Mực nước biển dâng đe doạ vùng ven biển.','noun'],
    ['冰川融化','bīng chuān róng huà','Băng tan','Glacier melting','北极冰川融化加速。','Băng Bắc Cực tan chảy nhanh hơn.','noun'],
    ['净零排放','jìng líng pái fàng','Phát thải ròng bằng không','Net zero emissions','实现净零排放目标。','Đạt mục tiêu phát thải ròng bằng không.','noun'],
    ['气候峰会','qì hòu fēng huì','Hội nghị thượng đỉnh về khí hậu','Climate summit','联合国气候峰会。','Hội nghị thượng đỉnh về khí hậu LHQ.','noun'],
    ['碳达峰','tàn dá fēng','Đạt đỉnh carbon','Carbon peak','力争2030年碳达峰。','Phấn đấu đạt đỉnh carbon vào 2030.','noun'],
    ['适应气候变化','shì yìng qì hòu biàn huà','Thích ứng biến đổi khí hậu','Climate change adaptation','制定适应气候变化措施。','Xây dựng biện pháp thích ứng biến đổi khí hậu.','noun'],
    ['生态补偿','shēng tài bǔ cháng','Bù đắp sinh thái / Bù đắp carbon','Ecological compensation','生态补偿机制。','Cơ chế bù đắp sinh thái.','noun'],
    ['环境影响评估','huán jìng yǐng xiǎng píng gū','Đánh giá tác động môi trường','Environmental impact assessment (EIA)','进行环境影响评估。','Thực hiện đánh giá tác động môi trường.','noun'],
    ['去碳化','qù tàn huà','Khử carbon hoá','Decarbonize / Decarbonization','推进经济去碳化。','Thúc đẩy khử carbon hoá kinh tế.','verb'],
    ['气候难民','qì hòu nán mín','Người tị nạn khí hậu','Climate refugee','关注气候难民问题。','Quan tâm vấn đề người tị nạn khí hậu.','noun'],
  ]},
  { title:'Luật doanh nghiệp & Hợp đồng', title_zh:'企业法律与合同法', level:'HSK4', order:81, words:[
    ['注册','zhù cè','Đăng ký','Register','注册一家公司。','Đăng ký một công ty.','verb'],
    ['营业执照','yíng yè zhí zhào','Giấy phép kinh doanh','Business license','办理营业执照。','Làm giấy phép kinh doanh.','noun'],
    ['股份','gǔ fèn','Cổ phần / Cổ phiếu','Share / Equity','持有公司股份。','Nắm giữ cổ phần công ty.','noun'],
    ['有限責任公司','yǒu xiàn zé rèn gōng sī','Công ty TNHH','Limited liability company (LLC)','成立有限责任公司。','Thành lập công ty TNHH.','noun'],
    ['法人','fǎ rén','Pháp nhân','Legal entity / Legal person','法人代表签字。','Người đại diện pháp nhân ký tên.','noun'],
    ['违约','wéi yuē','Vi phạm hợp đồng','Breach of contract','违约须赔偿损失。','Vi phạm hợp đồng phải bồi thường.','verb'],
    ['仲裁','zhòng cái','Trọng tài / Phân xử','Arbitration','申请仲裁解决纠纷。','Yêu cầu trọng tài giải quyết tranh chấp.','noun'],
    ['赔偿','péi cháng','Bồi thường','Compensate / Indemnify','要求赔偿损失。','Yêu cầu bồi thường thiệt hại.','verb'],
    ['保密协议','bǎo mì xié yì','Thoả thuận bảo mật (NDA)','Non-disclosure agreement (NDA)','签署保密协议。','Ký kết thoả thuận bảo mật.','noun'],
    ['知识共享','zhī shi gòng xiǎng','Chia sẻ kiến thức','Knowledge sharing','促进知识共享。','Thúc đẩy chia sẻ kiến thức.','noun'],
    ['公证','gōng zhèng','Công chứng','Notarize / Notarization','文件需要公证。','Tài liệu cần công chứng.','verb'],
    ['法律咨询','fǎ lǜ zī xún','Tư vấn pháp lý','Legal consultation','寻求法律咨询。','Tìm kiếm tư vấn pháp lý.','noun'],
  ]},
  { title:'Ngôn ngữ học & Đa ngôn ngữ nâng cao', title_zh:'语言学与多语言进阶', level:'HSK4', order:82, words:[
    ['母语','mǔ yǔ','Tiếng mẹ đẻ','Mother tongue / Native language','英语是他的母语。','Tiếng Anh là tiếng mẹ đẻ của anh ấy.','noun'],
    ['第二语言','dì èr yǔ yán','Ngôn ngữ thứ hai','Second language','汉语是我的第二语言。','Tiếng Trung là ngôn ngữ thứ hai của tôi.','noun'],
    ['语言习得','yǔ yán xí dé','Thu thụ ngôn ngữ','Language acquisition','研究语言习得理论。','Nghiên cứu lý thuyết thu thụ ngôn ngữ.','noun'],
    ['浸入式','jìn rù shì','Kiểu ngâm mình / Immersion','Immersion (learning method)','浸入式语言学习法。','Phương pháp học ngôn ngữ ngâm mình.','adjective'],
    ['输入假说','shū rù jiǎ shuō','Giả thuyết đầu vào','Input hypothesis (Krashen)','语言输入假说理论。','Lý thuyết giả thuyết đầu vào ngôn ngữ.','noun'],
    ['交际能力','jiāo jì néng lì','Năng lực giao tiếp','Communicative competence','提高交际能力。','Nâng cao năng lực giao tiếp.','noun'],
    ['语音','yǔ yīn','Ngữ âm / Âm vị học','Phonetics / Phonology','语音系统分析。','Phân tích hệ thống ngữ âm.','noun'],
    ['语义','yǔ yì','Ngữ nghĩa','Semantics / Meaning','词语语义分析。','Phân tích ngữ nghĩa từ ngữ.','noun'],
    ['语用','yǔ yòng','Ngữ dụng học','Pragmatics','语用学研究语言使用。','Ngữ dụng học nghiên cứu cách dùng ngôn ngữ.','noun'],
    ['多语者','duō yǔ zhě','Người đa ngôn ngữ','Polyglot / Multilingual person','他是能说五种语言的多语者。','Anh ấy là người đa ngôn ngữ nói được năm thứ tiếng.','noun'],
    ['语言政策','yǔ yán zhèng cè','Chính sách ngôn ngữ','Language policy','国家语言政策。','Chính sách ngôn ngữ quốc gia.','noun'],
    ['共同语','gòng tōng yǔ','Ngôn ngữ chung / Lingua franca','Lingua franca / Common language','英语成为全球共同语。','Tiếng Anh trở thành ngôn ngữ chung toàn cầu.','noun'],
  ]},
  { title:'Sinh thái học & Bảo tồn', title_zh:'生态学与生物保护', level:'HSK4', order:83, words:[
    ['栖息地','qī xī dì','Môi trường sống / Nơi sinh sống','Habitat','保护动物栖息地。','Bảo vệ môi trường sống của động vật.','noun'],
    ['物种灭绝','wù zhǒng miè jué','Tuyệt chủng loài','Species extinction','防止物种灭绝。','Ngăn chặn tuyệt chủng loài.','noun'],
    ['生态系统','shēng tài xì tǒng','Hệ sinh thái','Ecosystem','维护生态系统平衡。','Duy trì cân bằng hệ sinh thái.','noun'],
    ['食物链','shí wù liàn','Chuỗi thức ăn','Food chain','生态食物链。','Chuỗi thức ăn sinh thái.','noun'],
    ['自然保护区','zì rán bǎo hù qū','Khu bảo tồn thiên nhiên','Nature reserve','建立自然保护区。','Thành lập khu bảo tồn thiên nhiên.','noun'],
    ['可持续渔业','kě chí xù yú yè','Nghề cá bền vững','Sustainable fisheries','发展可持续渔业。','Phát triển nghề cá bền vững.','noun'],
    ['外来物种','wài lái wù zhǒng','Loài ngoại lai / Loài xâm lấn','Invasive species','防控外来物种入侵。','Phòng chống xâm lấn loài ngoại lai.','noun'],
    ['野生动物','yě shēng dòng wù','Động vật hoang dã','Wildlife','保护野生动物。','Bảo vệ động vật hoang dã.','noun'],
    ['生物圈','shēng wù quān','Sinh quyển','Biosphere','保护地球生物圈。','Bảo vệ sinh quyển trái đất.','noun'],
    ['腐殖质','fǔ zhí zhì','Mùn hữu cơ / Chất mùn','Humus / Organic matter','土壤腐殖质丰富。','Đất giàu mùn hữu cơ.','noun'],
    ['碳汇','tàn huì','Bể hấp thụ carbon / Carbon sink','Carbon sink','森林是重要碳汇。','Rừng là bể hấp thụ carbon quan trọng.','noun'],
    ['生态旅游','shēng tài lǚ yóu','Du lịch sinh thái','Ecotourism','发展生态旅游。','Phát triển du lịch sinh thái.','noun'],
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
    console.log(`   ══ TỔNG: ${grand} từ`);
    console.log(`\n✅ HSK4 Finish: +${tL} bài, +${tW} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
