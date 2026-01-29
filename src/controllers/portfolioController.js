const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');

const getPortfolio = async (req, res) => {
    const userId = req.user._id;

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { user: userId },
            { $setOnInsert: { user: userId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

const executeTrade = async (req, res) => {
    const userId = req.user._id;
    const { symbol, action, quantity, price, assetType } = req.body;

    if (!symbol || quantity == null || price == null || !action) {
        return res.status(400).json({ error: "Missing trade details" });
    }

    // ... rest of logic remains, just removed manual userId validation since authMiddleware handles it

    const qty = Number(quantity);
    const px = Number(price);

    if (!Number.isFinite(qty) || qty <= 0 || !Number.isFinite(px) || px <= 0) {
        return res.status(400).json({ error: "Quantity and price must be positive numbers" });
    }

    const normalizedAction = String(action).toUpperCase();
    if (normalizedAction !== 'BUY' && normalizedAction !== 'SELL') {
        return res.status(400).json({ error: "Action must be BUY or SELL" });
    }

    const normalizedSymbol = String(symbol).trim().toUpperCase();
    if (!normalizedSymbol) {
        return res.status(400).json({ error: "Symbol is required" });
    }

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { user: userId },
            { $setOnInsert: { user: userId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        const totalCost = qty * px;

        if (normalizedAction === 'BUY') {
            if (portfolio.cashBalance < totalCost) {
                return res.status(400).json({ error: "Insufficient Funds" });
            }

            portfolio.cashBalance -= totalCost;

            const holdingIndex = portfolio.holdings.findIndex((p) => p.symbol === normalizedSymbol);

            if (holdingIndex > -1) {
                const existing = portfolio.holdings[holdingIndex];
                const existingQty = Number(existing.quantity) || 0;
                const existingAvg = Number(existing.avgBuyPrice) || 0;

                const totalValueOld = existingQty * existingAvg;
                const totalValueNew = totalValueOld + totalCost;
                const totalQty = existingQty + qty;

                portfolio.holdings[holdingIndex].quantity = totalQty;
                portfolio.holdings[holdingIndex].avgBuyPrice = totalQty > 0 ? (totalValueNew / totalQty) : 0;
            } else {
                portfolio.holdings.push({
                    symbol: normalizedSymbol,
                    quantity: qty,
                    avgBuyPrice: px,
                    assetType: assetType || 'STOCK'
                });
            }
        } else if (normalizedAction === 'SELL') {
            const holdingIndex = portfolio.holdings.findIndex((p) => p.symbol === normalizedSymbol);

            if (holdingIndex === -1) {
                return res.status(400).json({ error: "Not enough shares to sell" });
            }

            const existingQty = Number(portfolio.holdings[holdingIndex].quantity) || 0;
            if (existingQty < qty) {
                return res.status(400).json({ error: "Not enough shares to sell" });
            }

            portfolio.cashBalance += totalCost;
            portfolio.holdings[holdingIndex].quantity = existingQty - qty;

            if (portfolio.holdings[holdingIndex].quantity <= 0) {
                portfolio.holdings.splice(holdingIndex, 1);
            }
        }

        portfolio.totalTrades += 1;
        await portfolio.save();

        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Trade Failed" });
    }
};

module.exports = { getPortfolio, executeTrade };
