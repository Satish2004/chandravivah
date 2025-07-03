const Post = require("../models/Post");

// ✅ Create a Post
exports.createPost = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";
    console.log("Image URL:", imageUrl);

    const newPost = new Post({
      ...req.body,
      image: imageUrl,
      postedBy: req.userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// ✅ Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("postedBy", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

// ✅ Get Single Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "postedBy",
      "_id name"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch post",
      error: error.message,
    });
  }
};

// ✅ Update Post (Only Owner)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only owner can update
    if (post.postedBy.toString() !== req.userId)
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });

    const updatedData = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

// ✅ Delete Post only if user is owner
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only allow owner to delete
    if (post.postedBy.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized to delete" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// ✅ Get Posts of Logged-in User
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.userId }).populate(
      "postedBy",
      "name email"
    );
    res.json({ posts });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your posts",
      error: error.message,
    });
  }
};
