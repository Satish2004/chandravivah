import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="p-4 border rounded shadow bg-white hover:shadow-md transition duration-200">
      <h3 className="text-xl font-bold mb-1">{post.name || "No Name"}</h3>

      <p className="text-gray-600 text-sm">
        {post.city || "Unknown City"} | {post.age || "N/A"} yrs |{" "}
        {post.caste || "No Caste"}
      </p>

      {post.bio && <p className="mt-2 text-gray-700">{post.bio}</p>}

      <Link
        to={`/post/${post._id}`}
        className="inline-block mt-3 text-blue-500 hover:underline text-sm"
      >
        View Details
      </Link>
    </div>
  );
};

export default PostCard;
