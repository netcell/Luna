'use strict';

angular.module('lunaApp')
  .directive('home', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the home directive');
      }
    };
  });
