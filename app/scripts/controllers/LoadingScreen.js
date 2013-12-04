'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $http, $q, $timeout) {
    var fontExtraLight = $http.get("fonts/SourceSansPro-ExtraLight.ttf");
    var fontLight = $http.get("fonts/SourceSansPro-Light.ttf");
    var fontSemibold = $http.get("fonts/SourceSansPro-Semibold.ttf");
    var css = $http.get("dynamic/loading.css");
    var view1 = $http.get('views/account-over-used.html');
    var view2 = $http.get('views/confirm-sent.html');
    var view3 = $http.get('views/home.html');
    var view4 = $http.get('views/create.html');
    var view5 = $http.get('views/quick-create.html');
    var view6 = $http.get('views/under-construction.html');
    $q.all([fontExtraLight, fontLight, fontSemibold,css,view1,view2,view3,view4,view5,view6]).then(function() {
    	$("head").append($("<link rel='stylesheet' href='dynamic/loading.css' type='text/css' media='screen' />"));
        $scope.loading.value = false;
        $scope.$apply();
    });
  });
