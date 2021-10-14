const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { w2gRoom } = require("../../helpers/w2gRoom");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("w2g")
        .setDescription("Create w2g room.")
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

        const permissions = interaction.channel.permissionsFor(interaction.client.user);

        if (permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
            await interaction.reply({ embeds: [embedRoom] });
        } else {
            await interaction.user.send({ embeds: [embedRoom] });
            await interaction.user.send("You received this message by DM because I do not have sufficient permissions to send it where you asked for it.");
        }
    }
}