const shortid = require('shortid')
const URL = require('../model/url');
async function handleGenerateShortUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        await URL.create({
            url: originalUrl,
            shortUrl: shortid.generate()
        });
        return res.status(200).json({ message: 'Short URL generated' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error ho gya',
            error: err.message
        });
    }
}

async function redirectFromShortUrl(req, res) {
    try {
        const { shortUrl } = req.params;
        const url = await URL.findOneAndUpdate({ shortUrl }, { $push: { history: Date.now() } });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        res.redirect(url.url);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
}

module.exports = {handleGenerateShortUrl , redirectFromShortUrl}