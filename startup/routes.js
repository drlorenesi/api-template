// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const bugs = require('../routes/bugs');
const movies = require('../routes/movies');
const dates = require('../routes/dates');
const register = require('../routes/register');
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
  app.use('/api/movies', movies);
  app.use('/api/dates', dates);
  app.use('/api/register', register);
  // Error middleware
  app.use(error);
};
