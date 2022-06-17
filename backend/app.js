// load environment variables from .env file
if (!process.env.LOADED_ENV) {
  process.env.ROOT_PATH = __dirname;
  require('dotenv').config({ path: process.env.ROOT_PATH + '/.env' });
  process.env.APP_NAME = process.env.APP_NAME ? process.env.APP_NAME : 'SecondHand Kel5';
}

// load dependencies
var express = require('express');
var cors = require('cors');
var path = require('path');
var middlewares = require(path.join(process.env.ROOT_PATH, './middlewares'));
var swaggerUi = require('swagger-ui-express');
var swaggerFile = require(path.join(process.env.ROOT_PATH, '/swagger-output.json'));

var webRouter = require(path.join(process.env.ROOT_PATH, './routes/web'));
var apiRouter = require(path.join(process.env.ROOT_PATH, './routes/api'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// register middlewares
middlewares(app);

// register routes
app.use('/api', cors(), apiRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // register swagger
app.use('/', webRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
