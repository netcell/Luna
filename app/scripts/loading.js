(function(){
    var links = [
        'scripts/angular.min.js',
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
    var p = [];
    var loader = [];
    var totalPercentage = 0;
    var loadingPage = $('.loader');
    for (var i = links.length - 1; i >= 0; i--) {
        p.push(0);
        loader.push($.ajax({
            xhr: function(){
                var xhr = new window.XMLHttpRequest();
                var index = i;
                xhr.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        totalPercentage-=p[index];
                        p[index]=evt.loaded / evt.total;
                        totalPercentage+=p[index];
                        loadingPage = loadingPage.animate({
                            width: (totalPercentage/p.length*100) + "%"
                        },50);
                    } 
                }, false);
                return xhr;
            },
            url: links[i]
        }));
    };
    var loaded = 0;
    $.when.apply($, loader).then(function() {
        loadingPage = loadingPage.animate({
            width: 100 + "%"
        },{
            duration: 50,
            complete: function(){
                $('.popup').addClass('ng-hide');
                $('.loading-screen').fadeOut(500);
            }
        });
    });
})();
