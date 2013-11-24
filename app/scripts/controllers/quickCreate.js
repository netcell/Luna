'use strict';

angular.module('lunaApp')
  .controller('QuickcreateCtrl', function ($scope) {
    var input = $scope.input;
    $scope.$watch('input', function(input){
    	$scope.token = ngram(tokenize(input), 2);
    });
    function tokenize(string) {
    	return string.split(' ');
    }
    function ngram (array, n){
    	var ngram = [];
    	for (var i = 0; i < array.length - n + 1; i++) {
    		var gram = array[i];
    		for (var j = 1; j < n ; j++) {
    			gram += " "+array[i+j];
    		}
    		ngram.push(gram);
    	}
    	return ngram;
    }
    // function parse(array){
    // 	var option = {
    // 		desc : "",
    // 		hour : -1,
    // 		minute : -1,
    // 		day : -1,
    // 		date : -1,
    // 		month : -1,
    // 		year : "",
    // 		lunar: true,
    // 		repeat : "",
    // 	}
    	
    // }
  });
