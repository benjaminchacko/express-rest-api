const express = require("express");
const adminRouter = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Get Route - Get All Users
adminRouter.get("/users", async (req, res) => {
  try {
    const usersData = await User.find().sort("email");
    res.send(usersData);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Route - Get All Posts
adminRouter.get("/posts", async (req, res) => {
  try {
    const postsData = await Post.find().sort("title");
    res.send(postsData);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Route - Get Single User
adminRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("posts");
    res.send(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Route - Get Single Post with Author Id Ref (User)
adminRouter.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");
    res.send(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post Route - Add New User
adminRouter.post("/users", async (req, res) => {
  const { body } = req;
  const user = new User(body);

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post Route - Create New Post
adminRouter.post("/posts", async (req, res) => {
  const { body } = req;
  const post = new Post(body);

  try {
    const newPost = await post.save();
    res.json(newPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// PATCH Route - Update a User
adminRouter.patch("/users/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updateUser = await User.updateOne(
      { _id: id },
      {
        $set: body,
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// PATCH Route - Update a Post
adminRouter.patch("/posts/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatePost = await Post.updateOne(
      { _id: id },
      {
        $set: body,
      }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Route - Delete Specific User
adminRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deleteUser = await User.deleteOne({ _id: id });
    res.json(deleteUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Route - Delete Specific Post
adminRouter.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deletePost = await Post.deleteOne({ _id: id });
    res.json(deletePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = adminRouter;
