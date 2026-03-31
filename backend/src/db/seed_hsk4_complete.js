// seed_hsk4_complete.js — HSK4 cuối: +160 từ hoàn thành 1200
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Phúc lợi & An sinh xã hội', title_zh:'社会福利与民生保障', level:'HSK4', order:84, words:[
    ['最低工资','zuì dī gōng zī','Lương tối thiểu','Minimum wage','提高最低工资标准。','Nâng cao tiêu chuẩn lương tối thiểu.','noun'],
    ['工伤','gōng shāng','Tai nạn lao động','Work injury / Occupational injury','工伤赔偿申请。','Yêu cầu bồi thường tai nạn lao động.','noun'],
    ['失业保险','shī yè bǎo xiǎn','Bảo hiểm thất nghiệp','Unemployment insurance','申请失业保险。','Đăng ký bảo hiểm thất nghiệp.','noun'],
    ['医保','yī bǎo','Bảo hiểm y tế (viết tắt)','Medical insurance (abbr.)','医保报销比例。','Tỷ lệ thanh toán bảo hiểm y tế.','noun'],
    ['生育保险','shēng yù bǎo xiǎn','Bảo hiểm thai sản','Maternity insurance','享有生育保险。','Được hưởng bảo hiểm thai sản.','noun'],
    ['低保','dī bǎo','Trợ cấp tối thiểu / Cứu trợ','Minimum living allowance','申请低保救助。','Xin trợ cấp tối thiểu.','noun'],
    ['残疾补贴','cán jí bǔ tiē','Trợ cấp khuyết tật','Disability allowance','残疾补贴政策。','Chính sách trợ cấp khuyết tật.','noun'],
    ['助学金','zhù xué jīn','Học bổng hỗ trợ / Trợ cấp học tập','Study grant / Financial aid','申请助学金。','Đăng ký nhận học bổng hỗ trợ.','noun'],
    ['五险一金','wǔ xiǎn yī jīn','Năm bảo hiểm và một quỹ (TQ)','Five social insurances and housing fund','缴纳五险一金。','Đóng năm bảo hiểm và một quỹ.','noun'],
    ['公积金','gōng jī jīn','Quỹ tiết kiệm nhà ở','Housing provident fund','提取公积金买房。','Rút quỹ tiết kiệm nhà ở mua nhà.','noun'],
    ['社区服务','shè qū fú wù','Dịch vụ cộng đồng','Community service','完善社区服务体系。','Hoàn thiện hệ thống dịch vụ cộng đồng.','noun'],
    ['居家养老','jū jiā yǎng lǎo','Dưỡng lão tại nhà','Home-based elderly care','推广居家养老模式。','Phổ biến mô hình dưỡng lão tại nhà.','noun'],
  ]},
  { title:'Từ vựng học thuật cốt lõi', title_zh:'核心学术词汇', level:'HSK4', order:85, words:[
    ['综合','zōng hé','Tổng hợp / Toàn diện','Comprehensive / Integrate','综合分析报告。','Báo cáo phân tích tổng hợp.','verb'],
    ['具体','jù tǐ','Cụ thể','Specific / Concrete','举个具体例子。','Đưa ra một ví dụ cụ thể.','adjective'],
    ['抽象','chōu xiàng','Trừu tượng','Abstract','抽象概念难理解。','Khái niệm trừu tượng khó hiểu.','adjective'],
    ['系统性','xì tǒng xìng','Hệ thống tính / Tính hệ thống','Systematic','系统性思考问题。','Suy nghĩ vấn đề một cách có hệ thống.','adjective'],
    ['客观性','kè guān xìng','Tính khách quan','Objectivity','保持研究客观性。','Duy trì tính khách quan nghiên cứu.','noun'],
    ['全面性','quán miàn xìng','Tính toàn diện','Comprehensiveness','报告的全面性。','Tính toàn diện của báo cáo.','noun'],
    ['可行性','kě xíng xìng','Tính khả thi','Feasibility','评估方案可行性。','Đánh giá tính khả thi của phương án.','noun'],
    ['实证','shí zhèng','Thực chứng / Bằng chứng thực tế','Empirical evidence / Empirical','实证研究方法。','Phương pháp nghiên cứu thực chứng.','noun'],
    ['定性','dìng xìng','Định tính','Qualitative','定性研究分析。','Phân tích nghiên cứu định tính.','adjective'],
    ['定量','dìng liàng','Định lượng','Quantitative','定量数据分析。','Phân tích dữ liệu định lượng.','adjective'],
    ['批注','pī zhù','Chú thích / Ghi chú','Annotation / Comment','给文章加批注。','Thêm chú thích vào bài viết.','noun'],
    ['摘要','zhāi yào','Tóm tắt / Abstract','Abstract / Summary','写论文摘要。','Viết tóm tắt luận văn.','noun'],
  ]},
  { title:'Tục ngữ & Thành ngữ Trung Hoa', title_zh:'中国谚语与成语', level:'HSK4', order:86, words:[
    ['一石二鸟','yī shí èr niǎo','Một mũi tên trúng hai đích','Kill two birds with one stone','一石二鸟的策略。','Chiến lược một mũi tên trúng hai đích.','noun'],
    ['三思而行','sān sī ér xíng','Nghĩ ba lần rồi mới làm','Think before you act','做决定要三思而行。','Ra quyết định hãy nghĩ ba lần rồi làm.','noun'],
    ['不耻下问','bù chǐ xià wèn','Không xấu hổ khi hỏi người kém hơn','Not ashamed to ask questions of inferiors','好学不耻下问。','Học tốt không xấu hổ khi hỏi người kém hơn.','noun'],
    ['半途而废','bàn tú ér fèi','Bỏ dở giữa chừng','Give up halfway','做事不能半途而废。','Làm gì không được bỏ dở giữa chừng.','noun'],
    ['日积月累','rì jī yuè lěi','Tích lũy từng ngày từng tháng','Accumulate day by day','日积月累成大器。','Tích lũy từng ngày từng tháng thành công.','noun'],
    ['事半功倍','shì bàn gōng bèi','Ít công nhiều hiệu quả','Achieve twice the result with half the effort','找对方法事半功倍。','Tìm đúng phương pháp ít công nhiều hiệu quả.','noun'],
    ['书山有路勤为径','shū shān yǒu lù qín wéi jìng','Núi học vấn siêng năng là con đường','Diligence is the path up the mountain of knowledge','书山有路勤为径。','Núi học vấn siêng năng là con đường.','noun'],
    ['学无止境','xué wú zhǐ jìng','Học không có giới hạn','Learning is endless','学无止境，活到老学到老。','Học không có giới hạn, sống đến già học đến già.','noun'],
    ['患难见真情','huàn nàn jiàn zhēn qíng','Gian nan mới thấy tình chân','Adversity reveals true friendship','患难见真情，困难考验友谊。','Gian nan mới thấy tình chân, khó khăn thử nghiệm tình bạn.','noun'],
    ['前车之覆，后车之鉴','qián chē zhī fù hòu chē zhī jiàn','Gương của xe trước, bài học cho xe sau','Learn from the mistakes of predecessors','前车之覆，后车之鉴。','Gương của xe trước, bài học cho xe sau.','noun'],
    ['鱼目混珠','yú mù hùn zhū','Cá mắt lẫn châu/ngọc trai','Pass off fish eyes as pearls (fake as genuine)','辨别真伪，不要鱼目混珠。','Phân biệt thật giả, không để cá mắt lẫn châu.','noun'],
    ['锲而不舍','qiè ér bù shě','Kiên trì không bỏ cuộc','Persistently chisel away / Keep at it','成功需要锲而不舍的精神。','Thành công cần tinh thần kiên trì không bỏ cuộc.','noun'],
  ]},
  { title:'Từ ngữ chức năng & Liên kết văn bản', title_zh:'功能词与语篇连接', level:'HSK4', order:87, words:[
    ['诚然','chéng rán','Thế thật / Đúng là vậy','Admittedly / True','诚然，这很难。','Thế thật, điều này rất khó.','adverb'],
    ['固然','gù rán','Cố nhiên / Tất nhiên là','No doubt / It is true that','固然如此，但....','Cố nhiên như vậy, nhưng....','conjunction'],
    ['往往','wǎng wǎng','Thường thường / Hay','Often / Tend to','他往往迟到。','Anh ấy thường hay đến trễ.','adverb'],
    ['有时','yǒu shí','Đôi khi','Sometimes','有时我也会累。','Đôi khi tôi cũng mệt.','adverb'],
    ['总体来说','zǒng tǐ lái shuō','Nhìn chung / Tổng thể mà nói','Generally speaking','总体来说效果不错。','Nhìn chung kết quả không tệ.','adverb'],
    ['换言之','huàn yán zhī','Nói cách khác','In other words','换言之，你不同意。','Nói cách khác bạn không đồng ý.','adverb'],
    ['此外','cǐ wài','Ngoài ra / Hơn nữa','In addition / Furthermore','此外，还有一点。','Ngoài ra còn có một điểm nữa.','conjunction'],
    ['综上所述','zōng shàng suǒ shù','Tóm lại những gì đã nêu','In summary / To sum up','综上所述，结论是....','Tóm lại những điều đã nêu, kết luận là....','conjunction'],
    ['从而','cóng ér','Do đó / Từ đó mà','Therefore / Thus / Thereby','改善关系，从而促进合作。','Cải thiện quan hệ, từ đó thúc đẩy hợp tác.','conjunction'],
    ['进而','jìn ér','Tiếp đó / Hơn nữa','Further / Then additionally','了解情况，进而采取措施。','Hiểu rõ tình hình, tiếp đó áp dụng biện pháp.','conjunction'],
    ['诸如','zhū rú','Như là / Chẳng hạn như','Such as / Like','诸如此类的问题。','Những vấn đề như loại này.','conjunction'],
    ['即便','jí biàn','Ngay cả khi / Dù khi','Even if / Even though','即便失败也不放弃。','Ngay cả khi thất bại cũng không từ bỏ.','conjunction'],
  ]},
  { title:'Mối quan hệ con người & Cảm xúc nâng cao', title_zh:'人际关系与情绪进阶', level:'HSK4', order:88, words:[
    ['陪伴','péi bàn','Đồng hành / Bầu bạn','Accompany / Company','陪伴是最长情的告白。','Đồng hành chính là lời tỏ tình dài lâu nhất.','verb'],
    ['倾听','qīng tīng','Lắng nghe (chú ý)','Listen attentively','学会倾听他人。','Học cách lắng nghe người khác.','verb'],
    ['包容性','bāo róng xìng','Tính bao dung / Độ bao dung','Inclusiveness / Tolerance','增强文化包容性。','Tăng cường tính bao dung văn hoá.','noun'],
    ['边界感','biān jiè gǎn','Cảm giác ranh giới / Giới hạn cá nhân','Personal boundaries','维护个人边界感。','Duy trì ranh giới cá nhân.','noun'],
    ['共情','gòng qíng','Sự đồng cảm / Đồng điệu cảm xúc','Empathy / Emotional resonance','培养共情能力。','Bồi dưỡng khả năng đồng cảm.','verb'],
    ['失落','shī luò','Mất mát / Hụt hẫng','Disappointed / Forlorn','感到很失落。','Cảm thấy rất hụt hẫng.','adjective'],
    ['振奋','zhèn fèn','Phấn chấn / Hứng khởi','Inspire / Exhilarate','消息令人振奋。','Tin tức làm người ta phấn chấn.','verb'],
    ['纠结','jiū jié','Băn khoăn / Khó xử','Struggle / Conflicted','内心很纠结。','Nội tâm rất băn khoăn.','verb'],
    ['豁达','huò dá','Rộng lượng / Phóng khoáng','Open-minded / Magnanimous','做人要豁达开朗。','Làm người phải rộng lượng vui vẻ.','adjective'],
    ['格局','gé jú','Cục diện / Tầm nhìn','Pattern / Big picture / Mindset','提升自己的格局。','Nâng cao tầm nhìn của bản thân.','noun'],
    ['正能量','zhèng néng liàng','Năng lượng tích cực','Positive energy','传播正能量。','Lan truyền năng lượng tích cực.','noun'],
    ['释怀','shì huái','Buông bỏ / Giải toả trong lòng','Let go / Feel relieved','学会释怀。','Học cách buông bỏ.','verb'],
  ]},
  { title:'Phát âm & Hệ thống tiếng Trung', title_zh:'汉语发音与语言系统', level:'HSK4', order:89, words:[
    ['声调','shēng diào','Thanh điệu / Tone','Tone (Chinese language)','汉语有四个声调。','Tiếng Trung có bốn thanh điệu.','noun'],
    ['拼音','pīn yīn','Phiên âm / Pinyin','Pinyin (romanization)','用拼音标注发音。','Dùng phiên âm đánh dấu cách phát âm.','noun'],
    ['笔画','bǐ huà','Nét chữ / Nét bút','Stroke (Chinese character)','汉字的笔画顺序。','Thứ tự nét bút chữ Hán.','noun'],
    ['部首','bù shǒu','Bộ thủ / Bộ thủ chữ Hán','Radical (Chinese character)','通过部首查字典。','Tra từ điển theo bộ thủ.','noun'],
    ['简体字','jiǎn tǐ zì','Chữ giản thể','Simplified Chinese','中国大陆使用简体字。','Trung Quốc đại lục dùng chữ giản thể.','noun'],
    ['繁体字','fán tǐ zì','Chữ phồn thể','Traditional Chinese','台湾使用繁体字。','Đài Loan dùng chữ phồn thể.','noun'],
    ['同音字','tóng yīn zì','Chữ đồng âm','Homophone','汉语有很多同音字。','Tiếng Trung có rất nhiều chữ đồng âm.','noun'],
    ['多音字','duō yīn zì','Chữ đa âm','Polyphonic character','了解多音字读法。','Hiểu cách đọc chữ đa âm.','noun'],
    ['汉字结构','hàn zì jié gòu','Cấu trúc chữ Hán','Chinese character structure','分析汉字结构。','Phân tích cấu trúc chữ Hán.','noun'],
    ['书法','shū fǎ','Thư pháp','Calligraphy','学习中国书法。','Học thư pháp Trung Quốc.','noun'],
    ['偏旁','piān páng','Bộ phận chữ Hán / Phần bên','Component part of a Chinese character','认识汉字偏旁。','Nhận biết phần bên của chữ Hán.','noun'],
    ['象形字','xiàng xíng zì','Chữ tượng hình','Pictograph / Pictographic character','日和月是象形字。','日 và 月 là chữ tượng hình.','noun'],
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
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
