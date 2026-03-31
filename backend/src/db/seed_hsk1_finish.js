// seed_hsk1_finish.js — Hoàn thiện HSK1 đủ 150 từ chuẩn
require('dotenv').config();
const pool = require('./connection');

// Từ HSK1 chuẩn còn thiếu, thêm vào các bài phù hợp (dùng title để match)
const patches = [
  { lesson:'Chào hỏi cơ bản', words: [
    ['喂','wèi','A-lô / Này','Hello (phone/calling)','喂，你好！','A-lô, xin chào!','other'],
    ['名字','míng zi','Tên / Họ tên','Name','你叫什么名字？','Tên bạn là gì?','noun'],
    ['认识','rèn shi','Biết / Quen','Know / Meet','很高兴认识你。','Rất vui được quen biết bạn.','verb'],
    ['先生','xiān sheng','Ông / Thầy','Mister / Sir','李先生在吗？','Ông Lý có ở đây không?','noun'],
    ['小姐','xiǎo jiě','Cô','Miss / Young woman','王小姐很漂亮。','Cô Vương rất đẹp.','noun'],
    ['朋友','péng yǒu','Bạn bè','Friend','他是我的好朋友。','Anh ấy là người bạn tốt của tôi.','noun'],
  ]},
  { lesson:'Số đếm 0-10', words: [
    ['岁','suì','Tuổi','Years old','我二十岁了。','Tôi hai mươi tuổi rồi.','noun'],
    ['个','gè','Cái (lượng từ phổ biến)','(general measure word)','一个苹果。','Một quả táo.','other'],
    ['点','diǎn','Giờ / Điểm','O clock / Point','现在三点了。','Bây giờ là ba giờ.','noun'],
    ['分钟','fēn zhōng','Phút','Minute','等我五分钟。','Đợi tôi năm phút.','noun'],
  ]},
  { lesson:'Gia đình', words: [
    ['同学','tóng xué','Bạn học / Bạn cùng lớp','Classmate','他是我的同学。','Anh ấy là bạn học của tôi.','noun'],
    ['老师','lǎo shī','Giáo viên / Thầy cô','Teacher','我的老师很好。','Giáo viên của tôi rất tốt.','noun'],
    ['学生','xué shēng','Học sinh','Student','我是学生。','Tôi là học sinh.','noun'],
    ['人','rén','Người','Person / People','这里有很多人。','Nơi đây có rất nhiều người.','noun'],
  ]},
  { lesson:'Thức ăn & đồ uống', words: [
    ['饭店','fàn diàn','Nhà hàng / Khách sạn','Restaurant / Hotel','这家饭店很有名。','Nhà hàng này rất nổi tiếng.','noun'],
    ['好吃','hǎo chī','Ngon','Delicious / Tasty','这个菜很好吃！','Món ăn này rất ngon!','adjective'],
    ['杯子','bēi zi','Cái cốc / Ly','Cup / Glass','这个杯子是我的。','Cái ly này là của tôi.','noun'],
  ]},
  { lesson:'Thời gian & Ngày tháng', words: [
    ['昨天','zuó tiān','Hôm qua','Yesterday','昨天我生病了。','Hôm qua tôi bị bệnh.','noun'],
    ['上午','shàng wǔ','Buổi sáng (trước 12h)','Morning / AM','我上午学习。','Tôi học buổi sáng.','noun'],
    ['下午','xià wǔ','Buổi chiều (12-18h)','Afternoon / PM','下午我去打球。','Buổi chiều tôi đi chơi bóng.','noun'],
    ['中午','zhōng wǔ','Buổi trưa','Noon / Midday','中午我们一起吃饭。','Buổi trưa chúng ta cùng ăn cơm.','noun'],
  ]},
  { lesson:'Đồ vật & Địa điểm', words: [
    ['出租车','chū zū chē','Xe taxi','Taxi','我打了一辆出租车。','Tôi bắt một chiếc xe taxi.','noun'],
    ['商店','shāng diàn','Cửa hàng','Shop / Store','附近有商店吗？','Gần đây có cửa hàng không?','noun'],
    ['医院','yī yuàn','Bệnh viện','Hospital','医院就在前面。','Bệnh viện ở ngay phía trước.','noun'],
    ['学校','xué xiào','Trường học','School','我在学校学习。','Tôi học tập ở trường.','noun'],
    ['椅子','yǐ zi','Ghế','Chair','请坐在椅子上。','Hãy ngồi xuống ghế.','noun'],
    ['东西','dōng xi','Đồ vật / Thứ','Thing / Stuff / Item','你买什么东西？','Bạn mua đồ gì vậy?','noun'],
  ]},
  { lesson:'Động từ thông dụng', words: [
    ['来','lái','Đến / Lại','Come','请进来。','Hãy vào đây.','verb'],
    ['回','huí','Về / Quay lại','Return / Go back','我回来了。','Tôi về rồi.','verb'],
    ['买','mǎi','Mua','Buy','我去买东西。','Tôi đi mua đồ.','verb'],
    ['读','dú','Đọc (to đọc)','Read aloud / Study','大声读课文。','Đọc to bài khóa.','verb'],
    ['写','xiě','Viết','Write','请写下你的名字。','Hãy viết tên của bạn xuống.','verb'],
    ['看见','kàn jiàn','Nhìn thấy','See / Catch sight of','我看见你了。','Tôi thấy bạn rồi.','verb'],
    ['打电话','dǎ diàn huà','Gọi điện thoại','Make a phone call','我给你打电话。','Tôi gọi điện cho bạn.','verb'],
    ['开','kāi','Mở / Lái','Open / Drive / Start','请把门开一下。','Hãy mở cửa ra.','verb'],
  ]},
  { lesson:'Tính từ cơ bản', words: [
    ['非常','fēi cháng','Rất / Vô cùng','Very / Extremely','非常感谢！','Cảm ơn vô cùng!','adverb'],
    ['都','dōu','Đều / Tất cả','All / Both','我们都是学生。','Chúng tôi đều là học sinh.','adverb'],
    ['没有','méi yǒu','Không có','Don not have / There is no','我没有钱。','Tôi không có tiền.','verb'],
  ]},
  { lesson:'Đại từ & Giới từ', words: [
    ['哪','nǎ','Cái nào / Nào','Which','你喜欢哪个？','Bạn thích cái nào?','other'],
    ['哪儿','nǎr','Ở đâu','Where (spoken)','你去哪儿？','Bạn đi đâu vậy?','other'],
    ['那','nà','Đó / Đấy / Kia','That','那是什么？','Đó là cái gì vậy?','other'],
    ['们','men','Hậu tố số nhiều','Plural suffix','我们是朋友。','Chúng tôi là bạn bè.','other'],
    ['些','xiē','Một số / Một ít','Some / A few','这些是你的吗？','Những cái này là của bạn không?','other'],
    ['在','zài','Ở / Đang (tiếp diễn)','At / In / On / Doing','我在家。','Tôi đang ở nhà.','other'],
    ['和','hé','Và / Cùng','And / With','我和你一起去。','Tôi và bạn cùng đi.','conjunction'],
    ['也','yě','Cũng','Also / Too','我也喜欢。','Tôi cũng thích.','adverb'],
    ['还','hái','Vẫn / Còn','Still / Also','他还没来。','Anh ấy vẫn chưa đến.','adverb'],
    ['太','tài','Quá / Rất','Too / So much','太贵了！','Đắt quá!','adverb'],
    ['很','hěn','Rất','Very','我很好。','Tôi rất khỏe.','adverb'],
  ]},
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0;
    for (const { lesson, words } of patches) {
      const [ls] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?', [lesson, 'HSK1']);
      if (!ls.length) { console.log(`  ⚠ Không tìm thấy: ${lesson}`); continue; }
      const lid = ls[0].id;
      for (const [h,p,vi,en,exZh,exVi,type] of words) {
        const [ex] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lid]);
        if (ex.length) continue;
        await conn.query(
          'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lid,h,p,vi,en,exZh,exVi,'HSK1',type]
        );
        total++;
      }
    }
    await conn.commit();
    console.log(`✅ HSK1 hoàn thiện: +${total} từ`);
    const [[row]] = await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK1'`);
    console.log(`📊 HSK1 tổng: ${row.c} từ / 150 chuẩn`);
  } catch(e) { await conn.rollback(); console.error('❌',e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
