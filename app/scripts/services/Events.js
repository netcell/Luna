'use strict';

angular.module('lunaApp')
  .factory('Events', function ($sessionStorage,$http) {

    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    };

    if (!$sessionStorage.Events) {
      $sessionStorage.Events = [];
    }

    function getEventList(callback){
      $http.get('/account/event-list').then(function(object){
        $sessionStorage.Events = object.data;
        callback(1,object.data);
      }, function(){
        callback(0);
      });
    }

    return {
      getEventList: function(callback){
        getEventList(callback);
      }
    }
  });
