angular.module( 'greetingApp', [ 'ngResource' ] )
  .controller( 'greetController', [ '$scope', '$resource', '$interval' , function ( $scope, $resource, $interval ) {
    $scope.greeting = undefined;
    $scope.userGreeting = undefined;

    $scope.fetchGreeting = function () {
      var Greeting = $resource( '/srv/randomGreeting/' );
      Greeting.query( { top:1 }, function ( res ) {
        $scope.greeting = res[0] ? res[0].greeting : '';
      } );
    }

    $scope.postGreeting = function () {
      var Greeting = $resource( '/srv/randomGreeting/' );
      Greeting.save( { greeting : $scope.userGreeting } );
      $scope.userGreeting = null;
    }

    $scope.fetchGreeting();
    $interval( $scope.fetchGreeting, 2000 );

  } ] );
