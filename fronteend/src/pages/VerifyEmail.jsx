import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import "../styles/Register.css"; // Reuse the same CSS for consistent styling

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to verify email. Please try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Email Verification</h2>
        <p className="register-footer">{message}</p>
        <p className="register-footer">
          Go back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
