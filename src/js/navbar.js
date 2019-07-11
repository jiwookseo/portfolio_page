$(document).ready(function(){

    $(window).scroll(function(){
        if ($('.homeContent').length) {
            if ($(window).scrollTop() >= $('.homeContent').offset().top) {
                $('.navbar').css({
                    position: 'fixed',
                    bottom: 'initial',
                    top: 0,
                });
            }
            else {
                $('.navbar').css({
                    position: 'absolute',
                    top: 'initial',
                    bottom: 0,
                });
            }
        }
        
    });

});