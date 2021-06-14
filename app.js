require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const AutoPoster = require('topgg-autoposter');

//const Server = require("./webserver/models/server");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const { prefix, DISCORD_TOKEN, TOP_GG_TOKEN } = process.env;

//Buscamos los comandos en las subcarpetas de ./comands
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log(`Ready on: ${client.guilds.cache.size} servers!`);

    client.user.setActivity("!w2g || !help", {
        type: "PLAYING"
    });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Obtenemos los argumentos y el comando
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    //Si el comando no existe nos salimos
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    //Cooldowns
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //Intentamos ejecutar el comando
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

//TOP.GG autoposter
const ap = AutoPoster(TOP_GG_TOKEN, client);

ap.on('posted', () => { // ran when succesfully posted
    console.log('Posted stats to top.gg')
});

client.login(DISCORD_TOKEN);

//Web Server
// const server = new Server();

// server.listen();

module.exports = {
    client
}