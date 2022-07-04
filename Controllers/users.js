const express = require("express");
const User = require("../Models/user.js");

const router = express.Router();

// GET /users
router.get("/", function (req, res) {
  // Find all the users
  User.find({})
    // Return users as json
    .then((users) => res.status(200).json({ users: users }));
});

// POST /user
router.post("/", function (req, res) {
  // get new user data
  const data = req.body;
  // save user to db
  User.create(data).then((user) => {
    res.status(201).json({ user: user });
    console.log(user);
  });
});

// GET /:id
router.get("/:id", function (req, res) {
  const id = req.params.id;
  //Find user by id
  User.findById(id)
    //Return user as json
    .then((user) => res.status(200).json({ user: user }));
  console.log(id);
});

// DELETE /:id
router.delete("/:id", (req, res) => {
  //Find user by id and delete
  User.findByIdAndDelete(req.params.id).then((user) => {
    res.json({ data: user });
  });
});

// PATCH /:id
router.patch("/:id", (req, res) => {
  //Find user by id and update
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (user) => {
      res.json({ data: user });
    }
  );
});

module.exports = router;
