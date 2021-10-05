const { discordUser } = require("../helpers/discord-oauth");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const discordLogin = async (req, res = response) => {

    if (!req.query.code) {

        res.status(401);
        return res.render("error", {
            code: 401,
            msg: "Unauthorized"
        });

    }

    try {

        const dcProfile = await discordUser(req);

        const user = await User.findOne({ email: dcProfile.email });

        if (!user) {
            await User.create({
                username: dcProfile.username,
                email: dcProfile.email,
                avatar: dcProfile.avatar,
                discordDiscriminator: dcProfile.discriminator,
                discordId: dcProfile.id
            })
                .catch((error) => {
                    console.error(error);
                    req.flash("status", "Error: Something went wrong");
                    res.redirect("/")
                });
        }

        const token = await generateJWT(dcProfile.id);

        res.cookie("token", token, { signed: true, maxAge: 28800000,  httpOnly: true });

        res.redirect("/dashboard");

    } catch (error) {

        console.error(error);

        res.status(500);
        return res.render("error", {
            code: 500,
            msg: "Internal server error"
        });
    }
}

module.exports = {
    discordLogin
}