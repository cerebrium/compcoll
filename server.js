require('dotenv').config();
const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

app.use(layouts)

app.use(`/`, require(`./routes/routes`))
// MIDDLE WARE
// app.use(express.urlencoded({extended: false}))

app.listen(3007, function() {
    console.log('Server Is Running: CompCall')
})

