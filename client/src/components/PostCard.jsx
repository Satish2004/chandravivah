import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully");
      window.location.reload();
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  const canEditOrDelete =
    user &&
    (post.postedBy === user._id ||
      post.postedBy?._id === user._id ||
      user.role === "admin");

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-1">{post.name}</h3>
      <p className="text-gray-600">
        {post.city} | {post.age} yrs | {post.caste}
      </p>
      <p className="mt-2">{post.familyBackground}</p>
      <Link
        to={`/post/${post._id}`}
        className="inline-block mt-3 text-blue-500 hover:underline"
      >
        View Details
      </Link>

      {canEditOrDelete && (
        <div className="flex gap-4 mt-3">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="text-yellow-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
