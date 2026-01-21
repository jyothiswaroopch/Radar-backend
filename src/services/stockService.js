const fetchStockData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { symbol: 'AAPL', name: 'Apple Inc.', close: 175.43, change: 1.25 },
        { symbol: 'TSLA', name: 'Tesla Inc.', close: 240.50, change: -3.10 },
        { symbol: 'NVDA', name: 'Nvidia Corp.', close: 460.18, change: 5.40 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', close: 330.00, change: 0.85 },
        { symbol: 'SPY', name: 'S&P 500 ETF', close: 440.20, change: 0.15 }
    ];
};

module.exports = { fetchStockData };
