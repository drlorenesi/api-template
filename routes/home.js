// Express
const express = require("express");
const router = express.Router();
const pool = require("../startup/db");

// Home Route
// ----------
router.get("/", async (req, res) => {
  const time = await pool.query("SELECT NOW()");
  res.status(200).send(time.rows);
});

module.exports = router;
