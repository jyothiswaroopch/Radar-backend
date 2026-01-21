const NodeCache = require('node-cache');
const { fetchCryptoData } = require('../services/cryptoService');
const { fetchStockData } = require('../services/stockService');
const { normalizeCrypto, normalizeStock } = require('../utils/normalizer');

const cache = new NodeCache({ stdTTL: 60 });

const getMarketData = async (req, res) => {
    const { type, search } = req.query;

    try {
        let combinedData = cache.get("allMarketData");

        if (!combinedData) {
            console.log("Fetching new data...");
            const [rawCrypto, rawStocks] = await Promise.all([
                fetchCryptoData(),
                fetchStockData()
            ]);

            const cleanCrypto = normalizeCrypto(rawCrypto);
            const cleanStocks = normalizeStock(rawStocks);
            
            combinedData = [...cleanCrypto, ...cleanStocks];
            cache.set("allMarketData", combinedData);
        }

        let result = combinedData;

        if (type) {
            result = result.filter(item => item.type === type.toUpperCase());
        }

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(item => 
                item.name.toLowerCase().includes(lowerSearch) || 
                item.symbol.toLowerCase().includes(lowerSearch)
            );
        }

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
};

module.exports = { getMarketData };