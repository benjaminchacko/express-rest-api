const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const Joi = require("joi");

const joiPostSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "User" },
  }),
  content: Joi.string().required(),
  tags: Joi.array().meta({ _mongoose: { _id: false } }),
});

const mongoosePostSchema = new mongoose.Schema(
  Joigoose.convert(joiPostSchema),
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Post", mongoosePostSchema);

/* const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 32
  },
  author: {
    type: String,
    required: true,
    min: 6,
    max: 32
  },
  content: {
    type: String,
    required: true,
    min: 2,
    max: 500
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
},
  { timestamps: true }
);


const Post = mongoose.model("Post", postSchema);
module.exports = Post; */
