const express = require("express");
const Profile = require("../Models/profile.js");

const router = express.Router();

// GET /profiles
router.get("/", function (req, res) {
  // Find all the profiles
  Profile.find({})
    // Return profiles as json
    .populate("user", ["firstName", "lastName", "email", "password"])
    .then((profiles) => res.status(200).json({ profiles: profiles }));
});

// POST /profiles
router.post("/", function (req, res) {
  // get new profile data
  const data = req.body;
  // save profile to db
  Profile.create(data).then((profile) => {
    res.status(201).json({ profile: profile });
    console.log(profile);
  });
});

// GET /:id
router.get("/:id", function (req, res) {
  const id = req.params.id;
  //Find profile by id
  Profile.findById(id)
    //Return profile as json
    .populate("user", ["firstName", "lastName", "email", "password"])
    .then((profile) => res.status(200).json({ profile: profile }));
  console.log(id);
});

// DELETE /:id
router.delete("/:id", (req, res) => {
  //Find profile by id and delete
  Profile.findByIdAndDelete(req.params.id).then((profile) => {
    res.json({ data: profile });
  });
});

// PATCH /:id
router.patch("/:id", (req, res) => {
  //Find profile by id and update
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("user", ["firstName", "lastName", "email", "password"])
    .then((profile) => {
      res.json({ data: profile });
    });
});

module.exports = router;
