// ✅ src/components/PostCard.jsx
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="p-4 border rounded shadow bg-white">
      {post.image && (
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-48 object-cover mb-3 rounded"
        />
      )}
      <h3 className="text-xl font-bold mb-1">{post.name}</h3>
      <p className="text-gray-600">
        {post.city} | {post.age} yrs | {post.caste}
      </p>
      <p className="mt-2 text-sm">{post.education}</p>

      <Link
        to={`/post/${post._id}`}
        className="inline-block mt-3 text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default PostCard;
