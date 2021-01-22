const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const validate = require('../middleware/validate');
const generateAuthToken = require('../utils/generateAuthToken');
const db = require('../startup/db');

const validateLogin = (loginInfo) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(loginInfo);
};

// Log in user
// -----------
router.post('/', [validate(validateLogin)], async (req, res) => {
  const { rows } = await db.query('SELECT * FROM accounts WHERE email = $1', [
    req.body.email,
  ]);
  if (rows.length === 0)
    return res.status(400).send('Invalid email or password.');
  // Check to see if passwords match
  const validPassword = await bcrypt.compare(req.body.password, rows[0].pass);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  // // Create payload and send JWT
  const payload = {
    userId: rows[0].user_id,
    roleId: rows[0].role_id,
    firstName: rows[0].first_name,
    lastName: rows[0].last_name,
    email: rows[0].email,
  };
  const token = generateAuthToken(payload, process.env.jwtPrivateKey);
  res.status(200).header('x-auth-token', token).send(payload);
});

module.exports = router;
