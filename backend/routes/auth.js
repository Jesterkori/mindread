const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const pool = require('../db/connection');
const { sendOTP } = require('../utils/mailer');

function makeOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, category, captchaToken } = req.body;

  if (!name || !email || !password || !category || !captchaToken) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Verify reCAPTCHA
  try {
    const captchaRes = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );
    if (!captchaRes.data.success) {
      return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
    }
  } catch {
    return res.status(500).json({ error: 'Could not verify CAPTCHA.' });
  }

  // Check duplicate email (check both users and pending otp_pending users)
  const existing = await pool.query(
    'SELECT id FROM users WHERE LOWER(email) = LOWER($1)',
    [email]
  );
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user as otp_pending
  await pool.query(
    `INSERT INTO users (name, email, password_hash, category, status)
     VALUES ($1, $2, $3, $4, 'otp_pending')`,
    [name.trim(), email.toLowerCase().trim(), passwordHash, category]
  );

  // Invalidate old OTPs for this email
  await pool.query(
    `UPDATE otp_verifications SET used = TRUE WHERE email = LOWER($1)`,
    [email]
  );

  // Generate and store OTP
  const otp = makeOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await pool.query(
    `INSERT INTO otp_verifications (email, otp, expires_at) VALUES (LOWER($1), $2, $3)`,
    [email, otp, expiresAt]
  );

  // Send email
  try {
    await sendOTP(email, otp);
  } catch (err) {
    console.error('Mail error:', err.message);
    // Don't fail the request — user can resend
  }

  res.json({ ok: true, message: 'OTP sent to your email.' });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required.' });

  const result = await pool.query(
    `SELECT * FROM otp_verifications
     WHERE LOWER(email) = LOWER($1)
       AND otp = $2
       AND used = FALSE
       AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`,
    [email, otp]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }

  // Mark OTP used
  await pool.query(`UPDATE otp_verifications SET used = TRUE WHERE id = $1`, [result.rows[0].id]);

  // Advance user to admin_pending
  await pool.query(
    `UPDATE users SET status = 'admin_pending' WHERE LOWER(email) = LOWER($1) AND status = 'otp_pending'`,
    [email]
  );

  res.json({ ok: true, message: 'Email verified. Your account is pending admin approval.' });
});

// POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const user = await pool.query(
    `SELECT id FROM users WHERE LOWER(email) = LOWER($1) AND status = 'otp_pending'`,
    [email]
  );
  if (user.rows.length === 0) {
    return res.status(400).json({ error: 'No pending registration found for this email.' });
  }

  // Invalidate old OTPs
  await pool.query(`UPDATE otp_verifications SET used = TRUE WHERE LOWER(email) = LOWER($1)`, [email]);

  const otp = makeOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await pool.query(
    `INSERT INTO otp_verifications (email, otp, expires_at) VALUES (LOWER($1), $2, $3)`,
    [email, otp, expiresAt]
  );

  try {
    await sendOTP(email, otp);
  } catch (err) {
    console.error('Mail error:', err.message);
    return res.status(500).json({ error: 'Failed to send OTP email. Please try again.' });
  }

  res.json({ ok: true, message: 'New OTP sent.' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  // Check admin table first
  const adminResult = await pool.query(
    `SELECT * FROM admin_users WHERE LOWER(email) = LOWER($1)`,
    [email]
  );
  if (adminResult.rows.length > 0) {
    const admin = adminResult.rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    return res.json({
      ok: true,
      token,
      user: { id: admin.id, email: admin.email, role: 'admin', name: 'Admin' },
    });
  }

  // Check users table
  const userResult = await pool.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`,
    [email]
  );
  if (userResult.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const user = userResult.rows[0];

  if (user.status === 'otp_pending') {
    return res.status(403).json({ error: 'Please verify your email first. Check your inbox for the OTP.' });
  }
  if (user.status === 'admin_pending') {
    return res.status(403).json({ error: 'Your account is awaiting admin approval. You will be notified by email.' });
  }
  if (user.status === 'declined') {
    return res.status(403).json({ error: 'Your registration was not approved. Please contact support.' });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid email or password.' });

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, category: user.category, role: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    ok: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, category: user.category, role: 'user' },
  });
});

module.exports = router;
