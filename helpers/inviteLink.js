const { Permissions } = require('discord.js');

const getBotLink = () => {

    const client = require("../bot");

    return client.generateInvite({
        permissions: [Permissions.FLAGS.ADMINISTRATOR],
        scopes: ["applications.commands", "bot"]
    })
}

module.exports = getBotLink;