const { fetchCryptoHistory } = require('../services/cryptoService');

const getHistory = async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) return res.status(400).json({ error: "Symbol required" });

    const data = await fetchCryptoHistory(symbol.toLowerCase());
    res.json(data);
};

module.exports = { getHistory };

