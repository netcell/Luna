'use strict';

angular.module('lunaApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, User, $location) {
  	$scope.email = User.getEmail();
  	var actions = {
  		"create": "tạo",
  		"delete": "xóa"
  	};
    var theOtherActions = {
      "create": "tạo",
      "delete": "xóa"
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

    $scope.footer.buttons = [
        {
            name: subactions[$routeParams.action].text,
            action: function(){
                $location.path(subactions[$routeParams.action].link);
            }
        }
    ];

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });
  });
