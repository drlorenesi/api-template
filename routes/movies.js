// Open Route
const express = require('express');
const router = express.Router();
const Joi = require('joi');
// const auth = require('../middleware/auth');
const restrict = require('../middleware/restrict');
const validate = require('../middleware/validate');
const db = require('../startup/db');

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    numberInStock: Joi.number().integer().min(0).required(),
    dailyRentalRate: Joi.number().precision(2).required(),
    genreId: Joi.number().required(),
  });
  return schema.validate(movie);
};

router.get('/', [], async (req, res) => {
  const result = await db.query('SELECT * FROM show_movies');
  res.send(result.rows);
});

router.get('/:id', [], async (req, res) => {
  // Search for movie
  const search = await db.query(
    'SELECT * FROM show_movies WHERE movie_id = $1',
    [req.params.id]
  );
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The movie with the given Id ${req.params.id} was not found.`);
  res.send(search.rows[0]);
});

router.put('/:id', [validate(validateMovie)], async (req, res) => {
  const search = await db.query('SELECT * FROM movies WHERE movie_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The movie with the given Id ${req.params.id} was not found.`);
  const { title, numberInStock, dailyRentalRate, genreId } = req.body;
  const result = await db.query(
    `UPDATE movies 
      SET title=$1, number_in_stock=$2, daily_rental_rate=$3, genre_id=$4
    WHERE movie_id=$5 RETURNING *`,
    [title, numberInStock, dailyRentalRate, genreId, req.params.id]
  );
  res.status(200).send(result.rows[0]);
});

router.post('/', [validate(validateMovie)], async (req, res) => {
  const { title, numberInStock, dailyRentalRate, genreId } = req.body;
  const result = await db.query(
    `INSERT INTO movies (title, number_in_stock, daily_rental_rate, genre_id) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, numberInStock, dailyRentalRate, genreId]
  );
  res.status(201).send(result.rows[0]);
});

router.delete('/:id', [], async (req, res) => {
  const search = await db.query('SELECT * FROM movies WHERE movie_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The movie with the given Id ${req.params.id} was not found.`);
  const result = await db.query(
    'DELETE FROM movies WHERE movie_id = $1 RETURNING *',
    [req.params.id]
  );
  res.status(200).send(result.rows[0]);
});

module.exports = router;
