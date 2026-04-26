const pool   = require('./db');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env') });

async function main() {
  const email    = 'admin@mindcheck.com';
  const password = 'admin123';
  const hashed   = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (name, email, password, category, role, status, email_verified)
     VALUES ($1, $2, $3, 'student', 'admin', 'approved', TRUE)
     ON CONFLICT (email) DO NOTHING`,
    ['Admin', email, hashed]
  );

  console.log(`Admin created — email: ${email}  password: ${password}`);
  await pool.end();
}

main().catch((err) => { console.error(err); process.exit(1); });
