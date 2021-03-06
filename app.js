var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authModule = require('./auth/localauth');

// Connect to main database
var dbConfig = require('./db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

var app = express();

app.use(authModule.initialize());
app.use(authModule.session());

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route registration
var index = require('./routes/index');
var api = require('./routes/api');
var foulinput = require('./routes/foulinput');
var gameinput = require('./routes/gameinput');
var userinput = require('./routes/userinput');
var foulsearch = require('./routes/foulsearch');
var foulreports = require('./routes/foulreports');
var grades = require('./routes/grades');
var foulcodes = require('./routes/foulcodes');
var teams = require('./routes/teaminput');

app.use('/', index);
app.use('/api', api);
app.use('/fouls', foulinput);
app.use('/games', gameinput);
app.use('/users', userinput);
app.use('/foulsearch', foulsearch);
app.use('/foulreports', foulreports);
app.use('/grades', grades);
app.use('/foulcodes', foulcodes);
app.use('/teaminput', teams);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/login', )
module.exports = app;
