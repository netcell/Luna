'use strict';

angular.module('lunaApp')
  .controller('UpdateEmailCtrl', function ($location,$http,$scope,Strings,User, Validate) {

    $scope.footer.buttons = [
        {
            name:'cập nhật',
            action: function(){
                $scope.submit();
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

    $scope.submit = function(){
    	if ($scope.email){
            if (Validate.validateEmail($scope.email)) {
                $scope.main.createPopup('Đang xử lý');
                $http.get('/account/update-email/'+$scope.email).then(function(res){
                	if (res.data !== "1") {
                        $scope.main.alert(Strings.CONNECTION_ERROR);
                    } else {
                        User.setEmail($scope.email);
                        $scope.main.closePopup();
                        $location.path("/confirmation/email");
                    }
                }, function(err){
                    $scope.main.alert(Strings.CONNECTION_ERROR);
                });
            } else {
                $scope.main.alert('Bạn cần nhập đúng địa chỉ email.');    
            }
        } else {
            $scope.main.alert('Bạn cần nhập địa chỉ email.');
        }
    }
  });
