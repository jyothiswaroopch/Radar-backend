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

const calculateBollinger = (data, period = 20) => {
    if (data.length < period) return [];
    const bands = [];

    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = slice.reduce((a, b) => a + b.price, 0) / period;

        const squaredDiffs = slice.map(item => Math.pow(item.price - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
        const stdDev = Math.sqrt(variance);

        bands.push({
            date: data[i].date,
            upper: (mean + stdDev * 2).toFixed(2),
            middle: mean.toFixed(2),
            lower: (mean - stdDev * 2).toFixed(2)
        });
    }
    return bands;
};

const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    const emaArray = [data[0].price];
    for (let i = 1; i < data.length; i++) {
        emaArray.push(data[i].price * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
};

const calculateMACD = (data) => {
    if (data.length < 26) return [];

    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);

    const macd = [];
    for (let i = 25; i < data.length; i++) {
        macd.push({
            date: data[i].date,
            value: (ema12[i] - ema26[i]).toFixed(2),
            signal: 0
        });
    }
    return macd;
};

module.exports = { calculateSMA, calculateRSI, calculateBollinger, calculateMACD };
