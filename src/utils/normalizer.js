const normalizeCrypto = (data) => {
    return data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change_24h: coin.price_change_percentage_24h,
        image: coin.image,
        type: 'CRYPTO'
    }));
};

const normalizeStock = (data) => {
    return data.map(stock => ({
        id: stock.symbol,
        symbol: stock.symbol,
        name: stock.name,
        price: stock.close,
        change_24h: stock.change,
        image: null,
        type: 'STOCK'
    }));
};

const normalizeForex = (data) => {
    return data.map(pair => ({
        id: pair.ticker,
        symbol: pair.ticker,
        name: pair.name,
        price: (pair.bid + pair.ask) / 2,
        change_24h: pair.change,
        image: null,
        type: 'FOREX'
    }));
};

module.exports = { normalizeCrypto, normalizeStock, normalizeForex };