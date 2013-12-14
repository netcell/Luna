'use strict';

angular.module('lunaApp')
  .controller('CreateCtrl', function ($scope, $http, $location, Share, Validate, DateTime, User) {
    
    //Selected values
    $scope.selection = {};
    //List of Options
    $scope.options = {};

    $scope.options.hours = DateTime.hours;
    $scope.options.minutes = DateTime.minutes;
    $scope.options.dates = DateTime.dates;
    $scope.options.months = DateTime.months;
    $scope.options.repeats = DateTime.repeats;

    //INIT
    $scope.selection.desc = "";
    $scope.selection.hour = DateTime.getCurrentHour(true);
    $scope.selection.minute = DateTime.getCurrentMinute(true);

    $scope.options.periods = DateTime.periods[$scope.selection.hour.periods];
    $scope.selection.period = DateTime.getCurrentPeriod(true);

    $scope.selection.date = DateTime.getCurrentLunarDate(true);
    $scope.selection.month = DateTime.getCurrentLunarMonth(true);
    $scope.selection.repeat = $scope.options.repeats[0];
    $scope.selection.email = User.getEmail();
    
    var init = 3;

    $scope.$watch('selection.hour', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else {
	    	var period_index = $scope.selection.period.index;
	    	$scope.options.periods=DateTime.periods[newValue.periods];
	    	$scope.selection.period=$scope.options.periods[period_index];
	    }
    });

    $scope.$watch('selection.date', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else if ($scope.selection.repeat.index==0) {
	    	$scope.selection.repeat = $scope.options.repeats[1];
	    }
    });

    $scope.$watch('selection.month', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else if ($scope.selection.repeat.index!=2) {
	    	$scope.selection.repeat = $scope.options.repeats[2];
	    }
    });

    $scope.footer.buttons = [
        {
            name:'đặt nhắc nhở',
            action: function(){
                $scope.submit();
            }
        },
        {
            name:'quay lại',
            action: function(){
                $scope.main.back();
            }
        }
    ];

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });

    $scope.submit = function(){
        if (!$scope.selection.email) 
            $scope.main.alert('Bạn cần nhập email')
        else if (!Validate.validateEmail($scope.selection.email))
            $scope.main.alert('Bạn cần nhập đúng email')
        else {
            var form = {
                udid:   Date.now()+"-"+(((1+Math.random())*0x10000)|0).toString(16),
                desc:   $scope.selection.desc,
                hour:   $scope.selection.hour.value,
                minute: $scope.selection.minute,
                period: $scope.selection.period.standard,
                date:   $scope.selection.date,
                month:  $scope.selection.month.standard,
                repeat: $scope.selection.repeat.index,
                email:  $scope.selection.email
            };
            switch(form.date){
                case 'rằm': form.date = 15; break;
                case 'cuối': form.date = 100; break;
            };
            User.setEmail($scope.selection.email);
            var f = function(){
                $scope.main.createPopup('Đang xử lý');
                $http.post('/user/quick-create', form).then(function(res){
                    $scope.main.closePopup();
                    Share.send("form-create",form);
                    $location.path("/confirmation/create");
                }, function(err){
                    $scope.main.alert('Hệ thống đang bận, xin thử lại sau ít phút');
                });
            }
            if (!form.desc || /^\s*$/.test(form.desc))
                $scope.main.pauseup([
                    "Bạn chưa điền nội dung nhắc nhở.",
                    "Bạn có chắc muốn tiếp tục tạo nhắc nhở không có nội dung không?"
                    ],f);
            else f();
        }
    }
    
  });
