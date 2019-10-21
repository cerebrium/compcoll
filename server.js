// requires
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('./config/ppConfig');

const app = express();
// sets
app.set('view engine', 'ejs');

// uses
app.use(express.static('static'));
app.use(layouts);
app.use(express.urlencoded({extended:false}));

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// initializing passport and setting state to session zero
app.use(passport.initialize());
app.use(passport.session());

// gets
app.get(`/`, function(req, res) {
    res.render('home')
})

// app.uses
app.use(`/compcoll`, require(`./routes/routes`))
app.use(`/auth`, require(`./routes/twitterRoute`))
// MIDDLE WARE
// app.use(express.urlencoded({extended: false}))



// listeners
app.listen(8080, function() {
    console.log('Server Is Running: CompCall')
})

