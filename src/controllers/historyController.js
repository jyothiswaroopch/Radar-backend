const { fetchCryptoHistory } = require('../services/cryptoService');
const { calculateSMA, calculateRSI, calculateBollinger, calculateMACD } = require('../utils/indicators');

const getHistory = async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) return res.status(400).json({ error: 'Symbol required' });

    const rawData = await fetchCryptoHistory(symbol.toLowerCase());

    res.json({
        prices: rawData,
        indicators: {
            sma: calculateSMA(rawData, 20),
            rsi: calculateRSI(rawData, 14),
            bollinger: calculateBollinger(rawData, 20),
            macd: calculateMACD(rawData)
        }
    });
};

module.exports = { getHistory };

