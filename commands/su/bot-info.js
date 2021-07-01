const Discord = require('discord.js');

module.exports = {
    name: 'bot-info',
    description: 'List the guilds names, only for admins.',
    hide: true,
    execute(message, args) {

        //Solo Keppler puede ejecutar el comando
        if (message.author.id != 389107931422916618) return message.reply('For privacy reasons, only the bot owner can execute this command.');

        const { client } = require("../../app");

        const guildNamesEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Total guilds', value: client.guilds.cache.size },
                { name: 'Total users', value: client.users.cache.filter(u => !u.bot).size },
            )
            .setTimestamp();

        message.channel.send(guildNamesEmbed);

    },
};