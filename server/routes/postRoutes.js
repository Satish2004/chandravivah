// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });
const verifyToken = require("../middleware/authMiddleware");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", verifyToken, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, upload.single("image"), updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
