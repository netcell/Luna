'use strict';

angular.module('lunaApp')
  .factory('User', function ($sessionStorage) {

    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    };

    return {
      getEmail: function(){
        User = $sessionStorage.User || {};
        return User.email?User.email:"";
      },
      setEmail: function(email){
        $sessionStorage.User.email = email;
        return this;
      },
    };
    
  });
