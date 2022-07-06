const express = require("express");
const User = require("../Models/user.js");
const router = express.Router();
const { registerValidation, loginValidation } = require("../db/validation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user
router.post("/register", async (req, res) => {
  //Validate the data before making a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };
  //Save user to db
  User.create(userObj).then((user) => {
    res.status(201).json({ user: user._id });
    console.log(user);
  });
});

// //Login
router.post("/login", async (req, res) => {
  //Validate the data before making a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
