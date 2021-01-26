require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}
require('./startup/logger');
require('./startup/routes')(app);
require('./startup/config')();

// Export app for tests
module.exports = app;
