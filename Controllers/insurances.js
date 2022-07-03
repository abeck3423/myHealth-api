const express = require("express");
const Insurance = require("../Models/insurance.js");

const router = express.Router();

// GET /insurances
router.get("/", function (req, res) {
  // Find all the insurances
  Insurance.find({})
    // Return insurances as json
    .populate("user", ["userName", "firstName", "lastName", "email"])
    .then((insurances) => res.status(200).json({ insurances: insurances }));
});

// POST /insurances
router.post("/", function (req, res) {
  // get new insurance data
  const data = req.body;
  // save insurances to db
  Insurance.create(data).then((insurance) => {
    res.status(201).json({ insurance: insurance });
    console.log(insurance);
  });
});

// GET /:id
router.get("/:id", function (req, res) {
  const id = req.params.id;
  //Find insurance by id
  Insurance.findById(id)
    //Return insurance as json
    .populate("user", ["userName", "firstName", "lastName", "email"])
    .then((insurance) => res.status(200).json({ insurance: insurance }));
  console.log(id);
});

// DELETE /:id
router.delete("/:id", (req, res) => {
  //Find insurance by id and delete
  Insurance.findByIdAndDelete(req.params.id).then((insurance) => {
    res.json({ data: insurance });
  });
});

// PATCH /:id
router.patch("/:id", (req, res) => {
  //Find insurance by id and update
  Insurance.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("user", ["userName", "firstName", "lastName", "email"])
    .then((insurance) => {
      res.json({ data: insurance });
    });
});

module.exports = router;
