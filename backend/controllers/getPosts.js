const PostMessage = require("../models/postMessages.js");
const mongoose = require("mongoose");
const { post } = require("../routes/posts.js");

async function getPostsBySearch(req, res) {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getPosts(req, res) {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function createPost(req, res) {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
async function updatePost(req, res) {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
}

async function deletePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post was deleted" });
}

async function likePost(req, res) {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id == String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
}
module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
};
