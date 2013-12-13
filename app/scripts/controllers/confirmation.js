'use strict';

angular.module('lunaApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, User) {
  	$scope.email = User.getEmail();
  });
