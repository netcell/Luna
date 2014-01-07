'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($scope,User,$location, Events, Strings) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(exitCode){
      if (exitCode) {
        Events.getEventList(function(exitCode,list){
          if (exitCode) {
            $scope.events = [];
            for (var i = list.length - 1; i >= 0; i--) {
              var row = list[i];
              var e = {
                desc: row.message,
                repeat: ['Ngày','Tháng','Năm'][row.repeatType],
                time: row.hour+':'+row.minute,
                pre: row.pre+" "+['tiếng', 'ngày'][row.pre_kind],
                status: row.status == 1
              };
              
              if (row.repeatType ===1) e.time += " "+row.date;
              else if (row.repeatType ===2) e.time += " "+row.date+"/"+row.date;

              $scope.events.push(e)
            };
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
