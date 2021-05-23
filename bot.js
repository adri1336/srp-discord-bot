require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Ready!");
});

const commandsReplies = [
    ["!ip", "la ip del servidor de SA-MP es: samp.super-rp.es:7777"],
    ["!web", "la página web es: https://www.super-rp.es/"],
    ["!foro", "la dirección de nuestro foro es: https://forum.super-rp.es/"],
    ["!instagram", "nuestro Instagram es: https://www.instagram.com/super_rp.es/"],
    ["!ts3", "esta es la dirección de nuestro TeamSpeak 3: ts3.super-rp.es:9988"]
];

client.on("message", msg => {
    if(msg.author.id === client.user.id) return;

    if(msg.channel.name === "bot-noticias") {
        const channel = client.channels.cache.get(process.env.NEWS_CHANNEL_ID);
        channel.send(msg);
        msg.reply("enviado, mensaje: " + msg.content);
    }
    else if(msg.channel.name === "bot-actualizaciones") {
        const channel = client.channels.cache.get(process.env.UPDATES_CHANNEL_ID);
        channel.send(msg);
        msg.reply("enviado, mensaje: " + msg.content);
    }
    else {
        commandsReplies.forEach(commandReply => {
            if(msg.content === commandReply[0]) {
                msg.reply(commandReply[1]);
            }
        });
    }
});

client.login(process.env.BOT_TOKEN);