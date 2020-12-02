const express = require('express');

const User = require('./userDb');
const Post = require('../posts/postDb');

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
  const body = req.body
  const name = req.body.name
  if (!body) {
    res.status(400).json({ message: 'Missing user data.' })
  } else if (!name) {
      res.status(400).json({ message: 'Missing required name field.' })
  } else {
    next();
  }
};

const validatePost = (req, res, next) => {
  const body = req.body
  const text = req.body.text
  if (!body) {
    res.status(400).json({ message: 'Missing post data.' })
  } else if (!text) {
    res.status(400).json({ message: 'Missing required text field.' })
  } else {
    next();
  }
};

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
  // User.instert({ name: req.body.name }) ?
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error adding the user.' })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  Post.insert({...newPost, user_id: req.user.id })
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updating the post.' })
  })
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
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error)
  })
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

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params.id
  const changes = req.body
  User.update(id, changes)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updating the user.' })
  })
});

module.exports = router;