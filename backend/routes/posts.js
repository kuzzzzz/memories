const express = require("express");
const auth = require("../middleware/auth");

const {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/getPosts");

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getPost);

router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

module.exports = router;
