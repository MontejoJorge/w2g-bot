module.exports = {
    name: 'w2g-link',
    description: 'Share the bot invitation link.',

    execute(message, args) {
        message.reply("https://discord.com/api/oauth2/authorize?client_id=832582970350633000&permissions=2147904576&scope=bot")
    },
};