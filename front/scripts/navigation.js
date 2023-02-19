$(window).on("load", function () {
  $(".preloader").fadeOut("fast").end().delay(20).fadeOut("fast");
});
$(document).ready(function () {
  get_comments();
  $("#herit-page").hide();
  $("#services").hide();
  $("#call-send").hide();
  $("#serv-loading").hide();
  $("#big-img").hide();
  $("#coment-form").hide();
  right_swap_animation();
  unlockScroll();
});

$("#search").change(function (e) {
  id = e.target.selectedIndex;
  document.getElementById("serv-photo").setAttribute("src", services[id].photo);
  document.getElementById("serv-description").textContent =
    services[id].description;
  document.getElementById("serv-price").textContent =
    "Примерная стоимость данной услуги: " + services[id].price;
});
$("#phone-nom")
  .click(function () {
    $(this).setCursorPosition(3);
  })
  .mask("+7(999) 999-9999");

$("#herit-phone-nom")
  .click(function () {
    $(this).setCursorPosition(3);
  })
  .mask("+7(999) 999-9999");

$("#nav-2").click(function () {
  get_services();
  $("#herit-page").fadeIn("fast");
  $("#services").fadeIn("fast");
  $("#coment-form").fadeOut("fast");
  lockScroll();
});
$("#reviews").click(function () {
  next_coments();
});
$("#cs-exit-grid").click(function () {
  $("#herit-page").fadeOut("fast");
  $("#call-send").fadeOut("fast");
  unlockScroll();
});
$(".exit").click(function () {
  $("#herit-page").fadeOut("fast");
  $("#services").fadeOut("fast");
  $("#coment-form").fadeOut("fast");
  unlockScroll();
});
$("#nav-1").click(function () {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#sales").offset().top,
    },
    1000
  );
});
$("#nav-3").click(function () {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#reviews").offset().top,
    },
    1000
  );
});
$("#call-back").click(function () {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#call-box").offset().top,
    },
    1000
  );
});

local_pageX = 0;
document.getElementById("display").addEventListener(
  "touchstart",
  function (e) {
    local_pageX = e.changedTouches[0].pageX;
  },
  false
);

document.getElementById("display").addEventListener(
  "touchend",
  async function (e) {
    if (e.changedTouches[0].pageX <= local_pageX)
      s = await right_swap_animation();
    else s = await left_swap_animation();
  },
  false
);
$("#herit-page").click(function () {
  $("#herit-page").fadeOut("fast");
  $("#services").fadeOut("fast");
  $("#call-send").fadeOut("fast");
  $("#big-img").fadeOut("fast");
  $("#coment-form").fadeOut("fast");
  $("#bi-shell").empty();
  unlockScroll();
});
$(".image-img").click(function () {
  el = $(this).clone();
  el.className = "";
  el.appendTo("#bi-shell");
  $("#herit-page").fadeIn("fast");
  $("#big-img").fadeIn("fast");
  lockScroll();
});
$("#sn-left").click(function () {
  left_swap_animation();
});
$("#sn-right").click(function () {
  right_swap_animation();
});
 
function removeFilesItem(target){
	let name = $(target).prev().text();
	let input = $(target).closest('.input-file-row').find('input[type=file]');	
	$(target).closest('.input-file-list-item').remove();	
	for(let i = 0; i < dt.items.length; i++){
		if(name === dt.items[i].getAsFile().name){
			dt.items.remove(i);
		}
	}
	input[0].files = dt.files;
}