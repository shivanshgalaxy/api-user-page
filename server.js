require("dotenv").config()

const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", ()=>console.log("Connected to database"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server started"));