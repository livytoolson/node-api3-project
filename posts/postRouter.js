const express = require('express');
const Post = require('./postDb');

const router = express.Router();

// custom middleware
const validatePostId = async (req, res, next) => {
  const { id } = req.params
  const post = await Post.getById(id)
  try {
    if (!post) {
      res.status(404).json({ message: `Post with ID ${id} was not found.` })
    } else {
      req.post = post
      next();
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error retrieving post.' })
  }
}

router.get('/', async (req, res) => {
  try {
    const posts = await Post.get(req.query) 
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'The post information could not be retrieved.' })
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params
  Post.remove(id)
  .then(() => {
    res.status(200).json({ message: 'The post has been deleted.' })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error removing the post.' })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const changes = req.body
  Post.update(id, changes)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updating the post.' })
  })
});

module.exports = router;