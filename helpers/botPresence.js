const Activity = require("../webserver/models/activity");

var activities = [];

var state = 0;

var intervalTime = 10000;

const botPresence = async (client) => {
    activities = await Activity.find({});

    checkEmptyActivities(activities);

    presenceInterval(client);

}

const setBotPresence = (newActivities, time = 0) => {
    activities = newActivities;
    checkEmptyActivities(activities);
    
    if (time > 0) {
        intervalTime = time;
    }
}

function checkEmptyActivities(acts) {
    if (acts.length == 0) {
        activities.push({
            name: "/help",
            type: "PLAYING",
        })
    }
}

function presenceInterval(client) {
    setInterval(() => {

        state = (state + 1) % activities.length;
    
        var { name, type } = activities[state];
        name = name.replace("guild.count", `${client.guilds.cache.size}`)

        client.user.setPresence({ activities: [{ name, type }], status: 'online' });

    }, intervalTime);
}


module.exports = {
    botPresence,
    setBotPresence
};