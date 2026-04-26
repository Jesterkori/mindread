const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const authMiddleware = require('../middleware/auth');

// GET /api/user/results  — released results for the logged-in user
router.get('/results', authMiddleware, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ error: 'Access denied.' });
  }

  const result = await pool.query(
    `SELECT id, category, score, total, level, label, action, safety_flag,
            admin_notes, submitted_at, released_at
     FROM submissions
     WHERE user_id = $1 AND result_released = TRUE
     ORDER BY released_at DESC`,
    [req.user.id]
  );

  res.json({ ok: true, results: result.rows });
});

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  const result = await pool.query(
    `SELECT id, name, email, category, status, created_at FROM users WHERE id = $1`,
    [req.user.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'User not found.' });
  res.json({ ok: true, user: result.rows[0] });
});

module.exports = router;
