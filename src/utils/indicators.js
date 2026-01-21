const calculateSMA = (data, period = 14) => {
    if (data.length < period) return [];

    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, point) => acc + point.price, 0);
        sma.push({ date: data[i].date, value: sum / period });
    }
    return sma;
};

const calculateRSI = (data, period = 14) => {
    if (data.length < period + 1) return [];

    const rsiArray = [];
    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const change = data[i].price - data[i - 1].price;
        if (change > 0) gains += change;
        else losses += Math.abs(change);
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    for (let i = period + 1; i < data.length; i++) {
        const change = data[i].price - data[i - 1].price;
        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? Math.abs(change) : 0;

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;

        const rs = avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);

        rsiArray.push({ date: data[i].date, value: rsi.toFixed(2) });
    }

    return rsiArray;
};

module.exports = { calculateSMA, calculateRSI };
