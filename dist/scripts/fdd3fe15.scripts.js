"use strict";angular.module("lunaApp",["ngCookies","ngRoute","ngAnimate","monospaced.elastic"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("lunaApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("lunaApp").directive("appDirective",function(){return{restrict:"A",link:function(a,b){var c=$(b[0]),d=c.find(".time");a.$watch("state.value",function(){switch(a.state.value){case 1:d.removeClass("full-left");break;case 2:d.addClass("full-left");break;case 3:d.addClass("full-left")}})}}}),angular.module("lunaApp").directive("textarea",function(){return{restrict:"E",link:function(a,b){b.focus()}}}),angular.module("lunaApp").directive("quickCreateHome",["$window",function(a){return{restrict:"C",link:function(b,c){c.find("textarea").blur(function(a){$(a.currentTarget).focus()});var d=function(c){switch(c.keyCode){case 27:b.state.value=1,a.removeEventListener("keydown",d),b.$apply();break;case 13:b.state.value=3,a.removeEventListener("keydown",d),b.$apply()}};a.addEventListener("keydown",d)}}}]),angular.module("lunaApp").controller("QuickcreateCtrl",["$scope",function(a){a.input}]);