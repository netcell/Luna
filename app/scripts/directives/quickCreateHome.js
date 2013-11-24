'use strict';

angular.module('lunaApp')
  .directive('quickCreateHome', function ($window) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
      	element.find('textarea').blur(function(e){
      		$(e.currentTarget).focus();
      	})
        var escHandler = function(event) {
          switch(event.keyCode){
            case 27:
              scope.state.value = 1;
              $window.removeEventListener('keydown', escHandler);
              scope.$apply();
              break;
            case 13:
              scope.state.value = 3;
              $window.removeEventListener('keydown', escHandler);
              scope.$apply();
              break;
          }
        }

        $window.addEventListener('keydown', escHandler);
      }
    };
  });
