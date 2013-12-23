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
            loadingPage = loadingPage.animate({
                width: (++loaded*100/loader.length) + "%"
            },{
                duration:100,
                complete: function(){
                    if (loaded==loader.length) {
                       loadingPage.stop();
                       loadingPage.animate({
                            width: (++loaded*100/loader.length) + "%"
                        },function(){
                            $('.loading-screen').fadeOut(500);
                        });
                    }
                }
            });
        })
    };
})();
