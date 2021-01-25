const { Pool } = require('pg');
const debugDB = require('debug')('app:db');
const chalk = require('chalk');

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test Database connection
if (process.env.NODE_ENV === 'development') {
  (async function () {
    try {
      const db = await pool.connect();
      console.log(
        chalk.blue('- Connected to'),
        chalk.magenta(db.database),
        chalk.blue('on'),
        chalk.magenta(db.host)
      );
      db.release(true);
    } catch (err) {
      console.log(chalk.red('- Database error: '), err.message);
      return;
    }
  })();
}

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    debugDB(`Affected rows: ${res.rowCount}, duration: ${duration}`);
    return res;
  },
};
