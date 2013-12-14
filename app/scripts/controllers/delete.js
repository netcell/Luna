'use strict';

angular.module('lunaApp')
  .controller('DeleteCtrl', function ($scope,$http,$location,Validate,User) {
    $scope.email = User.getEmail();
    
    $scope.footer.buttons = [
        {
            name:'yêu cầu xóa',
            action: function(){
                $scope.submit();
            }
        },
        {
            name:'quay lại',
            action: function(){
                $scope.main.back();
            }
        }
    ];

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });

    $scope.submit = function(){
    	if ($scope.email && Validate.validateEmail($scope.email)) {
            $scope.main.createPopup('Đang xử lý');
            $http.get('/user/delete-event/'+$scope.email).then(function(res){
            	if (res.data == "0") {
            		$scope.main.alert('Bạn không có nhắc nhở nào.');
                    $scope.main.back();
            	} else {
                    $scope.main.closePopup();
            		$location.path("/confirmation/delete");
            	}
            }, function(err){
                $scope.main.alert('hệ thống đang bận, xin thử lại sau ít phút');
            });
        } else {
            $scope.main.alert('Bạn cần nhập đúng địa chỉ email.');
        }
    }
  });
