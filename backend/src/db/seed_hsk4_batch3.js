// seed_hsk4_batch3.js — HSK4 mở rộng (batch 3): Nông nghiệp, Du lịch, Thể thao chuyên sâu, Nghệ thuật, Ẩm thực cao cấp
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Nông nghiệp & Lương thực', title_zh:'农业与粮食', level:'HSK4', order:27, words:[
    ['粮食','liáng shi','Lương thực / Ngũ cốc','Grain / Food (staple)','粮食安全很重要。','An ninh lương thực rất quan trọng.','noun'],
    ['农业','nóng yè','Nông nghiệp','Agriculture','发展现代农业。','Phát triển nông nghiệp hiện đại.','noun'],
    ['种植','zhòng zhí','Trồng trọt / Gieo trồng','Plant / Cultivate','种植蔬菜和水果。','Trồng rau và hoa quả.','verb'],
    ['收获','shōu huò','Thu hoạch / Thành quả','Harvest / Gain','秋天是收获的季节。','Mùa thu là mùa thu hoạch.','verb'],
    ['饥荒','jī huāng','Nạn đói / Thiếu đói','Famine / Food shortage','历史上曾有大饥荒。','Trong lịch sử từng có nạn đói lớn.','noun'],
    ['灌溉','guàn gài','Tưới tiêu / Thủy lợi','Irrigate / Irrigation','合理灌溉农田。','Tưới tiêu đồng ruộng hợp lý.','verb'],
    ['肥料','féi liào','Phân bón','Fertilizer','施有机肥料。','Bón phân hữu cơ.','noun'],
    ['有机','yǒu jī','Hữu cơ','Organic','有机蔬菜更健康。','Rau hữu cơ lành mạnh hơn.','adjective'],
    ['基因改造','jī yīn gǎi zào','Biến đổi gen','Genetically modified / GMO','基因改造食品争议多。','Thực phẩm biến đổi gen có nhiều tranh cãi.','noun'],
    ['渔业','yú yè','Ngư nghiệp','Fishery / Fishing industry','发展海洋渔业。','Phát triển ngư nghiệp biển.','noun'],
    ['养殖','yǎng zhí','Nuôi trồng / Chăn nuôi','Breed / Raise (animals)','水产养殖业。','Ngành nuôi trồng thủy sản.','verb'],
    ['牧场','mù chǎng','Đồng cỏ / Trang trại','Ranch / Pasture','内蒙古的大牧场。','Đồng cỏ rộng lớn ở Nội Mông.','noun'],
    ['土地','tǔ dì','Đất đai / Đất','Land / Soil','保护耕地土地。','Bảo vệ đất nông nghiệp.','noun'],
    ['干旱','gān hàn','Hạn hán','Drought','严重干旱影响农作物。','Hạn hán nghiêm trọng ảnh hưởng cây trồng.','noun'],
    ['洪涝','hóng lào','Lũ lụt (nông nghiệp)','Waterlogging / Flood','防治洪涝灾害。','Phòng chống thiên tai lũ lụt.','noun'],
  ]},
  { title:'Du lịch & Dịch vụ cao cấp', title_zh:'旅游与高端服务', level:'HSK4', order:28, words:[
    ['景点','jǐng diǎn','Điểm du lịch / Danh thắng','Tourist attraction / Scenic spot','著名景点。','Điểm du lịch nổi tiếng.','noun'],
    ['游客','yóu kè','Du khách / Khách du lịch','Tourist / Visitor','景区游客很多。','Khu du lịch có rất nhiều du khách.','noun'],
    ['路线','lù xiàn','Lộ trình / Tuyến đường','Route / Itinerary','安排旅游路线。','Sắp xếp lộ trình du lịch.','noun'],
    ['住宿','zhù sù','Chỗ ở / Nơi lưu trú','Accommodation / Lodging','提供住宿服务。','Cung cấp dịch vụ lưu trú.','noun'],
    ['酒店','jiǔ diàn','Khách sạn','Hotel','我住五星级酒店。','Tôi ở khách sạn năm sao.','noun'],
    ['青年旅社','qīng nián lǚ shè','Nhà trọ thanh niên','Youth hostel','背包客住青年旅社。','Phượt thủ ở nhà trọ thanh niên.','noun'],
    ['导览','dǎo lǎn','Hướng dẫn tham quan','Tour guide / Guided tour','跟导览参观博物馆。','Theo hướng dẫn tham quan bảo tàng.','noun'],
    ['旅行社','lǚ xíng shè','Công ty du lịch','Travel agency','通过旅行社订行程。','Đặt lịch trình qua công ty du lịch.','noun'],
    ['出境','chū jìng','Xuất cảnh','Exit (country) / Departure','出境手续。','Thủ tục xuất cảnh.','verb'],
    ['入境','rù jìng','Nhập cảnh','Entry / Arrival (country)','填写入境表格。','Điền mẫu nhập cảnh.','verb'],
    ['汇率','huì lǜ','Tỷ giá hối đoái','Exchange rate','今天汇率多少？','Hôm nay tỷ giá bao nhiêu?','noun'],
    ['风俗','fēng sú','Phong tục / Tập quán','Custom / Tradition','尊重当地风俗。','Tôn trọng phong tục địa phương.','noun'],
    ['文物','wén wù','Văn vật / Di vật lịch sử','Cultural relic / Artifact','保护历史文物。','Bảo vệ di vật lịch sử.','noun'],
    ['世界遗产','shì jiè yí chǎn','Di sản thế giới','World Heritage','列入世界遗产名录。','Được đưa vào Danh sách Di sản Thế giới.','noun'],
    ['旅游资源','lǚ yóu zī yuán','Tài nguyên du lịch','Tourism resource','丰富的旅游资源。','Tài nguyên du lịch phong phú.','noun'],
  ]},
  { title:'Thể thao chuyên nghiệp', title_zh:'专业体育运动', level:'HSK4', order:29, words:[
    ['职业','zhí yè','Chuyên nghiệp / Nghề nghiệp','Professional / Career','职业运动员。','Vận động viên chuyên nghiệp.','noun'],
    ['奥运会','ào yùn huì','Thế vận hội / Olympic','Olympic Games','参加奥运会。','Tham gia Thế vận hội.','noun'],
    ['金牌','jīn pái','Huy chương vàng','Gold medal','获得金牌。','Giành huy chương vàng.','noun'],
    ['银牌','yín pái','Huy chương bạc','Silver medal','获得银牌。','Giành huy chương bạc.','noun'],
    ['铜牌','tóng pái','Huy chương đồng','Bronze medal','获得铜牌。','Giành huy chương đồng.','noun'],
    ['破记录','pò jì lù','Phá kỷ lục','Break record','再次破世界纪录。','Phá kỷ lục thế giới lần nữa.','verb'],
    ['裁判','cái pàn','Trọng tài / Phán xét','Referee / Judge','裁判吹哨。','Trọng tài thổi còi.','noun'],
    ['罚款','fá kuǎn','Phạt tiền','Fine / Penalty (money)','违规被罚款。','Vi phạm bị phạt tiền.','verb'],
    ['禁药','jìn yào','Thuốc cấm / Doping','Banned substance / Doping','使用禁药取消资格。','Dùng thuốc cấm bị tước tư cách.','noun'],
    ['体能','tǐ néng','Thể lực / Sức vóc','Physical fitness / Stamina','保持良好体能。','Duy trì thể lực tốt.','noun'],
    ['协调','xié tiáo','Phối hợp / Điều phối','Coordinate / Coordination','团队协调合作。','Đội nhóm phối hợp hợp tác.','verb'],
    ['耐力','nài lì','Sức bền','Endurance / Stamina','长跑需要好耐力。','Chạy đường dài cần sức bền tốt.','noun'],
    ['灵活','líng huó','Linh hoạt / Nhanh nhẹn','Flexible / Agile','动作灵活。','Động tác nhanh nhẹn.','adjective'],
    ['策略','cè lüè','Chiến lược / Chiến thuật','Strategy / Tactic','制定比赛策略。','Xây dựng chiến lược thi đấu.','noun'],
    ['主场','zhǔ chǎng','Sân nhà','Home field / Home court','在主场比赛更有优势。','Thi đấu trên sân nhà có lợi thế hơn.','noun'],
  ]},
  { title:'Nghệ thuật & Âm nhạc chuyên sâu', title_zh:'艺术与音乐深度', level:'HSK4', order:30, words:[
    ['作曲','zuò qǔ','Sáng tác nhạc / Soạn nhạc','Compose music','他为电影作曲。','Anh ấy soạn nhạc cho phim.','verb'],
    ['演奏','yǎn zòu','Biểu diễn nhạc cụ','Perform (instrument)','钢琴演奏很精彩。','Biểu diễn piano rất xuất sắc.','verb'],
    ['即兴','jí xìng','Ứng tấu / Ngẫu hứng','Improvise / Improvisation','即兴演奏爵士乐。','Ứng tấu nhạc jazz.','adjective'],
    ['交响乐','jiāo xiǎng yuè','Giao hưởng','Symphony / Orchestral music','欣赏交响乐演出。','Thưởng thức buổi biểu diễn giao hưởng.','noun'],
    ['乐器','yuè qì','Nhạc cụ','Musical instrument','他会弹多种乐器。','Anh ấy biết chơi nhiều nhạc cụ.','noun'],
    ['节奏','jié zòu','Nhịp điệu / Tiết tấu','Rhythm / Beat','音乐的节奏感很强。','Nhịp điệu âm nhạc rất mạnh.','noun'],
    ['旋律','xuán lǜ','Giai điệu / Nhạc điệu','Melody / Tune','优美的旋律。','Giai điệu tuyệt đẹp.','noun'],
    ['歌词','gē cí','Lời bài hát','Lyrics','这首歌的歌词很美。','Lời bài hát này rất đẹp.','noun'],
    ['专辑','zhuān jí','Album','Album','发行新专辑。','Phát hành album mới.','noun'],
    ['雕塑','diāo sù','Điêu khắc / Tượng','Sculpture / Statue','欣赏古代雕塑。','Thưởng thức điêu khắc cổ đại.','noun'],
    ['创作','chuàng zuò','Sáng tác / Tạo ra','Create / Creation (artistic)','艺术创作需要灵感。','Sáng tác nghệ thuật cần cảm hứng.','verb'],
    ['灵感','líng gǎn','Cảm hứng / Nguồn cảm hứng','Inspiration','获得创作灵感。','Có được nguồn cảm hứng sáng tác.','noun'],
    ['欣赏','xīn shǎng','Thưởng thức / Đánh giá cao','Appreciate / Enjoy','欣赏古典音乐。','Thưởng thức âm nhạc cổ điển.','verb'],
    ['风格','fēng gé','Phong cách / Phong độ','Style / Genre','独特的艺术风格。','Phong cách nghệ thuật độc đáo.','noun'],
    ['影响力','yǐng xiǎng lì','Sức ảnh hưởng / Tầm ảnh hưởng','Influence / Impact','全球影响力巨大。','Sức ảnh hưởng toàn cầu rất lớn.','noun'],
  ]},
  { title:'Khoa học tự nhiên & Vũ trụ', title_zh:'自然科学与宇宙', level:'HSK4', order:31, words:[
    ['宇宙','yǔ zhòu','Vũ trụ','Universe / Cosmos','宇宙浩瀚无边。','Vũ trụ bao la vô tận.','noun'],
    ['星球','xīng qiú','Hành tinh / Thiên thể','Planet / Celestial body','太阳系有八大星球。','Hệ Mặt trời có tám hành tinh lớn.','noun'],
    ['行星','xíng xīng','Hành tinh','Planet','地球是一颗行星。','Trái đất là một hành tinh.','noun'],
    ['宇航员','yǔ háng yuán','Phi hành gia','Astronaut / Cosmonaut','宇航员进入太空。','Phi hành gia vào không gian vũ trụ.','noun'],
    ['原子','yuán zǐ','Nguyên tử','Atom','物质由原子组成。','Vật chất được tạo thành từ nguyên tử.','noun'],
    ['分子','fēn zǐ','Phân tử','Molecule','H2O是水分子。','H2O là phân tử nước.','noun'],
    ['化学','huà xué','Hóa học','Chemistry','学习化学反应。','Học phản ứng hóa học.','noun'],
    ['物理','wù lǐ','Vật lý','Physics','物理定律。','Định luật vật lý.','noun'],
    ['生物','shēng wù','Sinh học / Sinh vật','Biology / Living things','研究生物多样性。','Nghiên cứu đa dạng sinh học.','noun'],
    ['基因','jī yīn','Gen / Gien','Gene','DNA含有基因信息。','DNA chứa thông tin gen.','noun'],
    ['进化','jìn huà','Tiến hóa','Evolution','物种进化论。','Lý thuyết tiến hóa loài.','verb'],
    ['能量','néng liàng','Năng lượng','Energy','物质转化为能量。','Vật chất chuyển hóa thành năng lượng.','noun'],
    ['引力','yǐn lì','Trọng lực / Lực hấp dẫn','Gravity / Gravitational force','地球引力。','Lực hấp dẫn trái đất.','noun'],
    ['光速','guāng sù','Tốc độ ánh sáng','Speed of light','光速约每秒30万公里。','Tốc độ ánh sáng khoảng 300000 km/giây.','noun'],
    ['黑洞','hēi dòng','Hố đen','Black hole','黑洞吞噬一切光。','Hố đen nuốt chửng mọi ánh sáng.','noun'],
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
    console.log(`\n✅ HSK4 Batch3: +${tL} bài, +${tW} từ → HSK4: ${s.c}/1200`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
