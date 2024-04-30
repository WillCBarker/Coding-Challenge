const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Running on port:", 5000)
});