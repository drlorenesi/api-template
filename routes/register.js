// Open Route
const express = require('express');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Joi = require('joi');
const router = express.Router();
const validate = require('../middleware/validate');
const db = require('../startup/db');
const debugDB = require('debug')('app:db');

const validateAccount = (account) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(account);
};

// Register new Account
router.post('/', [validate(validateAccount)], async (req, res) => {
  // Check for duplicate email
  const { rows } = await db.query(
    'SELECT * FROM accounts WHERE email LIKE $1',
    [req.body.email]
  );
  if (rows.length !== 0)
    return res.status(400).send('Please use another email.');
  let { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const result = await db.query(
    `INSERT INTO accounts (first_name, last_name, email, pass) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, email, password]
  );
  debugDB(chalk.blue(`Inserted ${result.rowCount} record(s).`));
  res.status(201).send(result.rows[0]);
});

module.exports = router;
