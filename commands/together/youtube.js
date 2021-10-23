const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { DiscordTogether } = require('discord-together');

const discordTogether = new DiscordTogether({
   token: process.env.DISCORD_TOKEN,
});

module.exports = {
   data: new SlashCommandBuilder()
      .setName('youtube')
      .setDescription('Create a youtube together sesion.'),
   async execute(interaction) {
      const embedRoom = new MessageEmbed();

      if (interaction.member.voice.channel) {
         const link = await discordTogether
            .createTogetherCode(interaction.member.voice.channel.id, 'youtube')
            .then((res) => {
               return res.code;
            });

         embedRoom
            .setColor('#FFCA1C')
            .setTitle('Youtube together session!')
            .setDescription('Click on the link create the room.')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addField('**Create Room:**', link);
      } else {
         interaction.reply(`Please, first join a voice channel.`);
      }

      const permissions = interaction.channel.permissionsFor(
         interaction.client.user
      );

      if (permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
         await interaction.reply({ embeds: [embedRoom] });
      } else if (interaction.member.voice.channel) {
         await interaction.user.send({ embeds: [embedRoom] });
         await interaction.user.send(
            'You received this message by DM because I do not have sufficient permissions to send it where you asked for it.'
         );
      }
   },
};
