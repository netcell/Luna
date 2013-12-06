'use strict';

angular.module('lunaApp')
  .controller('MainCtrl', function ($scope, amduonglich, $window) {
  	$scope.time = {};
  	$scope.time.day = [
  		'chủ nhật',
  		'thứ hai',
  		'thứ ba',
  		'thứ tư',
  		'thứ năm',
  		'thứ sáu',
  		'thứ bảy'
  	];
		$scope.time.current_day = $scope.time.day[new Date().getDay()];
		var date = amduonglich.getCurrentLunarDate();
		$scope.time.current_date = date[0];
		$scope.time.current_month = date[1];
    $scope.footer={};
    $scope.footer.buttons = [];
    $scope.main={};
    $scope.main.back = function(){
      $window.history.back();
    };
  });
