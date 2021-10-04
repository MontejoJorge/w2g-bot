const { announcement } = require("../../helpers/announcement");
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

        if (req.body.activity[i].length > 35) {
            req.flash('error', 'Error: Maximum allowed length for name is 35 characters');
            return res.redirect('back');
        }

        activities.push({
            name: req.body.activity[i],
            type: req.body.type[i]
        });
    }
    await Activity.deleteMany({});

    await Activity.insertMany(activities)
        .then(req.flash('successfull', 'Operation completed successfully.'))
        .catch((err) => {
            req.flash('error', 'Error: Something went wrong.');
            console.error(err);
        });

    res.redirect('back');

    setBotPresence(activities);

}

const announcementPost = (req, res) => {
    const announcementText = req.body.announcementText;

    if (!announcementText) {
        req.flash('error', 'Error: Something went wrong.');
        return res.redirect('back');
    }

    if (announcementText.length > 2000) {
        req.flash('error', 'Error: Maximum allowed length of 2000 characters');
        return res.redirect('back');
    }

    announcement(announcementText);

    req.flash('successfull', 'Operation completed successfully.');
    return res.redirect('back');
}


module.exports = {
    presencePost,
    announcementPost
}