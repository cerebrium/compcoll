const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();
const db = require('../models');


/// configuring oauth
passport.use(new TwitterStrategy({
    consumerKey: process.env.API_KEY,
    consumerSecret: process.env.API_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3007/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
    // console.log("Access token:", token);
    // console.log("User profile id:", profile.id);
    db.twitterUser.findOrCreate({
        where: { twitterId: profile.id }
    }).then(function(twitterUser) {
        console.log("In strategy, twitterUser is:", twitterUser)
        let tempUser = {
            id: twitterUser.id,
            twitterId: twitterUser.twitterId,
            token};
        console.log("In strategy. tempUser is:", tempUser);
        return cb(null, tempUser);
    });
}));

/// serializeing
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;
