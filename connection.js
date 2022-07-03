const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/myHealth-api");
// mongoose.connect("mongodb://127.0.0.1/myHealth-api")

module.exports = mongoose;
