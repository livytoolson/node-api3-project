const User = require('../users/userDb');

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
    };
  };

  const validateUser = (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: 'Missing user data.' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'Missing required name field.' })
    } else {
      next();
    };
  };
  
  const validatePost = (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: 'Missing post data.' })
    } else if (!req.body.text) {
      res.status(400).json({ message: 'Missing required text field.' })
    } else {
      next();
    };
  };

  module.exports = {
      validateUserId,
      validateUser,
      validatePost
  };