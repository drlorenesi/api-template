// Open Route
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const validate = require('../middleware/validate');
const generateAuthToken = require('../utils/generateAuthToken');
const db = require('../startup/db');

const validateRegistration = (account) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    passwordConfirmation: Joi.string().min(4),
  });
  return schema.validate(account);
};

// Register new Account
router.post('/', [validate(validateRegistration)], async (req, res) => {
  // Check if emaill is already registered
  const search = await db.query('SELECT * FROM users WHERE email LIKE $1', [
    req.body.email,
  ]);
  if (search.rows.length !== 0)
    return res.status(400).send('Please use another email.');
  let { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const { rows } = await db.query(
    `INSERT INTO users (first_name, last_name, email, pass) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, email, password]
  );
  // Create payload and send JWT so user can directly log in
  const payload = {
    userId: rows[0].user_id,
    roleId: rows[0].role_id,
    firstName: rows[0].first_name,
    lastName: rows[0].last_name,
    email: rows[0].email,
  };
  const token = generateAuthToken(payload, process.env.jwtPrivateKey);
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(payload);
});

module.exports = router;
