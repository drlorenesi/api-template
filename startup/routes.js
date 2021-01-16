// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const bugs = require('../routes/bugs');
// Error middleware
const error = require('../middleware/error');

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  app.use(express.static('public'));
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  // Routes
  app.use('/api/bugs', bugs);
  // Error middleware
  app.use(error);
};
