const { announcement } = require("../../helpers/announcement");
const { setBotPresence } = require("../../helpers/botPresence");
const Activity = require("../models/activity");
const Suggestion = require("../models/suggestion");

const presencePost = async (req, res) => {
    await Activity.deleteMany({});

    await Activity.insertMany(req.activities)
        .then(req.flash('successfull', 'Operation completed successfully.'))
        .catch((err) => {
            req.flash('error', 'Error: Something went wrong.');
            console.error(err);
        });

    setBotPresence(req.activities);

    res.redirect('back');
}

const announcementPost = (req, res) => {

    announcement(req.body.announcementText);

    req.flash('successfull', 'Operation completed successfully.');
    return res.redirect('back');
}

const suggestionPost = async (req, res) => {
    await Suggestion.create({text: req.body.suggestionText})
    .then(req.flash('successfull', 'Operation completed successfully.'))
    .catch((err) => {
        req.flash('error', 'Error: Something went wrong.');
        console.error(err);
    });

    res.redirect('back');
}

module.exports = {
    presencePost,
    announcementPost,
    suggestionPost
}