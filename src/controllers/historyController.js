const { fetchCryptoHistory } = require('../services/cryptoService');
const { calculateSMA, calculateRSI } = require('../utils/indicators');

const getHistory = async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) return res.status(400).json({ error: 'Symbol required' });

    const rawData = await fetchCryptoHistory(symbol.toLowerCase());

    const smaData = calculateSMA(rawData, 20);
    const rsiData = calculateRSI(rawData, 14);

    res.json({
        prices: rawData,
        indicators: {
            sma: smaData,
            rsi: rsiData
        }
    });
};

module.exports = { getHistory };

