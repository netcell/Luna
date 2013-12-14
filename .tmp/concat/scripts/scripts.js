'use strict';
angular.module('lunaApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'monospaced.elastic',
  'ngTouch',
  'ngStorage'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    }).when('/quick-create', {
      templateUrl: 'views/quick-create.html',
      controller: 'QuickcreateCtrl'
    }).when('/under-construction', { templateUrl: 'views/under-construction.html' }).when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    }).when('/confirmation/:action', {
      templateUrl: 'views/confirmation.html',
      controller: 'ConfirmationCtrl'
    }).when('/account-over-used', { templateUrl: 'views/account-over-used.html' }).when('/has/:action', {
      templateUrl: 'views/has.html',
      controller: 'HasCtrl'
    }).when('/delete', {
      templateUrl: 'views/delete.html',
      controller: 'DeleteCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).run([
  '$rootScope',
  '$templateCache',
  function ($rootScope, $templateCache) {
    $templateCache.removeAll();
  }
]);
'use strict';
angular.module('lunaApp').controller('MainCtrl', [
  '$scope',
  'amduonglich',
  '$window',
  'DateTime',
  '$timeout',
  function ($scope, amduonglich, $window, DateTime, $timeout) {
    $scope.time = {};
    $scope.time.current_day = DateTime.getCurrentDay(true);
    var date = amduonglich.getCurrentLunarDate();
    $scope.time.current_date = date[0];
    $scope.time.current_month = date[1];
    $scope.footer = {};
    $scope.footer.buttons = [];
    $scope.hasPopup = false;
    $scope.main = {};
    $scope.main.createPopup = function (text, buttons) {
      if (Object.prototype.toString.call(text) === '[object Array]') {
        $scope.popupTexts = text;
      } else
        $scope.popupTexts = [text];
      $scope.popupButtons = [];
      for (var key in buttons) {
        $scope.popupButtons.push({
          text: key,
          action: buttons[key]
        });
      }
      ;
      $scope.hasPopup = false;
      $timeout(function () {
        $scope.hasPopup = true;
      }, 300);
    };
    $scope.main.alert = function (text) {
      $scope.main.createPopup(text, { 'OK': $scope.main.closePopup });
    };
    $scope.main.pauseup = function (text, callback) {
      $scope.main.createPopup(text, {
        'OK': function () {
          $scope.main.closePopup();
          callback();
        },
        'Cancel': $scope.main.closePopup
      });
    };
    $scope.main.closePopup = function () {
      $scope.hasPopup = false;
    };
    $scope.main.back = function () {
      $window.history.back();
    };
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
    var view1 = $http.get('views/account-over-used.html');
    var view2 = $http.get('views/confirmation.html');
    var view3 = $http.get('views/home.html');
    var view4 = $http.get('views/create.html');
    var view5 = $http.get('views/quick-create.html');
    var view6 = $http.get('views/under-construction.html');
    var view7 = $http.get('views/has.html');
    $q.all([
      fontExtraLight,
      fontLight,
      fontSemibold,
      view1,
      view2,
      view3,
      view4,
      view5,
      view6,
      view7
    ]).then(function () {
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
  '$http',
  '$location',
  'Validate',
  'DateTime',
  'User',
  function ($scope, $http, $location, Validate, DateTime, User) {
    $scope.selection = {};
    $scope.options = {};
    $scope.options.hours = DateTime.hours;
    $scope.options.minutes = DateTime.minutes;
    $scope.options.dates = DateTime.dates;
    $scope.options.months = DateTime.months;
    $scope.options.repeats = DateTime.repeats;
    $scope.selection.desc = '';
    $scope.selection.hour = DateTime.getCurrentHour(true);
    $scope.selection.minute = DateTime.getCurrentMinute(true);
    $scope.options.periods = DateTime.periods[$scope.selection.hour.periods];
    $scope.selection.period = DateTime.getCurrentPeriod(true);
    $scope.selection.date = DateTime.getCurrentLunarDate(true);
    $scope.selection.month = DateTime.getCurrentLunarMonth(true);
    $scope.selection.repeat = $scope.options.repeats[0];
    $scope.selection.email = User.getEmail();
    var init = 3;
    $scope.$watch('selection.hour', function (newValue, oldValue, scope) {
      if (init) {
        init--;
      } else {
        var period_index = $scope.selection.period.index;
        $scope.options.periods = DateTime.periods[newValue.periods];
        $scope.selection.period = $scope.options.periods[period_index];
      }
    });
    $scope.$watch('selection.date', function (newValue, oldValue, scope) {
      if (init) {
        init--;
      } else if ($scope.selection.repeat.index == 0) {
        $scope.selection.repeat = $scope.options.repeats[1];
      }
    });
    $scope.$watch('selection.month', function (newValue, oldValue, scope) {
      if (init) {
        init--;
      } else if ($scope.selection.repeat.index != 2) {
        $scope.selection.repeat = $scope.options.repeats[2];
      }
    });
    $scope.footer.buttons = [
      {
        name: '\u0111\u1eb7t nh\u1eafc nh\u1edf',
        action: function () {
          $scope.submit();
        }
      },
      {
        name: 'quay l\u1ea1i',
        action: function () {
          $scope.main.back();
        }
      }
    ];
    $scope.$on('$destroy', function () {
      $scope.footer.buttons = [];
    });
    $scope.submit = function () {
      if (!$scope.selection.email)
        $scope.main.alert('B\u1ea1n c\u1ea7n nh\u1eadp email');
      else if (!Validate.validateEmail($scope.selection.email))
        $scope.main.alert('B\u1ea1n c\u1ea7n nh\u1eadp \u0111\xfang email');
      else {
        var form = {
            udid: Date.now() + '-' + ((1 + Math.random()) * 65536 | 0).toString(16),
            desc: $scope.selection.desc,
            hour: $scope.selection.hour.value,
            minute: $scope.selection.minute,
            period: $scope.selection.period.standard,
            date: $scope.selection.date,
            month: $scope.selection.month.standard,
            repeat: $scope.selection.repeat.index,
            email: $scope.selection.email
          };
        switch (form.date) {
        case 'r\u1eb1m':
          form.date = 15;
          break;
        case 'cu\u1ed1i':
          form.date = 100;
          break;
        }
        ;
        User.setEmail($scope.selection.email);
        var f = function () {
          $scope.main.createPopup('\u0110ang x\u1eed l\xfd');
          $http.post('/user/quick-create', form).then(function (res) {
            $scope.main.closePopup();
            Share.send('form-create', form);
            $location.path('/confirmation/send');
          }, function (err) {
            $scope.main.alert('H\u1ec7 th\u1ed1ng \u0111ang b\u1eadn, xin th\u1eed l\u1ea1i sau \xedt ph\xfat');
          });
        };
        if (!form.desc || /^\s*$/.test(form.desc))
          $scope.main.pauseup([
            'B\u1ea1n ch\u01b0a \u0111i\u1ec1n n\u1ed9i dung nh\u1eafc nh\u1edf.',
            'B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n ti\u1ebfp t\u1ee5c t\u1ea1o nh\u1eafc nh\u1edf kh\xf4ng c\xf3 n\u1ed9i dung kh\xf4ng?'
          ], f);
        else
          f();
      }
    };
  }
]);
'use strict';
angular.module('lunaApp').directive('create', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      scope.$watch('selection.date', function (newValue, oldValue, scope) {
        switch (newValue) {
        case 'r\u1eb1m':
          element.find('#create-date').removeClass('size-2').addClass('size-3');
          if (scope.selection.repeat.index != 2)
            element.find('#create-month-label').addClass('disabled');
          break;
        case 'cu\u1ed1i':
          element.find('#create-date').removeClass('size-2').addClass('size-3');
          element.find('#create-month-label').removeClass('disabled');
          break;
        default:
          element.find('#create-date').removeClass('size-3').addClass('size-2');
          if (scope.selection.repeat.index != 2)
            element.find('#create-month-label').addClass('disabled');
          break;
        }
      });
      scope.$watch('selection.repeat', function (newValue, oldValue, scope) {
        switch (newValue.index) {
        case 0:
          element.find('#create-date,#create-date-label,#create-month,#create-month-label').addClass('disabled');
          break;
        case 1:
          element.find('#create-month').addClass('disabled');
          if (scope.selection.date == 'cu\u1ed1i') {
            element.find('#create-month-label').removeClass('disabled');
          } else {
            element.find('#create-month-label').addClass('disabled');
          }
          element.find('#create-date,#create-date-label').removeClass('disabled');
          break;
        case 2:
          element.find('#create-date,#create-date-label,#create-month,#create-month-label').removeClass('disabled');
          break;
        }
      });
    }
  };
});
'use strict';
angular.module('lunaApp').factory('amduonglich', function () {
  var ABOUT = '\xc2m l\u1ecbch Vi\u1ec7t Nam - Version 0.8' + '\n\xa9 2004 H\u1ed3 Ng\u1ecdc \u0110\u1ee9c [http://come.to/duc]';
  var TK19 = new Array(3193507, 5679952, 4336544, 2927457, 5415792, 3953128, 6345056, 4908208, 3631398, 5823136, 4479824, 3217106, 5647072, 4104928, 2679506, 5163344, 3724630, 6075680, 4634256, 3300772, 5789136, 4335056, 2926003, 5415600, 4040887, 6334800, 4895904, 3519141, 5942608, 4478384, 3156852, 5645680, 4215545, 6574768, 5138768, 3698006, 6183584, 4631376, 3299028, 5786336, 4367728, 2966867, 5296800, 3926183, 6346064, 4872864, 3452325, 5936592, 4606688, 3058356, 5547216, 4117176, 6599312, 5027152, 3692375, 6172064, 4756944, 3296629, 5786032, 4367536, 2991283, 5270160, 3845528, 6318928, 4991840, 3511141, 5935984, 4606320, 3172708, 5432480, 3992170, 6478480, 5135056, 3746518, 6171360, 4756192, 3328725, 5687632, 4248736, 2872483, 5289616, 3823527, 6313392, 4990416, 3577269, 5935792, 4499792, 3070292, 5551264, 3978576, 2648914, 5133744, 3811190, 6169968, 4739760, 3320485, 5695824, 4221600, 2800291, 5286736);
  var TK20 = new Array(3951576, 6441696, 5023088, 3691733, 6083168, 4512080, 3233108, 5658272, 4233936, 2774482, 5262048, 3843510, 6333648, 4772432, 3396181, 5813568, 4380320, 2928034, 5412272, 4147575, 6572400, 5022896, 3585205, 6056528, 4615504, 3222356, 5647200, 4232560, 2904818, 5261680, 3827046, 6214816, 4778576, 3369621, 5790416, 4467552, 3114723, 5411552, 4049111, 6474064, 5035168, 3528870, 5944656, 4609696, 3253684, 5645776, 4231888, 2806450, 5286224, 3716439, 6188192, 4765008, 3494741, 5787040, 4367792, 3097971, 5526192, 3975592, 6351184, 5008032, 3583654, 5942096, 4606816, 3189476, 5678448, 4215392, 2683491, 5167424, 3726151, 6084256, 4757200, 3427797, 5917392, 4367568, 2938036, 5419600, 3986776, 6337856, 4896160, 3626406, 6067632, 4606384, 3189108, 5678256, 4237904, 2730578, 5139744, 3779911, 6204256, 4756336, 3427061, 5917040, 4482224, 2913443, 5302864, 4024920, 6444704, 4893392, 3577557, 6066912);
  var TK21 = new Array(4639072, 3070292, 5559456, 4119120, 2782546, 5133984, 3712935, 6202832, 4887216, 3320501, 5810512, 4371616, 2931364, 5287248, 3954137, 6441888, 5023152, 3625334, 6050416, 4614448, 3176756, 5532320, 4107600, 2775890, 5262176, 3712742, 6202592, 4772448, 3336805, 5690656, 4250272, 2971299, 5396176, 3951355, 6441424, 5022928, 3657910, 5943888, 4502816, 3071269, 5551520, 4085200, 2774450, 5261744, 3843447, 6202544, 4762192, 3387989, 5795104, 4238688, 2968419, 5395312, 4082152, 6343024, 5002416, 3631270, 5954128, 4479648, 3122852, 5548752, 4215520, 2675427, 5163344, 3724631, 6214816, 4643152, 3300693, 5789344, 4368080, 2905556, 5395120, 3975608, 6465840, 4895888, 3454630, 5942608, 4609440, 3058532, 5547376, 4215472, 2797939, 5138736, 3697463, 6187680, 4762960, 3353301, 5778272, 4367728, 3035876, 5296480, 3860824, 6346016, 4905616, 3496614, 5920464, 4598496, 3189204, 5546704, 4116816, 2681170);
  var TK22 = new Array(5158176, 3725095, 6204832, 4871600, 3550645, 5916080, 4498096, 3060404, 5548368, 3978585, 6449952, 5025104, 3692390, 6050672, 4736368, 3302772, 5788336, 4221264, 2783571, 5266080, 3910311, 6203088, 4868832, 3515109, 5940560, 4379296, 3007140, 5428560, 4086459, 6444704, 5019344, 3754422, 6179504, 4630736, 3200181, 5681808, 4240720, 2780498, 5262752, 3904871, 6329712, 4868528, 3451253, 5924016, 4483728, 2931348, 5401424, 4074336, 2665313, 5018992, 3689190, 6082912, 4646048, 3075365, 5560976, 4217680, 2897619, 5253856, 3838935, 6329040, 4901200, 3331414, 5813408, 4372112, 3038612, 5395888, 4072954, 6563248, 5149360, 3582646, 6056272, 4617376, 3256997, 5549392, 4216224, 2796403, 5383536, 3822455, 6312624, 4876624, 3435862, 5790368, 4369232, 3036884, 5524192, 3974512, 2647250, 5034592, 3599014, 5952848, 4610720, 3190181, 5674448, 4213456, 2795955, 5285072, 3855031, 6206032, 4764992, 3396950);
  function LunarDate(dd, mm, yy, leap, jd) {
    this.day = dd;
    this.month = mm;
    this.year = yy;
    this.leap = leap;
    this.jd = jd;
  }
  var PI = Math.PI;
  function jdn(dd, mm, yy) {
    var a = INT((14 - mm) / 12);
    var y = yy + 4800 - a;
    var m = mm + 12 * a - 3;
    var jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    return jd;
  }
  function jdn2date(jd) {
    var Z, A, alpha, B, C, D, E, dd, mm, yyyy, F;
    Z = jd;
    if (Z < 2299161) {
      A = Z;
    } else {
      alpha = INT((Z - 1867216.25) / 36524.25);
      A = Z + 1 + alpha - INT(alpha / 4);
    }
    B = A + 1524;
    C = INT((B - 122.1) / 365.25);
    D = INT(365.25 * C);
    E = INT((B - D) / 30.6001);
    dd = INT(B - D - INT(30.6001 * E));
    if (E < 14) {
      mm = E - 1;
    } else {
      mm = E - 13;
    }
    if (mm < 3) {
      yyyy = C - 4715;
    } else {
      yyyy = C - 4716;
    }
    return new Array(dd, mm, yyyy);
  }
  function decodeLunarYear(yy, k) {
    var monthLengths, regularMonths, offsetOfTet, leapMonth, leapMonthLength, solarNY, currentJD, j, mm;
    var ly = new Array();
    monthLengths = new Array(29, 30);
    regularMonths = new Array(12);
    offsetOfTet = k >> 17;
    leapMonth = k & 15;
    leapMonthLength = monthLengths[k >> 16 & 1];
    solarNY = jdn(1, 1, yy);
    currentJD = solarNY + offsetOfTet;
    j = k >> 4;
    for (var i = 0; i < 12; i++) {
      regularMonths[12 - i - 1] = monthLengths[j & 1];
      j >>= 1;
    }
    if (leapMonth == 0) {
      for (mm = 1; mm <= 12; mm++) {
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm - 1];
      }
    } else {
      for (mm = 1; mm <= leapMonth; mm++) {
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm - 1];
      }
      ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
      currentJD += leapMonthLength;
      for (mm = leapMonth + 1; mm <= 12; mm++) {
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm - 1];
      }
    }
    return ly;
  }
  function getYearInfo(yyyy) {
    var yearCode;
    if (yyyy < 1900) {
      yearCode = TK19[yyyy - 1800];
    } else if (yyyy < 2000) {
      yearCode = TK20[yyyy - 1900];
    } else if (yyyy < 2100) {
      yearCode = TK21[yyyy - 2000];
    } else {
      yearCode = TK22[yyyy - 2100];
    }
    return decodeLunarYear(yyyy, yearCode);
  }
  var FIRST_DAY = jdn(25, 1, 1800);
  var LAST_DAY = jdn(31, 12, 2199);
  function findLunarDate(jd, ly) {
    if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
      return new LunarDate(0, 0, 0, 0, jd);
    }
    var i = ly.length - 1;
    while (jd < ly[i].jd) {
      i--;
    }
    var off = jd - ly[i].jd;
    return new LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
  }
  function getLunarDate(dd, mm, yyyy) {
    var ly, jd;
    if (yyyy < 1800 || 2199 < yyyy) {
    }
    ly = getYearInfo(yyyy);
    jd = jdn(dd, mm, yyyy);
    if (jd < ly[0].jd) {
      ly = getYearInfo(yyyy - 1);
    }
    return findLunarDate(jd, ly);
  }
  var today = new Date();
  var currentLunarDate = getLunarDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
  var currentMonth = today.getMonth() + 1;
  var currentYear = today.getFullYear();
  function parseQuery(q) {
    var ret = new Array();
    if (q.length < 2)
      return ret;
    var s = q.substring(1, q.length);
    var arr = s.split('&');
    var i, j;
    for (i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      for (j = 0; j < a.length; j++) {
        ret.push(a[j]);
      }
    }
    return ret;
  }
  function getSelectedMonth() {
    var query = window.location.search;
    var arr = parseQuery(query);
    var idx;
    for (idx = 0; idx < arr.length; idx++) {
      if (arr[idx] == 'mm') {
        currentMonth = parseInt(arr[idx + 1]);
      } else if (arr[idx] == 'yy') {
        currentYear = parseInt(arr[idx + 1]);
      }
    }
  }
  function getMonth(mm, yy) {
    var ly1, ly2, tet1, jd1, jd2, mm1, yy1, result, i;
    if (mm < 12) {
      mm1 = mm + 1;
      yy1 = yy;
    } else {
      mm1 = 1;
      yy1 = yy + 1;
    }
    jd1 = jdn(1, mm, yy);
    jd2 = jdn(1, mm1, yy1);
    ly1 = getYearInfo(yy);
    tet1 = ly1[0].jd;
    result = new Array();
    if (tet1 <= jd1) {
      for (i = jd1; i < jd2; i++) {
        result.push(findLunarDate(i, ly1));
      }
    } else if (jd1 < tet1 && jd2 < tet1) {
      ly1 = getYearInfo(yy - 1);
      for (i = jd1; i < jd2; i++) {
        result.push(findLunarDate(i, ly1));
      }
    } else if (jd1 < tet1 && tet1 <= jd2) {
      ly2 = getYearInfo(yy - 1);
      for (i = jd1; i < tet1; i++) {
        result.push(findLunarDate(i, ly2));
      }
      for (i = tet1; i < jd2; i++) {
        result.push(findLunarDate(i, ly1));
      }
    }
    return result;
  }
  function getCanHour0(jdn) {
    return CAN[(jdn - 1) * 2 % 10];
  }
  function getTodayString() {
    var s = getDayString(currentLunarDate, today.getDate(), today.getMonth() + 1, today.getFullYear());
    s += ' n\u0103m ' + getYearCanChi(currentLunarDate.year);
    return s;
  }
  function getCurrentTime() {
    today = new Date();
    var Std = today.getHours();
    var Min = today.getMinutes();
    var Sec = today.getSeconds();
    var s1 = Std < 10 ? '0' + Std : Std;
    var s2 = Min < 10 ? '0' + Min : Min;
    return s1 + ':' + s2;
  }
  function getGioHoangDao(jd) {
    var chiOfDay = (jd + 1) % 12;
    var gioHD = GIO_HD[chiOfDay % 6];
    var ret = '';
    var count = 0;
    for (var i = 0; i < 12; i++) {
      if (gioHD.charAt(i) == '1') {
        ret += CHI[i];
        ret += ' (' + (i * 2 + 23) % 24 + '-' + (i * 2 + 1) % 24 + ')';
        if (count++ < 5)
          ret += ', ';
        if (count == 3)
          ret += '\n';
      }
    }
    return ret;
  }
  var DAYNAMES = new Array('CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7');
  var PRINT_OPTS = new OutputOptions();
  var FONT_SIZES = new Array('9pt', '13pt', '17pt');
  var TAB_WIDTHS = new Array('180px', '420px', '600px');
  function OutputOptions() {
    this.fontSize = '13pt';
    this.tableWidth = '420px';
  }
  function setOutputSize(size) {
    var idx = 1;
    if (size == 'small') {
      idx = 0;
    } else if (size == 'big') {
      idx = 2;
    } else {
      idx = 1;
    }
    PRINT_OPTS.fontSize = FONT_SIZES[idx];
    PRINT_OPTS.tableWidth = TAB_WIDTHS[idx];
  }
  function printSelectedMonth() {
    getSelectedMonth();
    return printMonth(currentMonth, currentYear);
  }
  function printMonth(mm, yy) {
    var res = '';
    res += printStyle();
    res += printTable(mm, yy);
    res += printFoot();
    return res;
  }
  function printYear(yy) {
    var yearName = 'N&#x103;m ' + getYearCanChi(yy) + ' ' + yy;
    var res = '';
    res += printStyle();
    res += '<table align=center>\n';
    res += '<tr><td colspan="3" class="tennam" onClick="showYearSelect();">' + yearName + '</td></tr>\n';
    for (var i = 1; i <= 12; i++) {
      if (i % 3 == 1)
        res += '<tr>\n';
      res += '<td>\n';
      res += printTable(i, yy);
      res += '</td>\n';
      if (i % 3 == 0)
        res += '</tr>\n';
    }
    res += '<table>\n';
    res += printFoot();
    return res;
  }
  function printSelectedYear() {
    getSelectedMonth();
    return printYear(currentYear);
  }
  function printStyle() {
    var fontSize = PRINT_OPTS.fontSize;
    var res = '';
    res += '<style type="text/css">\n';
    res += '<!--\n';
    res += '  .tennam {text-align:center; font-size:150%; line-height:120%; font-weight:bold; color:#000000; background-color: #CCCCCC}\n';
    res += '  .thang {font-size: ' + fontSize + '; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed}\n';
    res += '  .tenthang {text-align:center; font-size:125%; line-height:100%; font-weight:bold; color:#330033; background-color: #CCFFCC}\n';
    res += '  .navi-l {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Times New Roman,Arial; font-weight:bold; color:red; background-color: #CCFFCC}\n';
    res += '  .navi-r {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Arial,Times New Roman; font-weight:bold; color:#330033; background-color: #CCFFCC}\n';
    res += '  .ngaytuan {width:14%; text-align:center; font-size:125%; line-height:100%; color:#330033; background-color: #FFFFCC}\n';
    res += '  .ngaythang {background-color:#FDFDF0}\n';
    res += '  .homnay {background-color:#FFF000}\n';
    res += '  .tet {background-color:#FFCC99}\n';
    res += '  .am {text-align:right;font-size:75%;line-height:100%;color:blue}\n';
    res += '  .am2 {text-align:right;font-size:75%;line-height:100%;color:#004080}\n';
    res += '  .t2t6 {text-align:left;font-size:125%;color:black}\n';
    res += '  .t7 {text-align:left;font-size:125%;line-height:100%;color:green}\n';
    res += '  .cn {text-align:left;font-size:125%;line-height:100%;color:red}\n';
    res += '-->\n';
    res += '</style>\n';
    return res;
  }
  function printTable(mm, yy) {
    var i, j, k, solar, lunar, cellClass, solarClass, lunarClass;
    var currentMonth = getMonth(mm, yy);
    if (currentMonth.length == 0)
      return;
    var ld1 = currentMonth[0];
    var emptyCells = (ld1.jd + 1) % 7;
    var MonthHead = mm + '/' + yy;
    var LunarHead = getYearCanChi(ld1.year);
    var res = '';
    res += '<table class="thang" border="2" cellpadding="1" cellspacing="1" width="' + PRINT_OPTS.tableWidth + '">\n';
    res += printHead(mm, yy);
    for (i = 0; i < 6; i++) {
      res += '<tr>\n';
      for (j = 0; j < 7; j++) {
        k = 7 * i + j;
        if (k < emptyCells || k >= emptyCells + currentMonth.length) {
          res += printEmptyCell();
        } else {
          solar = k - emptyCells + 1;
          ld1 = currentMonth[k - emptyCells];
          res += printCell(ld1, solar, mm, yy);
        }
      }
      res += '</tr>\n';
    }
    res += '</table>\n';
    return res;
  }
  function getPrevMonthLink(mm, yy) {
    var mm1 = mm > 1 ? mm - 1 : 12;
    var yy1 = mm > 1 ? yy : yy - 1;
    return '<a href="' + window.location.pathname + '?yy=' + yy1 + '&mm=' + mm1 + '">&lt;</a>';
  }
  function getNextMonthLink(mm, yy) {
    var mm1 = mm < 12 ? mm + 1 : 1;
    var yy1 = mm < 12 ? yy : yy + 1;
    return '<a href="' + window.location.pathname + '?yy=' + yy1 + '&mm=' + mm1 + '">&gt;</a>';
  }
  function getPrevYearLink(mm, yy) {
    return '<a href="' + window.location.pathname + '?yy=' + (yy - 1) + '&mm=' + mm + '">&lt;&lt;</a>';
  }
  function getNextYearLink(mm, yy) {
    return '<a href="' + window.location.pathname + '?yy=' + (yy + 1) + '&mm=' + mm + '">&gt;&gt;</a>';
  }
  function printHead(mm, yy) {
    var res = '';
    var monthName = mm + '/' + yy;
    res += '<tr><td colspan="2" class="navi-l">' + getPrevYearLink(mm, yy) + ' &nbsp;' + getPrevMonthLink(mm, yy) + '</td>\n';
    res += '<td colspan="3" class="tenthang" onClick="showMonthSelect();">' + monthName + '</td>\n';
    res += '<td colspan="2" class="navi-r">' + getNextMonthLink(mm, yy) + ' &nbsp;' + getNextYearLink(mm, yy) + '</td></tr>\n';
    res += '<tr onClick="alertAbout();">\n';
    for (var i = 0; i <= 6; i++) {
      res += '<td class=ngaytuan>' + DAYNAMES[i] + '</td>\n';
    }
    res += '</tr>\n';
    return res;
  }
  function printEmptyCell() {
    return '<td class=ngaythang><div class=cn>&nbsp;</div> <div class=am>&nbsp;</div></td>\n';
  }
  function printCell(lunarDate, solarDate, solarMonth, solarYear) {
    var cellClass, solarClass, lunarClass, solarColor;
    cellClass = 'ngaythang';
    solarClass = 't2t6';
    lunarClass = 'am';
    solarColor = 'black';
    var dow = (lunarDate.jd + 1) % 7;
    if (dow == 0) {
      solarClass = 'cn';
      solarColor = 'red';
    } else if (dow == 6) {
      solarClass = 't7';
      solarColor = 'green';
    }
    if (solarDate == today.getDate() && solarMonth == today.getMonth() + 1 && solarYear == today.getFullYear()) {
      cellClass = 'homnay';
    }
    if (lunarDate.day == 1 && lunarDate.month == 1) {
      cellClass = 'tet';
    }
    if (lunarDate.leap == 1) {
      lunarClass = 'am2';
    }
    var lunar = lunarDate.day;
    if (solarDate == 1 || lunar == 1) {
      lunar = lunarDate.day + '/' + lunarDate.month;
    }
    var res = '';
    var args = lunarDate.day + ',' + lunarDate.month + ',' + lunarDate.year + ',' + lunarDate.leap;
    args += ',' + lunarDate.jd + ',' + solarDate + ',' + solarMonth + ',' + solarYear;
    res += '<td class="' + cellClass + '"';
    if (lunarDate != null)
      res += ' title="' + getDayName(lunarDate) + '" onClick="alertDayInfo(' + args + ');"';
    res += ' <div style=color:' + solarColor + ' class="' + solarClass + '">' + solarDate + '</div> <div class="' + lunarClass + '">' + lunar + '</div></td>\n';
    return res;
  }
  function printFoot() {
    var res = '';
    res += '<script language="JavaScript" src="amlich-hnd.js"></script>\n';
    return res;
  }
  function showMonthSelect() {
    var home = 'http://www.ifis.uni-luebeck.de/~duc/amlich/JavaScript/';
    window.open(home, 'win2702', 'menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes,location=yes');
  }
  function showYearSelect() {
    window.print();
  }
  function infoCellSelect(id) {
    if (id == 0) {
    }
  }
  function alertDayInfo(dd, mm, yy, leap, jd, sday, smonth, syear) {
    var lunar = new LunarDate(dd, mm, yy, leap, jd);
    var s = getDayString(lunar, sday, smonth, syear);
    s += ' \xe2m l\u1ecbch\n';
    s += getDayName(lunar);
    s += '\nGi\u1edd \u0111\u1ea7u ng\xe0y: ' + getCanHour0(jd) + ' ' + CHI[0];
    s += '\nTi\u1ebft: ' + TIETKHI[getSunLongitude(jd + 1, 7)];
    s += '\nGi\u1edd ho\xe0ng \u0111\u1ea1o: ' + getGioHoangDao(jd);
    alert(s);
  }
  function alertAbout() {
    alert(ABOUT);
  }
  function showVietCal() {
    window.status = getCurrentTime() + ' -+- ' + getTodayString();
    window.window.setTimeout('showVietCal()', 5000);
  }
  var PI = Math.PI;
  function INT(d) {
    return Math.floor(d);
  }
  function jdFromDate(dd, mm, yy) {
    var a, y, m, jd;
    a = INT((14 - mm) / 12);
    y = yy + 4800 - a;
    m = mm + 12 * a - 3;
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }
  function jdToDate(jd) {
    var a, b, c, d, e, m, day, month, year;
    if (jd > 2299160) {
      a = jd + 32044;
      b = INT((4 * a + 3) / 146097);
      c = a - INT(b * 146097 / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    d = INT((4 * c + 3) / 1461);
    e = c - INT(1461 * d / 4);
    m = INT((5 * e + 2) / 153);
    day = e - INT((153 * m + 2) / 5) + 1;
    month = m + 3 - 12 * INT(m / 10);
    year = b * 100 + d - 4800 + INT(m / 10);
    return new Array(day, month, year);
  }
  function NewMoon(k) {
    var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
    T = k / 1236.85;
    T2 = T * T;
    T3 = T2 * T;
    dr = PI / 180;
    Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 1.55e-7 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 8.1e-8 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    ;
    JdNew = Jd1 + C1 - deltat;
    return JdNew;
  }
  function SunLongitude(jdn) {
    var T, T2, dr, M, L0, DL, L;
    T = (jdn - 2451545) / 36525;
    T2 = T * T;
    dr = PI / 180;
    M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 4.8e-7 * T * T2;
    L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
    L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return L;
  }
  function getSunLongitude(dayNumber, timeZone) {
    return INT(SunLongitude(dayNumber - 0.5 - timeZone / 24) / PI * 6);
  }
  function getNewMoonDay(k, timeZone) {
    return INT(NewMoon(k) + 0.5 + timeZone / 24);
  }
  function getLunarMonth11(yy, timeZone) {
    var k, off, nm, sunLong;
    off = jdFromDate(31, 12, yy) - 2415021;
    k = INT(off / 29.530588853);
    nm = getNewMoonDay(k, timeZone);
    sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }
  function getLeapMonthOffset(a11, timeZone) {
    var k, last, arc, i;
    k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    last = 0;
    i = 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc != last && i < 14);
    return i - 1;
  }
  function getLunarDateFromSolarDate(dd, mm, yy, timeZone) {
    var k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;
    dayNumber = jdFromDate(dd, mm, yy);
    k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    a11 = getLunarMonth11(yy, timeZone);
    b11 = a11;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    lunarDay = dayNumber - monthStart + 1;
    var diff = INT((monthStart - a11) / 29);
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return new Array(lunarDay, lunarMonth, lunarYear, lunarLeap);
  }
  function getSolarDateFromLunarDate(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
    var k, a11, b11, off, leapOff, leapMonth, monthStart;
    if (lunarMonth < 11) {
      a11 = getLunarMonth11(lunarYear - 1, timeZone);
      b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
      a11 = getLunarMonth11(lunarYear, timeZone);
      b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }
    k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    off = lunarMonth - 11;
    if (off < 0) {
      off += 12;
    }
    if (b11 - a11 > 365) {
      leapOff = getLeapMonthOffset(a11, timeZone);
      leapMonth = leapOff - 2;
      if (leapMonth < 0) {
        leapMonth += 12;
      }
      if (lunarLeap != 0 && lunarMonth != leapMonth) {
        return new Array(0, 0, 0);
      } else if (lunarLeap != 0 || off >= leapOff) {
        off += 1;
      }
    }
    monthStart = getNewMoonDay(k + off, timeZone);
    return jdToDate(monthStart + lunarDay - 1);
  }
  function getDateInNextMon(dd, mm, yyyy) {
    var d1 = getSolarDateFromLunarDate(dd, mm, yyyy, 0, 7);
    var duong1 = new Date(d1[2], d1[1] - 1, d1[0]);
    if (dd <= 15) {
      duong1.setDate(duong1.getDate() + 30);
    } else {
      duong1.setDate(duong1.getDate() + 20);
    }
    var a1 = getLunarDateFromSolarDate(duong1.getDate(), duong1.getMonth() + 1, duong1.getFullYear(), 7);
    return getSolarDateFromLunarDate(dd, a1[1], a1[2], a1[3], 7);
  }
  function getDateInNextYear(dd, mm, yyyy) {
    var d1 = getSolarDateFromLunarDate(dd, mm, yyyy, 0, 7);
    var duong1 = new Date(d1[2], d1[1] - 1, d1[0]);
    if (mm <= 6) {
      duong1.setMonth(duong1.getMonth() + 13);
    } else {
      duong1.setMonth(duong1.getMonth() + 8);
    }
    var a1 = getLunarDateFromSolarDate(duong1.getDate(), duong1.getMonth() + 1, duong1.getFullYear(), 7);
    return getSolarDateFromLunarDate(dd, a1[1], a1[2], a1[3], 7);
  }
  function getNextSolarDateOfLunarDate(dd) {
    var d = new Date();
    var a1 = getLunarDateFromSolarDate(d.getDate(), d.getMonth() + 1, d.getFullYear(), 7);
    var date;
    if (d.getDate() < dd) {
      date = getSolarDateFromLunarDate(dd, a1[1], a1[2], a1[3], 7);
    } else {
      date = getDateInNextMon(dd, a1[1], a1[2], a1[3], 7);
    }
    return date;
  }
  ;
  function getNextSolarDateOfLunarDateAndMonth(dd, mm) {
    var d = new Date();
    var a1 = getLunarDateFromSolarDate(d.getDate(), d.getMonth() + 1, d.getFullYear(), 7);
    var date;
    if (d.getDate() < dd && d.getMonth() < mm) {
      date = getSolarDateFromLunarDate(dd, mm, a1[2], a1[3], 7);
    } else {
      date = getDateInNextYear(dd, mm, a1[2], a1[3], 7);
    }
    return date;
  }
  return {
    getCurrentLunarDate: function () {
      var now = new Date();
      return getLunarDateFromSolarDate(now.getDate(), now.getMonth() + 1, now.getFullYear(), 7);
    }
  };
});
'use strict';
angular.module('lunaApp').controller('HasCtrl', [
  '$scope',
  '$timeout',
  '$location',
  '$routeParams',
  function ($scope, $timeout, $location, $routeParams) {
    var announces = {
        'created': 'Nh\u1eafc nh\u1edf c\u1ee7a b\u1ea1n \u0111\xe3 \u0111\u01b0\u1ee3c t\u1ea1o',
        'deleted': 'Nh\u1eafc nh\u1edf c\u1ee7a b\u1ea1n \u0111\xe3 \u0111\u01b0\u1ee3c x\xf3a',
        'auth-fail-create': 'Nh\u1eafc nh\u1edf c\u1ee7a b\u1ea1n ch\u01b0a \u0111\u01b0\u1ee3c t\u1ea1o v\xec \u0111\u01b0\u1eddng link x\xe1c nh\u1eadn \u0111\xe3 qu\xe1 c\u0169, kh\xf4ng c\xf2n hi\u1ec7u l\u1ef1c',
        'auth-fail-delete': 'Nh\u1eafc nh\u1edf c\u1ee7a b\u1ea1n ch\u01b0a \u0111\u01b0\u1ee3c x\xf3a v\xec \u0111\u01b0\u1eddng link x\xe1c nh\u1eadn \u0111\xe3 qu\xe1 c\u0169, kh\xf4ng c\xf2n hi\u1ec7u l\u1ef1c'
      };
    var redirects = {
        'created': 'trang ch\u1ee7',
        'deleted': 'trang ch\u1ee7',
        'auth-fail-create': 'trang t\u1ea1o nh\u1eafc nh\u1edf',
        'auth-fail-delete': 'trang x\xf3a nh\u1eafc nh\u1edf'
      };
    var redirectsFooter = {
        'created': 'trang ch\u1ee7',
        'deleted': 'trang ch\u1ee7',
        'auth-fail-create': 't\u1ea1o nh\u1eafc nh\u1edf',
        'auth-fail-delete': 'x\xf3a nh\u1eafc nh\u1edf'
      };
    var paths = {
        'created': '/',
        'deleted': '/',
        'auth-fail-create': '/create',
        'auth-fail-delete': '/delete'
      };
    $scope.redirect = redirects[$routeParams.action];
    $scope.announce = announces[$routeParams.action];
    $scope.path = paths[$routeParams.action];
    $scope.goDelete = function () {
      $scope.path = '/delete';
      $scope.goNow();
    };
    $scope.goNow = function () {
      if ($scope.path != '/') {
        $location.path('/');
        $timeout(function () {
          $location.path($scope.path);
        }, 100);
      } else
        $location.path($scope.path);
    };
    $scope.created = $routeParams.action == 'created';
    $scope.footer.buttons = [{
        name: redirectsFooter[$routeParams.action],
        action: function () {
          $scope.goNow();
        }
      }];
    $scope.$on('$destroy', function () {
      $scope.footer.buttons = [];
    });
    $scope.timer = 10;
    var timer;
    setTimer();
    function setTimer() {
      timer = $timeout(function () {
        if ($scope.timer <= 0) {
          $scope.goNow();
        } else {
          $scope.timer -= 1;
          setTimer();
        }
      }, 1000);
    }
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });
  }
]);
'use strict';
angular.module('lunaApp').controller('HomeCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.footer.buttons = [
      {
        name: 'x\xf3a nh\u1eafc nh\u1edf',
        action: function () {
          $location.path('/delete');
        }
      },
      {
        name: 'h\u01b0\u1edbng d\u1eabn',
        action: function () {
        }
      }
    ];
    $scope.$on('$destroy', function () {
      $scope.footer.buttons = [];
    });
  }
]);
'use strict';
angular.module('lunaApp').controller('DeleteCtrl', [
  '$scope',
  '$http',
  '$location',
  'Validate',
  'User',
  function ($scope, $http, $location, Validate, User) {
    $scope.email = User.getEmail();
    $scope.footer.buttons = [
      {
        name: 'y\xeau c\u1ea7u x\xf3a',
        action: function () {
          $scope.submit();
        }
      },
      {
        name: 'quay l\u1ea1i',
        action: function () {
          $scope.main.back();
        }
      }
    ];
    $scope.$on('$destroy', function () {
      $scope.footer.buttons = [];
    });
    $scope.submit = function () {
      if ($scope.email && Validate.validateEmail($scope.email)) {
        User.setEmail($scope.email);
        $scope.main.createPopup('\u0110ang x\u1eed l\xfd');
        $http.get('/user/delete-event/' + $scope.email).then(function (res) {
          $scope.main.closePopup();
          if (res.data == '0') {
            $scope.main.alert('B\u1ea1n kh\xf4ng c\xf3 nh\u1eafc nh\u1edf n\xe0o.');
          } else {
            $location.path('/confirmation/delete');
          }
        }, function (err) {
          $scope.main.alert('h\u1ec7 th\u1ed1ng \u0111ang b\u1eadn, xin th\u1eed l\u1ea1i sau \xedt ph\xfat');
        });
      } else {
        $scope.main.alert('B\u1ea1n c\u1ea7n nh\u1eadp \u0111\xfang \u0111\u1ecba ch\u1ec9 email.');
      }
    };
  }
]);
'use strict';
angular.module('lunaApp').factory('Validate', function () {
  return {
    validateEmail: function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  };
});
'use strict';
angular.module('lunaApp').controller('FooterCtrl', [
  '$scope',
  function ($scope) {
  }
]);
'use strict';
angular.module('lunaApp').directive('footer', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      if (!scope.footer.buttons.length)
        $('.more').height(20);
      scope.$watch('footer.buttons.length', function (newVal, oldVal) {
        if (!newVal) {
          $('.more').height(20);
        } else {
          $('.more').height(50);
        }
      });
    }
  };
});
'use strict';
angular.module('lunaApp').factory('DateTime', [
  'amduonglich',
  function (amduonglich) {
    var dayInText = [
        'ch\u1ee7 nh\u1eadt',
        'th\u1ee9 hai',
        'th\u1ee9 ba',
        'th\u1ee9 t\u01b0',
        'th\u1ee9 n\u0103m',
        'th\u1ee9 s\xe1u',
        'th\u1ee9 b\u1ea3y'
      ];
    return {
      getCurrentDay: function (inText) {
        var d = new Date().getDay();
        return inText ? dayInText[d] : d;
      },
      getCurrentLunarDate: function (asObject) {
        return this.dates[amduonglich.getCurrentLunarDate()[0] + 1];
      },
      getCurrentLunarMonth: function (asObject) {
        return this.months[amduonglich.getCurrentLunarDate()[1] - 1];
      },
      getCurrentHour: function (asObject) {
        var h = new Date().getHours() || 24;
        return this.hours[(h - 1) % 12];
      },
      getCurrentMinute: function (asObject) {
        return this.minutes[new Date().getMinutes()];
      },
      getCurrentPeriod: function (asObject) {
        var h = new Date().getHours() || 24;
        return this.periods[this.getCurrentHour().periods][h < 13 ? 0 : 1];
      },
      periods: [
        [
          {
            value: 's\xe1ng',
            index: 0,
            standard: 'am'
          },
          {
            value: 'chi\u1ec1u',
            index: 1,
            standard: 'pm'
          }
        ],
        [
          {
            value: 's\xe1ng',
            index: 0,
            standard: 'am'
          },
          {
            value: 't\u1ed1i',
            index: 1,
            standard: 'pm'
          }
        ],
        [
          {
            value: 'tr\u01b0a',
            index: 0,
            standard: 'am'
          },
          {
            value: '\u0111\xeam',
            index: 1,
            standard: 'pm'
          }
        ]
      ],
      hours: [
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
      ],
      minutes: [
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
      ],
      dates: [
        'r\u1eb1m',
        'cu\u1ed1i',
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
        '30'
      ],
      months: [
        {
          value: 'gi\xeang',
          index: 0,
          standard: '01'
        },
        {
          value: 'hai',
          index: 1,
          standard: '02'
        },
        {
          value: 'ba',
          index: 2,
          standard: '03'
        },
        {
          value: 'b\u1ed1n',
          index: 3,
          standard: '04'
        },
        {
          value: 'n\u0103m',
          index: 4,
          standard: '05'
        },
        {
          value: 's\xe1u',
          index: 5,
          standard: '06'
        },
        {
          value: 'b\u1ea3y',
          index: 6,
          standard: '07'
        },
        {
          value: 't\xe1m',
          index: 7,
          standard: '08'
        },
        {
          value: 'ch\xedn',
          index: 8,
          standard: '09'
        },
        {
          value: 'm\u01b0\u1eddi',
          index: 9,
          standard: '10'
        },
        {
          value: 'm\u01b0\u1eddi m\u1ed9t',
          index: 10,
          standard: '11'
        },
        {
          value: 'ch\u1ea1p',
          index: 11,
          standard: '12'
        }
      ],
      repeats: [
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
      ]
    };
  }
]);
'use strict';
angular.module('lunaApp').controller('ConfirmationCtrl', [
  '$scope',
  '$routeParams',
  'User',
  '$http',
  '$location',
  'Share',
  function ($scope, $routeParams, User, $http, $location, Share) {
    $scope.email = User.getEmail();
    var actions = {
        'create': 't\u1ea1o',
        'delete': 'x\xf3a'
      };
    var theOtherActions = {
        'create': 't\u1ea1o',
        'delete': 'x\xf3a'
      };
    $scope.action = actions[$routeParams.action];
    var subactions = {
        'delete': {
          text: 't\u1ea1o th\xeam nh\u1eafc nh\u1edf m\u1edbi',
          link: '/create'
        },
        'create': {
          text: 'x\xf3a nh\u1eafc nh\u1edf \u0111\xe3 t\u1ea1o',
          link: '/delete'
        }
      };
    $scope.subaction = subactions[$routeParams.action];
    $scope.submit = function () {
      if ($routeParams.action == 'create') {
        var form = Share.receive('form-create');
        $scope.main.createPopup('\u0110ang x\u1eed l\xfd');
        $http.post('/user/try-create', form).then(function (res) {
          $scope.main.alert('Ch\xfang t\xf4i \u0111\xe3 g\u1eedi l\u1ea1i email cho b\u1ea1n');
        }, function (err) {
          $scope.main.alert('H\u1ec7 th\u1ed1ng \u0111ang b\u1eadn, xin th\u1eed l\u1ea1i sau \xedt ph\xfat');
        });
      } else {
        $http.get('/user/delete-event/' + $scope.email).then(function (res) {
          $scope.main.closePopup();
          if (res.data == '0') {
            $scope.main.alert('B\u1ea1n kh\xf4ng c\xf3 nh\u1eafc nh\u1edf n\xe0o.');
          } else {
            $scope.main.alert('Ch\xfang t\xf4i \u0111\xe3 g\u1eedi l\u1ea1i email cho b\u1ea1n');
          }
        }, function (err) {
          $scope.main.alert('h\u1ec7 th\u1ed1ng \u0111ang b\u1eadn, xin th\u1eed l\u1ea1i sau \xedt ph\xfat');
        });
      }
    };
    $scope.footer.buttons = [{
        name: subactions[$routeParams.action].text,
        action: function () {
          $location.path(subactions[$routeParams.action].link);
        }
      }];
    $scope.$on('$destroy', function () {
      $scope.footer.buttons = [];
    });
  }
]);
'use strict';
angular.module('lunaApp').factory('User', [
  '$sessionStorage',
  function ($sessionStorage) {
    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    ;
    if (!$sessionStorage.User) {
      $sessionStorage.User = {};
    }
    return {
      getEmail: function () {
        var User = $sessionStorage.User;
        return User.email ? User.email : '';
      },
      setEmail: function (email) {
        $sessionStorage.User.email = email;
        return this;
      }
    };
  }
]);
'use strict';
angular.module('lunaApp').directive('submitInput', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.submit();
          event.preventDefault();
        }
      });
    }
  };
});
'use strict';
angular.module('lunaApp').directive('form', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        $('html, body').animate({ scrollTop: $('.app').offset().top }, 500);
        $timeout(function () {
          if ($(window).scrollTop() + $(window).height() > $(document).height() - 60) {
            $('.more').height(10);
          } else {
            $('.more').height(50);
          }
        }, 100);
        var scrollHandler = $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 60) {
              $('.more').height(10);
            } else {
              $('.more').height(50);
            }
          });
        scope.$on('$destroy', function () {
          $('.more').height(50);
          scrollHandler.off('scroll');
        });
      }
    };
  }
]);
'use strict';
angular.module('lunaApp').directive('main', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      scope.$watch('hasPopup', function () {
      });
    }
  };
});
'use strict';
angular.module('lunaApp').factory('Share', function () {
  var temp = {};
  return {
    send: function (id, data) {
      temp[id] = data;
    },
    receive: function (id) {
      return temp[id];
    }
  };
});