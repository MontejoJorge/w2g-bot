const passport = require('passport');
var Strategy = require('passport-discord').Strategy;

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
    callbackURL: 'http://localhost:3000/callback',
    scope: scopes,
    prompt: prompt
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

module.exports = passport;