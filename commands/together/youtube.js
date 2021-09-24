const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { DiscordTogether } = require('discord-together');

const discordTogether = new DiscordTogether({ token: process.env.DISCORD_TOKEN });

module.exports = {
    data: new SlashCommandBuilder()
        .setName("youtube")
        .setDescription("Create a youtube together sesion."),
    async execute(interaction) {

        if (interaction.member.voice.channel) {

            const link = await discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube')
                .then(res => { return res.code });

            const embedRoom = new MessageEmbed()
                .setColor("#FFCA1C")
                .setTitle("Youtube together session!")
                .setDescription("Click on the link create the room.")
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .addField("**Create Room:**", link)

            await interaction.reply({ embeds: [embedRoom] });

        } else {
            interaction.reply(`Please, join a voice channel.`)
        }


    }
}