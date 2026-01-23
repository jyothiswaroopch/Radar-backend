const generateHistory = (startPrice, volatility = 0.02) => {
    let prices = [];
    let currentPrice = startPrice;
    const now = new Date();

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        
        const change = currentPrice * (Math.random() * volatility * 2 - volatility);
        currentPrice += change;

        prices.push({
            date: date.toLocaleDateString(),
            price: parseFloat(currentPrice.toFixed(2))
        });
    }
    return prices;
};

module.exports = { generateHistory };
