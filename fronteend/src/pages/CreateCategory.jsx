import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/categories",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Category created successfully.");
      // setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to create category. Try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-card" style={{ maxWidth: "60dvw" }}>
        <h2 className="register-title mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group mb-3">
            <label htmlFor="cat-name" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              id="cat-name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cat-desc" className="form-label">
              Description
            </label>
            <textarea
              id="cat-desc"
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Category
          </button>
        </form>
        {message && <p className="register-footer mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default CreateCategory;
