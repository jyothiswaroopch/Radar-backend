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
        return response.data;
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

module.exports = { fetchCryptoData, fetchCryptoHistory };

