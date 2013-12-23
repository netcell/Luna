(function(){
    var loader = [
        'bower_components/angular/angular.min.js',
        'fonts/SourceSansPro-ExtraLight.ttf',
        'fonts/SourceSansPro-Light.ttf',
        'fonts/SourceSansPro-Semibold.ttf',
        'views/account-over-used.html',
        'views/confirmation.html',
        'views/home.html',
        'views/create.html',
        'views/quick-create.html',
        'views/under-construction.html',
        'views/has.html'
    ];
    var loadingPage = $('.loader');
    var loaded = 0;
    for (var i = loader.length - 1; i >= 0; i--) {
        $.get(loader[i],function(){
            var l = ++loaded;
            loadingPage = loadingPage.animate({
                width: (l*100/loader.length) + "%"
            },{
                duration:100,
                complete: function(){
                    if (l==loader.length) {
                        $('.loading-screen').fadeOut(500);
                    }
                }
            });
        })
    };
})();
