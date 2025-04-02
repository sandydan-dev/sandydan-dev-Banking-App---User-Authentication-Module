const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const connectionDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection Established :", process.env.NODE_ENV);
    })
    .catch((error) => {
      console.log("Error While connection to DB", error);
    });
};

module.exports = { connectionDB };
