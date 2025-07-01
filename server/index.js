const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// routes import
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("ChandraVivah API is running");
});

// authentication routes
app.use("/api/auth", authRoutes);
// post routes
app.use("/api/posts", postRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connect successfully!");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
