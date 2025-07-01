import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "",
    age: "",
    caste: "",
    motherName: "",
    fatherName: "",
    income: "",
    farmingLand: "",
    isRemarriage: false,
    passion: "",
    education: "",
    occupation: "",
    familyBackground: "",
    village: "",
    city: "",
    state: "",
    mobile: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Post created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Post creation failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Biodata</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          "name",
          "surname",
          "gender",
          "age",
          "caste",
          "motherName",
          "fatherName",
          "income",
          "farmingLand",
          "passion",
          "education",
          "occupation",
          "familyBackground",
          "village",
          "city",
          "state",
          "mobile",
          "image",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required={field !== "image"} // image is optional
          />
        ))}

        <div className="flex items-center gap-2">
          <label htmlFor="isRemarriage" className="text-sm">
            Is Remarriage:
          </label>
          <input
            type="checkbox"
            name="isRemarriage"
            checked={formData.isRemarriage}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
