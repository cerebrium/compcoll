const express = require('express');
const router = express.Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();
const session = require('express-session');
const morgan = require('morgan');
const axios = require('axios');

/// configuring oauth
passport.use(new TwitterStrategy({
    consumerKey: process.env.API_KEY,
    consumerSecret: process.env.API_SECRET_KEY,
    callbackURL: "https://127.0.0.1:3007/compcoll/twitter"
},
function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    return cb(err, user);
    });
}
));

/// serializeing
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

/// middleware
router.use(require('morgan')('combined'));
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// initializing passport and setting state to session zero
router.use(passport.initialize());
router.use(passport.session());

// router.get('/', function(req,res) {
//     res.render('twitterdisp')
// })

router.get('/', passport.authenticate('twitter', { failureRedirect: '/compcoll' }),
    function(req, res) {
        axios.get('https://api.twitter.com/1.1/lists/subscribers.json?list_id=1130185227375038465&skip_status=true')
        .then(function(response) {
            console.log(response)
        })
    // Successful authentication, redirect home.
        res.render('twitterdisp');
    });

    module.exports = router;