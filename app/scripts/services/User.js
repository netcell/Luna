'use strict';

angular.module('lunaApp')
  .factory('User', function () {

    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    }

    function updateUser(){
      return true;
    }

    return {
      clone: function(){
        return clone(this);
      },
      set: function(user){
        for (key in user) {
          this[key] = user[key];
        }
        updateUser();
        return this;
      },
      getEmail: function(){
        return this.email?this.email:"";
      },
      setEmail: function(email){
        this.email = email;
        updateUser();
        return this;
      },
    };
  });
