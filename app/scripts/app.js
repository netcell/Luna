'use strict';

angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
        //controller: 'MainCtrl'
      })
      .when('/quick-create', {
        templateUrl: 'views/quick-create.html',
        controller: 'QuickcreateCtrl'
      })
      .when('/under-construction', {
        templateUrl: 'views/under-construction.html'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .when('/confirmation-sent', {
        templateUrl: 'views/confirm-sent.html',
        controller: 'CreateCtrl'
      })
      .when('/account-over-used', {
        templateUrl: 'views/account-over-used.html',
        controller: 'CreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  });
