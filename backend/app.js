const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");

const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(bodyParser.json());

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Running on port:", 5000)
});