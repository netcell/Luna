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

    $scope.hasPopup = false;

    $scope.main={};

    $scope.main.createPopup = function(text, buttons){
      $scope.popupText = text;
      $scope.popupButtons = [];
      for (var key in buttons) {
        $scope.popupButtons.push({
          text: key,
          action: buttons[key]
        });
      };
      $scope.hasPopup = true;
    };

    $scope.main.alert = function(text){
      $scope.main.createPopup(text, {
        "OK": $scope.main.closePopup
      });
    };

    $scope.main.closePopup = function(){
      $scope.hasPopup = false;
    }

    $scope.main.back = function(){
      $window.history.back();
    };
    
  });
