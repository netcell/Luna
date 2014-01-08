'use strict';

angular.module('lunaApp')
  .controller('CreateCtrl', function (Strings, $scope, $http, $location, Share, Validate, DateTime, User) {
    
    $scope.User = User.getInfo();

    //Selected values
    $scope.selection = {};
    //List of Options
    $scope.options = {};

    $scope.options.hours = DateTime.hours;
    $scope.options.pre_kind = [
        { value: 'tiếng' , index: 0 },
        { value: 'ngày', index: 1 }
    ];
    var pre = [
        [
            '00',
            '01','02','03','04','05','06','07','08',
            '09','10','11','12','13','14','15','16',
            '17','18','19','20','21','22','23','24'
        ],
        [ '00', '01', '02', '03', '04', '05' ]
    ];
    $scope.options.minutes = DateTime.minutes;
    $scope.options.dates = DateTime.dates;
    $scope.options.months = DateTime.months;
    $scope.options.repeats = DateTime.repeats;

    var data = Share.receive("event-to-edit");
    
    //INIT
    $scope.selection.desc = data.message?data.message:"";
    
    var h = false;
    var p = false;

    if (data.hour) {
        var hp = DateTime.convert24to12(data.hour);
        h = hp.hour;
        p = hp.period;
    }

    if (data.minute) {
        data.minute = parseInt(data.minute)<10?"0"+data.minute:""+data.minute;
    }

    $scope.selection.hour = h?h:DateTime.getCurrentHour(true);
    $scope.options.periods = DateTime.periods[$scope.selection.hour.periods];
    $scope.selection.period = p?p:DateTime.getCurrentPeriod(true);

    $scope.selection.pre_kind = $scope.options.pre_kind[data.pre_kind?parseInt(data.pre_kind):1];
    $scope.options.pre = pre[$scope.selection.pre_kind.index];
    $scope.selection.pre = data.pre?data.pre:'00';
    $scope.selection.minute = data.minute?data.minute:DateTime.getCurrentMinute(true);

    $scope.selection.date = data.date?DateTime.objectLunarDate(parseInt(data.date)):DateTime.getCurrentLunarDate(true);
    $scope.selection.month = data.month?DateTime.objectLunarMonth(parseInt(data.month)):DateTime.getCurrentLunarMonth(true);
    $scope.selection.repeat = $scope.options.repeats[data.repeat?parseInt(data.repeat):0];
    $scope.selection.email = User.getEmail();
    
    var init = 4;

    $scope.$watch('selection.pre_kind', function(newValue, oldValue, scope) {
        if (init) {
            init--;
        } else {
            $scope.options.pre = pre[newValue.index];
            $scope.selection.pre = '00';
        }
    });

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

    $scope.data = data;

    $scope.submitText = data?"cập nhật":"tạo nhắc nhở";
    $scope.deleteText = "xóa nhắc nhở";
    $scope.activeText = data.status?"tắt nhắc nhở":"bật nhắc nhở";

    $scope.delete = data.delete;
    $scope.switchStatus = data.switchStatus;

    $scope.footer.buttons = [
        {
            name:$scope.submitText,
            action: $scope.submit
        }
    ];

    if (data) {
        $scope.footer.buttons.push(
            {
                name:$scope.deleteText,
                action: $scope.delete
            }
        );
        $scope.footer.buttons.push(
            {
                name:$scope.activeText,
                action: $scope.switchStatus
            }
        );     
    }

    $scope.footer.buttons.push(
        {
            name:'quay lại',
            action: function(){
                $scope.main.back();
            }
        }
    );

    $scope.$on('$destroy', function(){
        $scope.footer.buttons = [];
    });

    $scope.submit = function(){
        var form = {
            udid:   Date.now()+"-"+(((1+Math.random())*0x10000)|0).toString(16),
            desc:       $scope.selection.desc,
            hour:       $scope.selection.hour.value,
            minute:     $scope.selection.minute,
            period:     $scope.selection.period.standard,
            date:       $scope.selection.date,
            month:      $scope.selection.month.standard,
            repeat:     $scope.selection.repeat.index,
            email:      $scope.selection.email,
            pre:        $scope.selection.pre,
            pre_kind:   $scope.selection.pre_kind
        };
        function sendInfo(){
            if (!form.repeat) {
                form.pre = "00";
            }
            switch(form.date){
                case '30': form.date = 100; break;
            };
            User.setEmail($scope.selection.email);
            var f = function(){
                $scope.main.createPopup('Đang xử lý');
                if (data) $http.post('/account/edit-event/'+data.id, form)
                    .then(function(res){
                        $scope.main.closePopup();
                        $location.path("/event-list");
                    }, function(err){
                        $scope.main.alert(Strings.CONNECTION_ERROR);
                    });
                else if ($scope.User.signedIn) $http.post('/account/create-event/', form)
                    .then(function(res){
                        $scope.main.closePopup();
                        $location.path("/event-list");
                    }, function(err){
                        $scope.main.alert(Strings.CONNECTION_ERROR);
                    });
                else $http.post('/user/quick-create', form).then(function(res){
                    $scope.main.closePopup();
                    Share.send("form-create",form);
                    $location.path("/confirmation/create");
                }, function(err){
                    $scope.main.alert(Strings.CONNECTION_ERROR);
                });
            }
            if (!form.desc || /^\s*$/.test(form.desc)) {
                form.desc = "";
                $scope.main.pauseup([
                    "Bạn chưa điền nội dung nhắc nhở.",
                    "Bạn có chắc muốn tiếp tục tạo nhắc nhở không có nội dung không?"
                ],f);
            } else f();
        }
        if (!$scope.User.signedIn){
            if (!$scope.selection.email || /^\s*$/.test($scope.selection.email)) 
                $scope.main.alert('Bạn cần nhập địa chỉ email')
            else if (!Validate.validateEmail($scope.selection.email))
                $scope.main.alert('Bạn cần nhập đúng địa chỉ email')
            else {
                sendInfo();
            }
        } else {
            sendInfo();
        }
        
    }
    
  });
