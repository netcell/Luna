//'use strict';

angular.module('lunaApp')
  .controller('HomeCtrl', function ($scope,$location,User) {
    User.signIn(function(){
        if (User.getInfo().signedIn) $location.path('/event-list');
    },true);
    $scope.footer.buttons = [
    	{
    		name:'xóa nhắc nhở',
    		action: function(){
    			$location.path("/delete");
    		}
    	},{
    		name:'hướng dẫn',
    		action: function(){
                window.open('http://www.youtube.com/watch?v=M_QQeoUetPQ&feature=youtu.be', '_blank').focus();
            }
    	}
    ];
    $scope.$on('$destroy', function(){
		$scope.footer.buttons = [];
	});
  });
