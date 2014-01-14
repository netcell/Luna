'use strict';

angular.module('lunaApp')
  .factory('createLP', function (Automata) {

    var a = Automata.generate('a');

    var data = {};
    
    function numberRecog(max,min){
        min=min?min:0;
        return function(input){
            var i = parseInt(input);
            if (!isNaN(input) && i <= max && i >= min ) return true;
            else return false;
        };
    }

    a.recognizer('date',numberRecog(30));

    a.recognizer('month',numberRecog(20));

    a.recognizer('minute',numberRecog(60));
    
    a.init('0')
    .on(['cuoi','dau']).transitionTo(6)
    .on('ram').transitionTo(7)
    .on(['ngay','mung']).transitionTo(18)
    .onRecognize(numberRecog(24)).transitionTo(1)
    .onRecognize(numberRecog(30,25)).transitionTo(15)
    .on('hang').transitionTo(9)
    .on('truoc').transitionTo(10);

    a.state(10)
    .onRecognize(numberRecog(5)).transitionTo(11)
    .onRecognize(numberRecog(24,6)).transitionTo(12);

    a.state(11)
    .extract('pre')
    .on(['ngay','tieng','gio']).transitionTo(13);

    a.state(12)
    .extract('pre')
    .on(['tieng','gio']).transitionTo(13);

    a.state(13)
    .outcome(function(input){
        var map = {
            'tieng' : 0,
            'gio' : 0,
            'ngay' : 1
        };
        data.pre = a.extract('pre');
        data.pre_kind = map[input];
    });

    a.state(9)
    .on(['ngay','thang','nam']).transitionTo(14);

    a.state(14)
    .outcome(function(input){
        var map = {
            'ngay' : 0,
            'thang': 1,
            'nam'  : 2
        };
        data.repeat = map[input];
    });

    a.state(6)
    .extract('pmonth')
    .on(['thang']).transitionTo(8);

    a.state(7)
    .outcome(function(){
        data.date = 15;
    })
    .on(['thang','/','.','-']).transitionTo(16);

    a.state(8)
    .outcome(function(){
        data.date = 30;
    })
    .onRecognize('month').transitionTo(17)
    .on(['mot','hai','ba','bon','nam','sau','bay','tam','chin','muoi','chap'])
    .transitionTo(17);

    a.state(1)
    .extract('hour')
    .extract('date')
    .on(['gio','h',':']).transitionTo(2)
    .on(['chieu','dem','toi','pm']).transitionTo(4)
    .on(['thang','/','.','-']).transitionTo(16);

    a.state(15)
    .extract('date')
    .on(['thang','/','.','-']).transitionTo(16);

    function extractHour(){
        data.hour = a.extract('hour');
        data.period = 0;
        if (parseInt(data.hour)>12){
            data.hour -= 12;
            data.period = 1;
        } else if (parseInt(data.hour)<10) {
          data.hour = "0"+parseInt(data.hour);
        }
    }

    a.state(2)
    .outcome(function(input){
        extractHour();
    })
    .on(['chieu','dem','toi','pm']).transitionTo(4)
    .onRecognize('minute').transitionTo(3);

    a.state(3)
    .outcome(function(input){
        extractHour();
        data.minute = input;
        if (parseInt(data.minute)<10) {
          data.minute = "0"+parseInt(data.minute);
        }
    })
    .on(['phut']).transitionTo(5)
    .on(['chieu','dem','toi','pm']).transitionTo(4);

    a.state(5)
    .on(['chieu','dem','toi','pm']).transitionTo(4);    

    a.state(4)
    .outcome(function(){
        data.period = 1;
    });

    a.state(18)
    .on(['mung']).transitionTo(18)
    .onRecognize('date').transitionTo(19);

    a.state(19)
    .outcome(function(input){
        data.date = input;
    })
    .on(['thang','/','.','-']).transitionTo(16);

    a.state(16)
    .outcome(function(){
        var date = a.extract('date');
        if (date) data.date = date
    })
    .onRecognize('month').transitionTo(17)
    .on(['mot','hai','ba','bon','nam','sau','bay','tam','chin','muoi','chap'])
    .transitionTo(17);

    a.state(17)
    .outcome(function(input){
        if (isNaN(input)){
            var map = {
                'mot'     : 1,
                'hai'     : 2,
                'ba'      : 3,
                'bon'     : 4,
                'nam'     : 5,
                'sau'     : 6,
                'bay'     : 7,
                'tam'     : 8,
                'chin'    : 9,
                'muoi'    : 10,
                'chap'    : 12,
            };
            data.month = map[input];
        } else {
            data.month = input;
        }
    })
    .on(['mot','hai']).transitionTo(20);

    a.state(20)
    .outcome(function(input){
        switch(input){
            case 'mot': data.month = 11; break;
            case 'hai': data.month = 12; break;
        }
    })

    return {
      read: function(text){
        data={};
        if (text) {
          a.readString(text);
        }
        var result = JSON.parse(JSON.stringify(data));
        data = {};
        return result;
      }
    }
  });
