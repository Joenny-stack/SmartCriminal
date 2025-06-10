import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="dashboard-bg min-vh-100 w-100 d-flex flex-column"
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div className="container pt-5 flex-grow-1 d-flex flex-column">
        <div
          className="d-flex flex-column align-items-center mb-4"
          style={{ paddingTop: 52 }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
            style={{
              width: 70,
              height: 70,
              background: "#1976d2",
            }}
          >
            <i className="bi bi-person-badge text-white fs-2"></i>
          </div>
          <h1
            className="fw-bold mb-1"
            style={{
              letterSpacing: 1,
              fontSize: "3rem",
              color: "#0a6efd",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0 8px 0",
            }}
          >
            <span style={{ fontSize: "2.5rem", marginRight: 8 }}>
              <i
                className="bi bi-person-badge"
                style={{ color: "#0a6efd" }}
              ></i>
            </span>
            Officer Dashboard
          </h1>
          <div
            className="mb-1"
            style={{
              fontSize: "1.5rem",
              color: "#444",
              fontWeight: 500,
            }}
          >
            Welcome,{" "}
            <span style={{ fontWeight: 700, color: "#0a6efd" }}>Officer</span>.
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              color: "#555",
              marginTop: 2,
              marginBottom: 2,
              textAlign: "center",
            }}
            className="lead text-secondary mb-4"
          >
            Access your tools and manage your workflow below.
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-lg border-0 dashboard-card-gradient">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="mb-3">
                  <span className="dashboard-icon-circle bg-primary bg-gradient text-white mb-2">
                    <i className="bi bi-upload fs-2" />
                  </span>
                </div>
                <h5 className="card-title fw-bold mb-2">Upload New Image</h5>
                <p className="card-text text-center mb-3">
                  Upload a new suspect image for identification.
                </p>
                <Link
                  to="/upload"
                  className="btn btn-primary btn-lg w-100 mt-auto"
                >
                  <i className="bi bi-upload me-1" /> Upload Image
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-lg border-0 dashboard-card-gradient">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="mb-3">
                  <span className="dashboard-icon-circle bg-info bg-gradient text-white mb-2">
                    <i className="bi bi-clock-history fs-2" />
                  </span>
                </div>
                <h5 className="card-title fw-bold mb-2">Upload History</h5>
                <p className="card-text text-center mb-3">
                  View your previous uploads and match results.
                </p>
                <Link
                  to="/history"
                  className="btn btn-info btn-lg w-100 mt-auto text-white"
                >
                  <i className="bi bi-clock-history me-1" /> View History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/*
// Add to Dashboard.css for extra polish:
.dashboard-card-gradient {
  background: linear-gradient(135deg, #f8fafd 60%, #e9f0fb 100%);
}
.dashboard-icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.10);
  font-size: 2rem;
}
*/
