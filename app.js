var express = require('express');
var http = require('http');
var path = require('path');


var app = express();
app.set('port', 3000);


var errorhandler = require('errorhandler');//в начале
app.use(errorhandler());//в конце

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port' + app.get('port'));
});

app.use(function(req, res, next ) {
	if (req.url == '/'){ 
		res.end('hello');
	} else {
		next();
	}
});

app.use(function(req, res, next ) {
	if (req.url == '/forbidden'){ 
		res.end('wops, denied');
	} else {
		next();
	}
});

app.use(function(req, res, next ) {
	if (req.url == '/test'){ 
		res.end(' test');
	} else {
		next();
	}
});

app.use(function(req, res) {
    res.status(404).send("page not found");
	//res.send(404, "page not found");
});

app.use(function(err, req, res, next) {
	//NODE_ENDV = 'production'
	if (app.get('env') ==  'development') {
	app.use(errorHandler());
	} else {
		app.use(function(error, req, res, next){
			res.send("Oshibka");
		});
	}
});




/*
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
*/

module.exports = app;
