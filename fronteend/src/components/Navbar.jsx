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
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4"
      style={{ minWidth: "100vw", zIndex: 100 }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          <i className="bi bi-shield-lock-fill me-2 text-primary" />
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/browse-criminals"
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
                  >
                    <i className="bi bi-speedometer2 me-1" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/upload"
                  >
                    <i className="bi bi-upload me-1" /> Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/history"
                  >
                    <i className="bi bi-clock-history me-1" /> History
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      to="/admin"
                    >
                      <i className="bi bi-person-gear me-1" /> Admin Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger ms-lg-3 mt-2 mt-lg-0 px-4 fw-semibold"
                    onClick={handleLogout}
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
