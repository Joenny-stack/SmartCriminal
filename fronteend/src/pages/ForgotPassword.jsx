import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Register.css"; // Reuse the same CSS for consistent styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(
        response.data.message ||
          "Reset link sent successfully. Please check your email."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again later.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="register-footer">
            {message}
            {message.includes("Reset link sent successfully") && (
              <span>
                <br />
                <Link to="/login" className="text-decoration-none">
                  Go to Login
                </Link>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
