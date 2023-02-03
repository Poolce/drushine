async function send_nom(nomber) {
  try {
    let res = await $.post("http://localhost:8000/send_message", {
      nom: nomber,
    });
    if (res === "0") {
      return 0;
    }
  } catch (err) {
    console.log(err);
  }
}

$("#herit-callbox-send-nom").click(async function () {
  nom = document.getElementById("herit-phone-nom").value;
  $("#services").fadeOut("fast");
  if (nom.length != 16) alert("Некорректный номер");
  else {
    $("#herit-page-loading").fadeIn();
    $("#herit-page").fadeIn("fast");
    $('#herit-page').off('click');
    let res = await send_nom(nom);
    $("#herit-page").click(function () {
        $("#herit-page").fadeOut("fast");
        $("#services").fadeOut("fast");
        $("#call-send").fadeOut("fast");
        unlockScroll();
      });
    unlockScroll();
    $("#herit-page").fadeOut("fast");
    $("#herit-page-loading").fadeOut();
    if (res === 0)
      out_mesage(
        "Пожалуйста подождите",
        "Мы перезвоним вам в ближайшее время."
      );
    else {
      out_mesage("Что-то пошло не по плану", "Попробуйте позже.");
    }
  }
});
$("#callbox-send-nom").click(async function () {
  nom = document.getElementById("phone-nom").value;
  if (nom.length != 16) alert("Некорректный номер");
  else {
    $("#herit-page-loading").fadeIn();
    $("#herit-page").fadeIn("fast");
    lockScroll();
    $('#herit-page').off('click');
    let res = await send_nom(nom);
    $("#herit-page").click(function () {
        $("#herit-page").fadeOut("fast");
        $("#services").fadeOut("fast");
        $("#call-send").fadeOut("fast");
        unlockScroll();
      });
    unlockScroll();
    $("#herit-page").fadeOut("fast");
    $("#herit-page-loading").fadeOut();
    if (res === 0)
      out_mesage(
        "Пожалуйста подождите",
        "Мы перезвоним вам в ближайшее время."
      );
    else {
      out_mesage("Что-то пошло не по плану", "Попробуйте позже.");
    }
  }
});
