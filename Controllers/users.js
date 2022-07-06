const express = require("express");
const User = require("../Models/user.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user
router.post("/register", async (req, res) => {
  //get new user data
  const salt = await bcrypt.genSalt(10);
  const hashPw = await bcrypt.hash(req.body.password, salt);

  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.hashPw,
  };
  //Save user to db
  User.create(userObj).then((user) => {
    res.status(201).json({ user: user });
    console.log(user);
  });
});

//Login
router.post("/login", async (req, res) => {
  //Find all users
  const user = await User.findOne({ email: req.body.email });
  const validPass = await bcrypt.compare(req.body.passord, user.password);
  console.log(user, req.body.email, "valid:", validPass);
  if (!user || !validPass)
    res.status(400).send("Email or password is incorrect");
  if (user && validPass) res.status(200).send("logged in");
});

// // GET /users
// router.get("/", function (req, res) {
//   // Find all the users
//   User.find({})
//     // Return users as json
//     .then((users) => res.status(200).json({ users: users }));
// });

// // POST /user
// router.post("/", function (req, res) {
//   // get new user data
//   const data = req.body;
//   // save user to db
//   User.create(data).then((user) => {
//     res.status(201).json({ user: user });
//     console.log(user);
//   });
// });

// // GET /:id
// router.get("/:id", function (req, res) {
//   const id = req.params.id;
//   //Find user by id
//   User.findById(id)
//     //Return user as json
//     .then((user) => res.status(200).json({ user: user }));
//   console.log(id);
// });

// // DELETE /:id
// router.delete("/:id", (req, res) => {
//   //Find user by id and delete
//   User.findByIdAndDelete(req.params.id).then((user) => {
//     res.json({ data: user });
//   });
// });

// // PATCH /:id
// router.patch("/:id", (req, res) => {
//   //Find user by id and update
//   User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
//     (user) => {
//       res.json({ data: user });
//     }
//   );
// });

module.exports = router;
