const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { w2gRoom } = require("../../helpers/w2gRoom");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("w2g")
        .setDescription("Create w2g room")
        .addStringOption(option => 
            option.setName("url")
                .setDescription("Video URL")
                .setRequired(false)),
    async execute(interaction) {

        const url = interaction.options ? interaction.options.getString("url") : "";

        const roomUrl = await w2gRoom(url);

        const embedRoom = new MessageEmbed()
            .setColor("#FFCA1C")
            .setTitle("W2G Room!")
            .setDescription("Click on the link to go the w2g room.")
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addField("**Room:**", roomUrl)

        if (url)
            embedRoom.addField("**Video:**", url);

        await interaction.reply({ embeds: [embedRoom] });
    }
}