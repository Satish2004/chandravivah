const Post = require("../models/Post");

// Create a post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      postedBy: req.userId, // make sure you're using `postedBy` as per your schema
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Create Post Error:", error); // log in terminal
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// Get single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};
