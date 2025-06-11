import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        minWidth: "100vw",
        zIndex: 100,
        background: "rgba(10, 30, 60, 0.65)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        padding: "0.7rem 0",
      }}
    >
      <div className="container-fluid" style={{ maxWidth: 1200 }}>
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
          style={{
            color: "#fff",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i
            className="bi bi-shield-lock-fill me-2"
            style={{ color: "#0a6efd", fontSize: 32 }}
          />
          Smart Criminal ID
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: "none",
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/browse-criminals"
                style={{ color: "#e3eaff", fontWeight: 500 }}
              >
                <i className="bi bi-person-badge me-1" /> Browse Criminals
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/dashboard"
                    style={{ color: "#e3eaff", fontWeight: 500 }}
                  >
                    <i className="bi bi-speedometer2 me-1" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/upload"
                    style={{ color: "#e3eaff", fontWeight: 500 }}
                  >
                    <i className="bi bi-upload me-1" /> Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/history"
                    style={{ color: "#e3eaff", fontWeight: 500 }}
                  >
                    <i className="bi bi-clock-history me-1" /> History
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      to="/admin"
                      style={{ color: "#e3eaff", fontWeight: 500 }}
                    >
                      <i className="bi bi-person-gear me-1" /> Admin Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn ms-lg-3 mt-2 mt-lg-0 px-4 fw-semibold"
                    onClick={handleLogout}
                    style={{
                      background: "#0a6efd",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontWeight: 700,
                      boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
                      letterSpacing: 1,
                      transition: "background 0.2s",
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/login"
                    style={{ color: "#fff", fontWeight: 600 }}
                  >
                    <i className="bi bi-box-arrow-in-right me-1" /> Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
