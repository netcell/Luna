//'use strict';

angular.module('lunaApp')
  .directive('switcher', function () {
    return {
      templateUrl: 'views/switcher.html',
      restrict: 'E'
    };
  });
