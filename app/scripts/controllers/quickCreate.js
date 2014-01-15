//'use strict';

angular.module('lunaApp')
  .controller('QuickcreateCtrl', function ($scope) {
    var input = $scope.input;
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
  });
