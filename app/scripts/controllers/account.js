'use strict';

angular.module('lunaApp')
  .controller('AccountCtrl', function ($scope,$location,User) {
    // $scope.main.createPopup('Đang xử lý');
    // User.signIn(function(exitCode){
    //     if (exitCode) {
    //         $scope.User = User.getInfo();
    //         $scope.main.closePopup();
    //     } else {
    //         $location.path('/sign-in');
    //         $scope.main.alert('Có lỗi trong quá trình đăng nhập. Xin hãy thử lại sau.');
    //     }
    // })
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
    $scope.switchStatus = function(){
        $scope.main.alert(["Tính năng này đang được xây dựng","Chúng tôi sẽ thông báo lại cho bạn khi tính năng này sẵn sàng để sử dụng."])
    }
  });
