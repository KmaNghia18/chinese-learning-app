/**
 * Run SQL migrations on TiDB Cloud
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
  console.log('Connecting to TiDB...');
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true,
  });
  console.log('Connected!\n');

  const migDir = path.join(__dirname, 'migrations');
  const sqlFiles = fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort();

  for (const file of sqlFiles) {
    console.log(`Running ${file}...`);
    let sql = fs.readFileSync(path.join(migDir, file), 'utf8');
    // Remove BOM
    sql = sql.replace(/^\uFEFF/, '');
    try {
      await conn.query(sql);
      console.log(`  ✓ Done\n`);
    } catch(e) {
      if (e.message.includes('already exists') || e.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log(`  ✓ Tables already exist, skipping\n`);
      } else {
        console.warn(`  ⚠ ${e.message}\n`);
      }
    }
  }

  // Check tables created
  const [tables] = await conn.query('SHOW TABLES');
  console.log('Tables created:', tables.map(r => Object.values(r)[0]).join(', '));
  
  await conn.end();
  console.log('\nMigration complete!');
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
