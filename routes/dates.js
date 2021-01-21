// Open Route
const express = require('express');
const moment = require('moment');
const db = require('../startup/db');
const router = express.Router();

// GET
router.get('/', [], async (req, res) => {
  let f_ini = req.query.f_ini || moment().startOf('month').format();
  let f_fin = req.query.f_fin || moment().format();
  const { rows } = await db.query('SELECT CURRENT_TIMESTAMP');
  res.json({ startDate: f_ini, endDate: f_fin, current: rows[0] });
});

module.exports = router;
