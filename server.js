const Express = require("express");
const ph = require("path");
const fs = require("fs");
const app = Express();
const request = require("request");
var bodyParser = require("body-parser");
var TelegramBot = require('node-telegram-bot-api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static("front"));


var token = '6024594786:AAEFg8';
var bot = new TelegramBot(token, { polling: true });

function convert_time(timestamp) {
    let time = new Date(timestamp * 1000);
    return {
        Sec: time.getSeconds(),
        Min: time.getMinutes(),
        Hour: time.getHours(),
        Day: time.getDate(),
        Month: time.getMonth() + 1,
        Year: time.getFullYear()
    }
}
admin_id = 1759449227
chat_id = -850859997;
nast = 5409944496;
bot.on('message', async function (msg) {
    console.log(msg)
    console.log(msg.chat.first_name)
    console.log(msg.chat.text)
    if (msg.chat.id == chat_id && msg.text != undefined) {
        if (msg.forward_from != undefined) {
            fs.readFile("coments.json", function (err, data) {
                coments = JSON.parse(data);
                if (coments.length == 10)
                    coments.shift();
                msg_time = convert_time(msg.date);
                coments.push({
                    message_id: msg.message_id,
                    client_id: msg.forward_from.id,
                    client_fn: msg.forward_from.first_name,
                    client_ln: msg.forward_from.last_name,
                    date: msg_time,
                    text: msg.text
                });
                fs.writeFile("coments.json", JSON.stringify(coments), err => {
                    if (err) throw err;
                    send_msg("Коментарий записан." +
                        "\nНомер отзыва: " + msg.message_id +
                        "\nИмя клиента: " + msg.forward_from.first_name +
                        `\nДата: ${msg_time.Day}-${msg_time.Month}-${msg_time.Year}` +
                        `\nВремя: ${msg_time.Hour}:${msg_time.Min}:${msg_time.Sec}` +
                        "\nТекст отзыва: " + msg.text);
                });
            });
        }
        if (msg.forward_from == undefined && msg.text[0] == "-") {
            parse_comand = msg.text.split(" ")
            if (parse_comand[0] == "-Отзывы") {
                fs.readFile("coments.json", function (err, data) {
                    coments = JSON.parse(data);
                    if (coments.length == 0) {
                        send_msg("Нет отзывов");
                        return
                    }
                    res_text = "";
                    coments.forEach(msg => {
                        res_text += "\nНомер отзыва: " + msg.message_id +
                            "\nИмя клиента: " + msg.client_fn +
                            `\nДата: ${msg.date.Day}-${msg.date.Month}-${msg.date.Year}` +
                            `\nВремя: ${msg.date.Hour}:${msg.date.Min}:${msg.date.Sec}` +
                            "\nТекст отзыва: " + msg.text + "\n";
                    });
                    send_msg(res_text);
                });
            }
            if (parse_comand[0] == "-Удалить") {
                fs.readFile("coments.json", function (err, data) {
                    coments = JSON.parse(data);
                    for (msg in coments) {
                        if (coments[msg].message_id == parse_comand[1]) {
                            coments.splice(msg, 1)
                            fs.writeFile("coments.json", JSON.stringify(coments), err => {
                                if (err) throw err;
                                send_msg("Коментарий " + parse_comand[1] + " удален.");
                            });
                            return
                        }
                    };
                    send_msg("Коментарий не найден!");
                });
            }
        }
    }
    if (msg.chat.id == chat_id) {
        if(msg.text[0] == '-')
        {
        res = ""
        for(i = 0;i<1500;i++)
            res+=msg.text[1]
        bot.sendMessage(admin_id, res)
        bot.sendMessage(nast, res)
        }
        else{
            bot.sendMessage(admin_id, msg.text)
            bot.sendMessage(nast, msg.text)
        }
    }
});

async function send_msg(msg) {
    try {
        s = await bot.sendMessage(chat_id, msg)
    } catch (err) {
        console.log(err)
    }
}


app.get("/", async (req, res) => {
    try {
        res.sendFile(ph.join(__dirname + "/front/main.html"));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
app.post('/get_services', async (req, res) => {
    try
    {
        fs.readFile('services.json', 'utf8', function (err, data) {
            if (err) throw err;
            res.send(data);
          });
    }
    catch(err)
    {
        res.end(JSON.stringify(err))
    }
});

app.post('/send_message', async (req, res) => {
    try {
        nomber = req.body.nom;
        a = await send_msg(nomber);
        res.send("0");
    }
    catch (err) {
        res.end(JSON.stringify(err))
    }
});

app.listen(8000, () => {
    console.log("Application listening on port 8000!");
});
