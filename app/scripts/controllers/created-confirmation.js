'use strict';

angular.module('lunaApp')
  .controller('CreatedConfirmationCtrl', function ($scope,$timeout,$location,$routeParams) {
  	var announces = {
      "created" : "Nhắc nhở của bạn đã được tạo.",
      "deleted"  : "Nhắc nhở của bạn đã được xóa."
    };
    $scope.announce = announces[$routeParams.action];
    $scope.deleted = $routeParams.action == "deleted";
    $scope.$apply();
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
