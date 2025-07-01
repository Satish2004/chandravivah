const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
