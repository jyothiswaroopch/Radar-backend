const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({ username, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                preferredMode: user.preferredMode,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid user data' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                preferredMode: user.preferredMode,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    // Protected route: req.user is set
    res.json({
        _id: req.user._id,
        username: req.user.username,
        preferredMode: req.user.preferredMode,
        watchlist: req.user.watchlist
    });
};

const updateMode = async (req, res) => {
    const { mode } = req.body;

    // Protected route: req.user is set
    const user = req.user;

    user.preferredMode = mode;
    await user.save();
    res.json({ message: "Mode updated", preferredMode: user.preferredMode });
};

module.exports = { registerUser, loginUser, getUserProfile, updateMode };
