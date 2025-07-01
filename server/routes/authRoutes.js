const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);
//protected route to get user profile
router.get("/profile", verifyToken, getProfile);

module.exports = router;
