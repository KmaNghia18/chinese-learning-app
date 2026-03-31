const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppass123',
  database: process.env.DB_NAME || 'chinese_learning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  // SSL cho cloud MySQL (TiDB, PlanetScale...) — tắt khi dev local
  ...(process.env.DB_SSL === 'true' && {
    ssl: { rejectUnauthorized: false }
  }),
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;
