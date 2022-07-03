const mongoose = require("../db/connection.js");

const insuranceSchema = new mongoose.Schema({
  insuranceName: String,
  insuranceID: Number,
  insuranceGroupNumber: Number,
  user: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("Insurance", insuranceSchema);
