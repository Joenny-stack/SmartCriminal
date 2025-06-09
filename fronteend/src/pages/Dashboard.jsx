import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container container" style={{ paddingTop: 0, marginTop: 0 }}>
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold mb-3">
            Officer Dashboard - Smart Criminal ID
          </h1>
          <p className="lead text-secondary">
            Welcome, {user?.user?.username || user?.user?.email || "Officer"}.
          </p>
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-upload"></i> Upload New Image
              </h5>
              <p className="card-text">
                Upload a new suspect image for identification.
              </p>
              <Link to="/upload" className="btn btn-primary mt-auto">
                Upload Image
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-clock-history"></i> Upload History
              </h5>
              <p className="card-text">
                View your previous uploads and match results.
              </p>
              <Link to="/history" className="btn btn-primary mt-auto">
                View History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
