const axios = require('axios');
const { generateHistory } = require('../utils/mockGenerator');

const fetchForexData = async () => {
    try {
        const res = await axios.get('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY');
        const rates = res.data.rates;

        return [
            { 
                ticker: 'EUR/USD', 
                name: 'Euro / US Dollar', 
                bid: parseFloat((1 / rates.EUR).toFixed(4)), 
                ask: parseFloat(((1 / rates.EUR) + 0.0002).toFixed(4)), 
                change: 0.15, 
                type: 'FOREX',
                details: {
                    sector: "Currency",
                    market_cap: "N/A", 
                    about: "The most traded currency pair in the world, representing the Eurozone and USA economies.",
                    yield: "3.5%"
                }
            },
            { 
                ticker: 'GBP/USD', 
                name: 'British Pound / US Dollar', 
                bid: parseFloat((1 / rates.GBP).toFixed(4)), 
                ask: parseFloat(((1 / rates.GBP) + 0.0002).toFixed(4)),
                change: -0.20,
                type: 'FOREX',
                details: {
                    sector: "Currency",
                    market_cap: "N/A",
                    about: "A major currency pair often referred to as 'The Cable'.",
                    yield: "5.25%"
                }
            },
            { 
                ticker: 'USD/JPY', 
                name: 'US Dollar / Japanese Yen', 
                bid: parseFloat(rates.JPY.toFixed(2)), 
                ask: parseFloat((rates.JPY + 0.04).toFixed(2)),
                change: 0.55,
                type: 'FOREX',
                details: {
                    sector: "Currency",
                    market_cap: "N/A",
                    about: "A measure of the value of the US Dollar relative to the Japanese Yen.",
                    yield: "0.1%"
                }
            }
        ];
    } catch (error) {
        console.error("Forex API Failed, using fallback");
        return []; 
    }
};

const fetchForexHistory = async (symbol, interval = '1D') => {
    try {
        const base = 'USD';
        const target = symbol.split('/')[0].toUpperCase(); 
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const dateString = startDate.toISOString().split('T')[0];

        const url = `https://api.frankfurter.app/${dateString}..?from=${base}&to=${target}`;
        const res = await axios.get(url);

        const history = Object.entries(res.data.rates)
            .map(([date, rates]) => ({ date, price: 1 / rates[target] }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return history;

    } catch (error) {
        console.error("Frankfurter API Limit/Error, using Mock");
        return generateHistory(1.08, 0.005, interval); 
    }
};

module.exports = { fetchForexData, fetchForexHistory };
