const db = require("../db");

const User = {};

User.create = (email, password) => {
    return db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, password]);
}

User.findAll = () => {
    return db.query("SELECT * FROM users");
}

User.find = (email) => {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

module.exports = User;