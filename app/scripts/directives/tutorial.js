'use strict';

angular.module('lunaApp')
  .directive('tutorial', function () {
    return {
      template: '<iframe id="youtube" width="560" height="315" src="//www.youtube.com/embed/M_QQeoUetPQ?rel=0" frameborder="0" allowfullscreen></iframe>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	IFramePreloader('youtube');
      }
    };
  });
