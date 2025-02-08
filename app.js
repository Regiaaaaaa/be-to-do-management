require('dotenv').config();

// Import Module & Declare Variable
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import DB Connection

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var usertaskRouter = require('./routes/usertask');

// Create Express App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// gretting api
app.use('/', indexRouter);

// user api
app.use('/users', usersRouter);

app.use('/task', taskRouter);

// usertask api
app.use('/user-task', usertaskRouter);

// Handle Error
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set port
const port = process.env.APP_PORT || 4000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
