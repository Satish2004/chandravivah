const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/postController");

const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const router = express.Router();

// Routes
router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, updatePost);
router.get("/mine", verifyToken, getMyPosts); // <--- NEW
router.delete("/:id", verifyToken, deletePost);
router.post("/", verifyToken, upload.single("image"), createPost);

module.exports = router;
