'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $http, $q, $timeout) {
    var fontExtraLight = $http.get("fonts/SourceSansPro-ExtraLight.ttf");
    var fontLight = $http.get("fonts/SourceSansPro-Light.ttf");
    var fontSemibold = $http.get("fonts/SourceSansPro-Semibold.ttf");
    var view1 = $http.get('views/account-over-used.html');
    var view2 = $http.get('views/confirmation.html');
    var view3 = $http.get('views/home.html');
    var view4 = $http.get('views/create.html');
    var view5 = $http.get('views/quick-create.html');
    var view6 = $http.get('views/under-construction.html');
    var view7 = $http.get('views/has.html');
    $q.all([fontExtraLight, fontLight, fontSemibold, view1,view2,view3,view4,view5,view6,view7]).then(function() {
        $scope.loading.value = false;
    });
  });
