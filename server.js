const express = require('express');
const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to Livy's API.</h2>`);
});

// Custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}}`
  );
  next();
}

server.use(logger);

module.exports = server;
