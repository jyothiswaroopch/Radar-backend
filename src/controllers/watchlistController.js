let mockWatchlist = [
    { id: "bitcoin", symbol: "BTC", type: "CRYPTO", name: "Bitcoin" }
];

const getWatchlist = (req, res) => {
    res.json(mockWatchlist);
};

const addToWatchlist = (req, res) => {
    const { id, symbol, type, name } = req.body;

    if (!id || !symbol) {
        return res.status(400).json({ error: "Missing asset details" });
    }

    const exists = mockWatchlist.find(item => item.id === id);
    if (exists) {
        return res.status(400).json({ error: "Item already in watchlist" });
    }

    const newItem = { id, symbol, type, name };
    mockWatchlist.push(newItem);

    res.status(201).json({ message: "Added to watchlist", watchlist: mockWatchlist });
};

const removeFromWatchlist = (req, res) => {
    const { id } = req.params;

    mockWatchlist = mockWatchlist.filter(item => item.id !== id);

    res.json({ message: "Removed from watchlist", watchlist: mockWatchlist });
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };