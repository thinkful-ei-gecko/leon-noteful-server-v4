require('dotenv').config();
const { NODE_ENV } = require('./config');

const express = require('express');
const app = express();

const router = require('./router');


//Morgan, CORS, helmet middleware
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


//Endpoints
app.use('/noteful/api',router);

//Final errorHandler middleware
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: {message: 'server error'} };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;