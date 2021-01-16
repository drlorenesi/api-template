require('dotenv').config();
const express = require('express');

const app = express();

if (app.get('env') === 'production') {
  require('./startup/prod')(app);
}

require('./startup/logger');
require('./startup/routes')(app);
require('./startup/config')();

// Export app for tests
module.exports = app;
