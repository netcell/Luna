'use strict';

angular.module('lunaApp')
  .controller('CreateCtrl', function ($scope) {
    $scope.form = {};
    $scope.selection = {};
    $scope.options = {};

    var periods = [
    	[ 
    		{ value:'sáng' , index:0 },
    		{ value:'chiều', index:1 }
    	],[ 
    		{ value:'sáng' , index:0 },
    		{ value:'tối'  , index:1 }
    	],[ 
    		{ value:'trưa' , index:0 },
    		{ value:'đêm'  , index:1 }
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
    	{ value:'giêng'	  , index:0  },
    	{ value:'hai'	  , index:1  },
    	{ value:'ba'	  , index:2  },
    	{ value:'bốn'	  , index:3  },
    	{ value:'năm'	  , index:4  },
    	{ value:'sáu'	  , index:5  },
    	{ value:'bảy'	  , index:6  },
    	{ value:'tám'	  , index:7  },
    	{ value:'chín'	  , index:8  },
    	{ value:'mười'	  , index:9  },
    	{ value:'mười một', index:10 },
    	{ value:'chạp'	  , index:11 }
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
    	'01','02','03','04','05','06','07','08','09','10',
    	'11','12','13','14','15','16','17','18','19','20',
    	'21','22','23','24','25','26','27','28','29','30','31'
    ]

    //INIT
    var selected_hour = $scope.options.hours[0];
    $scope.selection.hour = selected_hour;
    $scope.selection.minute= $scope.options.minutes[0];
    $scope.selection.period=periods[selected_hour.periods][0];
    $scope.selection.date= $scope.options.dates[0];
    $scope.selection.month= $scope.options.months[0];
    $scope.selection.repeat= $scope.options.repeats[0];

    $scope.$watch('selection.hour', function(newValue, oldValue, scope) {
    	var period_index = $scope.selection.period.index;
    	$scope.options.periods=periods[newValue.periods];
    	$scope.selection.period=$scope.options.periods[period_index];
    });
    
  });
