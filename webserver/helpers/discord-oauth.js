const fetch = require("node-fetch");

const discordOauth = async (req) => {

    const code = req.query.code;

    const oauthResult = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: req.protocol + '://' + req.get('host') + "/auth/callback"
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return await oauthResult.json();
}

const discordUser = async (req) => {

    const oauthData = await discordOauth(req);

    const userResult = await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });
    
    return await userResult.json();
}

module.exports = {
    discordUser
}