var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connectionFactory = require('./services/connectionFactory');

var indexRoutes = require('./routes/index');
//var keyspaceRoute = require('./routes/keyspaces');
//var tableRoute = require('./routes/tables');
//var users = require('./routes/users');

//var columns = require('./routes/columns')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/keyspaces/:keyspaceName/tables',tableRoute);
//app.use('/keyspaces', keyspaceRoute);

/*interceptor*/
app.all('*', function(req, res, next) {
    if ( req.path == '/' || req.path == '/connections') return next();
    var connection = req.get('connection-name');
    connectionFactory.getConnection(connection,function(response){
        if(response.success){
            connectionFactory.connect(response.data,function(_response){
                if(!_response.success){
                    res.json(_response);
                }else{
                    next();
                }
            })
        }else{
            response.message = "Invalid connection for request";
            res.json(response);
        }
    });

});
//app.use(app.router);

app.use('/', indexRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
