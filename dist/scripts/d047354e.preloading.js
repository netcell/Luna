!function(){for(var a=[$.get("bower_components/angular/angular.min.js"),$.get("fonts/SourceSansPro-ExtraLight.ttf"),$.get("fonts/SourceSansPro-Light.ttf"),$.get("fonts/SourceSansPro-Semibold.ttf"),$.get("views/account-over-used.html"),$.get("views/confirmation.html"),$.get("views/home.html"),$.get("views/create.html"),$.get("views/quick-create.html"),$.get("views/under-construction.html"),$.get("views/has.html")],b=$(".loader"),c=0,d=a.length-1;d>=0;d--)$.when(a).then(function(){c++,b.stop(),b=b.animate({width:100*c/a.length+"%"},50)});$.when.apply($,a).then(function(){b.stop(),b=b.animate({width:"100%"},{duration:50,complete:function(){$(".loading-screen").fadeOut(500)}})})}();