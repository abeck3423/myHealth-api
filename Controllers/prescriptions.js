const express = require("express");
const Prescription = require("../Models/prescription.js");

const router = express.Router();

// GET /prescriptions
router.get("/", function (req, res) {
  // Find all the prescriptions
  Prescription.find({})
    // Return prescriptions as json
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((prescriptions) =>
      res.status(200).json({ prescriptions: prescriptions })
    );
});

// POST /prescription
router.post("/", function (req, res) {
  // get new prescription data
  const data = req.body;
  // save prescription to db
  Prescription.create(data).then((prescription) => {
    res.status(201).json({ prescription: prescription });
    console.log(prescription);
  });
});

// GET /:id
router.get("/:id", function (req, res) {
  const id = req.params.id;
  //Find prescription by id
  Prescription.findById(id)
    //Return prescription as json
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((prescription) =>
      res.status(200).json({ prescription: prescription })
    );
  console.log(id);
});

// DELETE /:id
router.delete("/:id", (req, res) => {
  //Find prescription by id and delete
  Prescription.findByIdAndDelete(req.params.id).then((prescription) => {
    res.json({ data: prescription });
  });
});

// PATCH /:id
router.patch("/:id", (req, res) => {
  //Find prescription by id and update
  Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((prescription) => {
      res.json({ data: prescription });
    });
});

module.exports = router;
