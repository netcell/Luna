'use strict';

angular.module('lunaApp')
  .directive('moduleContent', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        $('html, body').animate({
  	        scrollTop: ($(".app").offset().top-50)
  	    }, 500);
      }
    };
  });
