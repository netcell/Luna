"use strict";angular.module("lunaApp",["ngCookies","ngRoute","ngAnimate","monospaced.elastic","ngTouch","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/quick-create",{templateUrl:"views/quick-create.html",controller:"QuickcreateCtrl"}).when("/under-construction",{templateUrl:"views/under-construction.html"}).when("/create",{templateUrl:"views/create.html",controller:"CreateCtrl"}).when("/confirmation/:action",{templateUrl:"views/confirmation.html",controller:"ConfirmationCtrl"}).when("/account-over-used",{templateUrl:"views/account-over-used.html"}).when("/has/:action",{templateUrl:"views/has.html",controller:"HasCtrl"}).when("/delete",{templateUrl:"views/delete.html",controller:"DeleteCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$templateCache",function(a,b){b.removeAll()}]),angular.module("lunaApp").controller("MainCtrl",["$scope","amduonglich","$window","DateTime","$timeout",function(a,b,c,d,e){a.time={},a.time.current_day=d.getCurrentDay(!0);var f=b.getCurrentLunarDate();a.time.current_date=f[0],a.time.current_month=f[1],a.footer={},a.footer.buttons=[],a.hasPopup=!1,a.main={};var g=function(){a.hasPopup=!1,a.createTut=!1,e(function(){a.hasPopup=!0},100)};a.main.showCreateTut=function(){a.main.alert("Hướng dẫn tạo nhắc nhở","Đóng"),a.createTut=!0},a.main.createPopup=function(b,c){a.popupTexts="[object Array]"===Object.prototype.toString.call(b)?b:[b],a.popupButtons=[];for(var d in c)a.popupButtons.push({text:d,action:c[d]});g()},a.main.alert=function(b,c){c||(c="OK");var d={};d[c]=a.main.closePopup,a.main.createPopup(b,d)},a.main.pauseup=function(b,c){a.main.createPopup(b,{OK:function(){a.main.closePopup(),c()},Cancel:a.main.closePopup})},a.main.closePopup=function(){a.hasPopup=!1,e(function(){a.createTut=!1},300)},a.main.back=function(){c.history.back()}}]),angular.module("lunaApp").directive("appDirective",function(){return{restrict:"A",link:function(a,b){var c=$(b[0]),d=c.find(".time"),e=c.find(".module");a.$watch("grid.value",function(){1==a.grid.value?(d.removeClass("full-left"),e.removeClass("full-left"),d.removeClass("near-left"),e.removeClass("near-left")):3==a.grid.value?(d.removeClass("full-left"),e.removeClass("full-left"),d.addClass("near-left"),e.addClass("near-left")):(d.addClass("full-left"),e.addClass("full-left"))})}}}),angular.module("lunaApp").directive("textarea",function(){return{restrict:"E",link:function(a,b){b.focus()}}}),angular.module("lunaApp").directive("quickCreateHome",["$window","$location",function(a,b){return{restrict:"C",link:function(c,d){d.find("textarea").blur(function(a){$(a.currentTarget).focus()});var e=function(c){switch(c.keyCode){case 27:a.removeEventListener("keydown",e),a.history.back();break;case 13:a.removeEventListener("keydown",e),b.path("/")}};a.addEventListener("keydown",e),d.bind("$destroy",function(){a.removeEventListener("keydown",e)})}}}]),angular.module("lunaApp").controller("QuickcreateCtrl",["$scope",function(a){a.input}]),angular.module("lunaApp").directive("afterLoading",function(){return{restrict:"C",link:function(a,b){b.removeClass("hidden")}}}),angular.module("lunaApp").controller("LoadingscreenCtrl",["$scope","$window","$q","$timeout",function(){}]),angular.module("lunaApp").directive("main",function(){return{restrict:"A",link:function(a){a.$watch("hasPopup",function(){})}}}),angular.module("lunaApp").directive("tutorial",function(){return{template:'<iframe id="youtube" width="560" height="315" src="//www.youtube.com/embed/M_QQeoUetPQ?rel=0" frameborder="0" allowfullscreen></iframe>',restrict:"E",link:function(){IFramePreloader("youtube")}}}),angular.module("lunaApp").controller("FooterCtrl",["$scope",function(){}]),angular.module("lunaApp").directive("moduleContent",function(){return{restrict:"C",link:function(a,b,c){a.grid.value=c.grid}}}),angular.module("lunaApp").controller("CreateCtrl",["$scope","$http","$location","Share","Validate","DateTime","User",function(a,b,c,d,e,f,g){a.selection={},a.options={},a.options.hours=f.hours,a.options.minutes=f.minutes,a.options.dates=f.dates,a.options.months=f.months,a.options.repeats=f.repeats,a.selection.desc="",a.selection.hour=f.getCurrentHour(!0),a.selection.minute=f.getCurrentMinute(!0),a.options.periods=f.periods[a.selection.hour.periods],a.selection.period=f.getCurrentPeriod(!0),a.selection.date=f.getCurrentLunarDate(!0),a.selection.month=f.getCurrentLunarMonth(!0),a.selection.repeat=a.options.repeats[0],a.selection.email=g.getEmail();var h=3;a.$watch("selection.hour",function(b){if(h)h--;else{var c=a.selection.period.index;a.options.periods=f.periods[b.periods],a.selection.period=a.options.periods[c]}}),a.$watch("selection.date",function(){h?h--:0==a.selection.repeat.index&&(a.selection.repeat=a.options.repeats[1])}),a.$watch("selection.month",function(){h?h--:2!=a.selection.repeat.index&&(a.selection.repeat=a.options.repeats[2])}),a.footer.buttons=[{name:"đặt nhắc nhở",action:function(){a.submit()}},{name:"quay lại",action:function(){a.main.back()}}],a.$on("$destroy",function(){a.footer.buttons=[]}),a.submit=function(){if(a.selection.email)if(e.validateEmail(a.selection.email)){var f={udid:Date.now()+"-"+(65536*(1+Math.random())|0).toString(16),desc:a.selection.desc,hour:a.selection.hour.value,minute:a.selection.minute,period:a.selection.period.standard,date:a.selection.date,month:a.selection.month.standard,repeat:a.selection.repeat.index,email:a.selection.email};switch(f.date){case"rằm":f.date=15;break;case"cuối":f.date=100}g.setEmail(a.selection.email);var h=function(){a.main.createPopup("Đang xử lý"),b.post("/user/quick-create",f).then(function(){a.main.closePopup(),d.send("form-create",f),c.path("/confirmation/create")},function(){a.main.alert("Hệ thống đang bận, xin thử lại sau ít phút")})};!f.desc||/^\s*$/.test(f.desc)?(f.desc="",a.main.pauseup(["Bạn chưa điền nội dung nhắc nhở.","Bạn có chắc muốn tiếp tục tạo nhắc nhở không có nội dung không?"],h)):h()}else a.main.alert("Bạn cần nhập đúng địa chỉ email");else a.main.alert("Bạn cần nhập địa chỉ email")}}]),angular.module("lunaApp").directive("create",function(){return{restrict:"A",link:function(a,b){a.$watch("selection.date",function(a,c,d){switch(a){case"rằm":b.find("#create-date").removeClass("size-2").addClass("size-3"),2!=d.selection.repeat.index&&b.find("#create-month-label").addClass("disabled");break;case"cuối":b.find("#create-date").removeClass("size-2").addClass("size-3"),b.find("#create-month-label").removeClass("disabled");break;default:b.find("#create-date").removeClass("size-3").addClass("size-2"),2!=d.selection.repeat.index&&b.find("#create-month-label").addClass("disabled")}}),a.$watch("selection.repeat",function(a,c,d){switch(a.index){case 0:b.find("#create-date,#create-date-label,#create-month,#create-month-label").addClass("disabled");break;case 1:b.find("#create-month").addClass("disabled"),"cuối"==d.selection.date?b.find("#create-month-label").removeClass("disabled"):b.find("#create-month-label").addClass("disabled"),b.find("#create-date,#create-date-label").removeClass("disabled");break;case 2:b.find("#create-date,#create-date-label,#create-month,#create-month-label").removeClass("disabled")}})}}}),angular.module("lunaApp").factory("amduonglich",function(){function a(a,b,c,d,e){this.day=a,this.month=b,this.year=c,this.leap=d,this.jd=e}function b(a,b,c){var d=h((14-b)/12),e=c+4800-d,f=b+12*d-3,g=a+h((153*f+2)/5)+365*e+h(e/4)-h(e/100)+h(e/400)-32045;return g}function c(c,d){var e,f,g,h,i,j,k,l,m,n=new Array;e=new Array(29,30),f=new Array(12),g=d>>17,h=15&d,i=e[d>>16&1],j=b(1,1,c),k=j+g,l=d>>4;for(var o=0;12>o;o++)f[12-o-1]=e[1&l],l>>=1;if(0==h)for(m=1;12>=m;m++)n.push(new a(1,m,c,0,k)),k+=f[m-1];else{for(m=1;h>=m;m++)n.push(new a(1,m,c,0,k)),k+=f[m-1];for(n.push(new a(1,h,c,1,k)),k+=i,m=h+1;12>=m;m++)n.push(new a(1,m,c,0,k)),k+=f[m-1]}return n}function d(a){var b;return b=1900>a?q[a-1800]:2e3>a?r[a-1900]:2100>a?s[a-2e3]:t[a-2100],c(a,b)}function e(b,c){if(b>w||v>b||c[0].jd>b)return new a(0,0,0,0,b);for(var d=c.length-1;b<c[d].jd;)d--;var e=b-c[d].jd;return new a(c[d].day+e,c[d].month,c[d].year,c[d].leap,b)}function f(a,c,f){var g,h;return g=d(f),h=b(a,c,f),h<g[0].jd&&(g=d(f-1)),e(h,g)}function g(){this.fontSize="13pt",this.tableWidth="420px"}function h(a){return Math.floor(a)}function i(a,b,c){var d,e,f,g;return d=h((14-b)/12),e=c+4800-d,f=b+12*d-3,g=a+h((153*f+2)/5)+365*e+h(e/4)-h(e/100)+h(e/400)-32045,2299161>g&&(g=a+h((153*f+2)/5)+365*e+h(e/4)-32083),g}function j(a){var b,c,d,e,f,g,h,i,j,k,l;return b=a/1236.85,c=b*b,d=c*b,e=u/180,f=2415020.75933+29.53058868*a+1178e-7*c-1.55e-7*d,f+=33e-5*Math.sin((166.56+132.87*b-.009173*c)*e),g=359.2242+29.10535608*a-333e-7*c-347e-8*d,h=306.0253+385.81691806*a+.0107306*c+1236e-8*d,i=21.2964+390.67050646*a-.0016528*c-239e-8*d,j=(.1734-393e-6*b)*Math.sin(g*e)+.0021*Math.sin(2*e*g),j=j-.4068*Math.sin(h*e)+.0161*Math.sin(2*e*h),j-=4e-4*Math.sin(3*e*h),j=j+.0104*Math.sin(2*e*i)-.0051*Math.sin(e*(g+h)),j=j-.0074*Math.sin(e*(g-h))+4e-4*Math.sin(e*(2*i+g)),j=j-4e-4*Math.sin(e*(2*i-g))-6e-4*Math.sin(e*(2*i+h)),j=j+.001*Math.sin(e*(2*i-h))+5e-4*Math.sin(e*(2*h+g)),k=-11>b?.001+839e-6*b+2261e-7*c-845e-8*d-8.1e-8*b*d:-278e-6+265e-6*b+262e-6*c,l=f+j-k}function k(a){var b,c,d,e,f,g,i;return b=(a-2451545)/36525,c=b*b,d=u/180,e=357.5291+35999.0503*b-1559e-7*c-4.8e-7*b*c,f=280.46645+36000.76983*b+3032e-7*c,g=(1.9146-.004817*b-14e-6*c)*Math.sin(d*e),g=g+(.019993-101e-6*b)*Math.sin(2*d*e)+29e-5*Math.sin(3*d*e),i=f+g,i*=d,i-=2*u*h(i/(2*u))}function l(a,b){return h(k(a-.5-b/24)/u*6)}function m(a,b){return h(j(a)+.5+b/24)}function n(a,b){var c,d,e,f;return d=i(31,12,a)-2415021,c=h(d/29.530588853),e=m(c,b),f=l(e,b),f>=9&&(e=m(c-1,b)),e}function o(a,b){var c,d,e,f;c=h((a-2415021.076998695)/29.530588853+.5),d=0,f=1,e=l(m(c+f,b),b);do d=e,f++,e=l(m(c+f,b),b);while(e!=d&&14>f);return f-1}function p(a,b,c,d){var e,f,g,j,k,l,p,q,r;f=i(a,b,c),e=h((f-2415021.076998695)/29.530588853),g=m(e+1,d),g>f&&(g=m(e,d)),j=n(c,d),k=j,j>=g?(q=c,j=n(c-1,d)):(q=c+1,k=n(c+1,d)),l=f-g+1;var s=h((g-j)/29);return r=0,p=s+11,k-j>365&&(leapMonthDiff=o(j,d),s>=leapMonthDiff&&(p=s+10,s==leapMonthDiff&&(r=1))),p>12&&(p-=12),p>=11&&4>s&&(q-=1),new Array(l,p,q,r)}var q=new Array(3193507,5679952,4336544,2927457,5415792,3953128,6345056,4908208,3631398,5823136,4479824,3217106,5647072,4104928,2679506,5163344,3724630,6075680,4634256,3300772,5789136,4335056,2926003,5415600,4040887,6334800,4895904,3519141,5942608,4478384,3156852,5645680,4215545,6574768,5138768,3698006,6183584,4631376,3299028,5786336,4367728,2966867,5296800,3926183,6346064,4872864,3452325,5936592,4606688,3058356,5547216,4117176,6599312,5027152,3692375,6172064,4756944,3296629,5786032,4367536,2991283,5270160,3845528,6318928,4991840,3511141,5935984,4606320,3172708,5432480,3992170,6478480,5135056,3746518,6171360,4756192,3328725,5687632,4248736,2872483,5289616,3823527,6313392,4990416,3577269,5935792,4499792,3070292,5551264,3978576,2648914,5133744,3811190,6169968,4739760,3320485,5695824,4221600,2800291,5286736),r=new Array(3951576,6441696,5023088,3691733,6083168,4512080,3233108,5658272,4233936,2774482,5262048,3843510,6333648,4772432,3396181,5813568,4380320,2928034,5412272,4147575,6572400,5022896,3585205,6056528,4615504,3222356,5647200,4232560,2904818,5261680,3827046,6214816,4778576,3369621,5790416,4467552,3114723,5411552,4049111,6474064,5035168,3528870,5944656,4609696,3253684,5645776,4231888,2806450,5286224,3716439,6188192,4765008,3494741,5787040,4367792,3097971,5526192,3975592,6351184,5008032,3583654,5942096,4606816,3189476,5678448,4215392,2683491,5167424,3726151,6084256,4757200,3427797,5917392,4367568,2938036,5419600,3986776,6337856,4896160,3626406,6067632,4606384,3189108,5678256,4237904,2730578,5139744,3779911,6204256,4756336,3427061,5917040,4482224,2913443,5302864,4024920,6444704,4893392,3577557,6066912),s=new Array(4639072,3070292,5559456,4119120,2782546,5133984,3712935,6202832,4887216,3320501,5810512,4371616,2931364,5287248,3954137,6441888,5023152,3625334,6050416,4614448,3176756,5532320,4107600,2775890,5262176,3712742,6202592,4772448,3336805,5690656,4250272,2971299,5396176,3951355,6441424,5022928,3657910,5943888,4502816,3071269,5551520,4085200,2774450,5261744,3843447,6202544,4762192,3387989,5795104,4238688,2968419,5395312,4082152,6343024,5002416,3631270,5954128,4479648,3122852,5548752,4215520,2675427,5163344,3724631,6214816,4643152,3300693,5789344,4368080,2905556,5395120,3975608,6465840,4895888,3454630,5942608,4609440,3058532,5547376,4215472,2797939,5138736,3697463,6187680,4762960,3353301,5778272,4367728,3035876,5296480,3860824,6346016,4905616,3496614,5920464,4598496,3189204,5546704,4116816,2681170),t=new Array(5158176,3725095,6204832,4871600,3550645,5916080,4498096,3060404,5548368,3978585,6449952,5025104,3692390,6050672,4736368,3302772,5788336,4221264,2783571,5266080,3910311,6203088,4868832,3515109,5940560,4379296,3007140,5428560,4086459,6444704,5019344,3754422,6179504,4630736,3200181,5681808,4240720,2780498,5262752,3904871,6329712,4868528,3451253,5924016,4483728,2931348,5401424,4074336,2665313,5018992,3689190,6082912,4646048,3075365,5560976,4217680,2897619,5253856,3838935,6329040,4901200,3331414,5813408,4372112,3038612,5395888,4072954,6563248,5149360,3582646,6056272,4617376,3256997,5549392,4216224,2796403,5383536,3822455,6312624,4876624,3435862,5790368,4369232,3036884,5524192,3974512,2647250,5034592,3599014,5952848,4610720,3190181,5674448,4213456,2795955,5285072,3855031,6206032,4764992,3396950),u=Math.PI,v=b(25,1,1800),w=b(31,12,2199),x=new Date,u=(f(x.getDate(),x.getMonth()+1,x.getFullYear()),x.getMonth()+1,x.getFullYear(),new Array("CN","T2","T3","T4","T5","T6","T7"),new g,new Array("9pt","13pt","17pt"),new Array("180px","420px","600px"),Math.PI);return{getCurrentLunarDate:function(){var a=new Date;return p(a.getDate(),a.getMonth()+1,a.getFullYear(),7)}}}),angular.module("lunaApp").controller("HasCtrl",["$scope","$timeout","$location","$routeParams",function(a,b,c,d){function e(){j=b(function(){a.timer<=0?a.goNow():(a.timer-=1,e())},1e3)}var f={created:"Nhắc nhở của bạn đã được tạo",deleted:"Nhắc nhở của bạn đã được xóa","auth-fail-create":"Nhắc nhở của bạn chưa được tạo vì đường link xác nhận đã quá cũ, không còn hiệu lực","auth-fail-delete":"Nhắc nhở của bạn chưa được xóa vì đường link xác nhận đã quá cũ, không còn hiệu lực"},g={created:"trang chủ",deleted:"trang chủ","auth-fail-create":"trang tạo nhắc nhở","auth-fail-delete":"trang xóa nhắc nhở"},h={created:"trang chủ",deleted:"trang chủ","auth-fail-create":"tạo nhắc nhở","auth-fail-delete":"xóa nhắc nhở"},i={created:"/",deleted:"/","auth-fail-create":"/create","auth-fail-delete":"/delete"};a.redirect=g[d.action],a.announce=f[d.action],a.path=i[d.action],a.goDelete=function(){a.path="/delete",a.goNow()},a.goNow=function(){"/"!=a.path?(c.path("/"),b(function(){c.path(a.path)},100)):c.path(a.path)},a.created="created"==d.action,a.footer.buttons=[{name:h[d.action],action:function(){a.goNow()}}],a.$on("$destroy",function(){a.footer.buttons=[]}),a.timer=10;var j;e(),a.$on("$destroy",function(){b.cancel(j)})}]),angular.module("lunaApp").controller("HomeCtrl",["$scope","$location",function(a,b){a.footer.buttons=[{name:"xóa nhắc nhở",action:function(){b.path("/delete")}},{name:"hướng dẫn",action:a.main.showCreateTut}],a.$on("$destroy",function(){a.footer.buttons=[]})}]),angular.module("lunaApp").controller("DeleteCtrl",["$scope","$http","$location","Validate","User",function(a,b,c,d,e){a.email=e.getEmail(),a.footer.buttons=[{name:"yêu cầu xóa",action:function(){a.submit()}},{name:"quay lại",action:function(){a.main.back()}}],a.$on("$destroy",function(){a.footer.buttons=[]}),a.submit=function(){a.email?d.validateEmail(a.email)?(e.setEmail(a.email),a.main.createPopup("Đang xử lý"),b.get("/user/delete-event/"+a.email).then(function(b){a.main.closePopup(),"0"==b.data?a.main.alert("Bạn không có nhắc nhở nào."):c.path("/confirmation/delete")},function(){a.main.alert("hệ thống đang bận, xin thử lại sau ít phút")})):a.main.alert("Bạn cần nhập đúng địa chỉ email."):a.main.alert("Bạn cần nhập địa chỉ email.")}}]),angular.module("lunaApp").factory("Validate",function(){return{validateEmail:function(a){var b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)}}}),angular.module("lunaApp").directive("footer",function(){return{restrict:"A",link:function(a){a.footer.buttons.length||$(".more").height(20),a.$watch("footer.buttons.length",function(a){a?$(".more").height(50):$(".more").height(20)})}}}),angular.module("lunaApp").factory("DateTime",["amduonglich",function(a){var b=["chủ nhật","thứ hai","thứ ba","thứ tư","thứ năm","thứ sáu","thứ bảy"];return{getCurrentDay:function(a){var c=(new Date).getDay();return a?b[c]:c},getCurrentLunarDate:function(){return this.dates[a.getCurrentLunarDate()[0]+1]},getCurrentLunarMonth:function(){return this.months[a.getCurrentLunarDate()[1]-1]},getCurrentHour:function(){var a=(new Date).getHours()||24;return this.hours[(a-1)%12]},getCurrentMinute:function(){return this.minutes[(new Date).getMinutes()]},getCurrentPeriod:function(){var a=(new Date).getHours()||24;return this.periods[this.getCurrentHour().periods][13>a?0:1]},periods:[[{value:"sáng",index:0,standard:"am"},{value:"chiều",index:1,standard:"pm"}],[{value:"sáng",index:0,standard:"am"},{value:"tối",index:1,standard:"pm"}],[{value:"trưa",index:0,standard:"am"},{value:"đêm",index:1,standard:"pm"}]],hours:[{value:"01",periods:0},{value:"02",periods:0},{value:"03",periods:0},{value:"04",periods:0},{value:"05",periods:0},{value:"06",periods:0},{value:"07",periods:1},{value:"08",periods:1},{value:"09",periods:1},{value:"10",periods:1},{value:"11",periods:2},{value:"12",periods:2}],minutes:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"],dates:["rằm","cuối","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],months:[{value:"giêng",index:0,standard:"01"},{value:"hai",index:1,standard:"02"},{value:"ba",index:2,standard:"03"},{value:"bốn",index:3,standard:"04"},{value:"năm",index:4,standard:"05"},{value:"sáu",index:5,standard:"06"},{value:"bảy",index:6,standard:"07"},{value:"tám",index:7,standard:"08"},{value:"chín",index:8,standard:"09"},{value:"mười",index:9,standard:"10"},{value:"mười một",index:10,standard:"11"},{value:"chạp",index:11,standard:"12"}],repeats:[{value:"ngày",index:0},{value:"tháng",index:1},{value:"năm",index:2}]}}]),angular.module("lunaApp").controller("ConfirmationCtrl",["$scope","$routeParams","User","$http","$location","Share",function(a,b,c,d,e,f){a.email=c.getEmail();var g={create:"tạo","delete":"xóa"};a.action=g[b.action];var h={"delete":{text:"tạo thêm nhắc nhở mới",link:"/create"},create:{text:"xóa nhắc nhở đã tạo",link:"/delete"}};a.subaction=h[b.action];var i={"delete":"images/confirmation_delete.png",create:"images/confirmation_create.png"};a.image=i[b.action],a.submit=function(){if("create"==b.action){var c=f.receive("form-create");a.main.createPopup("Đang xử lý"),d.post("/user/try-create",c).then(function(){a.main.alert("Chúng tôi đã gửi lại email cho bạn")},function(){a.main.alert("Hệ thống đang bận, xin thử lại sau ít phút")})}else d.get("/user/delete-event/"+a.email).then(function(b){a.main.closePopup(),"0"==b.data?a.main.alert("Bạn không có nhắc nhở nào."):a.main.alert("Chúng tôi đã gửi lại email cho bạn")},function(){a.main.alert("hệ thống đang bận, xin thử lại sau ít phút")})},a.footer.buttons=[{name:a.subaction.text,action:function(){e.path(a.subaction.link)}}],a.$on("$destroy",function(){a.footer.buttons=[]})}]),angular.module("lunaApp").factory("User",["$sessionStorage",function(a){return a.User||(a.User={}),{getEmail:function(){var b=a.User;return b.email?b.email:""},setEmail:function(b){return a.User.email=b,this}}}]),angular.module("lunaApp").directive("submitInput",function(){return{restrict:"A",link:function(a,b){b.bind("keydown keypress",function(b){13===b.which&&(a.submit(),b.preventDefault())})}}}),angular.module("lunaApp").directive("form",["$timeout",function(a){return{restrict:"C",link:function(b){$("html, body").animate({scrollTop:$(".app").offset().top},500),a(function(){$(window).scrollTop()+$(window).height()>$(document).height()-60?$(".more").height(10):$(".more").height(50)},100);var c=$(window).scroll(function(){$(window).scrollTop()+$(window).height()>$(document).height()-60?$(".more").height(10):$(".more").height(50)});b.$on("$destroy",function(){$(".more").height(50),c.off("scroll")})}}}]),angular.module("lunaApp").factory("Share",function(){var a={};return{send:function(b,c){a[b]=c},receive:function(b){return a[b]}}});