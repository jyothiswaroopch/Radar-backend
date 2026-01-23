const { generateHistory } = require('../utils/mockGenerator');

const fetchForexData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { 
            ticker: 'EUR/USD', 
            name: 'Euro / US Dollar', 
            bid: 1.0850, 
            ask: 1.0852, 
            change: 0.15,
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
            bid: 1.2740, 
            ask: 1.2744, 
            change: -0.20,
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
            bid: 148.20, 
            ask: 148.24, 
            change: 0.55,
            details: {
                sector: "Currency",
                market_cap: "N/A",
                about: "A measure of the value of the US Dollar relative to the Japanese Yen.",
                yield: "0.1%"
            }
        }
    ];
};

const fetchForexHistory = async (symbol, interval = '1D') => {
    const mockPrices = {
        'eur/usd': 1.08,
        'gbp/usd': 1.27,
        'usd/jpy': 148.20
    };
    const basePrice = mockPrices[symbol] || 1.0;
    return generateHistory(basePrice, 0.005, interval); 
};

module.exports = { fetchForexData, fetchForexHistory };