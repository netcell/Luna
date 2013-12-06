'use strict';

angular.module('lunaApp')
  .controller('HomeCtrl', function ($scope,$location) {
    $scope.footer.buttons = [
    	{
    		name:'xóa nhắc nhở',
    		action: function(){
    			$location.path("/delete");
    		}
    	},
    	{
    		name:'hướng dẫn',
    		action: function(){

    		}
    	}
    ];
    $scope.$on('$destroy', function(){
		$scope.footer.buttons = [];
	});
  });
