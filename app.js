const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: "library.db",
  dialect: "sqlite"
});

const db = require('./models');
const { Book } = db;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//test connection to the database and sync the model
(async () => {
  await db.sequelize.sync({ force: true });
  try {
    await sequelize.authenticate();
    console.log('Connection made!')
  } catch (error) {
    console.error('Error connecting to the database: ', error)
  }
})();

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
  // set locals, only providing error in development
  err.status = 500;
  // res.locals.error = err;
  // res.status(500);

  err.message = `Ooops! It looks like something went wrong on the server.`
  console.log(err.message);
  res.render('error', { err });
});

module.exports = app;
