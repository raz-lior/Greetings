var compression = require('compression'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    config = require('../config'),
    randomGreetingsRouter = require('./service_handlers/randomGreetings'),
    app = express();

mongoose.connect( config.db_connection );

app.disable( 'x-powered-by' );
app.use( compression() );
app.use( bodyParser.json() );
app.use( '/', express.static( 'src/client' ) );
app.use( '/components', express.static( 'bower_components' ) );

app.use( '/srv/randomGreeting', randomGreetingsRouter );

var server = app.listen( 3000, function () {

  console.log( 'listening on port 3000...' );

});
