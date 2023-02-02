function lockScroll(){
    $html = $('html'); 
    $body = $('body'); 
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);   

    var marginR = $body.outerWidth()-initWidth;
    var marginB = $body.outerHeight()-initHeight; 
    $body.css({'margin-right': marginR,'margin-bottom': marginB});
} 

function unlockScroll(){
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);    

    $body.css({'margin-right': 0, 'margin-bottom': 0});
}

(function ($) {
    $.fn.isBeforeElement = function (elem) {
        if (typeof(elem) == "string") elem = $(elem); //just in case of bad input
        return this.add(elem).index(elem) > 0;
    }
})(jQuery);

$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
};

async function left_swap_animation() {
    var sale_boxes = document.getElementsByClassName("sales-box");
    var len = sale_boxes.length;
    next_SB = $("#active-sb").prev();
    s = await $(sale_boxes[parseInt(len / 2) - 1]).stop().animate({ "width": "28vw", "opacity": "1", "height": "28vw" }, 200);
    s = await $(sale_boxes[parseInt(len / 2)]).stop().animate({ "width": "10vw", "opacity": "0.5", "height": "10vw" }, 200);
    s = await $(sale_boxes[len - 1]).stop().animate({ "width": "0vw", "opacity": "0.0", "height": "0vw" }, 100, function () {
      $('#sales-boxes').prepend(sale_boxes[len - 1]);
    }).animate({ "width": "10vw", "opacity": "0.5", "height": "10vw" }, 100);
  }
async function right_swap_animation() {
    var sale_boxes = document.getElementsByClassName("sales-box");
    var len = sale_boxes.length;
    next_SB = $("#active-sb").prev();
    s = await $(sale_boxes[parseInt(len / 2)]).stop().animate({ "width": "10vw", "opacity": "0.5", "height": "10vw" }, 200);
    s = await $(sale_boxes[parseInt(len / 2) + 1]).stop().animate({ "width": "28vw", "opacity": "1", "height": "28vw" }, 200);
    s = await $(sale_boxes[0]).stop().animate({ "width": "0vw", "opacity": "0.0", "height": "0vw" }, 100, function () {
      $('#sales-boxes').append(sale_boxes[0]);
    }).animate({ "width": "10vw", "opacity": "0.5", "height": "10vw" }, 100);
  }