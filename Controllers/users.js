const express = require("express");
const User = require("../Models/user.js");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

//Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(4).required(),
  email: Joi.string().min(4).required().email(),
  password: Joi.string().min(4).required(),
});
//Register user
router.post("/register", async (req, res) => {
  //get new user data
  //   const salt = await bcrypt.genSalt(10);
  //   const hashPw = await bcrypt.hash(req.body.password, salt);
  //Validate the data before making a user
  const validation = schema.validate(req.body);
  res.send(validation);

  //   const userObj = {
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password,
  //   };
  //   //Save user to db
  //   User.create(userObj).then((user) => {
  //     res.status(201).json({ user: user });
  //     console.log(user);
  //   });
});

// //Login
// router.post("/login", async (req, res) => {
//   //Find all users
//   const user = await User.findOne({ email: req.body.email });
//   const validPass = await bcrypt.compare(req.body.passord, user.password);
//   console.log(user, req.body.email, "valid:", validPass);
//   if (!user || !validPass)
//     res.status(400).send("Email or password is incorrect");
//   if (user && validPass) res.status(200).send("logged in");
// });

module.exports = router;
