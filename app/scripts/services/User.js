'use strict';

angular.module('lunaApp')
  .factory('User', function ($sessionStorage) {

    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    };

    var User = $sessionStorage.User || {};

    return {
      save: function(){
        if (!$sessionStorage.User){
          $sessionStorage.User = User;
        }
      },
      getEmail: function(){
        User = $sessionStorage.User || {};
        return User.email?User.email:"";
      },
      setEmail: function(email){
        User.email = email;
        this.save();
        return this;
      },
    };
    
  });
