const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/auth');

// Save result
router.post('/', verifyToken, async (req, res) => {
  const { category, score, distress_level, safety_flag } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO results (user_id, category, score, distress_level, safety_flag) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, category, score, distress_level, safety_flag || false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's results
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM results WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
