import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/HeaderNav.css";

const HeaderNav = () => {
  const location = useLocation();
  // Show only logout button on admin/dashboard pages
  const isDashboard = ["/admin", "/dashboard"].includes(location.pathname);

  const handleLogout = () => {
    // Simple logout: redirect to home
    window.location.href = "/";
  };

  return (
    <nav className="header-nav" style={{ minWidth: "100vw" }}>
      <Link to="/" className="header-logo">
        Smart Criminal ID
      </Link>
      <div className="header-nav-links">
        <Link to="/browse-criminals" className="header-nav-link">
          <i className="bi bi-person-badge"></i> Browse Criminals
        </Link>
        {location.pathname === "/" ? (
          <>
            <Link to="/login" className="header-nav-link">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </Link>
            <Link
              to="/register"
              className="header-nav-link header-nav-link-primary"
            >
              <i className="bi bi-person-plus"></i> Sign Up
            </Link>
          </>
        ) : isDashboard ? (
          <button
            onClick={handleLogout}
            className="header-nav-link header-nav-link-primary"
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default HeaderNav;
