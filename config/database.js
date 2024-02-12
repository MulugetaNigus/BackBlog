const mongoose = require("mongoose");
require("dotenv").config();

const DatabaseConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Database Connected !");
      })
      .catch((err) => {
        console.log(
          "Something Went Wrong While Connecting To DB, Due To " + err.message
        );
      });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { DatabaseConnection };