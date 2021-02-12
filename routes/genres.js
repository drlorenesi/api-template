// Open Route
const express = require('express');
const router = express.Router();
// const Joi = require('joi');
// const auth = require('../middleware/auth');
// const restrict = require('../middleware/restrict');
// const validate = require('../middleware/validate');
const db = require('../startup/db');

router.get('/', [], async (req, res) => {
  const result = await db.query('SELECT * FROM genres');
  res.send(result.rows);
});

router.get('/:id', [], async (req, res) => {
  // Search for a genre
  const search = await db.query('SELECT * FROM genres WHERE genre_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The genre with the given Id ${req.params.id} was not found.`);
  res.send(search.rows[0]);
});

module.exports = router;
