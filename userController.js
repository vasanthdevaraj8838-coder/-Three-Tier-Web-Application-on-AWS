const db = require("../config/db");

// Get users
exports.getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.send(err);
        res.json(results);
    });
};

// Add user
exports.addUser = (req, res) => {
    const { name, email } = req.body;

    db.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        (err, result) => {
            if (err) return res.send(err);
            res.json({ message: "User added", result });
        }
    );
};