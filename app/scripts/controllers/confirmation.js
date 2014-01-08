'use strict';

angular.module('lunaApp')
	.controller('ConfirmationCtrl', function ($scope, $routeParams, User, $http, $location, Share) {
		$scope.email = User.getEmail();
		var actions = {
			"create": "tạo nhắc nhở",
			"delete": "xóa nhắc nhở",
			"email" : "cập nhật email"
		};
		$scope.action = actions[$routeParams.action];
		var subactions = {
			"delete": {
				text: "tạo thêm nhắc nhở mới",
				link: "/create"
			},
			"create": {
				text: "xóa nhắc nhở đã tạo",
				link: "/delete"
			}
		};
		$scope.subaction = subactions[$routeParams.action];

		var images = {
			"delete": 'images/confirmation_delete.png',
			"create": 'images/confirmation_create.png'
		};

		$scope.image = images[$routeParams.action];

		$scope.submit = function(){
			$scope.main.createPopup('Đang xử lý');
			if ($routeParams.action === "create") {
				var form = Share.receive("form-create");
				$http.post('/user/try-create', form).then(function(res){
					if (res.data !== "1") {
						$scope.main.alert(Strings.CONNECTION_ERROR);
					} else {
						$scope.main.alert('Chúng tôi đã gửi lại email cho bạn');
					}
				}, function(err){
					$scope.main.alert(Strings.CONNECTION_ERROR);
				});
			} else if ($routeParams.action === "delete") {
				$http.get('/user/delete-event/'+$scope.email).then(function(res){
					$scope.main.closePopup();
					if (res.data !== "1") {
						$scope.main.alert('Bạn không có nhắc nhở nào.');
					} else {
						$scope.main.alert('Chúng tôi đã gửi lại email cho bạn');
					}
				}, function(err){
					$scope.main.alert(Strings.CONNECTION_ERROR);
				});
			} else {
				$http.get('/account/update-email/'+$scope.email).then(function(res){
					if (res.data !== "1") {
						$scope.main.alert(Strings.CONNECTION_ERROR);
					} else {
						$scope.main.alert('Chúng tôi đã gửi lại email cho bạn');
					}
				}, function(err){
					$scope.main.alert(Strings.CONNECTION_ERROR);
				});
			}
		}

		if ($scope.subaction) $scope.footer.buttons = [
				{
					name: $scope.subaction.text,
					action: function(){
							$location.path($scope.subaction.link);
					}
				}
		];

		$scope.$on('$destroy', function(){
				$scope.footer.buttons = [];
		});
	});
