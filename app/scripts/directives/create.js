'use strict';

angular.module('lunaApp')
  .directive('create', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	element.find('textarea').blur();
      	scope.$watch('selection.date', function(newValue, oldValue, scope) {
	    	switch(newValue) {
	    		case 'rằm':
	    			element.find('#create-date')
	    			.removeClass('size-2')
	    			.addClass('size-3');
	    			if (scope.selection.repeat.index!=2)
		    			element.find('#create-month-label')
		    			.addClass('disabled');
	    		break;
	    		case 'cuối':
	    			element.find('#create-date')
	    			.removeClass('size-2')
	    			.addClass('size-3');
	    			element.find('#create-month-label')
	    			.removeClass('disabled');
	    		break;
	    		default:
	    			element.find('#create-date')
	    			.removeClass('size-3')
	    			.addClass('size-2');
	    			if (scope.selection.repeat.index!=2)
		    			element.find('#create-month-label')
		    			.addClass('disabled');
	    		break;
	    	}
	    });
      	scope.$watch('selection.repeat', function(newValue, oldValue, scope) {
	    	switch(newValue.index) {
	    		case 0:
	    			//element.find('#create-date').prop('disabled', 'disabled');
	    			//element.find('#create-month').prop('disabled', 'disabled');
	    			element
	    			.find('#create-date,#create-date-label,#create-month,#create-month-label')
	    			.addClass('disabled');
	    		break;
	    		case 1:
	    			//element.find('#create-date').prop('disabled', false);
	    			//element.find('#create-month').prop('disabled', 'disabled');
	    			element
	    			.find('#create-month')
	    			.addClass('disabled');
	    			if(scope.selection.date=='cuối') {
	    				element.find('#create-month-label')
	    				.removeClass('disabled');
	    			} else {
	    				element.find('#create-month-label')
	    				.addClass('disabled');
	    			}
	    			element
	    			.find('#create-date,#create-date-label')
	    			.removeClass('disabled');
	    		break;
	    		case 2:
	    			//element.find('#create-date').prop('disabled', false);
	    			//element.find('#create-month').prop('disabled', false);
	    			element
	    			.find('#create-date,#create-date-label,#create-month,#create-month-label')
	    			.removeClass('disabled');
	    		break;
	    	}
	    });
		var scrollHandler = $(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() > $(document).height() - 60) {
		    	$('.more').height(0);
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
