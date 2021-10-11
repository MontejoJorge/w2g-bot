const { validationResult } = require('express-validator');

const presenceValidator = (req, res, next) => {

    if (!Array.isArray(req.body.activity)) {
        req.body.activity = [req.body.activity]
    }
    if (!Array.isArray(req.body.type)) {
        req.body.type = [req.body.type]
    }
    
    req.activities = [];

    for (let i = 0; i < req.body.activity.length; i++) {
        if (!req.body.activity[i]) continue;

        if (req.body.activity[i].length > 35) {
            req.flash('error', 'Error: Maximum allowed length for name is 35 characters');
            return res.redirect('back');
        }

        req.activities.push({
            name: req.body.activity[i],
            type: req.body.type[i]
        });
    }

    next();

}

const announcementValidator = (req, res, next) => {

    if (!req.body.announcementText || req.body.announcementText.length > 2000) {
        req.flash('error', 'Insert an announcement between 1 and 2000 characters long.');
        return res.redirect('back');
    }

    next();
}

const suggestionValidator = (req, res, next) => {
    if (!req.body.suggestionText || req.body.suggestionText.length > 2000) {
        req.flash('error', 'Insert an suggestion between 1 and 2000 characters long.');
        return res.redirect('back');
    }

    next();
}

const twitchValidator = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
}

module.exports = {
    presenceValidator,
    announcementValidator,
    suggestionValidator,
    twitchValidator
}