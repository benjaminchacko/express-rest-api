/* const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const Joi = require("joi");

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .required()
    .meta({ _mongoose: { _id: false } }),
});

const mongooseUserSchema = new mongoose.Schema(
  Joigoose.convert(joiUserSchema),
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", mongooseUserSchema); */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  userType: {
    type: String,
    required: true,
    enum: ["user", "superUser", "admin"],
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
