const mongoose = require("../db/connection.js");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
  },
  lastName: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    min: 4,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
});

module.exports = mongoose.model("User", userSchema);
