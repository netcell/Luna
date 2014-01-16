//'use strict';

angular.module('lunaApp')
  .controller('CreateCtrl', function (createLP,Strings,$timeout, $scope, $http, $location, Share, Validate, DateTime, User) {
    
    $scope.User = User.getInfo();

    //Selected values
    $scope.selection = {};
    var SELECTION = $scope.selection;
    //List of Options
    $scope.options = {};
    var OPTIONS = $scope.options;

    OPTIONS.hours = DateTime.hours;
    OPTIONS.pre_kind = [
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
    OPTIONS.minutes = DateTime.minutes;
    OPTIONS.dates = DateTime.dates;
    OPTIONS.months = DateTime.months;
    OPTIONS.repeats = DateTime.repeats;

    var data = Share.receive("event-to-edit");
    var lpdata = {};
    
    //INIT
    SELECTION.desc = data.message?data.message:"";
    
    var h = false;
    var p = false;

    if (data.hour) {
        var hp = DateTime.convert24to12(data.hour);
        h = hp.hour;
        p = hp.period;
    }

    if (data.pre) {
        data.pre = parseInt(data.pre)<10?"0"+data.pre:""+data.pre;
    }
    var timer = $timeout(function(){

    });
    $scope.$watch('selection.desc',function(newValue){
        $timeout.cancel( timer );
        timer = $timeout(function(){
            lpdata = createLP.read(newValue);
            if (lpdata.hasOwnProperty('hour')) {
                SELECTION.hour = DateTime.objectLunarHour(lpdata.hour);
                SELECTION.minute = "00";
            }
            if (lpdata.hasOwnProperty('period'))
                SELECTION.period = OPTIONS.periods[lpdata.period];

            if (lpdata.hasOwnProperty('pre'))
                SELECTION.pre = lpdata.pre;
            if (lpdata.hasOwnProperty('pre_kind'))
                SELECTION.pre_kind = OPTIONS.pre_kind[lpdata.pre_kind];

            if (lpdata.hasOwnProperty('minute'))
                SELECTION.minute = lpdata.minute;

            if (lpdata.hasOwnProperty('repeat'))
                SELECTION.repeat = OPTIONS.repeats[parseInt(lpdata.repeat)];
            if (lpdata.hasOwnProperty('date')) {
                SELECTION.date = DateTime.objectLunarDate(parseInt(lpdata.date));
                SELECTION.repeat = OPTIONS.repeats[1];
            }
            if (lpdata.hasOwnProperty('month')) {
                SELECTION.month = DateTime.objectLunarMonth(parseInt(lpdata.month));
                SELECTION.repeat = OPTIONS.repeats[2];
            }
        },300);
    })

    SELECTION.hour = h || DateTime.getCurrentHour(true);
    OPTIONS.periods = DateTime.periods[SELECTION.hour.periods];
    SELECTION.period = p || DateTime.getCurrentPeriod(true);

    SELECTION.pre_kind = OPTIONS.pre_kind[parseInt(data.pre_kind)||1];
    OPTIONS.pre = pre[SELECTION.pre_kind.index];
    SELECTION.pre = data.pre||'00';
    SELECTION.minute = data.minute||DateTime.getCurrentMinute(true);

    SELECTION.date = data.date?DateTime.objectLunarDate(parseInt(data.date)):DateTime.getCurrentLunarDate(true);
    SELECTION.month = data.month?DateTime.objectLunarMonth(parseInt(data.month)):DateTime.getCurrentLunarMonth(true);
    SELECTION.repeat = OPTIONS.repeats[parseInt(data.repeatType)||1];
    SELECTION.email = User.getEmail();
    
    var init = 4;

    $scope.$watch('selection.pre_kind', function(newValue, oldValue, scope) {
        if (init) {
            init--;
        } else {
            OPTIONS.pre = pre[newValue.index];
            if (newValue.index===1 && parseInt(SELECTION.pre)>5) {
                SELECTION.pre = '00';
            }
        }
    });

    $scope.$watch('selection.hour', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else {
	    	var period_index = SELECTION.period.index;
	    	OPTIONS.periods=DateTime.periods[newValue.periods];
	    	SELECTION.period=OPTIONS.periods[period_index];
	    }
    });

    $scope.$watch('selection.date', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else if (SELECTION.repeat.index==0) {
	    	SELECTION.repeat = OPTIONS.repeats[1];
	    }
    });

    $scope.$watch('selection.month', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else if (SELECTION.repeat.index!=2) {
	    	SELECTION.repeat = OPTIONS.repeats[2];
	    }
    });

    $scope.data = data;

    $scope.submitText = data?"cập nhật":"tạo nhắc nhở";
    $scope.deleteText = "xóa nhắc nhở";
    $scope.activeText = data.status?"tắt nhắc nhở":"bật nhắc nhở";

    $scope.delete = function(){
        data.delete();
    };
    $scope.switchStatus = function(){
        data.switchStatus();
    };

    $('#createDesc').bind("keydown keypress", function (event) {
        if(event.which === 13) {
            $scope.main.pauseup((data?"Cập nhật":"Tạo")+" nhắc nhở?",function(){
                $scope.submit();
            });

            event.preventDefault();
        }
    });

    $scope.submit = function(){
        var form = {
            udid:   Date.now()+"-"+(((1+Math.random())*0x10000)|0).toString(16),
            desc:       SELECTION.desc,
            hour:       SELECTION.hour.value,
            minute:     SELECTION.minute,
            period:     SELECTION.period.standard,
            date:       SELECTION.date,
            month:      SELECTION.month.standard,
            repeat:     SELECTION.repeat.index,
            email:      SELECTION.email,
            pre:        SELECTION.pre,
            pre_kind:   SELECTION.pre_kind
        };
        function sendInfo(){
            if (!form.repeat) {
                form.pre = "00";
            }
            switch(form.date){
                case '30': form.date = 100; break;
            };
            User.setEmail(SELECTION.email);
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
            if (!data && (!form.desc || /^\s*$/.test(form.desc))) {
                form.desc = "";
                $scope.main.pauseup([
                    "Bạn chưa điền nội dung nhắc nhở.",
                    "Bạn có chắc muốn tiếp tục tạo nhắc nhở không có nội dung không?"
                ],f);
            } else f();
        }
        if (!$scope.User.signedIn){
            if (!SELECTION.email || /^\s*$/.test(SELECTION.email)) 
                $scope.main.alert('Bạn cần nhập địa chỉ email')
            else if (!Validate.validateEmail(SELECTION.email))
                $scope.main.alert('Bạn cần nhập đúng địa chỉ email')
            else {
                sendInfo();
            }
        } else {
            sendInfo();
        }
        
    }

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
        $scope.$watch('data.status', function(){
            $scope.activeText = data.status?"tắt nhắc nhở":"bật nhắc nhở";
            $scope.footer.buttons[2] = {
                name:$scope.activeText,
                action: $scope.switchStatus
            };
        })
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
    
  });
