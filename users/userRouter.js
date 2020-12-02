const express = require('express');

const User = require('./userDb');
const middlewares = require('../api/middlewares');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  User.insert()
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await User.get(req.query)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'The user information could not be retireved.' })
  }
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
