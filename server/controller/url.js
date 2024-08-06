const shortid = require('shortid')
const URL = require('../model/url');
const client = require('../redis-client/client');
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
        const cacheKey = `shortUrl:${shortUrl}`;
        const accessTimesKey = `accessTimes:${shortUrl}`;

        const cacheVal = await client.get(cacheKey);
        const currentTime = Date.now();

        if (cacheVal) {
            console.log('Redirected from cache');
            await client.rpush(accessTimesKey, currentTime); // Store the access time
            return res.redirect(cacheVal);
        }

        console.log("Yahallo", cacheVal);
        const url = await URL.findOneAndUpdate({ shortUrl }, { $push: { history: currentTime } });

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        await client.set(cacheKey, url.url);
        await client.expire(cacheKey, 30); // Set cache expiration to 30 seconds

        // await client.lpush(accessTimesKey, currentTime);
        // await client.expire(accessTimesKey, 30); // Expire access times after 30 seconds

        res.redirect(url.url);

        // Monitor cache expiration and handle accordingly
        // client.expire(cacheKey, 30, async () => {
        //     const accessTimes = await client.lrange(accessTimesKey, 0, -1);
        //     if (accessTimes.length > 0) {
        //         await URL.updateOne({ shortUrl }, { $push: { history: { $each: accessTimes } } });
        //     }
        //     await client.del(accessTimesKey); // Clean up access times key
        // });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
}


module.exports = {handleGenerateShortUrl , redirectFromShortUrl}