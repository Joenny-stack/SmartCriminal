import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  return (
    <div
      className="dashboard-container container"
      style={{ paddingTop: 0, marginTop: 0 }}
    >
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold mb-3">Admin Dashboard</h1>
          <p className="lead text-secondary">
            Manage events, users, analytics, and more from your admin panel.
          </p>
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-calendar-plus"></i> Create Event
              </h5>
              <p className="card-text">
                Add new events for users to register and attend.
              </p>
              <Link to="/create-event" className="btn btn-primary mt-auto">
                Create Event
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-people"></i> Manage Users
              </h5>
              <p className="card-text">
                View, edit, or remove users from the platform.
              </p>
              <Link
                to="/admin/manage-users"
                className="btn btn-primary mt-auto"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-bar-chart-line"></i> View Analytics
              </h5>
              <p className="card-text">
                See event stats, ticket sales, and user activity.
              </p>
              <Link
                to="/admin/view-analytics"
                className="btn btn-primary mt-auto"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-x-octagon"></i> Event Cancellation
              </h5>
              <p className="card-text">
                Cancel events and manage refunds for attendees.
              </p>
              <Link
                to="/admin/event-cancellation"
                className="btn btn-primary mt-auto"
              >
                Event Cancellation
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-tags"></i> Create Category
              </h5>
              <p className="card-text">
                Add new event categories for better event organization.
              </p>
              <Link
                to="/admin/create-category"
                className="btn btn-primary mt-auto"
              >
                Create Category
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">
                <i className="bi bi-flag"></i> Review Pending Flags
              </h5>
              <p className="card-text">
                Review and resolve flagged criminal profile matches submitted by
                officers.
              </p>
              <Link
                to="/admin/review-flags"
                className="btn btn-warning mt-auto"
              >
                Go to Review Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
