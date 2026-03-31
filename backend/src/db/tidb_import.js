/**
 * TiDB Cloud Import Script
 * Chạy tất cả migrations và seed files lên TiDB
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 5,
});

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  // Split by ; but ignore inside strings  
  const statements = sql
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  let ok = 0, skip = 0;
  for (const stmt of statements) {
    try {
      await pool.query(stmt);
      ok++;
    } catch (e) {
      if (e.code === 'ER_TABLE_EXISTS_ERROR' || e.code === 'ER_DUP_ENTRY' || e.message.includes('Duplicate')) {
        skip++;
      } else if (e.message.includes('already exists')) {
        skip++;
      } else {
        console.warn(`  ⚠ ${e.message.substring(0, 80)}`);
      }
    }
  }
  console.log(`  ✓ ${ok} statements OK, ${skip} skipped (duplicate/exists)`);
}

async function runSeedFile(filePath) {
  // Dynamically require seed file — it uses the pool from connection.js
  // We need to override the pool temporarily
  try {
    delete require.cache[require.resolve('./connection.js')];
    // The seed files use connection.js, so we replace it
    require.cache[require.resolve('./connection.js')] = { 
      id: require.resolve('./connection.js'),
      filename: require.resolve('./connection.js'),
      loaded: true,
      exports: pool 
    };
    delete require.cache[require.resolve(filePath)];
    require(filePath);
    // Give it time to finish async operations
    await new Promise(r => setTimeout(r, 3000));
    console.log(`  ✓ Done`);
  } catch(e) {
    console.warn(`  ⚠ ${e.message.substring(0,100)}`);
  }
}

async function main() {
  console.log('🚀 Starting TiDB Cloud import...\n');

  // Test connection
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to TiDB Cloud!\n');
    conn.release();
  } catch(e) {
    console.error('❌ Connection failed:', e.message);
    process.exit(1);
  }

  const dbDir = __dirname;
  const migDir = path.join(dbDir, 'migrations');

  // ── Step 1: Run SQL migrations ──────────────────────────────
  console.log('📋 Step 1: Running SQL migrations...');
  const sqlFiles = ['001_init.sql', '002_more_content.sql'];
  for (const f of sqlFiles) {
    const fp = path.join(migDir, f);
    if (fs.existsSync(fp)) {
      console.log(`\n  Running ${f}...`);
      await runSqlFile(fp);
    }
  }

  // ── Step 2: Run seed files ───────────────────────────────────
  console.log('\n📦 Step 2: Running seed files...');
  const seedOrder = [
    'seed_hsk1_finish.js',
    'seed_hsk2_complete.js', 'seed_hsk2_final.js', 'seed_hsk2_finish.js', 'seed_finish_hsk23.js',
    'seed_hsk3.js', 'seed_hsk3_batch1.js', 'seed_hsk3_batch2.js', 'seed_hsk3_batch3.js',
    'seed_hsk3_batch4.js', 'seed_hsk3_batch5.js', 'seed_hsk3_final.js', 'fix_hsk3_final.js',
    'seed_hsk4.js', 'seed_hsk4_batch1.js', 'seed_hsk4_batch2.js', 'seed_hsk4_batch3.js',
    'seed_hsk4_batch4.js', 'seed_hsk4_batch5.js', 'seed_hsk4_batch6.js', 'seed_hsk4_batch7.js',
    'seed_hsk4_batch8.js', 'seed_hsk4_batch9.js', 'seed_hsk4_batch10.js',
    'seed_hsk4_50words.js', 'seed_hsk4_complete.js', 'seed_hsk4_final.js', 
    'seed_hsk4_finish.js', 'seed_hsk4_last87.js',
    'seed_hsk5.js', 'seed_hsk6.js',
    'seed_dialogues.js', 'seed_dialogues_batch2.js', 'seed_dialogues_batch3.js',
    'seed_dialogues_batch4.js', 'seed_dialogues_batch5.js', 'seed_dialogues_batch6.js',
    'seed_dialogues_batch7.js', 'seed_patch.js',
  ];

  for (const f of seedOrder) {
    const fp = path.join(dbDir, f);
    if (fs.existsSync(fp)) {
      process.stdout.write(`  [${seedOrder.indexOf(f)+1}/${seedOrder.length}] ${f}... `);
      await runSeedFile(fp);
    }
  }

  // ── Step 3: Verify ──────────────────────────────────────────
  console.log('\n🔍 Step 3: Checking data...');
  const [vocab] = await pool.query('SELECT hsk_level, COUNT(*) as cnt FROM vocabulary GROUP BY hsk_level ORDER BY hsk_level');
  const [dial] = await pool.query('SELECT COUNT(*) as cnt FROM dialogues');
  console.log('\nVocabulary counts:');
  vocab.forEach(r => console.log(`  ${r.hsk_level}: ${r.cnt} words`));
  console.log(`Dialogues: ${dial[0].cnt}`);

  console.log('\n✅ Import complete! TiDB Cloud is ready.');
  process.exit(0);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
