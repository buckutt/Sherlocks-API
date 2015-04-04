'use strict';

var Promise       = require('bluebird');
var bodyParser    = require('body-parser');
var config        = require('config');
var express       = require('express');
var moment        = require('moment');
var morgan        = require('morgan');
var path          = require('path');
var Sequelize     = require('sequelize');
var winston       = require('winston');
var errorsHandler = require('./middlewares/ErrorsHandler');
var models        = require('./models');
var app           = express();

// Winston transports configuration.
app.locals.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './sherlocks.log' })
    ]
});

// Rendering options.
// Mainly used by the error handling middleware.
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Load middlewares.
app.use(morgan('combined'));
app.use(bodyParser.json());
// Serve static files located on the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Load the right moment locale.
moment.locale('fr');

// Be Docker-ready :-)
if (process.env.DB_PORT_3306_TCP_ADDR) {
    config.database.host = process.env.DB_PORT_3306_TCP_ADDR;
}

// Initialize everything related to the database, load the routes, and then
// start the server.
models.init().then(function() {

    var router = express.Router();
    var routes = require('./routes/index.js')(router);

    // Prefix all routes.
    app.use(config.get('application').prefix, router);

    var server = app.listen(config.get('application').port, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('API ready at http://%s:%s', host, port);
    });

    // Error handling middleware.
    app.use(errorsHandler);
});
