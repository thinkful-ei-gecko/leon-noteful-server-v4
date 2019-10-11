require('dotenv').config();
const { NODE_ENV, API_KEY } = require('./config');

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

//To turn this off, comment this section out. Requires Bearer Token
app.use(function validateAPIKey(req,res,next) {
  let userKey = req.get('Authorization');

  if (!userKey || API_KEY !== userKey.split(' ')[1]) {
    return res.status(401).send('Not authorized');
  }
  next();
}); 

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