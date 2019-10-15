const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const $ = cheerio.load(`https://www.breitbart.com/politics/`);

router.get(`/`, function(req, res) {
    axios.get(`https://www.breitbart.com/politics/`)
        .then(function(response) {
            let myReg = /href="\/\d?\/"/;
            let myResponse = response.data.toString();
            let myStrings = myResponse.match(myReg)
            console.log(myStrings)
            res.render('scraper')
        })
        .catch(function(err) {
            console.log('---------------------------------------------------------')
            console.log(err)
        })
    })

router.get(`/results`, function(req, res) {
    res.render('results')
})
module.exports = router;