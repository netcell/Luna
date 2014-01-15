//'use strict';

angular.module('lunaApp')
  .directive('moduleContent', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        scope.grid.value = attrs.grid;
      }
    };
  });
