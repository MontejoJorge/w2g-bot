const Discord = require('discord.js');
const client = new Discord.Client();

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

module.exports = {
    name: 'yt',
    cooldown: 5,
    description: 'Create an invitation link to use youtube on the voice channel.',
    execute(message, args) {

        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {

                const guildNamesEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`Click here: ${invite.code}`)

                return message.channel.send(guildNamesEmbed);
            });
        } else {
            message.reply(`Please, join to voice channel`)
        };

    },
};