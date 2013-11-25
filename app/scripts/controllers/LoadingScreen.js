'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $http, $q, $timeout) {
    var fontExtraLight = $http.get("fonts/SourceSansPro-ExtraLight.ttf");
    var fontLight = $http.get("fonts/SourceSansPro-Light.ttf");
    var fontSemibold = $http.get("fonts/SourceSansPro-Semibold.ttf");
    var css = $http.get("dynamic/loading.css");
    var logo = $http.get("https://dl.dropboxusercontent.com/u/12656349/2393e39d.logo.png");
    $q.all([fontExtraLight, fontLight, fontSemibold]).then(function() {
    	$("head").append($("<link rel='stylesheet' href='dynamic/loading.css' type='text/css' media='screen' />"));
    	$timeout(function(){
    		$scope.loading.value = false;
    	},100);
    });
  });
