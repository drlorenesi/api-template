// Open Route
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const bugs = [
  { id: 1, description: 'Bug 1', userId: 1, resolved: true },
  { id: 2, description: 'Bug 2', userId: 1 },
  { id: 3, description: 'Bug 3', userId: 2 },
  { id: 4, description: 'Bug 4' },
];

const validateBug = (bug) => {
  const schema = Joi.object({
    description: Joi.string(),
    userId: Joi.number(),
    resolved: Joi.bool(),
  });
  return schema.validate(bug);
};

router.get('/', (req, res) => {
  res.send(bugs);
});

router.get('/:id', (req, res) => {
  const bug = bugs.find((bug) => bug.id === parseInt(req.params.id, 10));
  if (!bug) return res.status(404).send('This bug does not exist.');
  res.send(bug);
});

router.put('/:id', (req, res) => {
  const bug = bugs.find((bug) => bug.id === parseInt(req.params.id, 10));
  if (!bug) return res.status(404).send('This bug does not exist.');
  const { error } = validateBug(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { description, userId, resolved } = req.body;
  if ('description' in req.body) bug.description = description;
  if ('userId' in req.body) bug.userId = userId;
  if ('resolved' in req.body) bug.resolved = resolved;
  res.send(bug);
});

router.post('/', (req, res) => {
  const bug = {
    resolved: false,
    ...req.body,
  };
  const { error } = validateBug(bug);
  if (error) return res.status(400).send(error.details[0].message);
  bug.id = Date.now();
  bugs.push(bug);
  res.status(201).send(bug);
});

router.delete('/:id', (req, res) => {
  const bug = bugs.find((bug) => bug.id === parseInt(req.params.id, 10));
  if (!bug) return res.status(404).send('This bug does not exist.');
  const index = bugs.indexOf(bug);
  bugs.splice(index, 1);
  res.send(bug);
});

module.exports = router;
