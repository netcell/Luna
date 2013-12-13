'use strict';

angular.module('lunaApp')
  .directive('submitInput', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.submit();

                event.preventDefault();
            }
        });
      }
    };
  });
