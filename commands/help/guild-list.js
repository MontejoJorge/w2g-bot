const Discord = require('discord.js');

module.exports = {
    name: 'guild-list',
    description: 'List the guilds names, only for admins',
    
    execute(message, args) {

        //Solo Keppler puede ejecutar el comando
        if (message.author.id != 389107931422916618) return message.reply('For privacy reasons, only the bot owner can execute this command.');

        const { client } = require("../../app");

        var guildNames = '';
        client.guilds.cache.forEach(guild => {
            guildNames += guild.name + '\n';
        });

        const guildNamesEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Guild list')
            .setDescription(guildNames)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Total guilds', value: client.guilds.cache.size },
            )
            .setTimestamp();

        message.channel.send(guildNamesEmbed);
    },
};