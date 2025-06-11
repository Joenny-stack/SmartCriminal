import React, { useContext, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as apiLogin } from "../api/index";
import bgImage from "../assets/images/criminal-home2.jpg";
import "../styles/Home.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    // If already logged in, redirect to dashboard or admin
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiLogin(username, password);
      setUser(data); // expects { token, user_id, username, role }
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: `url(${bgImage}) center center/cover no-repeat`,
          zIndex: 0,
          filter: "brightness(0.55) blur(0px)",
        }}
      />
      {/* Overlay for contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(10, 30, 60, 0.55)",
          zIndex: 1,
        }}
      />
      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100vw",
          // minHeight: "100vh", // Remove to allow scrolling
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2vw",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(10,30,60,0.75)",
            borderRadius: 16,
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.18)",
            padding: "2.5rem 2.5rem 2rem 2.5rem",
            maxWidth: 400,
            width: "100%",
            margin: "0 auto",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: 800,
              fontSize: "2.2rem",
              marginBottom: 18,
              color: "#fff",
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              letterSpacing: 1,
            }}
          >
            Login
          </h2>
          {error && (
            <div style={{ color: "#ffb3b3", marginBottom: 12 }}>{error}</div>
          )}
          <div style={{ width: "100%", marginBottom: 18 }}>
            <label style={{ color: "#e3eaff", fontWeight: 600 }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "none",
                marginTop: 6,
                marginBottom: 8,
                fontSize: 16,
                background: "#e3eaff",
                color: "#222",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", marginBottom: 18 }}>
            <label style={{ color: "#e3eaff", fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "none",
                marginTop: 6,
                marginBottom: 8,
                fontSize: 16,
                background: "#e3eaff",
                color: "#222",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#0a6efd",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              padding: "0.9rem 0",
              borderRadius: 8,
              border: "none",
              marginTop: 8,
              marginBottom: 10,
              boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
              letterSpacing: 1,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
          <div style={{ color: "#e3eaff", marginTop: 10, fontSize: 15 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      {/* Footer */}
      <footer
        className="home-footer"
        style={{
          marginTop: 32,
          position: "relative",
          zIndex: 3,
          color: "#e3eaff",
          textShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        <span>
          © {new Date().getFullYear()} Smart Criminal ID. All rights reserved.
        </span>
        <span style={{ marginLeft: 12 }}>
          <Link
            to="/privacy"
            className="home-footer-link"
            style={{ color: "#e3eaff" }}
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link
            to="/terms"
            className="home-footer-link"
            style={{ color: "#e3eaff" }}
          >
            Terms of Service
          </Link>
        </span>
      </footer>
    </div>
  );
};

export default Login;
