const { MessageEmbed, Permissions } = require('discord.js');
const axios = require("axios");

const notifiTwitchStream = async (notification) => {
    const client = require("../bot");

    const guild = client.guilds.cache.find(guild => guild.id == notification.guild_id);

    const channel = guild.channels.cache.find(channel => channel.id === notification.channel_id);

    const twitchEmbed = new MessageEmbed()
        .setColor("#6441A4")
        .setTitle("Stream online!")
        .setThumbnail(notification.profile_image_url)
        .addField("URL", notification.url)
        .setTimestamp()


    const permissions = channel.permissionsFor(client.user);
    if (!permissions.has(Permissions.FLAGS.EMBED_LINKS)) return

    return channel.send({ content: notification.message, embeds: [twitchEmbed] });



}

module.exports = {
    notifiTwitchStream
}