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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Radar Backend is Online');
});

app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.get('/api/user/profile', getUserProfile);
app.patch('/api/user/mode', updateMode);

app.get('/api/market', getMarketData);
app.get('/api/history', getHistory);
app.get('/api/watchlist', getWatchlist);
app.post('/api/watchlist', addToWatchlist);
app.delete('/api/watchlist/:id', removeFromWatchlist);
app.get('/api/depth', getOrderBook);
app.get('/api/status', getStatus);
app.get('/api/news', getMarketNews);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});