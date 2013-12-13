'use strict';

angular.module('lunaApp')
  .directive('form', function ($timeout) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
      	$('html, body').animate({
  	        scrollTop: $(".app").offset().top
  	    }, 500);
        $timeout(function(){
          if($(window).scrollTop() + $(window).height() > $(document).height() - 60) {
              $('.more').height(10);
           } else {
              $('.more').height(50);
           }
         },100);
        var scrollHandler = $(window).scroll(function() {
           if($(window).scrollTop() + $(window).height() > $(document).height() - 60) {
              $('.more').height(10);
           } else {
              $('.more').height(50);
           }
        });
        scope.$on('$destroy', function(){
          $('.more').height(50);
          scrollHandler.off('scroll');
        });
      }
    };
  });
