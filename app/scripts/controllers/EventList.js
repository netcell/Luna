////'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($http,$scope,User,$location,Share, Events, Strings) {
    function load(){
      Events.getEventList(function(exitCode,list){
        if (exitCode) {
          $scope.events = [];
          for (var i = list.length - 1; i >= 0; i--) {
            var row = list[i];
            if (row.date == "100") row.date = "30";
            row.minute = parseInt(row.minute)<10?"0"+row.minute:""+row.minute;
            var desc = 'Không có nội dung';
            if (row.message) desc = row.message.length>25?row.message.substr(0,23)+"...":row.message;
            var e = {
              row: JSON.parse(JSON.stringify(row)),
              id: row.id,
              checked: false,
              desc: desc,
              repeat: ['Ngày','Tháng','Năm'][row.repeatType],
              time: (row.hour=="24"?"00":(row.hour<10?"0"+row.hour:row.hour))+':'+row.minute,
              pre: row.pre?row.pre+" "+['tiếng', 'ngày'][row.pre_kind]:'Không',
              status: row.status,
              switchStatus: function(){
                console.log("");
                var oldStatus = this.status;
                this.status = 1-this.status;
                var that = this;
                console.log("");
                $http.get('/account/status-event/'+this.id+"/"+this.status)
                .then(function(object){
                  if (object.data==="0") {
                    this.status = oldStatus;
                    $scope.main.alert(Strings.CONNECTION_ERROR);
                  } else {
                  }
                },function(){
                  this.status = 1-this.status;
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
                    //$scope.main.createPopup('Đang xử lý');
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
            if (row.repeatType ===1) e.time += " ngày "+row.date;
            else if (row.repeatType ===2) e.time += " "+row.date+"/"+row.month;

            $scope.events.push(e)
          };
          $('html, body').animate({
            scrollTop: $(".app").offset().top
          }, 500);
          $scope.main.closePopup();
        } else {
          console.log('');
          $scope.main.alert(Strings.CONNECTION_ERROR);
        }
      });
    }
    if (User.getInfo().signedIn) {
      load();
    } else {
      $scope.main.createPopup('Đang xử lý');
      User.signIn(function(){
        load();   
      });
    }

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
        //$scope.main.createPopup('Đang xử lý');
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
