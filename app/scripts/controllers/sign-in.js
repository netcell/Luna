'use strict';

angular.module('lunaApp')
  .controller('SignInCtrl', function ($scope, User) {
  	$scope.footer.buttons = [
  		{
    		name:'quay lại',
    		action: function(){
                $scope.main.back();
            }
    	}
    ];
    $scope.$on('$destroy', function(){
  		$scope.footer.buttons = [];
  	});
    $scope.signIn = function(serviceName){
      var signInExitCode = User.signIn(serviceName);
    }
  });
