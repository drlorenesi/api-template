module.exports = (req, res, next) => {
  console.log(req.user);
  if (req.user.roleId !== 1)
    return res.status(403).json({ message: 'Access denied.' });
  next();
};
