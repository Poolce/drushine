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

let services;
async function get_services() {
  try {
    $("#serv-loading").show();
    let res = await $.post("http://localhost:8000/get_services");
    $("#serv-loading").hide();
    services = JSON.parse(res);
    console.log(services)
    console.log(services.length)
    for(i = 0;i<services.length;i++){
      el = document.createElement("option");
      el.textContent = services[i].name;
      el.id = services[i].id;
      document.getElementById("search").appendChild(el);
    }
    document.getElementById("search").getElementsByTagName("option")[0].selected = true;
    document.getElementById("serv-photo").setAttribute("src", services[0].photo);
    document.getElementById("serv-description").textContent = services[0].description;
    document.getElementById("serv-price").textContent = "Примерная стоимость данной услуги: "+services[0].price;
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
