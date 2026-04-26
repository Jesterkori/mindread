const express  = require('express');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool     = require('./db');
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// ── Email transporter ─────────────────────────────────────────────────────────
const emailConfigured = process.env.SMTP_USER && process.env.SMTP_USER !== 'your@gmail.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

async function sendOtp(email, otp) {
  if (!emailConfigured) {
    console.log(`[DEV] OTP for ${email}: ${otp}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'MindCheck — Your verification code',
    text: `Your MindCheck verification code is: ${otp}\n\nThis code expires in 15 minutes.`,
    html: `<p>Your MindCheck verification code is:</p><h2>${otp}</h2><p>This code expires in 15 minutes.</p>`,
  });
}

function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ── Auth middleware ───────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function adminAuth(req, res, next) {
  auth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  });
}

// ── POST /api/auth/register ───────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, category, captchaToken } = req.body;
  if (!name || !email || !password || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Verify reCAPTCHA (skipped if no real secret is configured)
  const captchaSecret = process.env.RECAPTCHA_SECRET;
  if (captchaSecret && captchaSecret !== 'your_recaptcha_secret') {
    try {
      const captchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captchaToken}`,
        { method: 'POST' }
      );
      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return res.status(400).json({ error: 'CAPTCHA verification failed.' });
      }
    } catch {
      return res.status(500).json({ error: 'Could not verify CAPTCHA.' });
    }
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = makeOtp();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      `INSERT INTO users (name, email, password, category, otp, otp_expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, hashed, category, otp, otpExpires]
    );

    await sendOtp(email, otp);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/auth/verify-otp ─────────────────────────────────────────────────
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, otp, otp_expires_at FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found.' });

    const user = result.rows[0];
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid code.' });
    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ error: 'Code has expired. Please request a new one.' });
    }

    await pool.query(
      'UPDATE users SET email_verified = TRUE, otp = NULL, otp_expires_at = NULL WHERE id = $1',
      [user.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/auth/resend-otp ─────────────────────────────────────────────────
app.post('/api/auth/resend-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found.' });

    const otp = makeOtp();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await pool.query(
      'UPDATE users SET otp = $1, otp_expires_at = $2 WHERE email = $3',
      [otp, otpExpires, email]
    );
    await sendOtp(email, otp);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    const user = result.rows[0];

    if (!user.email_verified) {
      return res.status(400).json({ error: 'Please verify your email first.' });
    }
    if (user.status === 'pending') {
      return res.status(400).json({ error: 'Your account is pending admin approval.' });
    }
    if (user.status === 'declined') {
      return res.status(400).json({ error: 'Your account registration was declined.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password.' });

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role, category: user.category };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── Gemini analysis helper ────────────────────────────────────────────────────
async function generateAnalysis(categoryLabel, answers, questions) {
  const answerLabels = { A: 'Rarely or Never', B: 'Sometimes', C: 'Often', D: 'Almost Always' };
  const answersText = questions.map((q) =>
    `Q${q.id} [${q.part}]: "${q.text}"\n  Answer: ${answers[q.id]} — ${answerLabels[answers[q.id]]}\n  Indicator: ${q.indicator}`
  ).join('\n\n');
  const safetyFlag = questions.some((q) => (q.safetyQuestion || q.safety_question) && (answers[q.id] === 'C' || answers[q.id] === 'D'));

  const systemPrompt = `You are a compassionate, professional mental health screening assistant. You interpret questionnaire results following this scoring framework:
- Mostly A's & B's: Healthy coping — normal ups and downs, good coping skills.
- Mix of B's & C's: Moderate stress — struggling in certain areas, may need support.
- Mostly C's & D's: High distress / clinical concern — significant challenges, professional help recommended.
- Safety override: If a safety question is answered C or D, address this FIRST and PROMINENTLY before anything else.

Write warmly and in second person ("you"). Be honest but compassionate. Reference specific patterns from the actual answers rather than giving generic advice.`;

  const userPrompt = `Category: ${categoryLabel}

${safetyFlag ? '⚠️ SAFETY FLAG ACTIVE: The user answered C or D to a critical safety question. Address this urgently and prominently as the FIRST thing in your response.\n\n' : ''}User's responses:
${answersText}

Write a 3–4 paragraph personalized mental health assessment that:
1. ${safetyFlag ? 'FIRST: Urgently and clearly addresses the safety concern and recommends immediate professional help.' : 'Opens by acknowledging the overall pattern you see in their responses.'}
2. Highlights the 2–3 most significant areas of concern based on their specific answers (name the actual patterns, e.g. sleep, social withdrawal, academic stress).
3. States the assessment level (Healthy Coping / Moderate Stress / High Distress) and explains why based on their answer pattern.
4. Gives specific, actionable next steps tailored to their situation.

Do NOT use bullet points. Write in flowing paragraphs. Keep the tone warm, non-judgmental, and empowering.`;

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: { maxOutputTokens: 900, temperature: 0.7 },
      }),
    }
  );
  const geminiData = await geminiRes.json();
  const analysis = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!analysis) throw new Error('Empty response from Gemini');
  return analysis;
}

// ── POST /api/questionnaire/submit ────────────────────────────────────────────
app.post('/api/questionnaire/submit', auth, async (req, res) => {
  const { category, categoryLabel, answers, questions, score, total, level, label, action, safety_flag } = req.body;
  try {
    const userResult = await pool.query('SELECT name, email FROM users WHERE id = $1', [req.user.id]);
    const { name, email } = userResult.rows[0];

    const insertRes = await pool.query(
      `INSERT INTO submissions
        (user_id, user_name, user_email, category, answers, score, total, level, label, action, safety_flag)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
      [req.user.id, name, email, category, JSON.stringify(answers), score, total, level, label, action, safety_flag || false]
    );
    const submissionId = insertRes.rows[0].id;
    res.json({ ok: true });

    // Generate AI analysis in the background and store it
    if (questions && categoryLabel) {
      generateAnalysis(categoryLabel, answers, questions)
        .then((analysis) =>
          pool.query(`UPDATE submissions SET ai_analysis = $1 WHERE id = $2`, [analysis, submissionId])
        )
        .catch((err) => console.error('Gemini background error:', err.message));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/user/results ─────────────────────────────────────────────────────
app.get('/api/user/results', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, category, score, total, level, label, action, ai_analysis, safety_flag, admin_notes, released_at, submitted_at
       FROM submissions
       WHERE user_id = $1 AND result_released = TRUE
       ORDER BY released_at DESC`,
      [req.user.id]
    );
    res.json({ ok: true, results: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── GET /api/admin/pending-users ──────────────────────────────────────────────
app.get('/api/admin/pending-users', adminAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, category, created_at
       FROM users WHERE status = 'pending' AND email_verified = TRUE
       ORDER BY created_at ASC`
    );
    res.json({ ok: true, users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── GET /api/admin/submissions ────────────────────────────────────────────────
app.get('/api/admin/submissions', adminAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, user_name, user_email, category, answers, score, total,
              level, label, action, safety_flag, ai_analysis, result_released, admin_notes, released_at, submitted_at
       FROM submissions
       ORDER BY safety_flag DESC, submitted_at DESC`
    );
    res.json({ ok: true, submissions: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── GET /api/admin/stats ──────────────────────────────────────────────────────
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const [pendingRes, totalRes, flagRes] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM users WHERE status = 'pending' AND email_verified = TRUE`),
      pool.query(`SELECT COUNT(*) FROM submissions`),
      pool.query(`SELECT COUNT(*) FROM submissions WHERE safety_flag = TRUE AND result_released = FALSE`),
    ]);
    res.json({
      ok: true,
      pendingUsers:           Number(pendingRes.rows[0].count),
      totalSubmissions:       Number(totalRes.rows[0].count),
      unreviewedSafetyFlags:  Number(flagRes.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── POST /api/admin/approve-user/:id ─────────────────────────────────────────
app.post('/api/admin/approve-user/:id', adminAuth, async (req, res) => {
  try {
    await pool.query(`UPDATE users SET status = 'approved' WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── POST /api/admin/decline-user/:id ─────────────────────────────────────────
app.post('/api/admin/decline-user/:id', adminAuth, async (req, res) => {
  try {
    await pool.query(`UPDATE users SET status = 'declined' WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── POST /api/admin/release-result/:id ───────────────────────────────────────
app.post('/api/admin/release-result/:id', adminAuth, async (req, res) => {
  const { adminNotes, aiAnalysis, action } = req.body;
  try {
    await pool.query(
      `UPDATE submissions
       SET result_released = TRUE,
           admin_notes = $1,
           ai_analysis = $2,
           action      = COALESCE($3, action),
           released_at = NOW()
       WHERE id = $4`,
      [adminNotes || null, aiAnalysis ?? null, action ?? null, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});


// ── GET /api/questions/:category ─────────────────────────────────────────────
app.get('/api/questions/:category', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, category_id, sort_order, part, text, indicator, reversed, safety_question
       FROM questions WHERE category_id = $1 AND active = TRUE
       ORDER BY sort_order ASC`,
      [req.params.category]
    );
    res.json({ ok: true, questions: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── GET /api/admin/questions ──────────────────────────────────────────────────
app.get('/api/admin/questions', adminAuth, async (req, res) => {
  const { category } = req.query;
  try {
    const result = category
      ? await pool.query(
          `SELECT * FROM questions WHERE category_id = $1 ORDER BY sort_order ASC`,
          [category]
        )
      : await pool.query(`SELECT * FROM questions ORDER BY category_id, sort_order ASC`);
    res.json({ ok: true, questions: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── POST /api/admin/questions ─────────────────────────────────────────────────
app.post('/api/admin/questions', adminAuth, async (req, res) => {
  const { category_id, part, text, indicator, reversed = false, safety_question = false } = req.body;
  if (!category_id || !part || !text || !indicator) {
    return res.status(400).json({ error: 'category_id, part, text, and indicator are required.' });
  }
  try {
    const maxOrder = await pool.query(
      `SELECT COALESCE(MAX(sort_order), 0) AS max FROM questions WHERE category_id = $1`,
      [category_id]
    );
    const sort_order = maxOrder.rows[0].max + 1;
    const result = await pool.query(
      `INSERT INTO questions (category_id, sort_order, part, text, indicator, reversed, safety_question)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [category_id, sort_order, part, text, indicator, reversed, safety_question]
    );
    res.json({ ok: true, question: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── PUT /api/admin/questions/:id ──────────────────────────────────────────────
app.put('/api/admin/questions/:id', adminAuth, async (req, res) => {
  const { part, text, indicator, reversed, safety_question, sort_order, active } = req.body;
  try {
    const result = await pool.query(
      `UPDATE questions
       SET part = COALESCE($1, part),
           text = COALESCE($2, text),
           indicator = COALESCE($3, indicator),
           reversed = COALESCE($4, reversed),
           safety_question = COALESCE($5, safety_question),
           sort_order = COALESCE($6, sort_order),
           active = COALESCE($7, active)
       WHERE id = $8 RETURNING *`,
      [part, text, indicator, reversed, safety_question, sort_order, active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Question not found.' });
    res.json({ ok: true, question: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── DELETE /api/admin/questions/:id ──────────────────────────────────────────
app.delete('/api/admin/questions/:id', adminAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM questions WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── POST /api/admin/questions/seed ────────────────────────────────────────────
app.post('/api/admin/questions/seed', adminAuth, async (req, res) => {
  const { category } = req.body;
  const defaultQuestions = require('./defaultQuestions');
  const categories = category ? [category] : Object.keys(defaultQuestions);
  try {
    for (const cat of categories) {
      const qs = defaultQuestions[cat];
      if (!qs) continue;
      await pool.query(`DELETE FROM questions WHERE category_id = $1`, [cat]);
      for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        await pool.query(
          `INSERT INTO questions (category_id, sort_order, part, text, indicator, reversed, safety_question)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [cat, i + 1, q.part, q.text, q.indicator, q.reversed ?? false, q.safetyQuestion ?? false]
        );
      }
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
