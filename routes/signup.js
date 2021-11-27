const express = require("express");
const router = express.Router();
const User = require("../models/User");
const signUpValidation = require("../validation/signUpValidation");

// Post Route - Add New User
router.post("/", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE ADD A USER TO DB
  const {error} = signUpValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
 
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
