var http = require('http');
var express = require('express');
var routes = require('routes');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

app.set('port', config.get('port'));
app.engine('ejs', require('ejs-locals')); //layout partial block
app.set('views', path.join(__dirname, 'views'));// or 'views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));// or favicon(__dirname + '/public/favicon.ico')
if (app.get('env') == 'development') {
    app.use(logger('dev'));//res.end;
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json()); // from json разбирает тело запроса, в req,body...

//app.use(cookieParser());

//app.use(app.router); устарел

//app.get('/', routes.index);
//app.get('/users', user.list);

app.get('/', function (req, res) {
  res.render('index' /* , {
  	//body: '<b>hello</b>'
  }*/ );
});

app.use(express.static(path.join(__dirname, 'public')));

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

/* // FOR EXAPMLE OF MIDLEWARE
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

*/

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    log.info('Express server listening on port' + config.get('port'));
});

module.exports = app;
