// Express
const express = require('express');
const router = express.Router();

// Home Route
// ----------
router.get('/', (req, res) => {
  res.send('It works!');
});

module.exports = router;
