const Activity = require("../models/activity");


const presenceGet = async (req, res) => {
    const status = String(req.flash('status'));
    const activities = await Activity.find({}, "-_id -__v");
    
    res.render("presence", {
        status,
        activities
    });
}

module.exports = {
    presenceGet
}