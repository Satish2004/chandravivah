const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const newComment = new Comment({
      postId,
      text,
      commentedBy: req.userId,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate(
      "commentedBy",
      "name"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};
