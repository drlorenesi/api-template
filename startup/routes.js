// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const bugs = require('../routes/bugs');
const register = require('../routes/register');
const login = require('../routes/login');
const users = require('../routes/users');
const movies = require('../routes/movies');
const sentry = require('../routes/sentry');
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
  app.use('/api/register', register);
  app.use('/api/login', login);
  app.use('/api/users', users);
  app.use('/api/movies', movies);
  app.use('/api/sentry', sentry);
  // Error middleware
  app.use(error);
};
