const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getMarketData } = require('./src/controllers/marketController');
const { getLearnings } = require('./src/controllers/learningController');
const { getHistory } = require('./src/controllers/historyController');

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});