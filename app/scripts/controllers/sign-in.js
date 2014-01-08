'use strict';

angular.module('lunaApp')
  .controller('SignInCtrl', function ($scope, $location, User) {
  	$scope.footer.buttons = [
  		{
    		name:'quay lại',
    		action: function(){
            $location.path('/');
        }
    	}
    ];
    $scope.$on('$destroy', function(){
  		$scope.footer.buttons = [];
  	});
  });
