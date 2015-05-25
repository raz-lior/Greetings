var express = require('express'),
    Greeting = require('../models/Greeting'),
    router = express.Router();

router.get( '*', function ( req, res ) {

  var recordCount = req.query.top;

  Greeting.count( function ( err, count ) {
     if( err ){
       res.type( 'application/json' );
       res.status( 500 );
       res.end( '{ }' );
     }

     var randomValue = Math.floor( Math.random() * count );
     Greeting
        .find( {}, { greeting:true, _id:false } )
        .skip( randomValue )
        .limit( recordCount )
        .exec( function ( err, greetings ) {
          greetings = greetings || [ { greeting : '' } ];
          res.type( 'application/json' );
          res.end( JSON.stringify( greetings ) );
         } );
  })

});

router.post( '/', function ( req, res ) {

  var newGreeting = new Greeting();
  newGreeting.greeting = req.body.greeting;
  newGreeting.save( function ( err ) {
    if( err ){
      res.status( 500 );
      res.end();
    }

    res.end();
  });

});


module.exports = router;
