const router = require("express").Router();
const passport = require('../helpers/passport');

router.get("/", passport.authenticate('discord'));

router.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), 
    (req, res) => {
        res.redirect("/dashboard")
    }
);

module.exports = router;