const NodeCache = require('node-cache');
const { fetchCryptoData } = require('../services/cryptoService');
const { fetchStockData } = require('../services/stockService');
const { fetchForexData } = require('../services/forexService');
const { normalizeCrypto, normalizeStock, normalizeForex } = require('../utils/normalizer');

const cache = new NodeCache({ stdTTL: 60 });

const getMarketData = async (req, res) => {
    const { type, search, minPrice, maxPrice, minChange, sort } = req.query;

    try {
        let combinedData = cache.get("allMarketData");

        if (!combinedData) {
            const [rawCrypto, rawStocks, rawForex] = await Promise.all([
                fetchCryptoData(),
                fetchStockData(),
                fetchForexData()
            ]);

            const cleanCrypto = normalizeCrypto(rawCrypto);
            const cleanStocks = normalizeStock(rawStocks);
            const cleanForex = normalizeForex(rawForex);
            
            combinedData = [...cleanCrypto, ...cleanStocks, ...cleanForex];
            cache.set("allMarketData", combinedData);
        }

        let result = combinedData;

        if (type) {
            result = result.filter(item => item.type === type.toUpperCase());
        }

        if (search) {
            const term = search.toLowerCase().replace('$', '').replace('#', '');
            result = result.filter(item => 
                item.name.toLowerCase().includes(term) || 
                item.symbol.toLowerCase().includes(term)
            );
        }

        if (minPrice) result = result.filter(item => item.price >= parseFloat(minPrice));
        if (maxPrice) result = result.filter(item => item.price <= parseFloat(maxPrice));

        if (minChange) result = result.filter(item => item.change_24h >= parseFloat(minChange));

        if (sort === 'gainers') {
            result.sort((a, b) => b.change_24h - a.change_24h);
        } else if (sort === 'losers') {
            result.sort((a, b) => a.change_24h - b.change_24h);
        }

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
};

module.exports = { getMarketData };