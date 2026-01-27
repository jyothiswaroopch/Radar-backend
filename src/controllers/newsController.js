const axios = require('axios');

const getMarketNews = async (req, res) => {
    if (!process.env.NEWS_API_KEY) {
        return res.json([
            { title: "Market Rally Continues", source: "Demo News", url: "#", image: null, publishedAt: "10:00 AM" },
            { title: "Fed Holds Rates Steady", source: "Demo News", url: "#", image: null, publishedAt: "9:00 AM" }
        ]);
    }

    try {
        const url = 'https://newsapi.org/v2/top-headlines';
        const params = {
            apiKey: process.env.NEWS_API_KEY,
            category: 'business',
            language: 'en',
            pageSize: 5
        };

        const response = await axios.get(url, { params });

        const news = response.data.articles.map(article => ({
            title: article.title,
            source: article.source.name,
            url: article.url,
            image: article.urlToImage,
            publishedAt: new Date(article.publishedAt).toLocaleTimeString()
        }));

        res.json(news);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
};

module.exports = { getMarketNews };
