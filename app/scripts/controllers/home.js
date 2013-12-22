'use strict';

angular.module('lunaApp')
  .controller('HomeCtrl', function ($scope,$location) {
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
