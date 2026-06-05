var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var {connectDB} = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var app = express();

async function initializeDatabase() {
    try {
      if (process.env.DATABASE === 'MONGODB') {
            await connectDB();
            console.log('MongoDB conectado')
      }
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
    }
  }

  initializeDatabase();
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
      if (req.headers.authorization && req.headers.authorization === '123456'){ 
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
