'use strict';

angular.module('lunaApp')
  .controller('DeleteCtrl', function ($scope,$http) {
    $scope.submit = function(){
    	if ($scope.email) {
            $http.get('/user/delete-event/'+$scope.email).then(function(res){
                $location.path("/confirmation-sent");
            }, function(err){
                console.log(err);
            });
        } else {
            alert('Bạn cần nhập email');
        }
    }
  });
