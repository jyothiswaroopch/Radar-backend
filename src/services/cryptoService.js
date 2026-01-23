const axios = require('axios');

const fetchCryptoData = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,solana,ripple,cardano',
            order: 'market_cap_desc'
        };

        const response = await axios.get(url, { params });
        
        return response.data.map(coin => ({
            ...coin,
            details: {
                sector: "Blockchain",
                market_cap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
                about: `A decentralized digital currency based on ${coin.id} blockchain.`,
                volume: `$${(coin.total_volume / 1e6).toFixed(2)}M`
            }
        }));
    } catch (error) {
        return [];
    }
};

const fetchCryptoHistory = async (id) => {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
        const params = { vs_currency: 'usd', days: '30', interval: 'daily' };
        
        const response = await axios.get(url, { params });
        
        return response.data.prices.map(item => ({
            date: new Date(item[0]).toLocaleDateString(),
            price: item[1]
        }));
    } catch (error) {
        return [];
    }
};

const fetchOrderBook = async (id) => {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/tickers`;
        const response = await axios.get(url);
        
        const market = response.data.tickers[0]; 
        
        return {
            symbol: market.base,
            exchange: market.market.name,
            spread_percentage: market.bid_ask_spread_percentage,
            last_trade: market.last,
            volume: market.volume,
            trust_score: market.trust_score
        };
    } catch (error) {
        return null;
    }
};

module.exports = { fetchCryptoData, fetchCryptoHistory, fetchOrderBook };