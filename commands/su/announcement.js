module.exports = {
    name: 'announcement',
    description: 'Make an announcement  on all guilds',
    hide: true,
    execute(message, args) {

        //Solo Keppler puede ejecutar el comando
        if (message.author.id != 389107931422916618) return message.reply('Only the bot owner can execute this command.');

        const { client } = require("../../app");

        message.react('🟢').then(() => message.react('🔴'));

        const filter = (reaction, user) => {
            return ['🟢', '🔴'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const announcementText = message.content.replace('!announcement', '');

        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '🟢') {

                    var sent;

                    client.guilds.cache.forEach(guild => {

                        sent = false;

                        guild.channels.cache.forEach(channel => {

                            if (sent) return;
                            if (channel.type !== 'text') return;
                            if (!channel.permissionsFor(guild.me).has(`SEND_MESSAGES`)) return;

                            channel.send(announcementText);

                            sent = true;

                        });

                    });

                } else {

                    message.reply('Announcement cancelled');

                }
            })
            .catch(collected => {
                message.reply('Announcement cancelled');
            });
    }
}