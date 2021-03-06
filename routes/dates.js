const express = require('express');
const router = express.Router();
const { startOfMonth, today } = require('../utils/generateDate');
const db = require('../startup/db');

// Route for testing dates
// http://localhost:9000/api/dates?begin_date=2021-02-01&end_date=2021-02-03
router.get('/', async (req, res) => {
  let { begin_date, end_date } = req.query;
  const result = await db.query(`SELECT $1 AS start, $2 AS end`, [
    startOfMonth(begin_date),
    today(end_date),
  ]);
  res.send(result.rows);
});

module.exports = router;
