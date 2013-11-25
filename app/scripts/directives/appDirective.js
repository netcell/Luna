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
          console.log(scope.grid.value);
          if (scope.grid.value == 1){
              timeEl.removeClass('full-left');
            moduleEl.removeClass('full-left');
          } else { 
              timeEl.addClass('full-left');
            moduleEl.addClass('full-left');
          }
      	});
      }
    };
  });
