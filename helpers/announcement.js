const { Permissions } = require('discord.js');

const announcement = async (announcementText) => {
    const client = require("../bot");

    client.guilds.cache.map((guild) => {

        let sent = false;

        guild.channels.cache.map(async (c) => {

            if (sent) return;

            if (c.type == "GUILD_TEXT" && c.permissionsFor(client.user).has(Permissions.FLAGS.SEND_MESSAGES)) {
  
                try {
                    sent = true;
                    await c.send(announcementText);
                } catch (error) {
                    console.log(error);
                }
            }

        });

    });

}

module.exports = {
    announcement
}