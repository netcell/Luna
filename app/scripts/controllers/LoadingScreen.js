'use strict';

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
  });
