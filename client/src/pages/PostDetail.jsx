import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch post & comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load post", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  // Handle Post Delete
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted successfully");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/comments`,
        { postId: id, text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText("");
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Comment submit failed", err);
    }
  };

  // Handle Comment Delete
  const handleCommentDelete = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      alert("Failed to delete comment");
      console.error(err);
    }
  };

  if (!post) return <div className="text-center mt-6">Loading...</div>;

  const isOwner = user && post.postedBy && post.postedBy._id === user.id;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {post.image && (
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{post.name}</h2>
      <p>
        {post.education} | {post.city} | {post.caste}
      </p>
      <p className="mt-4">{post.familyBackground}</p>

      {/* ✅ Show Edit/Delete if owner */}
      {isOwner && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Comments</h3>

      {comments.map((c) => (
        <div key={c._id} className="bg-gray-100 p-2 rounded mb-2">
          <p>{c.text}</p>
          <div className="text-xs text-gray-500 flex justify-between mt-1">
            <span>— {c.commentedBy?.name || "User"}</span>

            {/* ✅ Only comment owner can delete their comment */}
            {user && c.commentedBy?._id === user.id && (
              <button
                onClick={() => handleCommentDelete(c._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {/* ✅ Comment Box */}
      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
            Submit Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default PostDetail;
