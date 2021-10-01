const Activity = require("../models/activity");


const presenceGet = async (req, res) => {
    const activities = await Activity.find({}, "-_id -__v");
    
    res.render("presence", {
        activities
    });
}

module.exports = {
    presenceGet
}