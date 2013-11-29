'use strict';

angular.module('lunaApp')
  .directive('appDirective', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	var appElement = $(element[0]);
        var timeEl    = appElement.find('.time');
        var moduleEl  = appElement.find('.module');
      	scope.$watch('grid.value',function(){
          if (scope.grid.value == 1){
              timeEl.removeClass('full-left');
            moduleEl.removeClass('full-left');
              timeEl.removeClass('near-left');
            moduleEl.removeClass('near-left');
          } else if (scope.grid.value == 3){
              timeEl.removeClass('full-left');
            moduleEl.removeClass('full-left');
              timeEl.addClass('near-left');
            moduleEl.addClass('near-left');
          } else { 
              timeEl.addClass('full-left');
            moduleEl.addClass('full-left');
          }
      	});
      }
    };
  });
