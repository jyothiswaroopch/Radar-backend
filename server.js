const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

connectDB();

const { getMarketData } = require('./src/controllers/marketController');
const { getHistory } = require('./src/controllers/historyController');
const { registerUser, loginUser, getUserProfile, updateMode } = require('./src/controllers/userController');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('./src/controllers/watchlistController');
const { getOrderBook } = require('./src/controllers/depthController');
const { getStatus } = require('./src/controllers/statusController');
const { getMarketNews } = require('./src/controllers/newsController');
const { getPortfolio, executeTrade } = require('./src/controllers/portfolioController');
const { authMiddleware } = require('./src/middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Radar Backend is Online');
});

// Auth Routes (Public)
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

// User Routes (Protected)
app.get('/api/user/profile', authMiddleware, getUserProfile);
app.patch('/api/user/mode', authMiddleware, updateMode);

// Market Data (Public)
app.get('/api/market', getMarketData);
app.get('/api/history', getHistory);
app.get('/api/depth', getOrderBook);
app.get('/api/status', getStatus);
app.get('/api/news', getMarketNews);

// Watchlist (Protected)
app.get('/api/watchlist', authMiddleware, getWatchlist);
app.post('/api/watchlist', authMiddleware, addToWatchlist);
app.delete('/api/watchlist/:symbol', authMiddleware, removeFromWatchlist);

// Portfolio (Protected)
app.get('/api/portfolio', authMiddleware, getPortfolio);
app.post('/api/portfolio/trade', authMiddleware, executeTrade);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});