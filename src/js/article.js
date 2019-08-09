import $ from 'jquery';

export default {
  setArticleListSize() {
    let setSize = function() {
      if ($('.article-detail').length) {
        if ($(window).scrollTop() >= $('.article-detail').offset().top) {
          $('.article-list').css({
            position: 'fixed',
            top: 60,
            right: '20px',
            height: '100%'
          });
        }
        else {
          $('.article-list').css({
            position: 'initial'
          });
        }
        let articleListHeight = $('footer').offset().top - $('.article-list').offset().top - 10;
        if ($(window).scrollTop() + $(window).height() >= $('footer').offset().top) {
          $('.article-list').css({
            height: articleListHeight
          });
        }
        else {
          $('.article-list').css({
            height: '100%'
          });
        }
      }
    }
    setSize();
    $(window).scroll(function() {
      setSize();
    });
  }
}