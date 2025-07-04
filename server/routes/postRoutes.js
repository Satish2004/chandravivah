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
// Express.js pseudocode:
router.get("/api/dashboard", verifyToken, async (req, res) => {
  const userId = req.userId;
  const stats = {
    posts: await Post.countDocuments({ postedBy: userId }),
    comments: await Comment.countDocuments({ commentedBy: userId }),
  };
  const byDay = await Comment.aggregate([
    { $match: { commentedBy: userId, createdAt: { $gte: oneMonthAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: "$_id", count: 1, _id: 0 } },
  ]);
  const byMonth = await Comment.aggregate([
    { $match: { commentedBy: userId } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { month: "$_id", count: 1, _id: 0 } },
  ]);
  res.json({ stats, activity: { byDay, byMonth } });
});

module.exports = router;
