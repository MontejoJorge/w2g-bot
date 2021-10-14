const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(interaction) {

        if (!interaction.content.startsWith(process.env.prefix) || interaction.author.bot) return;

        const fin = new Date('November 1, 2021 00:00:00');
        const today = new Date();
        if (fin.getTime() < today.getTime()) return;

        const command = interaction.client.commands.get(interaction.content.substring(1))

        if (command) {

            const permissions = interaction.channel.permissionsFor(interaction.client.user);

            if (!permissions.has(Permissions.FLAGS.EMBED_LINKS)) return;

            const embedWarn = new MessageEmbed()
                .setColor("#F70000")
                .setTitle("❗ Deprecated usage")
                .setDescription("We are updating the bot to use slash commands, " +
                    "classics commands now have limited functions, " +
                    "so they may not work properly.")
                .addField("**When will it stop working?**", "October 31, 2021")
                .setTimestamp()
                .setFooter("w2g-bot Team", interaction.client.user.displayAvatarURL());

            await interaction.reply({ embeds: [embedWarn] })

            const embedUpdate = new MessageEmbed()
                .setColor("#FFCA1C")
                .setTitle("Update the bot permisions")
                .setDescription("To create the slash commads the bot require new permisions, if you cant see the slash commands, update it by clicking on the link.")
                .setURL(interaction.client.generateInvite({
                    permissions: [Permissions.FLAGS.ADMINISTRATOR],
                    scopes: ["applications.commands", "bot"]
                }))
                .setThumbnail(interaction.client.user.displayAvatarURL())

            await interaction.channel.send({ embeds: [embedUpdate] })

            try {

                command.execute(interaction);
    
            } catch (error) {
    
                console.error(error);
    
                return interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        }


    }
}