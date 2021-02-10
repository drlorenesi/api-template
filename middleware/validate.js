const { isEmpty } = require('lodash');

module.exports = (validator) => {
  return (req, res, next) => {
    if (isEmpty(req.body)) return res.status(400).send('No info provided...');
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
