// seed_hsk2_final.js — Bổ sung HSK2 còn thiếu (modal verbs, grammar particles, directions...)
require('dotenv').config();
const pool = require('./connection');

const newLessons = [
  {
    lesson: { title:'Động từ tình thái (Modal verbs)', title_zh:'情态动词', desc:'Có thể, cần phải, muốn, biết làm...', level:'HSK2', order:18 },
    words: [
      ['可以','kě yǐ','Có thể / Được phép','Can / May','我可以进来吗？','Tôi có thể vào không?','verb'],
      ['能','néng','Có thể (có khả năng)','Can / Be able to','你能游泳吗？','Bạn có thể bơi không?','verb'],
      ['会','huì','Biết / Sẽ','Can / Know how / Will','我会说汉语。','Tôi biết nói tiếng Trung.','verb'],
      ['要','yào','Muốn / Cần / Sẽ','Want to / Need to / Will','我要一杯水。','Tôi muốn một ly nước.','verb'],
      ['想','xiǎng','Muốn / Nghĩ','Want to / Think / Miss','我想回家。','Tôi muốn về nhà.','verb'],
      ['应该','yīng gāi','Nên / Phải','Should / Ought to','你应该休息了。','Bạn nên nghỉ ngơi rồi.','verb'],
      ['必须','bì xū','Phải / Bắt buộc','Must / Have to','必须戴口罩。','Phải đeo khẩu trang.','verb'],
      ['得','děi','Phải / Cần','Must / Need to (coll.)','你得快点儿。','Bạn phải nhanh lên.','verb'],
      ['不用','bù yòng','Không cần','No need to','你不用谢。','Bạn không cần cảm ơn.','other'],
      ['不必','bù bì','Không nhất thiết','Need not / Not necessary','不必紧张。','Không cần căng thẳng.','other'],
      ['敢','gǎn','Dám / Can đảm','Dare','我不敢一个人去。','Tôi không dám đi một mình.','verb'],
      ['愿意','yuàn yì','Sẵn sàng / Sẵn lòng','Willing to / Ready to','我愿意帮你。','Tôi sẵn lòng giúp bạn.','verb'],
    ]
  },
  {
    lesson: { title:'Phương hướng & Vị trí địa lý', title_zh:'方向与地理位置', desc:'Bốn hướng đông tây nam bắc và từ địa lý', level:'HSK2', order:19 },
    words: [
      ['东','dōng','Đông / Phía đông','East','北京在中国东北。','Bắc Kinh ở đông bắc Trung Quốc.','noun'],
      ['西','xī','Tây / Phía tây','West','太阳从西边落下。','Mặt trời lặn về phía tây.','noun'],
      ['南','nán','Nam / Phía nam','South','海南岛在中国南部。','Đảo Hải Nam ở phía nam Trung Quốc.','noun'],
      ['北','běi','Bắc / Phía bắc','North','北京在北方。','Bắc Kinh ở phía bắc.','noun'],
      ['北京','běi jīng','Bắc Kinh','Beijing','北京是中国首都。','Bắc Kinh là thủ đô của Trung Quốc.','noun'],
      ['上海','shàng hǎi','Thượng Hải','Shanghai','上海是很大的城市。','Thượng Hải là thành phố rất lớn.','noun'],
      ['国家','guó jiā','Quốc gia / Đất nước','Country / Nation','中国是一个大国。','Trung Quốc là một cường quốc.','noun'],
      ['城市','chéng shì','Thành phố','City','我住在大城市。','Tôi sống ở thành phố lớn.','noun'],
      ['农村','nóng cūn','Nông thôn / Làng quê','Countryside / Rural area','我来自农村。','Tôi đến từ nông thôn.','noun'],
      ['边','biān','Phía / Bờ / Cạnh','Side / Edge / Border','海边的风景很美。','Phong cảnh bờ biển rất đẹp.','noun'],
      ['哪边','nǎ biān','Phía nào / Bên nào','Which side','书店在哪边？','Hiệu sách ở phía nào?','other'],
      ['这边','zhè biān','Phía này / Bên này','This side','请到这边来。','Hãy đến phía này.','other'],
    ]
  },
  {
    lesson: { title:'Trợ từ ngữ pháp', title_zh:'语法助词', desc:'Trợ từ 了 过 着 吧 呢 và các hạt ngữ pháp', level:'HSK2', order:20 },
    words: [
      ['了','le','Rồi (hoàn thành)','(completion particle)','我吃了。','Tôi ăn rồi.','other'],
      ['过','guò','Đã từng / Trải qua','(experience particle)','我去过上海。','Tôi đã từng đến Thượng Hải.','other'],
      ['着','zhe','Đang (trạng thái)','(ongoing state particle)','他睡着了。','Anh ấy đã ngủ rồi.','other'],
      ['吧','ba','Nhỉ / Nhé (phỏng đoán/đề nghị)','(suggestion/assumption particle)','走吧。','Đi thôi nhỉ.','other'],
      ['呢','ne','Còn ... thì sao? / Đang...','(question/ongoing particle)','你呢？','Còn bạn thì sao?','other'],
      ['啊','a','Ồ / À (cảm thán)','(exclamation particle)','好啊！','Tốt lắm!','other'],
      ['嘛','ma','Mà (giải thích đương nhiên)','(obvious explanation particle)','这是对的嘛。','Điều này đúng mà.','other'],
      ['得','de','(kết quả/bổ ngữ)','(result complement particle)','她说得很好。','Cô ấy nói rất giỏi.','other'],
      ['地','de','(phó từ + động từ)','(adverbial particle)','认真地学习。','Học tập một cách nghiêm túc.','other'],
      ['的','de','Của / (định ngữ)','(attributive particle)','我的书。','Sách của tôi.','other'],
      ['比','bǐ','So sánh hơn / Hơn','Compare / Than','这个比那个好。','Cái này tốt hơn cái kia.','other'],
      ['比较','bǐ jiào','Tương đối / Khá là','Relatively / Comparatively','他比较高。','Anh ấy tương đối cao.','adverb'],
    ]
  },
  {
    lesson: { title:'Quần áo & Đồ dùng hàng ngày', title_zh:'衣物与日常用品', desc:'Trang phục và đồ dùng thường ngày', level:'HSK2', order:21 },
    words: [
      ['穿','chuān','Mặc / Đi (giày)','Wear','今天穿什么好？','Hôm nay mặc gì tốt?','verb'],
      ['裤子','kù zi','Quần','Pants / Trousers','这条裤子很好看。','Chiếc quần này rất đẹp.','noun'],
      ['裙子','qún zi','Váy','Skirt','她穿着一条漂亮的裙子。','Cô ấy mặc một chiếc váy đẹp.','noun'],
      ['衬衫','chèn shān','Áo sơ mi','Shirt','我喜欢白色衬衫。','Tôi thích áo sơ mi trắng.','noun'],
      ['外套','wài tào','Áo khoác ngoài','Coat / Jacket','冬天要穿外套。','Mùa đông phải mặc áo khoác.','noun'],
      ['鞋','xié','Giày','Shoes','这双鞋很舒服。','Đôi giày này rất thoải mái.','noun'],
      ['帽子','mào zi','Mũ','Hat','戴帽子很好看。','Đội mũ trông rất đẹp.','noun'],
      ['手表','shǒu biǎo','Đồng hồ đeo tay','Watch','这块手表多少钱？','Chiếc đồng hồ này bao nhiêu tiền?','noun'],
      ['眼镜','yǎn jìng','Kính mắt','Glasses','我戴眼镜。','Tôi đeo kính.','noun'],
      ['包','bāo','Túi / Nào','Bag','我的包丢了。','Túi của tôi bị mất rồi.','noun'],
      ['报纸','bào zhǐ','Báo giấy','Newspaper','爸爸喜欢看报纸。','Bố thích đọc báo.','noun'],
      ['信','xìn','Thư / Tin nhắn','Letter','我收到了一封信。','Tôi nhận được một bức thư.','noun'],
    ]
  },
  {
    lesson: { title:'Học tập & Trường lớp', title_zh:'学习与课堂', desc:'Từ vựng trường học và học tập', level:'HSK2', order:22 },
    words: [
      ['教室','jiào shì','Phòng học / Lớp học','Classroom','我们在教室学习。','Chúng tôi học trong phòng học.','noun'],
      ['课','kè','Tiết học / Khóa học','Class / Lesson / Course','几点上课？','Mấy giờ bắt đầu học?','noun'],
      ['上课','shàng kè','Vào học / Bắt đầu giờ học','Go to class / Start class','别迟到，快去上课。','Đừng trễ, mau đi học đi.','verb'],
      ['下课','xià kè','Tan học / Hết giờ học','Class is over','几点下课？','Mấy giờ tan học?','verb'],
      ['考试','kǎo shì','Thi / Kỳ thi','Exam / Test','明天有考试。','Ngày mai có kỳ thi.','noun'],
      ['第','dì','Thứ (số thứ tự)','(ordinal prefix)','第一名！','Thứ nhất!','other'],
      ['次','cì','Lần','Time / Occasion','我去了三次。','Tôi đã đến ba lần.','other'],
      ['件','jiàn','Chiếc (lượng từ áo)','(measure word for clothes)','一件衣服。','Một chiếc áo.','other'],
      ['本','běn','Cuốn (lượng từ sách)','(measure word for books)','一本书。','Một cuốn sách.','other'],
      ['张','zhāng','Tờ / Tấm (lượng từ)','(measure word for flat things)','一张纸。','Một tờ giấy.','other'],
      ['块','kuài','Đồng (tiền) / Miếng','(money / piece measure word)','五块钱。','Năm đồng tiền.','other'],
      ['双','shuāng','Đôi (lượng từ)','Pair (measure word)','一双鞋。','Một đôi giày.','other'],
    ]
  },
  {
    lesson: { title:'Thời tiết & Thiên nhiên', title_zh:'天气与自然现象', desc:'Mô tả thời tiết và hiện tượng thiên nhiên', level:'HSK2', order:23 },
    words: [
      ['下雪','xià xuě','Tuyết rơi','Snow / It snows','北京冬天会下雪。','Hà Nội vào mùa đông có tuyết.','verb'],
      ['下雨','xià yǔ','Trời mưa','Rain / It rains','今天下雨了。','Hôm nay trời mưa rồi.','verb'],
      ['刮风','guā fēng','Có gió / Gió thổi','Wind blows','外面在刮风。','Bên ngoài đang có gió.','verb'],
      ['晴','qíng','Trời nắng / Quang đãng','Sunny / Clear','今天天气很晴。','Hôm nay trời rất nắng.','adjective'],
      ['阴','yīn','Âm u / Mây mù','Cloudy / Overcast','天气很阴，可能下雨。','Trời âm u, có thể mưa.','adjective'],
      ['温度','wēn dù','Nhiệt độ','Temperature','今天温度很高。','Hôm nay nhiệt độ rất cao.','noun'],
      ['度','dù','Độ (°C)','Degree','今天三十二度。','Hôm nay ba mươi hai độ.','other'],
      ['季节','jì jié','Mùa / Mùa tiết','Season','你最喜欢哪个季节？','Bạn thích mùa nào nhất?','noun'],
      ['春天','chūn tiān','Mùa xuân','Spring','春天花开了。','Mùa xuân hoa nở rồi.','noun'],
      ['夏天','xià tiān','Mùa hè','Summer','夏天很热。','Mùa hè rất nóng.','noun'],
      ['秋天','qiū tiān','Mùa thu','Autumn / Fall','秋天的叶子很美。','Lá mùa thu rất đẹp.','noun'],
      ['冬天','dōng tiān','Mùa đông','Winter','冬天很冷。','Mùa đông rất lạnh.','noun'],
    ]
  },
  {
    lesson: { title:'Động từ thông dụng nâng cao', title_zh:'常用动词进阶', desc:'Các động từ quan trọng cần biết ở HSK2', level:'HSK2', order:24 },
    words: [
      ['进','jìn','Vào / Đi vào','Enter / Go in','请进！','Mời vào!','verb'],
      ['出','chū','Ra / Đi ra','Go out / Exit','出去走走。','Ra ngoài đi dạo.','verb'],
      ['等','děng','Đợi / Chờ','Wait','请稍等。','Xin hãy đợi một chút.','verb'],
      ['用','yòng','Dùng / Sử dụng','Use','你用筷子吗？','Bạn có dùng đũa không?','verb'],
      ['找','zhǎo','Tìm','Look for / Find','我在找我的手机。','Tôi đang tìm điện thoại.','verb'],
      ['让','ràng','Để / Cho phép / Làm cho','Let / Allow / Make','让我来帮你。','Để tôi giúp bạn.','verb'],
      ['送','sòng','Tặng / Đưa tiễn','Give (as gift) / See off','他送我一本书。','Anh ấy tặng tôi một cuốn sách.','verb'],
      ['洗','xǐ','Rửa / Giặt','Wash','饭前洗手。','Rửa tay trước bữa ăn.','verb'],
      ['欢迎','huān yíng','Chào mừng','Welcome','欢迎来中国！','Chào mừng đến Trung Quốc!','verb'],
      ['问','wèn','Hỏi','Ask / Question','我想问一个问题。','Tôi muốn hỏi một câu hỏi.','verb'],
      ['起床','qǐ chuáng','Thức dậy / Dậy','Get up / Wake up','我六点起床。','Tôi thức dậy lúc 6 giờ.','verb'],
      ['睡觉','shuì jiào','Ngủ','Sleep / Go to sleep','我要去睡觉了。','Tôi muốn đi ngủ rồi.','verb'],
    ]
  },
  {
    lesson: { title:'Màu sắc & Hình dạng', title_zh:'颜色与形状', desc:'Màu sắc và hình dạng cơ bản', level:'HSK2', order:25 },
    words: [
      ['红','hóng','Màu đỏ (tính từ)','Red','这朵花是红的。','Bông hoa này màu đỏ.','adjective'],
      ['蓝','lán','Màu xanh dương (tính từ)','Blue','天空是蓝色的。','Bầu trời màu xanh lam.','adjective'],
      ['黄','huáng','Màu vàng (tính từ)','Yellow','香蕉是黄的。','Chuối màu vàng.','adjective'],
      ['白','bái','Màu trắng (tính từ)','White','雪是白的。','Tuyết màu trắng.','adjective'],
      ['黑','hēi','Màu đen (tính từ)','Black','他穿着黑衣服。','Anh ấy mặc áo đen.','adjective'],
      ['圆','yuán','Tròn','Round / Circular','月亮是圆的。','Mặt trăng hình tròn.','adjective'],
      ['方','fāng','Vuông','Square / Rectangular','这个盒子是方的。','Cái hộp này hình vuông.','adjective'],
      ['大小','dà xiǎo','Kích thước','Size','这件衣服大小合适。','Chiếc áo này vừa kích thước.','noun'],
      ['轻','qīng','Nhẹ','Light (weight)','这个包很轻。','Cái túi này rất nhẹ.','adjective'],
      ['重','zhòng','Nặng','Heavy','这箱子太重了。','Cái hộp này nặng quá.','adjective'],
      ['厚','hòu','Dày','Thick','这本书很厚。','Cuốn sách này rất dày.','adjective'],
      ['薄','báo','Mỏng','Thin','冰很薄，小心！','Băng rất mỏng, cẩn thận!','adjective'],
    ]
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let totalLessons = 0, totalWords = 0;

    for (const { lesson, words } of newLessons) {
      let lessonId;
      const [ex] = await conn.query('SELECT id FROM lessons WHERE title=? AND hsk_level=?', [lesson.title, lesson.level]);
      if (ex.length > 0) {
        lessonId = ex[0].id;
      } else {
        const [r] = await conn.query(
          'INSERT INTO lessons (title,title_zh,description,hsk_level,order_index) VALUES (?,?,?,?,?)',
          [lesson.title, lesson.title_zh, lesson.desc, lesson.level, lesson.order]
        );
        lessonId = r.insertId;
        totalLessons++;
        console.log(`  ✓ Bài: ${lesson.title} (${lessonId})`);
      }
      for (const [h,p,vi,en,exZh,exVi,type] of words) {
        const [ew] = await conn.query('SELECT id FROM vocabulary WHERE hanzi=? AND lesson_id=?',[h,lessonId]);
        if (ew.length) continue;
        await conn.query(
          'INSERT INTO vocabulary (lesson_id,hanzi,pinyin,meaning_vi,meaning_en,example_sentence_zh,example_sentence_vi,hsk_level,word_type) VALUES (?,?,?,?,?,?,?,?,?)',
          [lessonId,h,p,vi,en,exZh,exVi,'HSK2',type]
        );
        totalWords++;
      }
    }

    await conn.commit();
    console.log(`\n✅ HSK2 FINAL: +${totalLessons} bài, +${totalWords} từ`);

    // Stats chuẩn
    const [s] = await conn.query(`
      SELECT l.hsk_level, COUNT(DISTINCT l.id) bai, COUNT(v.id) tu
      FROM lessons l LEFT JOIN vocabulary v ON v.lesson_id=l.id
      GROUP BY l.hsk_level ORDER BY l.hsk_level`);
    let total = 0;
    console.log('\n📊 Kết quả:');
    s.forEach(r => { console.log(`   ${r.hsk_level}: ${r.bai} bài · ${r.tu} từ`); total += Number(r.tu); });
    console.log(`   ══ TỔNG: ${total} từ`);
  } catch(e) { await conn.rollback(); console.error('❌',e.message); }
  finally { conn.release(); process.exit(0); }
}
seed();
