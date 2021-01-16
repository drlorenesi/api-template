const app = require('../app');
const logger = require('./logger');
const chalk = require('chalk');
const { Pool } = require('pg');

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

if (app.get('env') === 'development') {
  // Test connection
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
      console.log(chalk.red('Database error ->'), err.message);
      logger.error('DB Connection Error - %s at %s', err, new Date());
      return;
    }
  })();
}

module.exports = pool;
