// ✅ src/components/PostCard.jsx
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-2xl bg-gray-900 text-white shadow-lg transition-transform hover:scale-105">
      {/* Background Image */}
      <img
        src={post.image || "https://via.placeholder.com/300x200"}
        alt={post.name}
        className="w-full h-48 object-cover opacity-80"
      />

      {/* Profile + Bio Summary */}
      <div className="relative p-4">
        <div className="absolute -top-10 left-4 z-10">
          <img
            src={post.image || "https://via.placeholder.com/90"}
            alt="Profile"
            className="h-20 w-20 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="pt-10">
          <h2 className="text-xl font-semibold">
            {post.name}{" "}
            <span className="block text-sm text-blue-400">
              {post.occupation}
            </span>
          </h2>
          <p className="mt-2 text-sm opacity-80">
            {post.city}, {post.state} | Age: {post.age} | {post.caste}
          </p>
          <p className="mt-2 text-xs text-gray-300 italic">{post.education}</p>

          <div className="mt-4 flex gap-2">
            <button className="w-1/2 rounded border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-500 hover:text-white">
              Follow
            </button>
            <Link
              to={`/post/${post._id}`}
              className="w-1/2 rounded border border-white px-3 py-1 text-sm hover:bg-white hover:text-black text-white text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
