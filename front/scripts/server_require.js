let coments = [];
async function get_comments() {
  try {
    let req = await $.post("/get_coments", {});
    coments = JSON.parse(req);
    next_coments();
  } catch (err) {
    console.log(err);
    out_mesage("Что то пошло не так", "Попробуйте позже");
  }
}
let services = [];
async function get_services() {
  try {
    if (services.length != 0) return;
    $("#serv-loading").show();
    let res = await $.post("/get_services");
    $("#serv-loading").hide();
    services = JSON.parse(res);
    for (i = 0; i < services.length; i++) {
      el = document.createElement("option");
      el.textContent = services[i].name;
      el.id = services[i].id;
      document.getElementById("search").appendChild(el);
    }
    document
      .getElementById("search")
      .getElementsByTagName("option")[0].selected = true;
    document
      .getElementById("serv-photo")
      .setAttribute("src", services[0].photo);
    document.getElementById("serv-description").textContent =
      services[0].description;
    document.getElementById("serv-price").textContent =
      "Примерная стоимость данной услуги: " + services[0].price;
  } catch (err) {
    console.log(err);
    out_mesage("Что то пошло не так", "Попробуйте позже");
  }
}
let nom = "";
$("#herit-callbox-send-nom").click(async function () {
  nom = document.getElementById("herit-phone-nom").value;
  $("#services").fadeOut("fast");
  if (nom.length != 16) {
    unlockScroll();
    out_mesage(
      "Неправильный номер",
      "Пожалуйста исправьте и попробуйте еще раз"
    );
  } else {
    $("#coment-form").fadeIn("fast");
  }
});
$("#callbox-send-nom").click(async function () {
  nom = document.getElementById("phone-nom").value;
  if (nom.length != 16)
    out_mesage(
      "Неправильный номер",
      "Пожалуйста исправьте и попробуйте еще раз"
    );
  else {
    $("#herit-page").fadeIn("fast");
    $("#coment-form").fadeIn("fast");
    lockScroll();
  }
});

async function send_msg(nomber, msg) {
  try {
    let res = await $.post("/send_message", {
      nom: nomber,
      msg: msg,
    });
    if (res === "0") {
      return 0;
    }
  } catch (err) {
    console.log(err);
    out_mesage("Что то пошло не так", "Попробуйте позже");
  }
}

$("#cf-btn").click(async function () {
  coment = document.getElementById("cf-comm").value;
  if (coment.length > 0) {
    $("#coment-form").fadeOut("fast");
    $("#herit-page-loading").show();
    res = await send_msg(nom, coment);
    unlockScroll();
    if (res === 0) {
      out_mesage("Мы получили ваше сообщение", "Ожидайте звонка");
    } else {
      out_mesage("Что то пошло не так", "Попробуйте позже");
    }
  } else {
    $("#cf-err").text("Введите коментарий к заказу");
    setTimeout(function () {
      $("#cf-err").text("");
    }, 1000);
  }
});
