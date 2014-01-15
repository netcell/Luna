//'use strict';

angular.module('lunaApp')
  .directive('textarea', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	element.focus();
      }
    };
  });
