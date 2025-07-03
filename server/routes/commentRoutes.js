const express = require("express");
const {
  createComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", verifyToken, deleteComment);

module.exports = router;
