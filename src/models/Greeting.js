var mongoose = require('mongoose');

var greetingSchema = mongoose.Schema({
 greeting: String
});

module.exports = mongoose.model( 'Greeting', greetingSchema );
