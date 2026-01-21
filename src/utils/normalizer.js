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

module.exports = { normalizeCrypto, normalizeStock };