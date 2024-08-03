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

module.exports = handleGenerateShortUrl 