const passport = require('passport');
var Strategy = require('passport-discord').Strategy;

const User = require("../models/user")

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

var scopes = ['identify', 'email', 'guilds'];
var prompt = 'consent';

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/discord/callback',
    scope: scopes,
    prompt: prompt
}, async (accessToken, refreshToken, profile, done) => {

    const user = await User.findOne({ discordId: profile.id, });

    if (!user) {

        User.create({
            username: profile.username,
            email: profile.email,
            avatar: profile.avatar,
            discordDiscriminator: profile.discriminator,
            discordId: profile.id
            
        }, function (err, profile) {
            return done(err, profile);
        });

    } else {
        return done(null, profile);
    }


}));

module.exports = passport;