'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($http,$scope,User,$location,Share, Events, Strings) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(){
      Events.getEventList(function(exitCode,list){
        if (exitCode) {
          $scope.events = [];
          for (var i = list.length - 1; i >= 0; i--) {
            var row = list[i];
            var e = {
              row: JSON.parse(JSON.stringify(row)),
              id: row.id,
              checked: false,
              desc: row.message?row.message:'Không có nội dung',
              repeat: ['Ngày','Tháng','Năm'][row.repeatType],
              time: row.hour+':'+row.minute,
              pre: row.pre?row.pre+" "+['tiếng', 'ngày'][row.pre_kind]:'Không',
              status: row.status,
              switchStatus: function(){
                console.log(this);
                var newStatus = 1-this.status;
                var that = this;
                console.log("");
                $scope.main.createPopup('Đang xử lý');
                $http.get('/account/status-event/'+this.id+"/"+newStatus)
                .then(function(object){
                  if (object.data==="0") {
                    $scope.main.alert(Strings.CONNECTION_ERROR);
                  } else {
                    that.status=newStatus;
                    $scope.main.closePopup();
                  }
                },function(){
                  $scope.main.alert(Strings.CONNECTION_ERROR);
                });
              },
              edit: function(){
                console.log("");
                this.row.switchStatus = this.switchStatus;
                this.row.delete = function(){
                  var id = this.id;
                  $scope.main.pauseup(
                    "Bạn có chắc muốn xóa nhắc nhở này chọn không?"
                  ,function(){
                    $scope.main.createPopup('Đang xử lý');
                    $http.post('/account/delete-event', [id])
                    .then(function(object){
                      if (object.data==="0") {
                        $scope.main.alert(Strings.CONNECTION_ERROR);
                      } else {
                        $scope.main.closePopup();
                        $location.path('/event-list');
                      }
                    }, function(){
                      $scope.main.alert(Strings.CONNECTION_ERROR);
                    });
                  });
                }
                Share.send("event-to-edit",this.row);
                $location.path('/create');
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
    });

  	$scope.deleteList = [];
    var deleteIndexList = [];

    $scope.countChecker = function(){
      $scope.deleteList = [];
      deleteIndexList = [];
      for (var i = $scope.events.length - 1; i >= 0; i--) {
        if ($scope.events[i].checked) {
          $scope.deleteList.push($scope.events[i].id);
          deleteIndexList.push(i);
        }
      };
      return $scope.deleteList;
    }

    $scope.create = function(){
      $location.path('/create');
    }

    $scope.delete= function(){
      $scope.main.pauseup(
        "Bạn có chắc muốn xóa các nhắc nhở đã chọn không?"
      ,function(){
        $scope.main.createPopup('Đang xử lý');
        $http.post('/account/delete-event', $scope.deleteList)
        .then(function(){
          for (var i = 0, length = deleteIndexList.length; i < length; i++) {
            $scope.events.splice(deleteIndexList[i],1);
          };
          $scope.deleteList = [];
          deleteIndexList = [];
          $scope.main.closePopup();
        }, function(){
          $scope.main.alert(Strings.CONNECTION_ERROR);
        });
      });
    }
  });
