const User = require('../models/User');

const getWatchlist = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const addToWatchlist = async (req, res) => {
    const { userId, symbol, assetType, name } = req.body;

    if (!userId || !symbol || !assetType) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

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
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.watchlist = user.watchlist.filter(item => item.symbol !== symbol);
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove from watchlist" });
    }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };