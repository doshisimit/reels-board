const Reel = require('../models/reel');

exports.addReel = async (req, res) => {
    try {
        const reel = new Reel({ userId: req.user.id, url: req.body.url, productLink: req.body.productLink });
        await reel.save();
        res.status(201).json(reel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
