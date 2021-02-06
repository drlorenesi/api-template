// Middleware that expects an array of roleId's that are allowed to access resource.
// Shoul ALWAYS be preceeded by 'auth' middleware to decode JWT.
// Example: [auth, restrict([1, 2, 3])]
module.exports = (param) => {
  return (req, res, next) => {
    if (typeof param !== 'object')
      return res
        .status(500)
        .send(
          'The server encountered an error and could not complete your request.'
        );
    // 403 Forbidden
    if (!param.includes(req.user.roleId))
      return res.status(403).send('Access denied.');
    next();
  };
};
