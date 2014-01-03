'use strict';

angular.module('lunaApp')
  .directive('select', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.$watch(attrs.ngModel, function(){
      		$('#tmp').text($(element).children('option:selected').text());
		    $(element).width($('#tmp').width());
      	});
      }
    };
  });
