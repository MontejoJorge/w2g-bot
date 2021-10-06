const router = require("express").Router();

router.get("/", function(req, res) {
    const oauth2 = new URL("https://discord.com/api/oauth2/authorize");

    oauth2.searchParams.append("client_id", process.env.DISCORD_CLIENT_ID);
    oauth2.searchParams.append("redirect_uri", 'https://' + req.get('host') + "/auth/callback");
    oauth2.searchParams.append("response_type", "code");
    oauth2.searchParams.append("scope", "identify email");

    res.redirect(oauth2);
});

module.exports = router;