'use strict';

angular.module('lunaApp')
  .factory('User', function ($sessionStorage) {

    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    };

    if (!$sessionStorage.User) {
      $sessionStorage.User = {};
    }

    return {
      getEmail: function(){
        var User = $sessionStorage.User;
        return User.email?User.email:"";
      },
      setEmail: function(email){
        $sessionStorage.User.email = email;
        return this;
      },
      signIn: function(name){
        $sessionStorage.User.signedIn = true;
        $sessionStorage.User.name = name;
      },
      signOut: function(){
        $sessionStorage.User.signedIn = false;
        $sessionStorage.User.name = "";
      },
      getInfo: function(){
        var User = $sessionStorage.User;
        return User;
      }
    };
    
  });
