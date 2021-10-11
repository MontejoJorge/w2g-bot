const Activity = require("../models/activity");
const TwitchWebhook = require("../models/twitchWebhook");


const presenceGet = async (req, res) => {
    const activities = await Activity.find({}, "-_id -__v");
    
    res.render("presence", {
        activities
    });
}

const announcementGet = (req, res) => {
    res.render("announcement");
}

const suggestionGet = (req, res) => {
    res.render("suggestion");
}

const twitchGet = async (req, res) => {
    res.render("twitch", {
        notification: await TwitchWebhook.findOne({user: req.user._id})
    });
}

module.exports = {
    presenceGet,
    announcementGet,
    suggestionGet,
    twitchGet
}