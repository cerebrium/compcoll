const express = require('express');
const router = express.Router();
const axios = require('axios');
const async = require('async')
const newsSites = [
`https://www.breitbart.com/politics/`,
'https://www.bbc.com/news/world/us_and_canada',
'https://www.nytimes.com/section/politics',
'https://www.infowars.com/category/us-news/',
'https://www.nbcnews.com/politics'
]

router.get(`/`, function(req, res) {
    res.render('scraper')
    })

router.post(`/results`, function(req, res) {
    console.log('---------------------------------------------------------')
    console.log('post')
    res.redirect('/compcoll/results')
})
    
router.get('/results', function(req, res) {
    let myData = [];
    let async_One = function(cb) {
        newsSites.forEach(function(ele) {
            axios.get(ele)
                .then(function(response) {
                    myData.push((response.data.match(/href=/)).toString())
                    console.log('Inside of the then loop: ' + myData)
                })
            })
        cb(null, myData)
    }
    async.series([async_One], function(err, result) {
        console.log(result)
        console.log('async entered last part')
        res.render('results', {results: result})
        }) 
})

module.exports = router;