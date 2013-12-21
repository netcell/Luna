'use strict';

angular.module('lunaApp')
  .controller('LoadingscreenCtrl', function ($scope, $window, $q, $timeout) {
    // if (window.EVERYTHING_LOADED_hfdweiwqkajnc.loaded){
    //         $timeout(function(){
    //             $scope.loading.value = false;
    //         },500);
    // } else {
    //     console.log(2);
    //     window.EVERYTHING_LOADED_hfdweiwqkajnc.callback = function(){
    //         $timeout(function(){
    //             $scope.loading.value = false;
    //         },500);
    //     }
    // };
    // var loader = [
    //     $http.get("fonts/SourceSansPro-ExtraLight.ttf"),
    //     $http.get("fonts/SourceSansPro-Light.ttf"),
    //     $http.get("fonts/SourceSansPro-Semibold.ttf"),
    //     $http.get('views/account-over-used.html'),
    //     $http.get('views/confirmation.html'),
    //     $http.get('views/home.html'),
    //     $http.get('views/create.html'),
    //     $http.get('views/quick-create.html'),
    //     $http.get('views/under-construction.html'),
    //     $http.get('views/has.html')
    // ];
    // var loaded = 0;
    // for (var i = loader.length - 1; i >= 0; i--) {
    //     loader[i].then(function(){
    //         loaded++;
    //         $('.loader').stop();
    //         $('.loader').animate({
    //             width: (loaded/loader.length)*100 + "%"
    //         },500);
    //     });
    // };
    // $q.all(loader).then(function() {
    //     $timeout(function(){
    //         $scope.loading.value = false;
    //     },500);
    // });
  });
