'use strict';

angular.module('lunaApp')
  .factory('Share', function () {

    var temp = {};

    return {
      send: function (id,data) {
        temp[id]=data;
      },
      receive: function(id) {
        return temp[id];
      }
    };
  });
