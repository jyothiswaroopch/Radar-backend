const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getMarketData } = require('./src/controllers/marketController');
const { getLearnings } = require('./src/controllers/learningController');
const { getHistory } = require('./src/controllers/historyController');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('./src/controllers/watchlistController');
const { loginUser, getUserSettings, updatePreference } = require('./src/controllers/userController');
const { getOrderBook } = require('./src/controllers/depthController');
const { getStatus } = require('./src/controllers/statusController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Radar Backend is Online');
});

app.get('/api/market', getMarketData);
app.get('/api/learnings', getLearnings);
app.get('/api/history', getHistory);

app.get('/api/watchlist', getWatchlist);
app.post('/api/watchlist', addToWatchlist);
app.delete('/api/watchlist/:id', removeFromWatchlist);

app.post('/api/user/login', loginUser);
app.get('/api/user/settings', getUserSettings);
app.put('/api/user/settings', updatePreference);

app.get('/api/depth', getOrderBook);
app.get('/api/status', getStatus);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});