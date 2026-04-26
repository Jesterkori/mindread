const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const authMiddleware = require('../middleware/auth');

// POST /api/questionnaire/submit
router.post('/submit', authMiddleware, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ error: 'Only users can submit assessments.' });
  }

  const { category, answers, score, total, level, label, action, safety_flag } = req.body;

  if (!category || !answers) {
    return res.status(400).json({ error: 'Category and answers are required.' });
  }

  await pool.query(
    `INSERT INTO submissions (user_id, category, answers, score, total, level, label, action, safety_flag)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      req.user.id,
      category,
      JSON.stringify(answers),
      score ?? null,
      total ?? null,
      level ?? null,
      label ?? null,
      action ?? null,
      safety_flag ?? false,
    ]
  );

  res.json({ ok: true, message: 'Assessment submitted. Results will be reviewed and released soon.' });
});

module.exports = router;
