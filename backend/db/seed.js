require('dotenv').config();
const pool = require('./connection');
const bcrypt = require('bcrypt');

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Creating tables...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(255) NOT NULL,
        email         VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        category      VARCHAR(100) NOT NULL,
        status        VARCHAR(50)  NOT NULL DEFAULT 'otp_pending',
        created_at    TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS otp_verifications (
        id         SERIAL PRIMARY KEY,
        email      VARCHAR(255) NOT NULL,
        otp        VARCHAR(6)   NOT NULL,
        expires_at TIMESTAMP    NOT NULL,
        used       BOOLEAN      NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP    NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_users (
        id            SERIAL PRIMARY KEY,
        email         VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at    TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id              SERIAL PRIMARY KEY,
        user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
        category        VARCHAR(100) NOT NULL,
        answers         JSONB        NOT NULL,
        score           INTEGER,
        total           INTEGER,
        level           VARCHAR(50),
        label           VARCHAR(100),
        action          TEXT,
        safety_flag     BOOLEAN NOT NULL DEFAULT FALSE,
        submitted_at    TIMESTAMP NOT NULL DEFAULT NOW(),
        result_released BOOLEAN NOT NULL DEFAULT FALSE,
        admin_notes     TEXT,
        released_at     TIMESTAMP
      );
    `);

    console.log('Tables created.');

    // Seed admin account
    const adminEmail = 'admin@gmail.com';
    const adminHash = await bcrypt.hash('admin123', 10);
    await client.query(
      `INSERT INTO admin_users (email, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [adminEmail, adminHash]
    );
    console.log(`Admin seeded → email: ${adminEmail}  password: admin123`);

    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
