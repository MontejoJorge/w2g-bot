const { botPresence } = require('../helpers/botPresence');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready on: ${client.guilds.cache.size} servers!`);
        
        botPresence(client);
    }
}