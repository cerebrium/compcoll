const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

// router.get('/', function(req,res) {
//     res.render('twitterdisp')
// })

// router.get('/', passport.authenticate('twitter', { failureRedirect: '/compcoll' }),
//     function(req, res) {
//         axios.get('https://api.twitter.com/1.1/lists/subscribers.json?list_id=1130185227375038465&skip_status=true')
//         .then(function(response) {
//             console.log(response)
//         })
//     // Successful authentication, redirect home.
//         res.render('twitterdisp');
//     });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/auth/twitter' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log("I got hit!!!!!")
        res.redirect('/');
    });

module.exports = router;