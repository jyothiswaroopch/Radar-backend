const axios = require('axios');
const { generateHistory } = require('../utils/mockGenerator');

const fetchStockData = async () => {
    return [
        { 
            symbol: 'AAPL', 
            name: 'Apple Inc.', 
            price: 175.43, 
            change: 1.25, 
            type: 'STOCK',
            details: {
                pe_ratio: 28.5,
                market_cap: "2.7T",
                dividend_yield: "0.55%",
                sector: "Technology",
                about: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories."
            },
            financials: {
                years: ["2021", "2022", "2023"],
                revenue: [365, 394, 383], 
                net_profit: [94, 99, 97],
                quarters: {
                    q1: { revenue: 117, profit: 30 },
                    q2: { revenue: 94, profit: 24 },
                    q3: { revenue: 81, profit: 19 },
                    q4: { revenue: 89, profit: 22 }
                }
            }
        },
        { 
            symbol: 'TSLA', 
            name: 'Tesla Inc.', 
            price: 240.50, 
            change: -3.10, 
            type: 'STOCK',
            details: {
                pe_ratio: 70.4,
                market_cap: "750B",
                dividend_yield: "0.00%",
                sector: "Automotive",
                about: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems."
            },
            financials: {
                years: ["2021", "2022", "2023"],
                revenue: [53, 81, 96],
                net_profit: [5.5, 12.6, 15],
                quarters: {
                    q1: { revenue: 23, profit: 2.5 },
                    q2: { revenue: 24, profit: 2.7 },
                    q3: { revenue: 23, profit: 1.8 },
                    q4: { revenue: 25, profit: 7.9 }
                }
            }
        },
        { 
            symbol: 'NVDA', 
            name: 'Nvidia Corp.', 
            price: 460.18, 
            change: 5.40, 
            type: 'STOCK',
            details: {
                pe_ratio: 110.2,
                market_cap: "1.2T",
                dividend_yield: "0.04%",
                sector: "Semiconductors",
                about: "NVIDIA Corporation focuses on personal computer (PC) graphics, graphics processing unit (GPU) and also on artificial intelligence (AI)."
            },
            financials: {
                years: ["2021", "2022", "2023"],
                revenue: [16, 26, 27], 
                net_profit: [4, 9, 4],
                quarters: {
                    q1: { revenue: 7, profit: 2 },
                    q2: { revenue: 13, profit: 6 },
                    q3: { revenue: 18, profit: 9 },
                    q4: { revenue: 22, profit: 12 }
                }
            }
        }
    ];
};

const fetchStockHistory = async (symbol, interval = '1D') => {
    if (!process.env.MARKETSTACK_KEY) {
        console.log("No MarketStack Key, using mock.");
        return generateHistory(150, 0.02, interval);
    }

    try {
        const url = 'http://api.marketstack.com/v1/eod';
        const params = {
            access_key: process.env.MARKETSTACK_KEY,
            symbols: symbol,
            limit: 30
        };

        const res = await axios.get(url, { params });
        const data = res.data.data;

        if (!data || !Array.isArray(data) || data.length === 0) {
            return generateHistory(150, 0.02, interval);
        }

        return data.map(day => ({
            date: new Date(day.date).toLocaleDateString(),
            price: day.close
        })).reverse(); 

    } catch (error) {
        console.error("MarketStack Error (Likely Rate Limit), using Mock");
        return generateHistory(150, 0.02, interval); 
    }
};

module.exports = { fetchStockData, fetchStockHistory };
