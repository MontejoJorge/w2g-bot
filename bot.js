require('dotenv').config()
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, TOP_GG_TOKEN } = process.env;

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

//Search commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            { body: commands },
        );

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const ap = AutoPoster(TOP_GG_TOKEN, client);

ap.on('posted', () => { console.log('Posted stats to top.gg') });

client.login(DISCORD_TOKEN);

module.exports = {
    client
}