const learningData = require('../data/learningData.json');

const getLearnings = (req, res) => {
    res.json(learningData);
};

module.exports = { getLearnings };

