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

  function out_mesage(head,text){
    $("#h-text").text(head);
    $("#text").text(text);
    $("#herit-page").fadeIn("fast");
    $("#call-send").fadeIn("fast");
    lockScroll();
  }

  let curr_coment_first = 0;
  let coment_len = 0;
  function next_coments(){
    $("#rv-container").fadeOut("fast");
    curr_coment_first+=3;
    if(curr_coment_first>=coment_len)curr_coment_first-=coment_len;
    coment_len = coments.length;
    reviews = document.getElementsByClassName("review");
    if(coment_len!=0){
      let iter = curr_coment_first;
      res = ""
      for(let i = 0; i<3;i++)
      {
        if(iter == coment_len) iter = 0;
        $(reviews[i]).empty();
        let str = `<content class="rw-name">${coments[iter].client_fn}</content>
        <br />
        <content class="rw-class">Клиент</content>
        <br />
        <content class="rw-text"
          >${coments[iter].text}</content
        >
        <br />
        <content class="rw-date">${coments[iter].date.Day}.${coments[iter].date.Month}.${coments[iter].date.Year}   ${coments[iter].date.Hour}:${coments[iter].date.Min}</content>
        <div class="under-line"></div>`;
        $(reviews[i]).html(str);
        console.log(str);
        iter++; 
      }
    }
    $("#rv-container").fadeIn("fast");
  }