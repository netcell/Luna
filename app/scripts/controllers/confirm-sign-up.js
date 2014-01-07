'use strict';

angular.module('lunaApp')
  .controller('ConfirmSignUpCtrl', function ($scope, $location, User) {
  	$scope.main.createPopup('Đang xử lý');
  	User.signIn(function(exitCode){
  		console.log(exitCode);
  		if (exitCode) {
  			$scope.originalEmail = User.getEmail();
  			$scope.email = User.getEmail();
  			console.log(exitCode);
  			$scope.main.closePopup();
  		} else {
  			$location.path('/sign-in');
  			$scope.main.alert('Có lỗi trong quá trình đăng nhập. Xin hãy thử lại sau.');
  		}
  	})
    $scope.footer.buttons = [
        {
            name:'cập nhật',
            action: function(){
                $scope.submit();
            }
        }
    ];

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });

    $scope.submit = function(){
    	$scope.email = $scope.email.replace(" ", "");
    	if ($scope.email != $scope.originalEmail 
    		&& $scope.email && !/^\s*$/.test($scope.email)){
            if (Validate.validateEmail($scope.email)) {
                $scope.main.createPopup('Đang xử lý');
                $http.get('/account/update-email/'+$scope.email).then(function(res){
                	User.setEmail($scope.email);
                	$scope.main.closePopup();
                	$location.path("/event-list");
                }, function(err){
                    $scope.main.alert('hệ thống đang bận, xin thử lại sau ít phút');
                });
            } else {
                $scope.main.alert('Bạn cần nhập đúng địa chỉ email.');    
            }
        } else {
            $location.path("/event-list");
        }
    }
  });
