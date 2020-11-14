// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const home = require('../routes/home');
// Error middleware
const error = require('../middleware/error');

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  // Routes
  app.use('/', home);
  // Error middleware
  app.use(error);
};
