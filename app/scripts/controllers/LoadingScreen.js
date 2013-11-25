'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $http, $q) {
    var fontExtraLight = $http.get("fonts/SourceSansPro-ExtraLight.ttf");
    var fontLight = $http.get("fonts/SourceSansPro-Light.ttf");
    var fontSemibold = $http.get("fonts/SourceSansPro-Semibold.ttf");
    var css = $http.get("styles/main.css");
    var logo = $http.get("https://dl.dropboxusercontent.com/u/12656349/2393e39d.logo.png");
    $q.all([fontExtraLight, fontLight, fontSemibold]).then(function() {
    	$("head").append($("<link rel='stylesheet' href='styles/main.css' type='text/css' media='screen' />"));
    	$scope.loading.value = false;
    });
  });
