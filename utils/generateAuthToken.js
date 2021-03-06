const jwt = require('jsonwebtoken');

// Creates a JWT that takes in a payload and key
module.exports = (payload, key) => {
  // Add an expiration property:
  // ... * 60 * 24 = 24 hours
  payload.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  return jwt.sign(payload, key);
};
