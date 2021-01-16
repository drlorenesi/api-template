const app = require('./app');
const chalk = require('chalk');
const pool = require('./startup/db');

const env = process.env.NODE_ENV.toUpperCase();
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(
    chalk.blue(`- Environment:`),
    chalk.magenta(`${env}`),
    chalk.blue(`\n- Server started on port:`),
    chalk.magenta(`${port}`)
  )
);

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
      console.log(chalk.red('Database error ->'), err.message);
      logger.error('DB Connection Error - %s at %s', err, new Date());
      return;
    }
  })();
}
