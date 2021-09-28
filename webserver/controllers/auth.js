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
            });
        }

        const token = await generateJWT(dcProfile.id);

        res.cookie("token", token, {signed: true});

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