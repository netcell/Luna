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
    var redirectsFooter = {
      "created"           : "trang chủ",
      "deleted"           : "trang chủ",
      "auth-fail-create"  : "tạo nhắc nhở",
      "auth-fail-delete"  : "xóa nhắc nhở",
    };
    var paths = {
      "created"           : "/",
      "deleted"           : "/",
      "auth-fail-create"  : "/create",
      "auth-fail-delete"  : "/delete",
    };

    $scope.redirect = redirects[$routeParams.action];
    $scope.announce = announces[$routeParams.action];
    $scope.path = paths[$routeParams.action];
    $scope.goDelete = function(){
      $scope.path = "/delete";
      $scope.goNow();
    }
    $scope.goNow = function(){
      if($scope.path!="/") {
        $location.path("/");
        $timeout(function(){$location.path($scope.path);},100);
      } else $location.path($scope.path);
    }
    $scope.created = $routeParams.action == "created";

    $scope.footer.buttons = [
      {
        name: redirectsFooter[$routeParams.action],
        action: function(){
          $scope.goNow();
        }
      }
    ];
    $scope.$on('$destroy', function(){
      $scope.footer.buttons = [];
    });

    $scope.timer = 10;
  	var timer;
    setTimer();
  	function setTimer(){
  		timer = $timeout(function(){
	  		if ($scope.timer<=0) {
	  			$scope.goNow();
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
