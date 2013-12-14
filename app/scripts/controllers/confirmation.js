'use strict';

angular.module('lunaApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, User, $http, $location, Share) {
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

    $scope.submit = function(){
      if ($routeParams.action == "create") {
        var form = Share.receive("form-create");
        $scope.main.createPopup('Đang xử lý');
        $http.post('/user/try-create', form).then(function(res){
            $scope.main.alert('Chúng tôi đã gửi lại email cho bạn');
        }, function(err){
            $scope.main.alert('Hệ thống đang bận, xin thử lại sau ít phút');
        });
      } else {
        $http.get('/user/delete-event/'+$scope.email).then(function(res){
          $scope.main.closePopup();
            if (res.data == "0") {
            $scope.main.alert('Bạn không có nhắc nhở nào.');
          } else {
            $scope.main.alert('Chúng tôi đã gửi lại email cho bạn');
          }
        }, function(err){
            $scope.main.alert('hệ thống đang bận, xin thử lại sau ít phút');
        });
      }
    }

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
