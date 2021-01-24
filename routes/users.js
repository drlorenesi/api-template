// Open Route
const express = require('express');
const Joi = require('joi');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const debugDB = require('debug')('app:db');
const db = require('../startup/db');
const router = express.Router();

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

// GET
router.get('/', [auth, admin], async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  res.send(rows);
});
router.get('/:id', [auth, admin], async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  res.send(rows[0]);
});
// PUT
router.put('/:id', [auth, validate(validateUser)], async (req, res) => {
  // Search for user
  const user = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (user.rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  // Test for unique email address
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
  debugDB(chalk.blue(`Updated ${result.rowCount} record(s).`));
  res.status(200).send(result.rows[0]);
});
// DELETE
router.delete('/:id', [], async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE user_id = $1', [
    req.params.id,
  ]);
  if (user.rows.length === 0)
    return res
      .status(404)
      .send(`The user with the given Id ${req.params.id} was not found.`);
  const result = await db.query(
    'DELETE FROM users WHERE user_id = $1 RETURNING *',
    [req.params.id]
  );
  debugDB(chalk.blue(`Deleted ${result.rowCount} record(s).`));
  res.status(200).send(result.rows[0]);
});

module.exports = router;
