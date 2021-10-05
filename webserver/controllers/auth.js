const { discordUser } = require("../helpers/discord-oauth");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const discordLogin = async (req, res = response) => {

    if (!req.query.code) res.redirect(401, "/");

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
                    console.err(error);
                    req.flash("status", "Error: Something went wrong");
                    res.redirect("/")
                });
        }

        const token = await generateJWT(dcProfile.id);

        res.cookie("token", token, { signed: true, maxAge: 28800000,  httpOnly: true });

        res.redirect("/home");

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = {
    discordLogin
}