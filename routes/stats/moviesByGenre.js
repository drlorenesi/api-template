// Open Route
const express = require('express');
const router = express.Router();
const db = require('../../startup/db');

router.get('/', [], async (req, res) => {
  const result = await db.query('SELECT * FROM movies_by_genre');
  res.send(result.rows);
});

module.exports = router;
