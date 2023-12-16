// the app.js file is used as a central file for configuring and setting up an Express.js application

// loading the express module using the require function
const express = require("express");

// creating an instance of the Express application
const app = express();

// this method is used to add middleware
app.use(
  express.json() // parses the JSON data from incoming request and populates the req.body property with JSON object
);

// loading Router
const person = require("./routes/personRoute");
const order = require("./routes/orderRoute");
const auth = require("./routes/authRoute.js");
app.use("/api/v1", person);
app.use("/api/v1", order);
app.use("/api/v1", auth);

// exporting the app instance
module.exports = app;
