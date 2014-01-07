'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($http,$scope,User,$location, Events, Strings) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(exitCode){
      if (exitCode) {
        Events.getEventList(function(exitCode,list){
          if (exitCode) {
            $scope.events = [];
            for (var i = list.length - 1; i >= 0; i--) {
              var row = list[i];
              var e = {
                id: row.id,
                checked: false,
                desc: row.message?row.message:'Không có nội dung',
                repeat: ['Ngày','Tháng','Năm'][row.repeatType],
                time: row.hour+':'+row.minute,
                pre: row.pre?row.pre+" "+['tiếng', 'ngày'][row.pre_kind]:'Không',
                status: row.status,
                switchStatus: function(){
                  this.status=1-this.status;
                  $http.get('/account/status-event/'+row.id+"/"+this.status);
                }
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

  	$scope.deleteList = [];
    var deleteIndexList = [];

    $scope.countChecker = function(){
      for (var i = $scope.events.length - 1; i >= 0; i--) {
        if ($scope.events[i].checked) {
          $scope.deleteList.push($scope.events[i].id);
          deleteIndexList.push(i);
        }
      };
      return deleteList;
    }

    $scope.delete= function(){
      $scope.main.createPopup('Đang xử lý');
      $http.post('/account/delete-event', deleteList)
      .then(function(){
        for (var i = 0, length = deleteIndexList.length; i < length; i++) {
          $scope.events.splice(i,1);
        };
        $scope.main.closePopup();
      }, function(){
        $scope.main.alert(Strings.CONNECTION_ERROR);
      });
    }
  });
