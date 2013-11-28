'use strict';

angular.module('lunaApp')
  .directive('create', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	scope.$watch('selection.repeat', function(newValue, oldValue, scope) {
	    	switch(newValue.index) {
	    		case 0:
	    			element.find('#create-date').prop('disabled', 'disabled');
	    			element.find('#create-month').prop('disabled', 'disabled');
	    			element
	    			.find('#create-date,#create-date-label,#create-month,#create-month-label')
	    			.addClass('disabled');
	    		break;
	    		case 1:
	    			element.find('#create-date').prop('disabled', false);
	    			element.find('#create-month').prop('disabled', 'disabled');
	    			element
	    			.find('#create-month,#create-month-label')
	    			.addClass('disabled');
	    			element
	    			.find('#create-date,#create-date-label')
	    			.removeClass('disabled');
	    		break;
	    		case 2:
	    			element.find('#create-date').prop('disabled', false);
	    			element.find('#create-month').prop('disabled', false);
	    			element
	    			.find('#create-date,#create-date-label,#create-month,#create-month-label')
	    			.removeClass('disabled');
	    		break;
	    	}
	    });
      }
    };
  });
