'use strict';

angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic',
  'ngTouch'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
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
      .when('/created-confirmation', {
        templateUrl: 'views/created-confirmation.html',
        controller: 'CreatedConfirmationCtrl'
      })
      .when('/delete', {
        templateUrl: 'views/delete.html',
        controller: 'DeleteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .run(function($rootScope, $templateCache) {
      $templateCache.removeAll();
  });
