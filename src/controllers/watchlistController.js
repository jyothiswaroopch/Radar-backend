const User = require('../models/User');

const getWatchlist = async (req, res) => {
    try {
        const user = req.user; // Attached by authMiddleware
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const addToWatchlist = async (req, res) => {
    const { symbol, assetType, name } = req.body;

    if (!symbol || !assetType) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const user = req.user;

        const exists = user.watchlist.find(item => item.symbol === symbol);
        if (exists) {
            return res.status(400).json({ error: "Asset already in watchlist" });
        }

        user.watchlist.push({ symbol, assetType, name });
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add to watchlist" });
    }
};

const removeFromWatchlist = async (req, res) => {
    const { symbol } = req.params;

    try {
        const user = req.user;

        user.watchlist = user.watchlist.filter(item => item.symbol !== symbol);
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove from watchlist" });
    }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };