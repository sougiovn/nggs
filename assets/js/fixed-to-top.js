(function() {
  'use strict';

  $(document).ready(function(){
    $(window).on('scroll', function() {
      $('.fixed-to-top').each(function() {
        var toFix = $(this);
        if (!toFix.attr('originalTopOffset')) {
          toFix.attr('originalTopOffset', toFix.offset().top)
        }
        var marginTop = parseInt(toFix.attr('data-margin-top') || 0);
        if (marginTop === NaN) {
          throw Error('data-margin-top must be a number of pixels');
        }
        var currentScroll = $(window).scrollTop();
        var toScroll = parseInt(toFix.attr('originalTopOffset')) + marginTop;
        if(currentScroll >= toScroll) {
          toFix.css({
            top: marginTop + 'px',
            position: 'fixed'
          })
        } else {
          toFix.css({
            position: 'static'
          })
        }
      });
    });
  });
})();