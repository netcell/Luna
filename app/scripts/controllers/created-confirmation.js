'use strict';

angular.module('lunaApp')
  .controller('CreatedConfirmationCtrl', function ($scope,$timeout,$location) {
  	$scope.timer = 10;
  	setTimer();
  	function setTimer(){
  		$timeout(function(){
  			
  			console.log($scope.timer);
	  		if ($scope.timer<=0) {
	  			$location.path("/");
	  		} else {
	  			$scope.timer -= 1;
	  			setTimer();
	  		}
	  	},1000);
  	}
  });
