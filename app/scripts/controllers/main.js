'use strict';

angular.module('lunaApp')
  .controller('MainCtrl', function ($scope, amduonglich, $window, DateTime, $timeout) {
  	$scope.time = {};
  	
		$scope.time.current_day = DateTime.getCurrentDay(true);

		var date = amduonglich.getCurrentLunarDate();

		$scope.time.current_date = date[0];
		$scope.time.current_month = date[1];

    $scope.footer={};
    $scope.footer.buttons = [];

    $scope.hasPopup = false;

    $scope.main={};

    var popupOn = function(){
      $scope.hasPopup = false;
      $timeout(function(){
        $scope.hasPopup = true;
      }, 300);
    }

    $scope.main.showCreateTut = function(){
      $scope.createTut = true;
      popupOn();
    }

    $scope.main.createPopup = function(text, buttons){
      if( Object.prototype.toString.call( text ) === '[object Array]' ) {
             $scope.popupTexts =  text;
      } else $scope.popupTexts = [text];
      $scope.popupButtons = [];
      for (var key in buttons) {
        $scope.popupButtons.push({
          text: key,
          action: buttons[key]
        });
      };
      $scope.hasPopup = false;
      popupOn();
    };

    $scope.main.alert = function(text){
      $scope.main.createPopup(text, {
        "OK": $scope.main.closePopup
      });
    };

    $scope.main.pauseup = function(text, callback){
      $scope.main.createPopup(text, {
        "OK": function(){
          $scope.main.closePopup();
          callback();
        },
        "Cancel": $scope.main.closePopup
      });
    };

    $scope.main.closePopup = function(){
      $timeout(function(){
        $scope.hasPopup = false;
      },300);
    };

    $scope.main.back = function(){
      $window.history.back();
    };
    
  });
