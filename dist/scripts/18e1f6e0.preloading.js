!function(){for(var a=[$.get("http://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular.min.js"),$.get("fonts/SourceSansPro-ExtraLight.ttf"),$.get("fonts/SourceSansPro-Light.ttf"),$.get("fonts/SourceSansPro-Semibold.ttf")],b=$(".loader"),c=0,d=a.length-1;d>=0;d--)$.when(a).then(function(){var d=++c;console.log(d),b=b.animate({width:100*d/a.length+"%"},50)});window.addEventListener("load",function(){FastClick.attach(document.body)},!1)}();