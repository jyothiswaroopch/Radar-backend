let mockUser = {
    username: "demo_user",
    password: "password123",
    preferredLayout: "INVESTOR"
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    
    if (username === mockUser.username && password === mockUser.password) {
        res.json({ 
            message: "Login successful", 
            user: { username: mockUser.username, preferredLayout: mockUser.preferredLayout } 
        });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};

const getUserSettings = (req, res) => {
    res.json({ preferredLayout: mockUser.preferredLayout });
};

const updatePreference = (req, res) => {
    const { mode } = req.body;

    if (mode !== "TRADER" && mode !== "INVESTOR") {
        return res.status(400).json({ error: "Invalid mode. Use TRADER or INVESTOR." });
    }

    mockUser.preferredLayout = mode;
    
    res.json({ message: "Preference updated", preferredLayout: mockUser.preferredLayout });
};

module.exports = { loginUser, getUserSettings, updatePreference };