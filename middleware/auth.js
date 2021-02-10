const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 401 Unauthorized
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    // Check to see if token is expired
    if (decoded.exp > new Date())
      return res.status(401).send('Access denied. Token expired.');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
