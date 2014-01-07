'use strict';

angular.module('lunaApp')
  .factory('User', function ($location,$sessionStorage,$http) {

    function signIn(callback){
      $sessionStorage.User.signedIn = false;
      $sessionStorage.User.name = "";
      $sessionStorage.User.email = "";
      $http.get('/account/user')
      .then(function(object){
        var data = object.data;
        $sessionStorage.User.signedIn = true;
        $sessionStorage.User.name = data.name;
        $sessionStorage.User.email = data.email;
        callback(1);
      }, function(err){
        $sessionStorage.User.signedIn = false;
        $sessionStorage.User.name = "";
        $sessionStorage.User.email = "";
        callback(0);
      });
    };

    function signOut(){
      $sessionStorage.User.signedIn = false;
      $sessionStorage.User.name = "";
      $sessionStorage.User.email = "";
      $http.get('/logout')
      .then(function(){
        return 1;
      }, function(){
        return 2;
      });
    };

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
      signIn: function(callback){
        signIn(callback);
      },
      signOut: function(){
        signOut();
      },
      getInfo: function(){
        var User = $sessionStorage.User;
        return User;
      }
    };
    
  });
