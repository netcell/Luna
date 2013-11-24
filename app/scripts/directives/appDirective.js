'use strict';

angular.module('lunaApp')
  .directive('appDirective', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	var appElement = $(element[0]);
        var timeEl = appElement.find('.time');
      	scope.$watch('state.value',function(){
          switch (scope.state.value){
            case 1: timeEl.removeClass('full-left');
            break;
            case 2: timeEl.addClass('full-left');
            break;
            case 3: timeEl.addClass('full-left');
            break;
          }
      	});
      }
    };
  });
