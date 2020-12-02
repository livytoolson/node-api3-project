const express = require('express');

const User = require('./userDb');
// const middlewares = require('../api/middlewares');

const router = express.Router();

//custom middleware
const validateUserId = async (req, res, next) => {
  const { id } = req.params
  const user = await User.getById(id)
  try {
    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user.' })
  }
};

const validateUser = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'Missing user data.' })
  } else if (!req.body.name) {
      res.status(400).json({ message: 'Missing required name field.' })
  } else {
    next();
  }
};

const validatePost = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'Missing post data.' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'Missing required text field.' })
  } else {
    next();
  }
};

router.post('/', (req, res) => {
  // do your magic!
  User.insert()
});

router.post('/:id/posts', (req, res) => {
  const { id } = req.params
  const changes = req.body
  // do your magic!
  User.update(id, changes)
});

router.get('/', async (req, res) => {
  try {
    const users = await User.get(req.query)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'The user information could not be retireved.' })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error)
  })
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The user has been deleted.' })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error removing the user.' })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  User.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updating the user.' })
  })
});

module.exports = router;
