module.exports = {
    name: 'clear',
    description: 'Delete a custom number of chat messages',
    usage: "[number of messages]",
    execute(message, args) {

        const numberToDelete = parseInt(args[0]);

        if (!args[0] || isNaN(numberToDelete)){
            return message.reply('please specify a number of messages to be delete.');
        }

        if (numberToDelete >= 100) {
            return message.reply('i cannot delete more than 100 messages.');
        }

        if (!message.member.guild.me.hasPermission('MANAGE_MESSAGES')){
            return message.reply('you must have permissions to delete a message.');
        }

        message.channel.bulkDelete(numberToDelete)
            .then(messages => message.channel.send(`${messages.size} messages have been deleted.`))
            .catch(console.error);

    },
};