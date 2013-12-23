(function(){
    var loader = [
        $.get('bower_components/angular/angular.min.js'),
        $.get('fonts/SourceSansPro-ExtraLight.ttf'),
        $.get('fonts/SourceSansPro-Light.ttf'),
        $.get('fonts/SourceSansPro-Semibold.ttf'),
        $.get('views/account-over-used.html'),
        $.get('views/confirmation.html'),
        $.get('views/home.html'),
        $.get('views/create.html'),
        $.get('views/quick-create.html'),
        $.get('views/under-construction.html'),
        $.get('views/has.html')
    ];
    var loadingPage = $('.loader');
    var loaded = 0;
    for (var i = loader.length - 1; i >= 0; i--) {
        $.when(loader).then(function(){
            loaded++;
            loadingPage.stop();
            loadingPage = loadingPage.animate({
                width: (loaded*100/loader.length) + "%"
            },50);
        })
    };
    $.when.apply($, loader).then(function() {
        loadingPage.stop();
        loadingPage = loadingPage.animate({
            width: 100 + "%"
        },{
            duration: 50,
            complete: function(){
                $('.loading-screen').fadeOut(500);
            }
        });
    });
})();
