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

    if ($(window).scrollTop() >= 80) {
      $('#toAdmin').css({
        display: 'initial'
      })
    }
    else {
      $('#toAdmin').css({
        display: 'none'
      })
    }

    if ($('.article-detail').length && $(window).width() > 600) {
      if ($(window).scrollTop() >= $('.article-detail').offset().top) {
        $('.article-list').css({
          position: 'fixed',
          top: 60,
          right: '2%'
        });
      }
      else {
        $('.article-list').css({
          position: 'initial'
        });
      }
    }
    
  });
});