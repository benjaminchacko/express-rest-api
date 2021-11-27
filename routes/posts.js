const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* // Get Route - Get All Posts
router.get('/', async (req, res) => {
    try {
        const data = await Post.find().sort('title');
        res.send(data);
    } catch (err) {
        res.json({ message: err })
    }
}); */

// Get Route - Get Posts by Year
/* router.get('/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const data = await Post.find({ year })
        res.send(data);
    } catch (err) {
        res.json({ message: err })
    }
}); */

// Get Route - Get Posts by Author
/* router.get('/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const data = await Post.find({ author: author })
        res.send(data);
    } catch (err) {
        res.json({ message: err })
    }
}); */

// Get Route - Get Posts by Year and Month
/* router.get('/:year/:month', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    try {
        const data = await Post.find({ year: year, month: month })
        res.send(data);
    } catch (err) {
        res.json({ message: err })
    }
}); */

// Get Route - Get Posts by Year, Month and Day
/* router.get('/:year/:month/:day', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    try {
        const data = await Post.find({ year: year, month: month, day: day });
        res.send(data);
    } catch (err) {
        res.json({ message: err })
    }
}); */

// Get Route - Get Posts with a limit
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  try {
    const limitedPosts = await Post.find().sort("title").limit(parseInt(limit));
    res.send(limitedPosts);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Route - Get Single Post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");
    res.send(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post Route - Create New Post (with Joigoose)
router.post("/", async (req, res) => {
  const { body } = req;

  const post = new Post(body);

  try {
    const newPost = await post.save();
    res.json(newPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post Route - Create New Post (with Basic Validation)
/* router.post('/', async (req, res) => {
    const { body } = req; 

    if (!body.title || body.title.length < 4) {
        res.status(400).send({
            message: 'Title is required and must be at least 4 characters',
        });
        return;
    }
    if(!body.author) {
        res.status(400).send({
            message: 'Author is required'
        });
        return;
    }
    if(!body.content) {
        res.status(400).send({
            message: 'Content is required'
        });
        return;
    }
    const post = new Post(body); 

    try {
        const newPost = await post.save();
        res.json(newPost);
    } catch (err) {
        res.json({ message: err });
    }
}); */

// PATCH Route - Update a post by Id
router.patch("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedPost = await Post.updateOne(
      { _id: id },
      {
        $set: body,
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE Route - Delete Existing Blog Post by Id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let removePost = await Post.deleteOne({ _id: id });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
