// dependencies
const express = require('express');
const helmet = require('helmet');
const moment = require('moment');

// db models
const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');

// express
const server = express();

// logger;
function logger(req, res, next) {
  console.log(
    `You used a ${req.method} request to the ${
      req.path
    } URI on ${moment().format('LLLL')}`
  );
  next();
}

// middleware & more
server.use(logger);
server.use(helmet());
server.use(express.json());

server.get('/', async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: 'worry about this later, but the server works.' });
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'what on earth did you mess up?' });
  }
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;
