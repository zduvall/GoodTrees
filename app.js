const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const treesRouter = require('./routes/trees');
const reviewsRouter = require('./routes/review');
const highestClimbersRouter = require('./routes/highest-climbers');
const forestconnectionsRouter = require('./routes/api-forest-connections');
const filterTreesRouter = require('./routes/api-filter-trees');
const { restoreUser } = require('./auth');
const { secret } = require('./config/index');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // reads json payload on req
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    store,
    secret,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(restoreUser);

// create Session table if it doesn't already exist
store.sync();

// app use all of our router files
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trees', treesRouter);
app.use('/reviews', reviewsRouter);
app.use('/forestconnections', forestconnectionsRouter);
app.use('/highest-climbers', highestClimbersRouter);
app.use('/filter-trees', filterTreesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
