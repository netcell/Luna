'use strict';

angular.module('lunaApp')
  .directive('select', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
    	if (attrs.ngModel){
    		scope.$watch(attrs.ngModel, function(){
      		$('#tmp option').text($(element).children('option:selected').text());
		    $(element).width($('#tmp').width());
      	});
    	}
      }
    };
  });
