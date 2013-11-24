'use strict';
angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('lunaApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
angular.module('lunaApp').directive('appDirective', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var appElement = $(element[0]);
      var timeEl = appElement.find('.time');
      scope.$watch('state.value', function () {
        switch (scope.state.value) {
        case 1:
          timeEl.removeClass('full-left');
          break;
        case 2:
          timeEl.addClass('full-left');
          break;
        case 3:
          timeEl.addClass('full-left');
          break;
        }
      });
    }
  };
});
'use strict';
angular.module('lunaApp').directive('textarea', function () {
  return {
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.focus();
    }
  };
});
'use strict';
angular.module('lunaApp').directive('quickCreateHome', [
  '$window',
  function ($window) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        element.find('textarea').blur(function (e) {
          $(e.currentTarget).focus();
        });
        var escHandler = function (event) {
          switch (event.keyCode) {
          case 27:
            scope.state.value = 1;
            $window.removeEventListener('keydown', escHandler);
            scope.$apply();
            break;
          case 13:
            scope.state.value = 3;
            $window.removeEventListener('keydown', escHandler);
            scope.$apply();
            break;
          }
        };
        $window.addEventListener('keydown', escHandler);
      }
    };
  }
]);
'use strict';
angular.module('lunaApp').controller('QuickcreateCtrl', [
  '$scope',
  function ($scope) {
    var input = $scope.input;
    function tokenize(string) {
      return string.split(' ');
    }
    function ngram(array, n) {
      var ngram = [];
      for (var i = 0; i < array.length - n + 1; i++) {
        var gram = array[i];
        for (var j = 1; j < n; j++) {
          gram += ' ' + array[i + j];
        }
        ngram.push(gram);
      }
      return ngram;
    }
  }
]);