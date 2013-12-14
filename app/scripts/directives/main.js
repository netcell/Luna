'use strict';

angular.module('lunaApp')
  .directive('main', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	scope.$watch('hasPopup', function(){
      	})
      }
    };
  });
