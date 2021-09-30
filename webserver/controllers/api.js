const { setBotPresence } = require("../../helpers/botPresence");
const Activity = require("../models/activity");

const presencePost = async (req, res) => {

    if (!Array.isArray(req.body.activity)) {
        req.body.activity = [req.body.activity]
    }
    if (!Array.isArray(req.body.type)) {
        req.body.type = [req.body.type]
    }
    
    var activities = [];

    for (let i = 0; i < req.body.activity.length; i++) {
        if (!req.body.activity[i]) continue;

        activities.push({
            name: req.body.activity[i],
            type: req.body.type[i]
        });
    }
    await Activity.deleteMany({});

    await Activity.insertMany(activities)
        .then(req.flash('status', 'Operation completed successfully'))
        .catch((err) => {
            req.flash('status', 'Error: Something went wrong');
            console.error(err);
        });

    res.redirect('back');

    setBotPresence(activities);

}


module.exports = {
    presencePost
}