'use strict';

angular.module('lunaApp')
  .controller('ConfirmSignUpCtrl', function ($scope, User) {
  	$scope.email = User.getEmail();
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
    	if ($scope.email){
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
            $scope.main.alert('Bạn cần nhập địa chỉ email.');
        }
    }
  });
