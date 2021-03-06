(function(){
    var loader = [
        $.get('http://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular.min.js'),
        $.get('fonts/SourceSansPro-ExtraLight.ttf'),
        $.get('fonts/SourceSansPro-Light.ttf'),
        $.get('fonts/SourceSansPro-Semibold.ttf')
    ];
    var loadingPage = $('.loader');
    var loaded = 0;
    for (var i = loader.length - 1; i >= 0; i--) {
        $.when(loader).then(function(){
            var l = ++loaded;
            console.log(l);
            loadingPage = loadingPage.animate({
                width: (l*100/loader.length) + "%"
            },50);
        })
    };
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
})();
