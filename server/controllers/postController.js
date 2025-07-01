const Post = require("../models/Post");

// ✅ Create a post
exports.createPost = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const newPost = new Post({
      ...req.body,
      postedBy: req.userId,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// ✅ Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("postedBy", "name email");
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
};

// ✅ Get single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "postedBy",
      "_id name"
    );

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: error.message });
  }
};

// ✅ Update post
// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy.toString() !== req.userId)
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });

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
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy.toString() !== req.userId)
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};

// ✅ Get posts created by current user
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.userId }).populate(
      "postedBy",
      "name email"
    );
    res.json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch your posts", error: error.message });
  }
};
