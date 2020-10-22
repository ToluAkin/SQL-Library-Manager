const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error(`The page requested does not exist.`);
  err.status = 404;
  console.log(`Error: ${ err.status }. ${ err.message }`);
  res.render('page-not-found', { err })
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (res.status(404)) {
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = `Ooops! It looks like something went wrong on the server.`
    console.log(err.message);
    res.status(err.status || 500).render('error', { err });
  }
});

module.exports = app;
