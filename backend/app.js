// the app.js file is used as a central file for configuring and setting up an Express.js application

// loading the express module using the require function
const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

// creating an instance of the Express application
const app = express();

// this method is used to add middleware
app.use(
  express.json() // parses the JSON data from incoming request and populates the req.body property with JSON object
);
app.use(
  cookieParser() // This middleware parses the cookies sent by the client and makes them available in the req.cookies object for further processing within your application.
);

// loading Router
const person = require("./routes/personRoute");
const order = require("./routes/orderRoute");
const auth = require("./routes/authRoute.js");
const party = require("./routes/partyRoute.js");
app.use("/api/v1", person);
app.use("/api/v1", order);
app.use("/api/v1", auth);
app.use("/api/v1", party);

// error handling middleware
app.use(errorMiddleware); // By placing this error handling middleware at the end of your middleware stack, Express.js will invoke it whenever an error occurs in any previous middleware or route handler // remember to place this error handling middleware after all your other middleware and route handlers to ensure that it catches any errors that occur throughout the application.

// exporting the app instance
module.exports = app;
