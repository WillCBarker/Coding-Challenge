const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    database: "coding_challenge",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

try {
    client.connect()
    console.log("Connected")
} catch(err) {
    console.error("Failed to connect:", err)
}

module.exports = client;