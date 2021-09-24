const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

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

        //Add space to the end
        embedHelp.addField("\u200B","\u200B");

        await interaction.reply({ embeds: [embedHelp] });

    }

}