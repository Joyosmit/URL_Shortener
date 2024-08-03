const express = require('express');
const  {handleGenerateShortUrl, redirectFromShortUrl}  = require('../controller/url');

const router = express.Router();

router.post('/', handleGenerateShortUrl)

router.get('/:shortUrl', redirectFromShortUrl)

module.exports = router;