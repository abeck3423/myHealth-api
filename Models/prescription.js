const mongoose = require("../db/connection.js");

const prescriptionSchema = new mongoose.Schema({
  prescriptionName: String,
  prescriptionDose: Number,
  refillDate: Date,
  user: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
