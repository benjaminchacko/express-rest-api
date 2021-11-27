const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Post Route - Add New User
router.post("/", async (req, res) => {
  const { body } = req;
  const user = new User(body);

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
