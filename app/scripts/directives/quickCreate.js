//'use strict';

angular.module('lunaApp')
  .directive('quickCreateHome', function ($window, $location) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
      	element.find('textarea').blur(function(e){
      		$(e.currentTarget).focus();
      	})

        var keyHandler = function(event) {
          switch(event.keyCode){
            case 27:
            $window.removeEventListener('keydown', keyHandler);
              $window.history.back();
              break;
            case 13: //Enter
            $window.removeEventListener('keydown', keyHandler);
              $location.path('/');
              break;
          }
        }

        $window.addEventListener('keydown', keyHandler);
        element.bind("$destroy", function(){
          $window.removeEventListener('keydown', keyHandler);
        })
      }
    };
  });
