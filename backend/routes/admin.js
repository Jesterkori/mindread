const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const adminAuth = require('../middleware/adminAuth');
const { sendApprovalEmail, sendDeclineEmail, sendResultEmail } = require('../utils/mailer');

// GET /api/admin/pending-users
router.get('/pending-users', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT id, name, email, category, created_at
     FROM users
     WHERE status = 'admin_pending'
     ORDER BY created_at ASC`
  );
  res.json({ ok: true, users: result.rows });
});

// POST /api/admin/approve-user/:id
router.post('/approve-user/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `UPDATE users SET status = 'approved' WHERE id = $1 AND status = 'admin_pending'
     RETURNING name, email`,
    [id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found or already processed.' });
  }
  const { name, email } = result.rows[0];
  try { await sendApprovalEmail(email, name); } catch (e) { console.error('Mail error:', e.message); }
  res.json({ ok: true, message: `${name} approved.` });
});

// POST /api/admin/decline-user/:id
router.post('/decline-user/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const result = await pool.query(
    `UPDATE users SET status = 'declined' WHERE id = $1 AND status = 'admin_pending'
     RETURNING name, email`,
    [id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found or already processed.' });
  }
  const { name, email } = result.rows[0];
  try { await sendDeclineEmail(email, name, reason); } catch (e) { console.error('Mail error:', e.message); }
  res.json({ ok: true, message: `${name} declined.` });
});

// GET /api/admin/submissions  — all submissions with user info
router.get('/submissions', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT s.id, s.category, s.answers, s.score, s.total, s.level, s.label, s.action,
            s.safety_flag, s.submitted_at, s.result_released, s.admin_notes, s.released_at,
            u.id AS user_id, u.name AS user_name, u.email AS user_email
     FROM submissions s
     JOIN users u ON s.user_id = u.id
     ORDER BY s.safety_flag DESC, s.submitted_at DESC`
  );
  res.json({ ok: true, submissions: result.rows });
});

// GET /api/admin/submission/:id  — full details incl. answers
router.get('/submission/:id', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT s.*, u.name AS user_name, u.email AS user_email, u.category AS user_category
     FROM submissions s
     JOIN users u ON s.user_id = u.id
     WHERE s.id = $1`,
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Submission not found.' });
  res.json({ ok: true, submission: result.rows[0] });
});

// POST /api/admin/release-result/:id
router.post('/release-result/:id', adminAuth, async (req, res) => {
  const { adminNotes } = req.body;
  const result = await pool.query(
    `UPDATE submissions
     SET result_released = TRUE, admin_notes = $1, released_at = NOW()
     WHERE id = $2 AND result_released = FALSE
     RETURNING level, label, user_id`,
    [adminNotes || null, req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Submission not found or already released.' });
  }

  // Notify user by email
  const { user_id, label } = result.rows[0];
  const userRes = await pool.query(`SELECT name, email FROM users WHERE id = $1`, [user_id]);
  if (userRes.rows.length > 0) {
    const { name, email } = userRes.rows[0];
    try { await sendResultEmail(email, name, label, adminNotes); } catch (e) { console.error('Mail error:', e.message); }
  }

  res.json({ ok: true, message: 'Result released to user.' });
});

// GET /api/admin/stats
router.get('/stats', adminAuth, async (req, res) => {
  const [pending, submissions, safetyFlags] = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM users WHERE status = 'admin_pending'`),
    pool.query(`SELECT COUNT(*) FROM submissions`),
    pool.query(`SELECT COUNT(*) FROM submissions WHERE safety_flag = TRUE AND result_released = FALSE`),
  ]);
  res.json({
    ok: true,
    pendingUsers: parseInt(pending.rows[0].count),
    totalSubmissions: parseInt(submissions.rows[0].count),
    unreviewedSafetyFlags: parseInt(safetyFlags.rows[0].count),
  });
});

module.exports = router;
