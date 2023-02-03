const Express = require("express");
const ph = require("path");
const app = Express();
const request = require("request");
var bodyParser = require("body-parser");
var TelegramBot = require('node-telegram-bot-api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static("front"));


var token = '6024594786:AAEFvAXP3QQWx3OCHreRLYFncQjqBDW4Sg8';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function onMessage(msg) {
    console.log(msg.chat)
});

async function send_msg(msg) {
    try{
        s = await bot.sendMessage(1759449227,msg)
    } catch (err){
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
app.post('/send_message', async (req, res) => {
    try
    {
        nomber = req.body.nom;
        console.log(nomber)
        a = await send_msg(nomber);
        res.send("0");
    }
    catch(err)
    {
        res.end(JSON.stringify(err))
    }
});

app.listen(8000, () => {
    bot.ms
    console.log("Application listening on port 8000!");
});
