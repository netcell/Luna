//'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $window, $q, $timeout, $http) {
    var loader = [
        $http.get('views/account-over-used.html'),
        $http.get('views/confirmation.html'),
        $http.get('views/home.html'),
        $http.get('views/create.html'),
        $http.get('views/quick-create.html'),
        $http.get('views/under-construction.html'),
        $http.get('views/has.html')
    ];
    $('.loading-screen').fadeOut(500);
    
    $( document ).on(
    "click",
    "a",
    function( event ){
    var href = $( event.target ).attr( "href" );
    if (href) {
        // Stop the default behavior of the browser, which
        // is to change the URL of the page.
        event.preventDefault();
         
        // Manually change the location of the page to stay in
        // "Standalone" mode and change the URL at the same time.
        location.href = href;
    }
     
    }
    );
  });
