//'use strict';

angular.module('lunaApp')
  .directive('checker', function () {
    return {
      templateUrl: 'views/checker.html',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element, attrs) {
        scope.$watch('checked', function(newValue){
        	if (newValue) {
        		scope.counter.checked++;
        	} else if (scope.counter.checked) {
        		scope.counter.checked--;
        	}
        })
      }
    };
  });
