const Activity = require("../models/activity");


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

module.exports = {
    presenceGet,
    announcementGet,
    suggestionGet
}