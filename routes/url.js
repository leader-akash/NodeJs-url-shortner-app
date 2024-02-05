const express = require('express')
const {handleGenerateShortUrl, handleGetAnalytics, handleGetShortUrlAndUpdate} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/:shortId', handleGetShortUrlAndUpdate);



module.exports = router

