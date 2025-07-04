// 📁 frontend/src/pages/CreatePost.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    caste: "",
    city: "",
    state: "",
    village: "",
    education: "",
    occupation: "",
    passion: "",
    fatherName: "",
    motherName: "",
    familyBackground: "",
    income: "",
    farmingLand: "",
    isRemarriage: false,
    mobile: "",
    whatsapp: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Create post error", err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Other input fields... */}
        <input
          type="text"
          name="mobile"
          placeholder="Contact Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number (only digits, no +91)"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
