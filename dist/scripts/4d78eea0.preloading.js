!function(){for(var a=[$.get("bower_components/angular/angular.min.js"),$.get("fonts/SourceSansPro-ExtraLight.ttf"),$.get("fonts/SourceSansPro-Light.ttf"),$.get("fonts/SourceSansPro-Semibold.ttf"),$.get("views/account-over-used.html"),$.get("views/confirmation.html"),$.get("views/home.html"),$.get("views/create.html"),$.get("views/quick-create.html"),$.get("views/under-construction.html"),$.get("views/has.html")],b=$(".loader"),c=0,d=a.length-1;d>=0;d--)$.when(a).then(function(){var d=c+1;c++,b=b.animate({width:100*d/a.length+"%"},{duration:100,complete:function(){d==a.length&&$(".loading-screen").fadeOut(500)}})})}();