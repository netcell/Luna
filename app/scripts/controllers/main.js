'use strict';

angular.module('lunaApp')
  .controller('MainCtrl', function ($scope, amduonglich, $window, DateTime) {
  	$scope.time = {};
  	
		$scope.time.current_day = DateTime.getCurrentDay(true);

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
