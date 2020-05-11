// setup .env
require('dotenv').config();

// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('./helpers/debugger');

// app setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiPort = process.env.API_PORT;
const isDev = process.env.ENVIRONMENT === 'dev';
const logging = process.env.DEBUG_LOGGING === 'true';

// set up logging
if (isDev || logging) {
  app.use(morgan('dev'));
}

// connect to db
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    debug.write(err);
    return;
  }

  debug.write(`Connection to MongoDB successful`);
});

// basic hello world route
app.get('/', (req, res) => res.send('Hello World!'));

// import routes
const userRoute = require('./routes/user.route');

// use routes
app.use('/users', userRoute);

// start up api
app.listen(apiPort, () => {
  debug.write(`API listening on port ${apiPort}`);
});

// export app for testing purposes
module.exports = app;
