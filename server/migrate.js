const pool = require('./db');
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env') });

async function migrate() {
  await pool.query(`
    ALTER TABLE submissions
      ADD COLUMN IF NOT EXISTS ai_analysis TEXT;
  `);
  console.log('Migration complete.');
  await pool.end();
}

migrate().catch((err) => { console.error(err); process.exit(1); });
