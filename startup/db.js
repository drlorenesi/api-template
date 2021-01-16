const { Pool } = require('pg');

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
