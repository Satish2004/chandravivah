import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserTie,
  FaCode,
  FaComments,
  FaPaintBrush,
  FaLaptopCode,
} from "react-icons/fa";

const icons = [FaLaptopCode, FaPaintBrush, FaCode, FaUserTie, FaComments];

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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

  if (!post)
    return <div className="text-center text-white mt-6">Loading...</div>;

  const isOwner = user && post.postedBy && post.postedBy._id === user.id;

  const timelineData = [
    {
      title: "Personal Information",
      description: `${post.name} | ${post.gender}, | ${post.age} years old, ${post.caste}`,
      skills: [post.city, post.state, post.village],
    },
    {
      title: "Education & Occupation",
      description: post.education || "-",
      skills: [post.occupation, post.passion],
    },
    {
      title: "Family",
      description: ` Father Name ${post.fatherName} 
      Mother Name ${post.motherName}`,
      skills: [post.familyBackground],
    },
    {
      title: "Financial Details",
      description: `Income: ₹${post.income}`,
      skills: [
        post.farmingLand,
        post.isRemarriage ? "Remarriage: Yes" : "Remarriage: No",
      ],
    },
    {
      title: "Contact",
      description: post.mobile,
      skills: [],
    },
  ];

  return (
    <div className="min-h-screen text-black flex flex-col items-center px-4 py-10">
      {post.image && (
        <img
          src={post.image}
          alt={post.name}
          className="rounded-2xl mb-10 w-full max-w-100 h-100 object-cover"
        />
      )}

      {/* Timeline Design */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-0 left-4 w-1 bg-gray-700 h-full"></div>
        <div className="space-y-14 pl-16">
          {timelineData.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="relative group transition-all duration-300 hover:translate-x-3"
              >
                <div className="absolute left-[-35px] top-0 w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow">
                  <Icon />
                </div>
                <div className=" rounded-lg p-5">
                  <h3 className="text-xl text-black font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black mb-2">{item.description}</p>
                  <ul className="text-sm flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <li
                        key={idx}
                        className="bg-cyan-600/30 px-3 py-1 rounded-full text-black text-xs"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show Edit/Delete if owner */}
      {isOwner && (
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-black px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* Comments */}
      <div className="w-full max-w-2xl mt-12">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>

        {comments.map((c) => (
          <div key={c._id} className="border p-1 align-middle rounded mb-2">
            <p>{c.text}</p>
            <div className="text-xs text-gray-400 flex justify-between mt-1">
              <span>— {c.commentedBy?.name || "User"}</span>
              {user && c.commentedBy?._id === user.id && (
                <button
                  onClick={() => handleCommentDelete(c._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}

        {user && (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full p-2 border rounded text-black"
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
    </div>
  );
};

export default PostDetail;
