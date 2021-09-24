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

        await interaction.reply({ embeds: [embedLink]});
    }
}