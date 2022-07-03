// Require in dependencies
require("dotenv").config();
const express = require("express");
const logger = require("morgan");

// Define port
const PORT = process.env.PORT;

// Create express app
const app = express();

// Use logger middleware
app.use(logger("dev"));

// Basic get route
app.get("/", function (req, res) {
  res.send("hello, earth!");
});

// Start app on port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
