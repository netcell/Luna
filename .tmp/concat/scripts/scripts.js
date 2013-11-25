'use strict';
angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/home.html' }).when('/quick-create', {
      templateUrl: 'views/quick-create.html',
      controller: 'QuickcreateCtrl'
    }).when('/under-construction', { templateUrl: 'views/under-construction.html' }).when('/create', { templateUrl: 'views/create.html' }).otherwise({ redirectTo: '/' });
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
      var moduleEl = appElement.find('.module');
      scope.$watch('grid.value', function () {
        console.log(scope.grid.value);
        if (scope.grid.value == 1) {
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
  '$location',
  function ($window, $location) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        element.find('textarea').blur(function (e) {
          $(e.currentTarget).focus();
        });
        var keyHandler = function (event) {
          switch (event.keyCode) {
          case 27:
            $window.removeEventListener('keydown', keyHandler);
            $window.history.back();
            break;
          case 13:
            $window.removeEventListener('keydown', keyHandler);
            $location.path('/');
            break;
          }
        };
        $window.addEventListener('keydown', keyHandler);
        element.bind('$destroy', function () {
          $window.removeEventListener('keydown', keyHandler);
        });
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
'use strict';
angular.module('lunaApp').controller('LoadingscreenCtrl', [
  '$scope',
  '$http',
  '$q',
  '$timeout',
  function ($scope, $http, $q, $timeout) {
    var fontExtraLight = $http.get('fonts/SourceSansPro-ExtraLight.ttf');
    var fontLight = $http.get('fonts/SourceSansPro-Light.ttf');
    var fontSemibold = $http.get('fonts/SourceSansPro-Semibold.ttf');
    var css = $http.get('dynamic/loading.css');
    var logo = $http.get('https://dl.dropboxusercontent.com/u/12656349/2393e39d.logo.png');
    $q.all([
      fontExtraLight,
      fontLight,
      fontSemibold
    ]).then(function () {
      $('head').append($('<link rel=\'stylesheet\' href=\'dynamic/loading.css\' type=\'text/css\' media=\'screen\' />'));
      $scope.loading.value = false;
    });
  }
]);
'use strict';
angular.module('lunaApp').directive('moduleContent', function () {
  return {
    restrict: 'C',
    link: function postLink(scope, element, attrs) {
      scope.grid.value = attrs.grid;
    }
  };
});
'use strict';
angular.module('lunaApp').directive('afterLoading', function () {
  return {
    restrict: 'C',
    link: function postLink(scope, element, attrs) {
      element.removeClass('hidden');
    }
  };
});