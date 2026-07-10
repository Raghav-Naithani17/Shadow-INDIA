import { useState } from "react";
import API from "../services/api";

function ReportForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await API.post("/reports", data);

      console.log(res.data);

      alert("Report Submitted Successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        image: null,
      });

      // Reset file input
      document.querySelector('input[type="file"]').value = "";
    }catch (error) {
  console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  alert("Something went wrong");
}
  };

  return (
    <div className="bg-slate-900 text-white p-10">
      <h2 className="text-3xl font-bold mb-6">
        Report an Issue
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="bg-cyan-500 px-6 py-3 rounded hover:bg-cyan-600"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportForm;