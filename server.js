const express = require('express');
const server = express();

const userRouter = require('./users/userRouter.js');

server.use(express.json());
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Custom middleware
function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, Timestamp: ${req.timestamp}`)
  next();
}

server.use(logger);

module.exports = server;
