const fetchForexData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { ticker: 'EUR/USD', name: 'Euro / US Dollar', bid: 1.0850, ask: 1.0852, change: 0.15 },
        { ticker: 'GBP/USD', name: 'British Pound / US Dollar', bid: 1.2740, ask: 1.2744, change: -0.20 },
        { ticker: 'USD/JPY', name: 'US Dollar / Japanese Yen', bid: 148.20, ask: 148.24, change: 0.55 },
        { ticker: 'AUD/USD', name: 'Australian Dollar / US Dollar', bid: 0.6550, ask: 0.6553, change: -0.10 },
        { ticker: 'USD/CAD', name: 'US Dollar / Canadian Dollar', bid: 1.3520, ask: 1.3525, change: 0.05 }
    ];
};

module.exports = { fetchForexData };