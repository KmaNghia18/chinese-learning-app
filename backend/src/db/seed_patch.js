// backend/src/db/seed_patch.js
// Bổ sung từ còn thiếu trong các bài HSK1 ban đầu
require('dotenv').config();
const pool = require('./connection');

const patches = [
  // ========== Bài 2: Số đếm 0-10 (lesson id=2) — thêm 六七八九十 ==========
  { lesson_title: 'Số đếm 0-10', level: 'HSK1', words: [
    ['六','liù','Sáu (6)','Six','我家有六口人。','Nhà tôi có sáu người.','noun'],
    ['七','qī','Bảy (7)','Seven','今天是七月七日。','Hôm nay là ngày 7 tháng 7.','noun'],
    ['八','bā','Tám (8)','Eight','我八岁学游泳。','Tôi học bơi lúc tám tuổi.','noun'],
    ['九','jiǔ','Chín (9)','Nine','猫有九条命。','Mèo có chín mạng.','noun'],
    ['十','shí','Mười (10)','Ten','一打有十二个。','Một tá có mười hai cái.','noun'],
    ['百','bǎi','Một trăm (100)','Hundred','一百块钱。','Một trăm đồng.','noun'],
    ['千','qiān','Một nghìn (1000)','Thousand','一千个学生。','Một nghìn học sinh.','noun'],
    ['万','wàn','Mười nghìn (10,000)','Ten thousand','一万块钱。','Mười nghìn đồng.','noun'],
    ['两','liǎng','Hai (dùng trước lượng từ)','Two (before measure words)','两个苹果。','Hai quả táo.','noun'],
    ['几','jǐ','Mấy / Bao nhiêu','How many (small number)','你有几个朋友？','Bạn có mấy người bạn?','other'],
    ['多少','duō shao','Bao nhiêu','How much / How many','多少钱？','Bao nhiêu tiền?','other'],
  ]},

  // ========== Bài 1: Chào hỏi — thêm các câu chào phổ biến ==========
  { lesson_title: 'Chào hỏi cơ bản', level: 'HSK1', words: [
    ['你好吗','nǐ hǎo ma','Bạn khỏe không?','How are you?','你好吗？我很好！','Bạn khỏe không? Tôi rất khỏe!','other'],
    ['我叫','wǒ jiào','Tôi tên là','My name is','我叫小明。','Tôi tên là Tiểu Minh.','other'],
    ['请问','qǐng wèn','Xin hỏi / Cho hỏi','Excuse me / May I ask','请问，洗手间在哪里？','Xin hỏi, nhà vệ sinh ở đâu?','other'],
    ['是的','shì de','Đúng vậy / Phải','Yes / That is correct','是的，我是学生。','Đúng vậy, tôi là học sinh.','other'],
    ['不是','bù shì','Không phải','No / It is not','我不是老师。','Tôi không phải giáo viên.','other'],
  ]},

  // ========== Bài 3: Gia đình — thêm từ còn thiếu ==========
  { lesson_title: 'Gia đình', level: 'HSK1', words: [
    ['爷爷','yé ye','Ông nội','Paternal grandfather','爷爷今年七十岁。','Ông nội năm nay bảy mươi tuổi.','noun'],
    ['奶奶','nǎi nai','Bà nội','Paternal grandmother','奶奶做饺子很好吃。','Bánh sủi cảo của bà nội rất ngon.','noun'],
    ['外公','wài gōng','Ông ngoại','Maternal grandfather','外公喜欢钓鱼。','Ông ngoại thích câu cá.','noun'],
    ['外婆','wài pó','Bà ngoại','Maternal grandmother','外婆住在农村。','Bà ngoại sống ở nông thôn.','noun'],
    ['儿子','ér zi','Con trai','Son','他有一个儿子。','Anh ấy có một người con trai.','noun'],
    ['女儿','nǚ ér','Con gái','Daughter','她的女儿很聪明。','Con gái của cô ấy rất thông minh.','noun'],
    ['孩子','hái zi','Đứa trẻ / Con cái','Child / Children','这个孩子很可爱。','Đứa trẻ này rất đáng yêu.','noun'],
    ['丈夫','zhàng fu','Chồng','Husband','她的丈夫是医生。','Chồng của cô ấy là bác sĩ.','noun'],
    ['妻子','qī zi','Vợ','Wife','他的妻子很漂亮。','Vợ của anh ấy rất đẹp.','noun'],
    ['家','jiā','Gia đình / Nhà','Home / Family','我的家很温暖。','Gia đình tôi rất ấm áp.','noun'],
  ]},

  // ========== Bài 4: Màu sắc — thêm màu còn thiếu ==========
  { lesson_title: 'Màu sắc', level: 'HSK1', words: [
    ['黄色','huáng sè','Màu vàng','Yellow','香蕉是黄色的。','Chuối màu vàng.','noun'],
    ['橙色','chéng sè','Màu cam','Orange','橘子是橙色的。','Cam màu cam.','noun'],
    ['紫色','zǐ sè','Màu tím','Purple','她喜欢紫色。','Cô ấy thích màu tím.','noun'],
    ['粉色','fěn sè','Màu hồng','Pink','小女孩喜欢粉色。','Các bé gái thích màu hồng.','noun'],
    ['棕色','zōng sè','Màu nâu','Brown','熊是棕色的。','Gấu màu nâu.','noun'],
    ['灰色','huī sè','Màu xám','Gray','天空灰色的。','Bầu trời màu xám.','noun'],
    ['颜色','yán sè','Màu sắc','Color','你喜欢什么颜色？','Bạn thích màu gì?','noun'],
  ]},

  // ========== Bài 5: Thức ăn — thêm từ còn thiếu ==========
  { lesson_title: 'Thức ăn & đồ uống', level: 'HSK1', words: [
    ['肉','ròu','Thịt','Meat','我不吃肉。','Tôi không ăn thịt.','noun'],
    ['鸡蛋','jī dàn','Trứng','Egg','我每天吃一个鸡蛋。','Tôi ăn một quả trứng mỗi ngày.','noun'],
    ['蔬菜','shū cài','Rau củ','Vegetables','多吃蔬菜对身体好。','Ăn nhiều rau củ tốt cho sức khỏe.','noun'],
    ['面包','miàn bāo','Bánh mì','Bread','早餐吃面包。','Ăn bánh mì vào bữa sáng.','noun'],
    ['牛奶','niú nǎi','Sữa bò','Milk','每天喝牛奶。','Uống sữa mỗi ngày.','noun'],
    ['咖啡','kā fēi','Cà phê','Coffee','我喜欢喝咖啡。','Tôi thích uống cà phê.','noun'],
    ['果汁','guǒ zhī','Nước ép hoa quả','Juice','我要一杯果汁。','Tôi muốn một ly nước ép.','noun'],
    ['饿','è','Đói','Hungry','我饿了，想吃东西。','Tôi đói, muốn ăn gì đó.','adjective'],
    ['渴','kě','Khát','Thirsty','我渴了，要喝水。','Tôi khát, muốn uống nước.','adjective'],
    ['吃','chī','Ăn','Eat','你吃了吗？','Bạn ăn chưa?','verb'],
    ['喝','hē','Uống','Drink','我喝水。','Tôi uống nước.','verb'],
    ['好吃','hǎo chī','Ngon','Delicious','这个很好吃！','Cái này rất ngon!','adjective'],
  ]},
];

async function patch() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let totalInserted = 0;

    for (const p of patches) {
      // Tìm lesson
      const [lessons] = await conn.query(
        'SELECT id FROM lessons WHERE title=? AND hsk_level=?',
        [p.lesson_title, p.level]
      );
      if (!lessons.length) {
        console.log(`  ⚠️  Không tìm thấy bài: "${p.lesson_title}"`);
        continue;
      }
      const lessonId = lessons[0].id;
      console.log(`\n📚 Bài: "${p.lesson_title}" (id=${lessonId})`);

      for (const [hanzi, pinyin, vi, en, exZh, exVi, type] of p.words) {
        const [ex] = await conn.query(
          'SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',
          [hanzi, lessonId]
        );
        if (ex.length > 0) {
          console.log(`    ↩ Đã có: ${hanzi}`);
          continue;
        }
        await conn.query(
          `INSERT INTO vocabulary (lesson_id, hanzi, pinyin, meaning_vi, meaning_en,
           example_sentence_zh, example_sentence_vi, hsk_level, word_type)
           VALUES (?,?,?,?,?,?,?,?,?)`,
          [lessonId, hanzi, pinyin, vi, en, exZh, exVi, 'HSK1', type]
        );
        console.log(`    ✓ Thêm: ${hanzi} (${pinyin}) — ${vi}`);
        totalInserted++;
      }
    }

    await conn.commit();
    console.log(`\n✅ PATCH DONE: Thêm ${totalInserted} từ mới`);

    // Kiểm tra lại
    console.log('\n📊 Số từ theo từng bài HSK1:');
    const [stats] = await conn.query(`
      SELECT l.title, COUNT(v.id) as so_tu
      FROM lessons l
      LEFT JOIN vocabulary v ON v.lesson_id = l.id
      WHERE l.hsk_level = 'HSK1'
      GROUP BY l.id, l.title
      ORDER BY l.order_index
    `);
    stats.forEach((s) => console.log(`   ${s.title}: ${s.so_tu} từ`));

  } catch (e) {
    await conn.rollback();
    console.error('❌ Error:', e.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}
patch();
