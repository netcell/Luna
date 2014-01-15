//'use strict';

angular.module('lunaApp')
  .directive('afterLoading', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        element.removeClass("hidden");
      }
    };
  });
