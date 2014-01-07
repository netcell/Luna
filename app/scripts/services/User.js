'use strict';

angular.module('lunaApp')
  .factory('User', function ($location,$sessionStorage,$http) {

    function signIn(serviceName){
      $http.get('/auth/'+serviceName.toLowerCase())
      .then(function(data){
        $sessionStorage.User.signedIn = true;
        $sessionStorage.User.name = data.name;
        $sessionStorage.User.email = data.email;
        if (data.signUp) {
          $location.path('/confirm-sign-up');
        } else {
          $location.path('/event-list');
        }
      }, function(err){
        $sessionStorage.User.signedIn = false;
        $sessionStorage.User.name = "";
        $sessionStorage.User.email = "";
        return 2;
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
      signIn: function(serviceName){
        signIn(serviceName);
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
