const mongoose = require("../db/connection.js");

const profileSchema = new mongoose.Schema({
  patientName: String,
  birthDate: Date,
  weight: Number,
  height: Number,
  bloodPressure: Number,
  user: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
