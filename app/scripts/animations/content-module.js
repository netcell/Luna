//'use strict';

angular.module('lunaApp')
  .animation('.content-module', function ($timeout) {
    return {
      start: function(element, done) {
        //$timeout(function(){
          done();
        //}, 300);
      }
    }
  });
