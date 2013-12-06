'use strict';

angular.module('lunaApp')
  .controller('CreatedConfirmationCtrl', function ($scope,$timeout,$location,$routeParams) {
  	var announces = {
      "created"           : "Nhắc nhở của bạn đã được tạo",
      "deleted"           : "Nhắc nhở của bạn đã được xóa",
      "auth-fail-create"  : "Nhắc nhở của bạn chưa được tạo vì đường link xác nhận đã quá cũ, không còn hiệu lực",
      "auth-fail-delete"  : "Nhắc nhở của bạn chưa được xóa vì đường link xác nhận đã quá cũ, không còn hiệu lực",
    };
    var redirects = {
      "created"           : "trang chủ",
      "deleted"           : "trang chủ",
      "auth-fail-create"  : "trang tạo nhắc nhở",
      "auth-fail-delete"  : "trang xóa nhắc nhở",
    };
    var paths = {
      "created"           : "/",
      "deleted"           : "/",
      "auth-fail-create"  : "/create",
      "auth-fail-delete"  : "/delete",
    };
    $scope.redirect = redirects[$routeParams.action];
    $scope.announce = announces[$routeParams.action];
    $scope.created = $routeParams.action == "created";
    $scope.$apply();
    $scope.timer = 10;
  	var timer;
    setTimer();
  	function setTimer(){
  		timer = $timeout(function(){
  			console.log($scope.timer);
	  		if ($scope.timer<=0) {
	  			$location.path(paths[$routeParams.action]);
	  		} else {
	  			$scope.timer -= 1;
	  			setTimer();
	  		}
	  	},1000);
  	}
    $scope.$on('$destroy', function(){
      $timeout.cancel(timer);
    })
  });
