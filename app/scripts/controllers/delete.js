'use strict';

angular.module('lunaApp')
  .controller('DeleteCtrl', function ($scope,$http,$location) {
    $scope.submit = function(){
    	if ($scope.email) {
            $http.get('/user/delete-event/'+$scope.email).then(function(res){
            	console.log(res);
                $location.path("/confirmation-sent");
            }, function(err){
                console.log(err);
            });
        } else {
            alert('Bạn cần nhập email');
        }
    }
  });
