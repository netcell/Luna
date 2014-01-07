'use strict';

angular.module('lunaApp')
  .controller('UpdateEmailCtrl', function ($scope,$routeParams) {
    $scope.required = $routeParams.required == "required";
    $scope.footer.buttons = [
        {
            name:'cập nhật',
            action: function(){
                $scope.submit();
            }
        }
    ];
    if (!required) $scope.footer.buttons.push({
        name:'quay lại',
        action: function(){
            $scope.main.back();
        }
    })

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });

    $scope.submit = function(){
    	if ($scope.email){
            if (Validate.validateEmail($scope.email)) {
                User.setEmail($scope.email);
                $scope.main.createPopup('Đang xử lý');
                $http.get('/account/update-email/'+$scope.email).then(function(res){
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
