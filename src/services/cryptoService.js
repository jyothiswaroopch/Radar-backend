const axios = require('axios');

const fetchCryptoData = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,solana,ripple,cardano',
            order: 'market_cap_desc'
        };

        const response = await axios.get(url, {
            params,
            timeout: 4000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

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

const fetchCryptoHistory = async (symbol, interval) => {
    try {
        const coinId = symbol.toLowerCase() === 'btc' ? 'bitcoin' : 'ethereum';
        const days = interval === '1M' ? 30 : 1;
        
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;
        const response = await axios.get(url, {
            params: { vs_currency: 'usd', days: days },
            timeout: 4000,
            headers: {
                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        return response.data.prices.map(price => ({
            date: new Date(price[0]).toLocaleTimeString(),
            price: price[1]
        }));
    } catch (error) {
        return [];
    }
};

const fetchOrderBook = async (symbol) => {
    try {
        const coinId = symbol.toLowerCase() === 'btc' ? 'bitcoin' : 'ethereum';
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/depth`;
         const response = await axios.get(url, {
            params: { vs_currency: 'usd', limit: 5 },
             timeout: 4000,
            headers: {
                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        return {
            bids: response.data.bids,
            asks: response.data.asks
        };
    } catch (error) {
        return null;
    }
};

module.exports = { fetchCryptoData, fetchCryptoHistory, fetchOrderBook };