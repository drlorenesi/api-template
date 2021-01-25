// Open Route
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const db = require('../startup/db');

const validateUser = (user) => {
  const schema = Joi.object({
    roleId: Joi.number().min(1).max(10),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(user);
};

router.get('/', [auth, admin], async (req, res) => {
  const result = await db.query('SELECT * FROM users');
  res.send(result.rows);
});

router.get('/:id', [auth, admin], async (req, res) => {
  // Search for user
  const search = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  res.send(search.rows[0]);
});

router.put('/:id', [auth, validate(validateUser)], async (req, res) => {
  // Search for user
  const search = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  // Check if emaill is already registered
  let { roleId, firstName, lastName, email, password } = req.body;
  const duplicate = await db.query(
    'SELECT * FROM users WHERE email = $1 AND user_id != $2',
    [email, req.params.id]
  );
  if (duplicate.rowCount !== 0)
    return res.status(400).json({ message: 'Please use another email.' });
  // Hash password
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  // Update user
  const result = await db.query(
    `UPDATE users
      SET role_id=$1, first_name=$2, last_name=$3, email=$4, pass=$5
    WHERE user_id=$6 RETURNING *`,
    [roleId, firstName, lastName, email, password, req.params.id]
  );
  res.status(200).send(result.rows[0]);
});

router.delete('/:id', [], async (req, res) => {
  // Search for user
  const search = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (search.rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  const result = await db.query(
    'DELETE FROM users WHERE user_id = $1 RETURNING *',
    [req.params.id]
  );
  res.status(200).send(result.rows[0]);
});

module.exports = router;
