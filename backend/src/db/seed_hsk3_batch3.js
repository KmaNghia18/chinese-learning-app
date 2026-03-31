// seed_hsk3_batch3.js — HSK3 mở rộng (batch 3/4): Xã hội & Văn hóa
require('dotenv').config();
const pool = require('./connection');

const lessons = [
  { title:'Môi trường & Xã hội', title_zh:'环境与社会', level:'HSK3', order:27, words:[
    ['环境','huán jìng','Môi trường','Environment','保护环境人人有责。','Bảo vệ môi trường là trách nhiệm của mọi người.','noun'],
    ['污染','wū rǎn','Ô nhiễm','Pollution','空气污染很严重。','Ô nhiễm không khí rất nghiêm trọng.','noun'],
    ['垃圾','lā jī','Rác thải','Garbage / Trash','不要乱扔垃圾。','Không được vứt rác bừa bãi.','noun'],
    ['分类','fēn lèi','Phân loại','Classify / Sort','垃圾要分类回收。','Rác cần được phân loại tái chế.','verb'],
    ['节约','jié yuē','Tiết kiệm (tài nguyên)','Save / Conserve','节约用水。','Tiết kiệm nước.','verb'],
    ['植树','zhí shù','Trồng cây','Plant trees','植树节大家一起植树。','Ngày trồng cây mọi người cùng trồng cây.','verb'],
    ['能源','néng yuán','Năng lượng / Nguồn năng lượng','Energy / Energy source','开发新能源。','Phát triển nguồn năng lượng mới.','noun'],
    ['发展','fā zhǎn','Phát triển','Develop / Development','经济快速发展。','Kinh tế phát triển nhanh chóng.','verb'],
    ['影响','yǐng xiǎng','Ảnh hưởng','Influence / Impact','气候变化影响我们。','Biến đổi khí hậu ảnh hưởng đến chúng ta.','verb'],
    ['重视','zhòng shì','Coi trọng / Chú trọng','Attach importance to','要重视环保问题。','Cần coi trọng vấn đề bảo vệ môi trường.','verb'],
    ['自然','zì rán','Tự nhiên','Nature / Natural','保护大自然。','Bảo vệ thiên nhiên.','noun'],
    ['资源','zī yuán','Tài nguyên','Resource','合理使用资源。','Sử dụng tài nguyên hợp lý.','noun'],
  ]},
  { title:'Văn hóa & Nghệ thuật', title_zh:'文化与艺术', level:'HSK3', order:28, words:[
    ['文化','wén huà','Văn hóa','Culture','中国文化历史悠久。','Văn hóa Trung Quốc có lịch sử lâu đài.','noun'],
    ['传统','chuán tǒng','Truyền thống','Tradition / Traditional','尊重传统文化。','Tôn trọng văn hóa truyền thống.','noun'],
    ['艺术','yì shù','Nghệ thuật','Art','他对艺术很有感情。','Anh ấy rất có tình cảm với nghệ thuật.','noun'],
    ['表演','biǎo yǎn','Biểu diễn','Perform / Performance','他们的表演很精彩。','Màn biểu diễn của họ rất xuất sắc.','verb'],
    ['展览','zhǎn lǎn','Triển lãm','Exhibition','去看画展览。','Đi xem triển lãm tranh.','noun'],
    ['博物馆','bó wù guǎn','Bảo tàng','Museum','参观历史博物馆。','Tham quan bảo tàng lịch sử.','noun'],
    ['传说','chuán shuō','Truyền thuyết','Legend / Folklore','关于那座山的传说。','Truyền thuyết về ngọn núi đó.','noun'],
    ['故事','gù shi','Câu chuyện','Story','给我讲个故事吧。','Kể cho tôi nghe một câu chuyện đi.','noun'],
    ['民间','mín jiān','Dân gian','Folk / Among the people','民间艺术很丰富。','Nghệ thuật dân gian rất phong phú.','noun'],
    ['古代','gǔ dài','Thời cổ đại','Ancient times','古代中国很强大。','Trung Quốc cổ đại rất hùng mạnh.','noun'],
    ['现代','xiàn dài','Hiện đại','Modern / Contemporary','现代科技发展快。','Khoa học kỹ thuật hiện đại phát triển nhanh.','noun'],
    ['习惯','xí guàn','Thói quen / Tập quán','Habit / Custom','养成好习惯。','Hình thành thói quen tốt.','noun'],
  ]},
  { title:'Truyền thông & Thông tin', title_zh:'媒体与信息', level:'HSK3', order:29, words:[
    ['新闻','xīn wén','Tin tức / Bản tin','News','我每天看新闻。','Tôi xem tin tức mỗi ngày.','noun'],
    ['信息','xìn xī','Thông tin','Information','获取最新信息。','Nhận thông tin mới nhất.','noun'],
    ['网络','wǎng luò','Mạng lưới / Internet','Network / Internet','网络让世界更小。','Mạng internet làm thế giới nhỏ lại.','noun'],
    ['上网','shàng wǎng','Lên mạng / Truy cập internet','Go online / Browse internet','我每天上网查资料。','Tôi truy cập internet tra tài liệu mỗi ngày.','verb'],
    ['下载','xià zài','Tải xuống','Download','下载这个软件。','Tải xuống phần mềm này.','verb'],
    ['软件','ruǎn jiàn','Phần mềm','Software','安装这个软件。','Cài đặt phần mềm này.','noun'],
    ['手机','shǒu jī','Điện thoại di động','Mobile phone','我的手机没电了。','Điện thoại tôi hết pin rồi.','noun'],
    ['拍照','pāi zhào','Chụp ảnh','Take photos','我用手机拍照。','Tôi dùng điện thoại chụp ảnh.','verb'],
    ['分享','fēn xiǎng','Chia sẻ','Share','把好东西分享给朋友。','Chia sẻ những thứ tốt đẹp với bạn bè.','verb'],
    ['点赞','diǎn zàn','Thích / Like (MXH)','Like (social media)','给我点赞！','Hãy like cho tôi!','verb'],
    ['评论','píng lùn','Bình luận / Nhận xét','Comment / Review','写一个评论。','Viết một bình luận.','verb'],
    ['搜索','sōu suǒ','Tìm kiếm','Search','在网上搜索资料。','Tìm kiếm tài liệu trên mạng.','verb'],
  ]},
  { title:'Luận điểm & Quan điểm', title_zh:'观点与意见', level:'HSK3', order:30, words:[
    ['认为','rèn wéi','Cho rằng / Nghĩ rằng','Think / Believe','我认为这样做对。','Tôi cho rằng làm thế này là đúng.','verb'],
    ['觉得','jué de','Cảm thấy / Nghĩ','Feel / Think (personal)','我觉得很好。','Tôi cảm thấy rất tốt.','verb'],
    ['同意','tóng yì','Đồng ý','Agree','我同意你的看法。','Tôi đồng ý với quan điểm của bạn.','verb'],
    ['反对','fǎn duì','Phản đối','Oppose / Object','我反对这个决定。','Tôi phản đối quyết định này.','verb'],
    ['担心','dān xīn','Lo lắng / Lo ngại','Worry about','别担心，没问题。','Đừng lo lắng, không có vấn đề gì.','verb'],
    ['支持','zhī chí','Ủng hộ / Hỗ trợ','Support','我支持你。','Tôi ủng hộ bạn.','verb'],
    ['建议','jiàn yì','Đề xuất / Gợi ý','Suggest / Suggestion','我建议你休息。','Tôi đề nghị bạn nghỉ ngơi.','verb'],
    ['尝试','cháng shì','Thử / Cố thử','Try / Attempt','尝试新事物。','Thử những điều mới.','verb'],
    ['拒绝','jù jué','Từ chối','Refuse / Decline','他拒绝了邀请。','Anh ấy từ chối lời mời.','verb'],
    ['接受','jiē shòu','Nhận / Chấp nhận','Accept / Receive','接受新挑战。','Chấp nhận thử thách mới.','verb'],
    ['相信','xiāng xìn','Tin tưởng / Tin vào','Believe / Trust','我相信你。','Tôi tin tưởng bạn.','verb'],
    ['理解','lǐ jiě','Thông cảm / Hiểu','Understand / Comprehend','请理解我的想法。','Hãy thông cảm với suy nghĩ của tôi.','verb'],
  ]},
  { title:'Số lượng & Mức độ', title_zh:'数量与程度', level:'HSK3', order:31, words:[
    ['一共','yī gòng','Tất cả / Cộng lại','Altogether / In total','一共多少钱？','Tất cả bao nhiêu tiền?','adverb'],
    ['大约','dà yuē','Khoảng chừng / Ước chừng','About / Approximately','大约需要两小时。','Cần khoảng hai tiếng đồng hồ.','adverb'],
    ['至少','zhì shǎo','Ít nhất','At least','至少要三天。','Ít nhất cần ba ngày.','adverb'],
    ['最多','zuì duō','Nhiều nhất / Tối đa','At most / Maximum','最多十个人。','Tối đa mười người.','adverb'],
    ['公斤','gōng jīn','Kilogram (kg)','Kilogram','这个重五公斤。','Cái này nặng năm kilogram.','noun'],
    ['公里','gōng lǐ','Kilômét (km)','Kilometer','从这里到北京多少公里？','Từ đây đến Bắc Kinh mấy kilômét?','noun'],
    ['平方米','píng fāng mǐ','Mét vuông (m²)','Square meter','这个房间有三十平方米。','Căn phòng này có ba mươi mét vuông.','noun'],
    ['米','mǐ','Mét (đơn vị)','Meter','他身高一米八。','Anh ấy cao một mét tám.','noun'],
    ['厘米','lí mǐ','Centimét (cm)','Centimeter','差了两厘米。','Thiếu hai centimét.','noun'],
    ['半','bàn','Một nửa / Rưỡi','Half','半个小时。','Nửa tiếng đồng hồ.','other'],
    ['倍','bèi','Lần / Gấp','Times / Multiple','这里的价格是那里的两倍。','Giá ở đây gấp hai lần ở đó.','other'],
    ['以上','yǐ shàng','Trên / Hơn (số lượng)','Above / More than','十八岁以上才可以进。','Trên mười tám tuổi mới được vào.','other'],
  ]},
  { title:'Hành động & Trạng thái', title_zh:'动作与状态', level:'HSK3', order:32, words:[
    ['继续','jì xù','Tiếp tục','Continue','请继续说。','Hãy tiếp tục nói.','verb'],
    ['停止','tíng zhǐ','Dừng lại / Ngừng','Stop / Cease','停止争吵。','Ngừng cãi nhau.','verb'],
    ['改变','gǎi biàn','Thay đổi','Change','改变自己的习惯。','Thay đổi thói quen bản thân.','verb'],
    ['出现','chū xiàn','Xuất hiện','Appear / Emerge','问题出现了。','Vấn đề xuất hiện rồi.','verb'],
    ['消失','xiāo shī','Biến mất','Disappear','他突然消失了。','Anh ấy đột nhiên biến mất.','verb'],
    ['增加','zēng jiā','Tăng thêm / Tăng','Increase / Add','收入增加了。','Thu nhập tăng lên rồi.','verb'],
    ['减少','jiǎn shǎo','Giảm bớt / Giảm','Decrease / Reduce','减少浪费。','Giảm sự lãng phí.','verb'],
    ['提高','tí gāo','Nâng cao / Cải thiện','Improve / Raise','提高学习效率。','Nâng cao hiệu quả học tập.','verb'],
    ['降低','jiàng dī','Giảm xuống / Hạ thấp','Lower / Reduce','降低成本。','Giảm chi phí.','verb'],
    ['解决','jiě jué','Giải quyết','Solve / Resolve','解决问题。','Giải quyết vấn đề.','verb'],
    ['避免','bì miǎn','Tránh / Né tránh','Avoid','避免犯同样的错误。','Tránh mắc thêm lỗi tương tự.','verb'],
    ['注意','zhù yì','Chú ý / Để ý','Pay attention / Notice','注意安全！','Chú ý an toàn!','verb'],
  ]},
  { title:'Mô tả địa điểm & Không gian', title_zh:'描述地点与空间', level:'HSK3', order:33, words:[
    ['地方','dì fāng','Địa điểm / Nơi','Place / Location','这是一个美丽的地方。','Đây là một nơi đẹp.','noun'],
    ['地区','dì qū','Khu vực / Vùng','Area / Region','这个地区很发达。','Khu vực này rất phát triển.','noun'],
    ['范围','fàn wéi','Phạm vi','Scope / Range','工作范围很广。','Phạm vi công việc rất rộng.','noun'],
    ['空间','kōng jiān','Không gian','Space / Room','这里空间很大。','Không gian ở đây rất rộng.','noun'],
    ['位置','wèi zhì','Vị trí','Position / Location','你在什么位置？','Bạn đang ở vị trí nào?','noun'],
    ['区域','qū yù','Khu vực / Vùng','Zone / Area','这个区域禁止停车。','Khu vực này cấm đậu xe.','noun'],
    ['广场','guǎng chǎng','Quảng trường','Square / Plaza','天安门广场很大。','Quảng trường Thiên An Môn rất rộng.','noun'],
    ['公园','gōng yuán','Công viên','Park','周末去公园散步。','Cuối tuần đi công viên dạo bộ.','noun'],
    ['街道','jiē dào','Đường phố / Phố phường','Street / Road','这条街道很热闹。','Con đường phố này rất náo nhiệt.','noun'],
    ['角落','jiǎo luò','Góc khuất / Góc','Corner','坐在角落里。','Ngồi ở góc khuất.','noun'],
    ['周围','zhōu wéi','Xung quanh','Surroundings / Around','周围的环境很好。','Môi trường xung quanh rất tốt.','noun'],
    ['远处','yuǎn chù','Ở xa / Phía xa','In the distance / Far away','远处有座山。','Ở phía xa có một ngọn núi.','noun'],
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
          [lid,h,p,vi,en,exZh,exVi,'HSK3',type]);
        tW++;
      }
    }
    await conn.commit();
    const [[s]]=await conn.query(`SELECT COUNT(*) c FROM vocabulary v JOIN lessons l ON v.lesson_id=l.id WHERE l.hsk_level='HSK3'`);
    console.log(`\n✅ HSK3 Batch3: +${tL} bài, +${tW} từ → HSK3 tổng: ${s.c} từ`);
  } catch(e){await conn.rollback();console.error('❌',e.message);}
  finally{conn.release();process.exit(0);}
}
seed();
