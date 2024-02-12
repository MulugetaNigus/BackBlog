// express file
const express = require("express");
// cors file
const cors = require("cors");
// environment variable file
require("dotenv").config();

// database connection
const { DatabaseConnection } = require("./config/database");

// Route file inmportations
const BlogRoute = require("./routes/BlogRoute");

// middleware
const app = express();
app.use(express.json())
app.use(cors()) 

// route
app.use("/" , BlogRoute);

// app listening
app.listen( process.env.PORT , () => {
    // database connections
    DatabaseConnection();
    // port connection log
    console.log(`app running on port ${process.env.PORT}`);
})