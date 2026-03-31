// migrate_dialogues.js — Tạo bảng dialogues và dialogue_lines
require('dotenv').config();
const pool = require('./connection');

async function migrate() {
  const conn = await pool.getConnection();
  try {
    // Bảng dialogues (Hội thoại & Đoạn văn)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS dialogues (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL COMMENT 'Tiêu đề (tiếng Việt)',
        title_zh VARCHAR(200) COMMENT 'Tiêu đề tiếng Trung',
        type ENUM('dialogue','passage') NOT NULL DEFAULT 'dialogue' COMMENT 'dialogue=hội thoại, passage=đoạn văn',
        hsk_level ENUM('HSK1','HSK2','HSK3','HSK4') NOT NULL,
        topic VARCHAR(100) COMMENT 'Chủ đề: greetings, shopping, travel...',
        description TEXT COMMENT 'Mô tả nội dung',
        difficulty ENUM('easy','medium','hard') DEFAULT 'easy',
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    console.log('✅ Bảng dialogues created');

    // Bảng dialogue_lines (từng dòng hội thoại / câu đoạn văn)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS dialogue_lines (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dialogue_id INT NOT NULL,
        line_order INT NOT NULL DEFAULT 0,
        speaker VARCHAR(50) COMMENT 'Tên nhân vật (A, B, Narrator...)',
        speaker_role VARCHAR(100) COMMENT 'Vai trò: Sinh viên, Giáo viên...',
        text_zh TEXT NOT NULL COMMENT 'Câu tiếng Trung',
        pinyin TEXT COMMENT 'Phiên âm pinyin',
        text_vi TEXT NOT NULL COMMENT 'Dịch tiếng Việt',
        notes TEXT COMMENT 'Ghi chú ngữ pháp',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dialogue_id) REFERENCES dialogues(id) ON DELETE CASCADE,
        INDEX idx_dialogue_order (dialogue_id, line_order)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    console.log('✅ Bảng dialogue_lines created');
    console.log('\n✅ Migration hoàn tất!');
  } catch(e){ console.error('❌', e.message); }
  finally{ conn.release(); process.exit(0); }
}
migrate();
