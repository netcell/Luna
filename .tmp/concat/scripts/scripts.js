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
    }).when('/under-construction', { templateUrl: 'views/under-construction.html' }).when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    }).when('/confirmation-sent', {
      templateUrl: 'views/confirm-sent.html',
      controller: 'CreateCtrl'
    }).when('/account-over-used', {
      templateUrl: 'views/account-over-used.html',
      controller: 'CreateCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('lunaApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
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
          timeEl.removeClass('near-left');
          moduleEl.removeClass('near-left');
        } else if (scope.grid.value == 3) {
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
'use strict';
angular.module('lunaApp').controller('CreateCtrl', [
  '$scope',
  function ($scope) {
    $scope.form = {};
    $scope.selection = {};
    $scope.options = {};
    var periods = [
        [
          {
            value: 's\xe1ng',
            index: 0
          },
          {
            value: 'chi\u1ec1u',
            index: 1
          }
        ],
        [
          {
            value: 's\xe1ng',
            index: 0
          },
          {
            value: 't\u1ed1i',
            index: 1
          }
        ],
        [
          {
            value: 'tr\u01b0a',
            index: 0
          },
          {
            value: '\u0111\xeam',
            index: 1
          }
        ]
      ];
    $scope.options.hours = [
      {
        value: '01',
        periods: 0
      },
      {
        value: '02',
        periods: 0
      },
      {
        value: '03',
        periods: 0
      },
      {
        value: '04',
        periods: 0
      },
      {
        value: '05',
        periods: 0
      },
      {
        value: '06',
        periods: 0
      },
      {
        value: '07',
        periods: 1
      },
      {
        value: '08',
        periods: 1
      },
      {
        value: '09',
        periods: 1
      },
      {
        value: '10',
        periods: 1
      },
      {
        value: '11',
        periods: 2
      },
      {
        value: '12',
        periods: 2
      }
    ];
    $scope.options.months = [
      {
        value: 'gi\xeang',
        index: 0
      },
      {
        value: 'hai',
        index: 1
      },
      {
        value: 'ba',
        index: 2
      },
      {
        value: 'b\u1ed1n',
        index: 3
      },
      {
        value: 'n\u0103m',
        index: 4
      },
      {
        value: 's\xe1u',
        index: 5
      },
      {
        value: 'b\u1ea3y',
        index: 6
      },
      {
        value: 't\xe1m',
        index: 7
      },
      {
        value: 'ch\xedn',
        index: 8
      },
      {
        value: 'm\u01b0\u1eddi',
        index: 9
      },
      {
        value: 'm\u01b0\u1eddi m\u1ed9t',
        index: 10
      },
      {
        value: 'ch\u1ea1p',
        index: 11
      }
    ];
    $scope.options.repeats = [
      {
        value: 'ng\xe0y',
        index: 0
      },
      {
        value: 'th\xe1ng',
        index: 1
      },
      {
        value: 'n\u0103m',
        index: 2
      }
    ];
    $scope.options.minutes = [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '58',
      '59'
    ];
    $scope.options.dates = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31'
    ];
    var selected_hour = $scope.options.hours[0];
    $scope.selection.hour = selected_hour;
    $scope.selection.minute = $scope.options.minutes[0];
    $scope.selection.period = periods[selected_hour.periods][0];
    $scope.selection.date = $scope.options.dates[0];
    $scope.selection.month = $scope.options.months[0];
    $scope.selection.repeat = $scope.options.repeats[0];
    $scope.$watch('selection.hour', function (newValue, oldValue, scope) {
      var period_index = $scope.selection.period.index;
      $scope.options.periods = periods[newValue.periods];
      $scope.selection.period = $scope.options.periods[period_index];
    });
  }
]);
'use strict';
angular.module('lunaApp').directive('create', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      scope.$watch('selection.repeat', function (newValue, oldValue, scope) {
        switch (newValue.index) {
        case 0:
          element.find('#create-date').prop('disabled', 'disabled');
          element.find('#create-month').prop('disabled', 'disabled');
          element.find('#create-date,#create-date-label,#create-month,#create-month-label').addClass('disabled');
          break;
        case 1:
          element.find('#create-date').prop('disabled', false);
          element.find('#create-month').prop('disabled', 'disabled');
          element.find('#create-month,#create-month-label').addClass('disabled');
          element.find('#create-date,#create-date-label').removeClass('disabled');
          break;
        case 2:
          element.find('#create-date').prop('disabled', false);
          element.find('#create-month').prop('disabled', false);
          element.find('#create-date,#create-date-label,#create-month,#create-month-label').removeClass('disabled');
          break;
        }
      });
    }
  };
});