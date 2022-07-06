const express = require("express");
const Insurance = require("../Models/insurance.js");
const verify = require("../db/verifyToken");

const router = express.Router();

// GET /insurances
router.get("/", verify, function (req, res) {
  // Find all the insurances
  Insurance.find({})
    // Return insurances as json
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((insurances) => res.status(200).json({ insurances: insurances }));
});

// POST /insurances
router.post("/", verify, function (req, res) {
  // get new insurance data
  const data = req.body;
  // save insurances to db
  Insurance.create(data).then((insurance) => {
    res.status(201).json({ insurance: insurance });
    console.log(insurance);
  });
});

// GET /:id
router.get("/:id", verify, function (req, res) {
  const id = req.params.id;
  //Find insurance by id
  Insurance.findById(id)
    //Return insurance as json
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((insurance) => res.status(200).json({ insurance: insurance }));
  console.log(id);
});

// DELETE /:id
router.delete("/:id", verify, (req, res) => {
  //Find insurance by id and delete
  Insurance.findByIdAndDelete(req.params.id).then((insurance) => {
    res.json({ data: insurance });
  });
});

// PATCH /:id
router.patch("/:id", verify, (req, res) => {
  //Find insurance by id and update
  Insurance.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // .populate("user", ["firstName", "lastName", "email", "password"])
    .then((insurance) => {
      res.json({ data: insurance });
    });
});

module.exports = router;
