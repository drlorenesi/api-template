const app = require('./app');
const chalk = require('chalk');

const env = app.get('env').toUpperCase();
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(
    chalk.blue(`- Environment:`),
    chalk.magenta(`${env}`),
    chalk.blue(`\n- Server started on port:`),
    chalk.magenta(`${port}`)
  )
);
