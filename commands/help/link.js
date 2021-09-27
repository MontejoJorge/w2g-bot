const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("link")
        .setDescription("Get the bot invitation link"),
    async execute(interaction) {

        const embedLink = new MessageEmbed()
            .setColor("#FFCA1C")
            .setTitle("Invite the bot!")
            .setURL(interaction.client.generateInvite({
                permissions: [Permissions.FLAGS.ADMINISTRATOR],
                scopes: ["applications.commands", "bot"]
            }))
            .setDescription("Use this link to invite the bot to your servers!")
            .setThumbnail(interaction.client.user.displayAvatarURL())

        const permissions = interaction.channel.permissionsFor(interaction.client.user);

        if (permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
            await interaction.reply({ embeds: [embedLink] });
        } else {
            await interaction.user.send({ embeds: [embedLink] });
            await interaction.user.send("You received this message by DM because I do not have sufficient permissions to send it where you asked for it.");
        }

    }
}