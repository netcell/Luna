'use strict';

angular.module('lunaApp')
  .controller('EventlistCtrl', function ($scope) {
    $scope.main.createPopup('Đang xử lý');
    User.signIn(function(exitCode){
      if (exitCode) {
        $scope.main.closePopup();
      } else {
        $location.path('/sign-in');
        $scope.main.alert('Có lỗi trong quá trình đăng nhập. Xin hãy thử lại sau.');
      }
    })
  	$scope.events = [{
  		desc: 	"fdsafdsafdsafdsa",
  		repeat: "Năm",
  		time: 	"06:09 06/09",
  		pre: 	"6 tiếng",
  		status: true
  	},{
  		desc: 	"fdsa iuop fdsa cvx bv",
  		repeat: "Ngày",
  		time: 	"06:09",
  		pre: 	"Không",
  		status: false
  	},{
  		desc: 	"fd ewwqp dfs cvx kl",
  		repeat: "Tháng",
  		time: 	"06:09 ngày 06",
  		pre: 	"3 ngày",
  		status: true
  	}];

  	$scope.counter = {};
  	$scope.counter.checked = 0;
  });
