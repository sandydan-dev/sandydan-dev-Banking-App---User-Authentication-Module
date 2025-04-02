const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connection
const { connectionDB } = require("./config/database.connection");

connectionDB();

// router path
const userRouter = require("./route/userAuth.route");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes

app.get("/", (req, res) => {
  res.send("hellye user");
});

// main routes
app.use("/api/v2", userRouter);

module.exports = { app };
