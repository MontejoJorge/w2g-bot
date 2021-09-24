const botActivity = require('../helpers/botActivity');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready on: ${client.guilds.cache.size} servers!`);

        botActivity(client);
    }
}