// Open Route
const express = require('express');
const Joi = require('joi');
const chalk = require('chalk');
const validate = require('../middleware/validate');
const debugDB = require('debug')('app:db');
const db = require('../startup/db');
const router = express.Router();

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string()
      .regex(/^[a-zA-Z\p{L} /'.-]{2,45}$/u)
      .required(),
    numberInStock: Joi.number().integer().min(0).required(),
    dailyRentalRate: Joi.number().precision(2).required(),
    genreId: Joi.number().required(),
  });
  return schema.validate(movie);
};

// GET
router.get('/', [], async (req, res) => {
  const { rows } = await db.query('SELECT * FROM movies');
  res.send(rows);
});
router.get('/:id', [], async (req, res) => {
  const { rows } = await db.query('SELECT * FROM movies WHERE movie_id = $1', [
    req.params.id,
  ]);
  if (rows.length === 0)
    return res
      .status(404)
      .send(`The movie with the given Id ${req.params.id} was not found.`);
  res.send(rows[0]);
});
// PUT
router.put('/:id', [validate(validateMovie)], async (req, res) => {
  const result1 = await db.query('SELECT * FROM movies WHERE movie_id = $1', [
    req.params.id,
  ]);
  if (result1.rows.length === 0)
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
  debugDB(chalk.blue(`Updated ${result.rowCount} record(s).`));
  res.status(200).send(result.rows[0]);
});
// POST
router.post('/', [validate(validateMovie)], async (req, res) => {
  const { title, numberInStock, dailyRentalRate, genreId } = req.body;
  const result = await db.query(
    `INSERT INTO movies (title, number_in_stock, daily_rental_rate, genre_id) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, numberInStock, dailyRentalRate, genreId]
  );
  debugDB(chalk.blue(`Inserted ${result.rowCount} record(s).`));
  res.status(201).send(result.rows[0]);
});
// DELETE
router.delete('/:id', [], async (req, res) => {
  const result1 = await db.query('SELECT * FROM movies WHERE movie_id = $1', [
    req.params.id,
  ]);
  if (result1.rows.length === 0)
    return res
      .status(404)
      .send(`The movie with the given Id ${req.params.id} was not found.`);
  const result2 = await db.query(
    'DELETE FROM movies WHERE movie_id = $1 RETURNING *',
    [req.params.id]
  );
  debugDB(chalk.blue(`Deleted ${result2.rowCount} record(s).`));
  res.status(200).send(result2.rows[0]);
});

module.exports = router;
