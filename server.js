// requires
require('dotenv').config();
const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

// sets
app.set('view engine', 'ejs');

// uses
app.use(express.static('static'))
app.use(layouts)
app.use(express.urlencoded({extended:false}))

// gets
app.get(`/`, function(req, res) {
    res.render('home')
})

// app.uses
app.use(`/compcoll`, require(`./routes/routes`))
// MIDDLE WARE
// app.use(express.urlencoded({extended: false}))



// listeners
app.listen(3007, function() {
    console.log('Server Is Running: CompCall')
})

