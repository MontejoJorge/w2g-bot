const jwt = require('jsonwebtoken');
const User = require("../models/user");

const auth = async (req, res = response, next) => {

    const { token } = req.signedCookies;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ discordId: id});

        if (!user || !user.enabled) {
            return res.redirect("/login");
        }

        req.user = user;

    } catch (error) {

        console.error(error);

        return res.redirect("/login");
    }

    next();
}

module.exports = {
    auth
}