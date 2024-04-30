const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "coding_challenge",
    user: "postgres",
    password: "3469"
})

try {
    client.connect()
    console.log("Connected")
} catch(err) {
    console.error("Failed to connect:", err)
}

module.exports = client;