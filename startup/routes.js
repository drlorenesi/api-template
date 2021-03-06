// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Routes
const bugs = require('../routes/bugs');
const register = require('../routes/register');
const auth = require('../routes/auth');
const users = require('../routes/users');
const movies = require('../routes/movies');
const genres = require('../routes/genres');
const dates = require('../routes/dates');
// Stats
const moviesByGenre = require('../routes/stats/moviesByGenre');
// Error middleware
const error = require('../middleware/error');

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  app.use(express.static('public'));
  app.use(cors());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  // Routes
  app.use('/api/bugs', bugs);
  app.use('/api/register', register);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/movies', movies);
  app.use('/api/genres', genres);
  app.use('/api/dates', dates);
  // Stats
  app.use('/api/stats/moviesbygenre', moviesByGenre);
  // Error middleware
  app.use(error);
};
