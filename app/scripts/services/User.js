'use strict';

angular.module('lunaApp')
  .factory('User', function ($location,$sessionStorage,$http) {

    function clearUser(){
      $sessionStorage.User.signedIn = false;
      $sessionStorage.User.name = "";
      $sessionStorage.User.email = "";
      $sessionStorage.User.hasFacebook = 0;
    }

    function signIn(callback,silent){
      clearUser();
      $http.get('/account/user')
      .then(function(object){
        var data = object.data;
        if (data==="0") {
          console.log(data);
          clearUser();
          if (!silent) $location.path('/sign-in');
          $scope.main.alert(Strings.CONNECTION_ERROR);
          callback(0);
        } else {
          $sessionStorage.User.signedIn = true;
          $sessionStorage.User.name = data.name;
          $sessionStorage.User.email = data.email;
          $sessionStorage.User.hasFacebook = data.hasFacebook;
          callback(1);
        }
      }, function(err){
        clearUser();
        if (!silent) $location.path('/sign-in');
        $scope.main.alert(Strings.CONNECTION_ERROR);
        callback(0);
      });
    };

    function signOut(){
      clearUser();
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
      signIn: function(callback,silent){
        signIn(callback,silent);
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
