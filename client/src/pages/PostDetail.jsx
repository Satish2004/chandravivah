import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      setError("Failed to load post");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Comment fetch error", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    try {
      await axios.post(
        "http://localhost:5000/api/comments",
        { postId: id, text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText("");
      fetchComments(); // refresh after adding
    } catch (err) {
      console.error("Comment submit error", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">
        {post.name} ({post.age} yrs)
      </h2>
      <p className="text-gray-700 mb-1">Caste: {post.caste}</p>
      <p className="text-gray-700 mb-1">City: {post.city}</p>
      <p className="text-gray-700 mb-3">Education: {post.education}</p>
      <p className="mb-6">{post.familyBackground}</p>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {comments.map((c) => (
        <div key={c._id} className="mb-3 p-2 border rounded bg-gray-100">
          <p className="text-sm">{c.text}</p>
          <p className="text-xs text-gray-500 text-right">
            — {c.commentedBy?.name || "User"}
          </p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          rows="3"
          className="w-full border rounded p-2"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PostDetail;
