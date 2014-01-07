'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($scope,User,$location, Events, Strings) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(exitCode){
      if (exitCode) {
        Events.getEventList(function(exitCode,list){
          if (exitCode) {
            $scope.events = list;
            $scope.main.closePopup();
          } else {
            $scope.main.alert(Strings.CONNECTION_ERROR);
          }
        });
      } else {
        $location.path('/sign-in');
        $scope.main.alert(Strings.CONNECTION_ERROR);
      }
    });

  	$scope.counter = {};
  	$scope.counter.checked = 0;

    $scope.delete= function(array){
      $http.post('/account/delete-event', array)
      .then(function(){
        console.log('deleted');
      });
    }
  });
