const express = require('express');
const router = express.Router();
const axios = require('axios');
const async = require('async');
const db = require('../models')
const newsSites = [
`https://www.breitbart.com/politics/`,
'https://www.bbc.com/news/world/us_and_canada',
'https://www.nytimes.com/section/politics',
'https://www.infowars.com/category/us-news/',
'https://www.foxnews.com/politics'
]

    
// MY ASYNC DATA GATHERING


///////    Get Routes
router.get(`/`, function(req, res) {
    res.render('scraper')
    })

router.post(`/results`, function(req, res) {
    let newsName = 'breitbart';
    let async_One = function(cb) {
        axios.get(newsSites[0])
            .then(function(response) {
                let breitArrayOfHref = [];
                let breitArrayOfTitle = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        breitArrayOfTitle.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        breitArrayOfHref.push(ele);
                    }
                })
                
                cb(null, breitArrayOfHref, breitArrayOfTitle)
            })
    }

    let async_Two = function(cb) {
        let newsName = 'bbc';
        axios.get(newsSites[1])
            .then(function(response) {
                let bbcArrayOfHref = [];
                let bbcArrayOfTitle = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        bbcArrayOfTitle.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        bbcArrayOfHref.push(ele);
                    }
                })
                cb(null, bbcArrayOfHref, bbcArrayOfTitle)
            })
    }

    let async_Three = function(cb) {
        let newsName = 'nytimes';
        axios.get(newsSites[2])
            .then(function(response) {
                let nyArrayOfHref = [];
                let nyArrayOfTitle = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        nyArrayOfTitle.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        nyArrayOfHref.push(ele);
                    }
                })
                cb(null, nyArrayOfHref, nyArrayOfTitle)
            })
    }

    let async_Four = function(cb) {
        let newsName = 'breitbart';
        axios.get(newsSites[3])
            .then(function(response) {
                let infoArrayOfHref = [];
                let infoArrayOfTitle = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        infoArrayOfTitle.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.body)) {
                        infoArrayOfHref.push(ele);
                    }
                })
                cb(null, infoArrayOfHref, infoArrayOfTitle)
            })
    }

    let async_Five = function(cb) {
        axios.get(newsSites[4])
        .then(function(response) {
            let nbcArrayOfHref = [];
            let nbcArrayOfTitle = [];
            let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
            let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
            checkerTitle.forEach(function(ele) {
                if (ele.includes(req.body)) {
                    nbcArrayOfTitle.push(ele);
                }
            })
            checkerHref.forEach(function(ele) {
                if (ele.includes(req.body)) {
                    nbcArrayOfHref.push(ele);
                }
            })
            cb(null, nbcArrayOfHref, nbcArrayOfTitle)
        })
    }

    async.series([async_One, async_Two, async_Three, async_Four, async_Five], function(err, results) {
        db.article.findOrCreate({
            where : { 
                title : req.body.inputtext,
            },
            defaults : {
                content : results
                name : 
            }
        })
        res.render('results')
    })
    console.log('---------------------------------------------------------')
    console.log('post')
    res.redirect('/compcoll/results')
})

router.get('/results', function(req, res) {
    res.render('results')
})

module.exports = router;