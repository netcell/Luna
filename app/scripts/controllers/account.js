//'use strict';

angular.module('lunaApp')
  .controller('AccountCtrl', function (Strings,$http,$scope,$location,User) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(exitCode){
        if (exitCode) {
            $scope.User = User.getInfo();
            $scope.main.closePopup();
        } else {
            $location.path('/sign-in');
            $scope.main.alert('Có lỗi trong quá trình đăng nhập. Xin hãy thử lại sau.');
        }
    });
    $scope.footer.buttons = [
    	{
    		name:'danh sách nhắc nhở',
    		action: function(){
    			$location.path("/event-list");
    		}
    	},{
    		name:'quay lại',
    		action: function(){
                $scope.main.back();
            }
    	}
    ];
    $scope.$on('$destroy', function(){
		$scope.footer.buttons = [];
	});
    $scope.switchEmail = function(){
        console.log("");
        var oldStatus = $scope.User.emailIsOn;
        $scope.User.emailIsOn = 1-$scope.User.emailIsOn;
        console.log('/account/setting/1/'+$scope.User.emailIsOn);
        $http.get('/account/setting/1/'+$scope.User.emailIsOn)
        .then(function(object){
            if (object.data==="0") {
                $scope.User.emailIsOn = oldStatus;
                $scope.main.alert(Strings.CONNECTION_ERROR);
            } else {
            }
        },function(){
            $scope.User.emailIsOn = 1-$scope.User.emailIsOn;
            $scope.main.alert(Strings.CONNECTION_ERROR);
        });
    };
    $scope.switchFacebook = function(){
        if ($scope.User.facebookNotOn===2){
            location.href = '/account/add-account/2';
        } else {
            console.log("");
            var oldStatus = $scope.User.facebookNotOn;
            $scope.User.facebookNotOn = 1-$scope.User.facebookNotOn;
            var that = this;
            console.log("");
            $http.get('/account/setting/2/'+$scope.User.facebookNotOn)
            .then(function(object){
                if (object.data==="0") {
                    $scope.User.facebookNotOn = oldStatus;
                    $scope.main.alert(Strings.CONNECTION_ERROR);
                } else {
                }
            },function(){
            $scope.User.facebookNotOn = 1-$scope.User.facebookNotOn;
            $scope.main.alert(Strings.CONNECTION_ERROR);
            });
        }
    }
    $scope.switchStatus = function(){
        $scope.main.alert(["Tính năng này đang được xây dựng","Chúng tôi sẽ thông báo lại cho bạn khi tính năng này sẵn sàng để sử dụng."])
    }
  });
