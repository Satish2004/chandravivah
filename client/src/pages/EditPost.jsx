import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        setError("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/post/${id}`);
    } catch (err) {
      setError("Failed to update post");
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
          className="w-full border px-3 py-2 rounded"
        />
        {/* Add more fields as needed */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
