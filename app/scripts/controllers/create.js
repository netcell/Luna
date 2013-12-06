'use strict';

angular.module('lunaApp')
  .controller('CreateCtrl', function ($scope, $http, $location, Validate) {
    $scope.selection = {};
    $scope.options = {};

    var periods = [
    	[ 
    		{ value:'sáng' , index:0, standard:'am' },
    		{ value:'chiều', index:1, standard:'pm' }
    	],[ 
    		{ value:'sáng' , index:0, standard:'am' },
    		{ value:'tối'  , index:1, standard:'pm' }
    	],[ 
    		{ value:'trưa' , index:0, standard:'am' },
    		{ value:'đêm'  , index:1, standard:'pm' }
    	]
    ];

    $scope.options.hours = [
    	{ value:'01', periods:0 },
    	{ value:'02', periods:0 },
    	{ value:'03', periods:0 },
    	{ value:'04', periods:0 },
    	{ value:'05', periods:0 },
    	{ value:'06', periods:0 },
    	{ value:'07', periods:1 },
    	{ value:'08', periods:1 },
    	{ value:'09', periods:1 },
    	{ value:'10', periods:1 },
    	{ value:'11', periods:2 },
    	{ value:'12', periods:2 }
    ];

    $scope.options.months = [
    	{ value:'giêng'	  , index:0 , standard:'01' },
    	{ value:'hai'	  , index:1 , standard:'02' },
    	{ value:'ba'	  , index:2 , standard:'03' },
    	{ value:'bốn'	  , index:3 , standard:'04' },
    	{ value:'năm'	  , index:4 , standard:'05' },
    	{ value:'sáu'	  , index:5 , standard:'06' },
    	{ value:'bảy'	  , index:6 , standard:'07' },
    	{ value:'tám'	  , index:7 , standard:'08' },
    	{ value:'chín'	  , index:8 , standard:'09' },
    	{ value:'mười'	  , index:9 , standard:'10' },
    	{ value:'mười một', index:10, standard:'11' },
    	{ value:'chạp'	  , index:11, standard:'12' }
    ];

    $scope.options.repeats = [
    	{ value:'ngày' , index:0 },
    	{ value:'tháng', index:1 },
    	{ value:'năm'  , index:2 }
    ];

    $scope.options.minutes = [
    	'00','01','02','03','04','05','06','07','08','09',
    	'10','11','12','13','14','15','16','17','18','19',
    	'20','21','22','23','24','25','26','27','28','29',
    	'30','31','32','33','34','35','36','37','38','39',
    	'40','41','42','43','44','45','46','47','48','49',
    	'50','51','52','53','54','55','56','57','58','59'
    ];

    $scope.options.dates = [
    	'rằm','cuối',
    	'01','02','03','04','05','06','07','08','09','10',
    	'11','12','13','14','15','16','17','18','19','20',
    	'21','22','23','24','25','26','27','28','29','30'
    	
    ]

    //INIT
    var selected_hour = $scope.options.hours[0];
    $scope.selection.desc = "";
    $scope.selection.hour = selected_hour;
    $scope.selection.minute = $scope.options.minutes[0];
    $scope.options.periods=periods[selected_hour.periods];
    $scope.selection.period = periods[selected_hour.periods][0];
    $scope.selection.date = $scope.options.dates[0];
    $scope.selection.month = $scope.options.months[0];
    $scope.selection.repeat = $scope.options.repeats[0];
    $scope.selection.email = "";
    
    var init = 3;

    $scope.$watch('selection.hour', function(newValue, oldValue, scope) {
    	if (init) {
    		init--;
    	} else {
	    	var period_index = $scope.selection.period.index;
	    	$scope.options.periods=periods[newValue.periods];
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
    	var form = {
    		desc: 	$scope.selection.desc,
    		hour: 	$scope.selection.hour.value,
    		minute: $scope.selection.minute,
    		period: $scope.selection.period.standard,
    		date: 	$scope.selection.date,
    		month: 	$scope.selection.month.standard,
    		repeat: $scope.selection.repeat.index,
    		email: 	$scope.selection.email
    	};
        if (form.email && Validate.validateEmail(form.email)) {
            switch(form.date){
                case 'rằm': form.date = 15; break;
                case 'cuối': form.date = 100; break;
            }
            $http.post('/user/quick-create', form).then(function(res){
                $location.path("/confirmation-sent");
            }, function(err){
                console.log(err);
            });
        } else {
            alert('Bạn cần nhập đúng email');
        }
    }
    
  });
