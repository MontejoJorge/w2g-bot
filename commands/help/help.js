const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all of my commands or info about a specific command."),
    async execute(interaction) {

        const embedHelp = new MessageEmbed()
            .setColor("#FFCA1C")
            .setTitle("Help")
            .setDescription("Here\'s a list of all my commands:\n")
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setTimestamp()

        interaction.client.commands.map(function (command) {
            embedHelp.addField(`**${command.data.name}**:`, `${command.data.description}`)
        });

        const permissions = interaction.channel.permissionsFor(interaction.client.user);

        if (permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
            await interaction.reply({ embeds: [embedHelp] });
        } else {
            await interaction.user.send({ embeds: [embedHelp] });
            await interaction.user.send("You received this message by DM because I do not have sufficient permissions to send it where you asked for it.");
        }

    }
}