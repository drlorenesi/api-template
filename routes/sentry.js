const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  throw new Error(`Sentry error:  ${JSON.parse(JSON.stringify(new Date()))}`);
});

module.exports = router;
