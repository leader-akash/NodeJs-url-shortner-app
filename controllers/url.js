const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'url is rquired' })
    }

    const shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHisotry: []
    })

    return res.json({ message: 'success', id: shortId })
}

async function handleGetShortUrlAndUpdate(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHisotry: {
                timeStamp: Date.now(),
            }
        }
    })

    res.redirect(entry.redirectUrl)
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClick: result.visitHisotry.length,
        analytics: result.visitHisotry,
    })
}

module.exports = { handleGenerateShortUrl, handleGetAnalytics, handleGetShortUrlAndUpdate }