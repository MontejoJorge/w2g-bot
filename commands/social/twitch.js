const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('twitch')
      .setDescription(
         'Create a custom message to be sent when a stream starts on twitch.'
      ),
   async execute(interaction = Interaction) {
      const twitchEmbed = new MessageEmbed()
         .setColor('#FFCA1C')
         .setTitle('Create twitch notification')
         .setDescription(
            'Log in to the web and create the notification https://better-bot.com/dashboard/twitch'
         )
         .addField('Server ID', interaction.guild.id)
         .addField('Channel ID', interaction.channel.id)
         .setThumbnail(interaction.client.user.displayAvatarURL());

      const permissions = interaction.channel.permissionsFor(
         interaction.client.user
      );

      if (permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
         await interaction.reply({ embeds: [twitchEmbed] });
      } else {
         await interaction.user.send({ embeds: [twitchEmbed] });
         await interaction.user.send(
            'You received this message by DM because I do not have sufficient permissions to send it where you asked for it.'
         );
      }
   },
};
