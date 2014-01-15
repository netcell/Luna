//'use strict';

angular.module('lunaApp')
  .directive('footer', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	if (!scope.footer.buttons.length) $('.more').height(20);
	    scope.$watch('footer.buttons.length', function(newVal, oldVal){
	      if (!newVal) {
	        $('.more').height(20);
	      } else {
	        $('.more').height(50);
	      }
	    })
      }
    };
  });
