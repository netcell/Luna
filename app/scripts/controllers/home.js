'use strict';

angular.module('lunaApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.footer.buttons = [
    	{
    		name:'xóa nhắc nhở',
    		action: function(){
    			
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
