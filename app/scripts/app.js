//'use strict';

angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic',
  'ngTouch',
  'ngStorage'
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
      .when('/confirmation/:action', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl'
      })
      .when('/account-over-used', {
        templateUrl: 'views/account-over-used.html'
      })
      .when('/has/:action', {
        templateUrl: 'views/has.html',
        controller: 'HasCtrl'
      })
      .when('/delete', {
        templateUrl: 'views/delete.html',
        controller: 'DeleteCtrl'
      })
      .when('/sign-in', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInCtrl'
      })
      .when('/event-list', {
        templateUrl: 'views/event-list.html',
        controller: 'EventlistCtrl'
      })

      .when('/confirm-sign-up', {
        templateUrl: 'views/confirm-sign-up.html',
        controller: 'ConfirmSignUpCtrl'
      })
      .when('/update-email', {
        templateUrl: 'views/update-email.html',
        controller: 'UpdateEmailCtrl'
      })
      // .when('/account', {
      //   templateUrl: 'views/account.html',
      //   controller: 'AccountCtrl'
      // })
      .when('/account', {
        templateUrl: 'views/settings.html',
        controller: 'AccountCtrl'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .constant('Strings', {
      CONNECTION_ERROR: ['Hệ thống đang bận, hoặc kết nối internet của bạn có vấn đề.','Xin hãy kiểm tra và thử lại sau ít phút.']
  })
  .run(function($rootScope, $templateCache) {
      $templateCache.removeAll();
  });
