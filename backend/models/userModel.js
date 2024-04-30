const db = require("../db");

const User = {};

User.create = (username, password) => {
    return db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
}

User.findAll = () => {
    return db.query("SELECT * FROM users");
}

User.find = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]);
}

module.exports = User;