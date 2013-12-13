'use strict';

angular.module('lunaApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, User) {
  	$scope.email = User.getEmail();
  	var actions = {
  		"create": "tạo",
  		"delete": "xóa"
  	};
  	$scope.action = actions[$routeParams.action];
  	var subactions = {
  		"create": {
  			text: "tạo thêm nhắc nhở mới",
  			link: "#/create"
  		},
  		"delete": {
  			text: "chọn xóa một hoặc nhiều nhắc nhở đã tạo",
  			link: "#/delete"
  		}
  	};
  	$scope.subaction = subactions[$routeParams.action];
  });
