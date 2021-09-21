require('dotenv').config()
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.cooldowns = new Collection();

const { prefix, DISCORD_TOKEN, TOP_GG_TOKEN } = process.env;

//Search events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

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
// const ap = AutoPoster(TOP_GG_TOKEN, client);

// ap.on('posted', () => { console.log('Posted stats to top.gg') });

client.login(DISCORD_TOKEN);

module.exports = {
    client
}