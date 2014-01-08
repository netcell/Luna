'use strict';

angular.module('lunaApp')
  .directive('autoscroll', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $('html, body').animate({
  	        scrollTop: $(".app").offset().top
  	    }, 500);
      }
    };
  });
