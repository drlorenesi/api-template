const logger = require('../startup/logger');
const debugDB = require('debug')('app:db');
const chalk = require('chalk');

module.exports = (error, req, res, next) => {
  debugDB(chalk.red('Database error:'), error.message);
  logger.error('API Error - %s at %s', error, new Date());
  res
    .status(500)
    .send(
      'The server encountered an error and could not complete your request.'
    );
};
