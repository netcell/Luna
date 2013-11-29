'use strict';

angular.module('lunaApp')
  .controller('MainCtrl', function ($scope, amduonglich) {
  	$scope.time = {};
  	$scope.time.day = [
  		'chủ nhật',
  		'thứ hai',
  		'thứ ba',
  		'thứ bốn',
  		'thứ năm',
  		'thứ sáu',
  		'thứ bảy'
  	];
  	requestAnimationFrame(function(){
  		$scope.time.current_day = $scope.time.day[new Date().getDay()];
  		var date = amduonglich.getCurrentLunarDate();
  		$scope.time.current_date = date[0];
  		$scope.time.current_month = date[1];
  	})
  });
