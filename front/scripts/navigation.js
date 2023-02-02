$(window).on('load', function () {

    $('.preloader').fadeOut('fast').end().delay(20).fadeOut('fast');
  });
  $(document).ready(function () {
    $("#herit-page").hide();
    $("#services").hide();
    $("#call-send").hide();
    right_swap_animation();
    unlockScroll();
  });

  $("#phone-nom").click(function () {
    $(this).setCursorPosition(3);
  }).mask("+7(999) 999-9999");

  $("#herit-phone-nom").click(function () {
    $(this).setCursorPosition(3);
  }).mask("+7(999) 999-9999");

  $("#nav-2").click(function () {
    $("#herit-page").fadeIn("fast");
    $("#services").fadeIn("fast");
    lockScroll();
  });
  $("#exit").click(function () {
    $("#herit-page").fadeOut("fast");
    $("#services").fadeOut("fast");
    unlockScroll();
  });
  $("#callbox-send-nom").click(function () {
    $("#herit-page").fadeIn("fast");
    $("#call-send").fadeIn("fast");
    lockScroll();
  });
  $("#herit-callbox-send-nom").click(function () {
    $("#herit-page").fadeIn("fast");
    $("#services").fadeOut("fast");
    $("#call-send").fadeIn("fast");
  });
  $("#cs-exit-grid").click(function () {
    $("#herit-page").fadeOut("fast");
    $("#call-send").fadeOut("fast");
    unlockScroll();
  });
  $("#exit").click(function () {
    $("#herit-page").fadeOut("fast");
    $("#services").fadeOut("fast");
    unlockScroll();
  });
  $("#nav-1").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#sales").offset().top
    }, 1000);
  });
  $("#nav-3").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#reviews").offset().top
    }, 1000);
  });
  $("#call-back").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#call-box").offset().top
    }, 1000);
  });

  local_pageX = 0;
  document.getElementById("display").addEventListener('touchstart', function (e) {
    local_pageX = e.changedTouches[0].pageX;
    console.log("1")
  }, false);

  document.getElementById("display").addEventListener('touchend', async function (e) {
    if (e.changedTouches[0].pageX <= local_pageX)
      s = await right_swap_animation();
    else
      s = await left_swap_animation();
  }, false);
  $("#herit-page").click(function () {
    $("#herit-page").fadeOut("fast");
    $("#services").fadeOut("fast");
    $("#call-send").fadeOut("fast");
    unlockScroll();
  });
  $("#sn-left").click(function () {
    left_swap_animation();
  });
  $("#sn-right").click(function () {
    right_swap_animation();
  });