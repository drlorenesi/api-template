const jwt = require('jsonwebtoken');

// Creates a JWT that takes in a payload and key
module.exports = (payload, key) => {
  // Add an expiration property:
  // * 60 = 60 minutes
  payload.exp = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwt.sign(payload, key);
};
