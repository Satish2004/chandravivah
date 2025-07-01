const express = require("express");
const {
  createComment,
  getCommentsByPost,
} = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/:postId", getCommentsByPost);

module.exports = router;
