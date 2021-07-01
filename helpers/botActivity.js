const botActivity = (client) => {

    let activities = [
        "!help",
        "new command !yt",
        "new command !clear",
        `on ${client.guilds.cache.size} servers`,
    ];

    setInterval(() => {
        let guildCount = client.guilds.cache.size;

        activities = [
            "!help",
            "new command !yt",
            "new command !clear",
            `on ${guildCount} servers`,
        ];

    }, 600000);

    setInterval(() => {
        //generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * activities.length);

        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity);

    }, 10000);

}

module.exports = botActivity;