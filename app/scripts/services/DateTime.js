'use strict';

angular.module('lunaApp')
  .factory('DateTime', function (amduonglich) {

    var dayInText = [
      'chủ nhật',
      'thứ hai',
      'thứ ba',
      'thứ tư',
      'thứ năm',
      'thứ sáu',
      'thứ bảy'
    ];

    // Public API here
    return {

      getCurrentDay: function(inText){
        var d = new Date().getDay();
        return inText?dayInText[d]:d;
      },

      getCurrentLunarDate: function(asObject){
        return this.dates[amduonglich.getCurrentLunarDate()[0]+1];
      },

      getCurrentLunarMonth: function(asObject){
        return this.months[amduonglich.getCurrentLunarDate()[1]-1];
      },

      getCurrentHour: function(asObject){
        var h = new Date().getHours() || 24;
        return this.hours[(h-1)%12];
      },

      getCurrentMinute: function(asObject){
        return this.minutes[new Date().getMinutes()];
      },

      getCurrentPeriod: function(asObject){
        var h = new Date().getHours() || 24;
        return this.periods[this.getCurrentHour().periods][h<13?0:1];
      },

      periods : [
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
      ],

      hours : [
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
      ],

      minutes: [
          '00','01','02','03','04','05','06','07','08','09',
          '10','11','12','13','14','15','16','17','18','19',
          '20','21','22','23','24','25','26','27','28','29',
          '30','31','32','33','34','35','36','37','38','39',
          '40','41','42','43','44','45','46','47','48','49',
          '50','51','52','53','54','55','56','57','58','59'
      ],

      dates: [
          'rằm','cuối',
          '01','02','03','04','05','06','07','08','09','10',
          '11','12','13','14','15','16','17','18','19','20',
          '21','22','23','24','25','26','27','28','29','30'
      ],

      months: [
        { value:'giêng'   , index:0 , standard:'01' },
        { value:'hai'     , index:1 , standard:'02' },
        { value:'ba'      , index:2 , standard:'03' },
        { value:'bốn'     , index:3 , standard:'04' },
        { value:'năm'     , index:4 , standard:'05' },
        { value:'sáu'     , index:5 , standard:'06' },
        { value:'bảy'     , index:6 , standard:'07' },
        { value:'tám'     , index:7 , standard:'08' },
        { value:'chín'    , index:8 , standard:'09' },
        { value:'mười'    , index:9 , standard:'10' },
        { value:'mười một', index:10, standard:'11' },
        { value:'chạp'    , index:11, standard:'12' }
      ],

      repeats: [
        { value:'ngày' , index:0 },
        { value:'tháng', index:1 },
        { value:'năm'  , index:2 }
      ]

    };
  });
