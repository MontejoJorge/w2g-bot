const getBotLink = require("../../helpers/inviteLink");

const router = require("express").Router();

router.get("/", function(req, res) {
    res.render("index", {
        botLink: getBotLink(),
        loginLink: "/login",
        suggestionLink: "/dashboard/suggestion"
    });
});

module.exports = router;