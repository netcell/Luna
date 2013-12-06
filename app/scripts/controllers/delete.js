'use strict';

angular.module('lunaApp')
  .controller('DeleteCtrl', function ($scope,$http,$location,Validate) {
    $scope.submit = function(){
    	if ($scope.email && Validate.validateEmail($scope.email)) {
            $http.get('/user/delete-event/'+$scope.email).then(function(res){
            	console.log(res);
            	if (res.data == "0") {
            		alert('Bạn không có nhắc nhở nào.');
            	} else {
            		$location.path("/confirmation-sent");
            	}
            }, function(err){
                console.log(err);
            });
        } else {
            alert('Bạn cần nhập đúng địa chỉ email.');
        }
    }
  });
