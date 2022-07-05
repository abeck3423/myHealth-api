// Require in dependencies
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const insurancesController = require("./Controllers/insurances.js");
const prescriptionsController = require("./Controllers/prescriptions.js");
const profilesController = require("./Controllers/profiles.js");
const usersController = require("./Controllers/users.js");
const cors = require("cors");

// Define port
const PORT = process.env.PORT || 8080;

// Create express app
const app = express();

// Accept json as req.body
app.use(express.json());

//App will use CORS
app.use(cors());

// Use logger middleware
app.use(logger("dev"));

// Insurances routes
app.use("/insurances", insurancesController);

// Prescriptions routes
app.use("/prescriptions", prescriptionsController);

// Profiles routes
app.use("/profiles", profilesController);

// Users routes
app.use("/users", usersController);

app.set("port", PORT);

// Start app on port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
