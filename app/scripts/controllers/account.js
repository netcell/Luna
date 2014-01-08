'use strict';

angular.module('lunaApp')
  .controller('AccountCtrl', function ($scope,$location) {
    $scope.footer.buttons = [
    	{
    		name:'danh sách nhắc nhở',
    		action: function(){
    			$location.path("/event-list");
    		}
    	},{
    		name:'quay lại',
    		action: function(){
                $scope.main.back();
            }
    	}
    ];
    $scope.$on('$destroy', function(){
		$scope.footer.buttons = [];
	});
  });
