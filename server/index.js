require("dotenv").config();

const express = require("express");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());



//Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello, welcome to memorie API");
})
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

//connnet database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {        //when hosting on heroku change PORT to process.env.PORT
        console.log("server running on port " + PORT);
    }))
    .catch((err) => console.log(err.message));
