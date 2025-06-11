import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import bgImage from "/src/assets/images/criminal-home2.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState("dashboard");
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "officer",
  });
  const [addMsg, setAddMsg] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showAddCriminalModal, setShowAddCriminalModal] = useState(false);
  const [addCriminalData, setAddCriminalData] = useState({
    full_name: "",
    crime_type: "",
    location: "",
    arrest_date: "",
    photo_path: "",
  });

  useEffect(() => {
    if (tab === "dashboard") {
      setLoadingDashboard(true);
      // Simulate fetch for dashboard tab (replace with real fetch if needed)
      setTimeout(() => setLoadingDashboard(false), 1000);
    }
    if (tab === "reviews") fetchReviews();
    if (tab === "users") fetchUsers();
    // eslint-disable-next-line
  }, [tab]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/reviews`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Fetched reviews:", res.data); // Debugging line
      setReviews(res.data);
    } catch {
      setError("Failed to fetch review queue.");
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleReviewAction = async (id, action) => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/review/${id}`,
        { action },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchReviews();
    } catch {
      setError("Failed to update review.");
    }
  };

  const handleUserStatus = async (id, status) => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/users/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchUsers();
    } catch {
      setError("Failed to update user status.");
    }
  };

  const openAddUserModal = () => {
    setEditMode(false);
    setNewUser({ username: "", password: "", role: "officer" });
    setShowUserModal(true);
    setAddMsg("");
  };

  const openEditUserModal = (user) => {
    setEditMode(true);
    setEditUserId(user.user_id);
    setNewUser({ username: user.username, password: "", role: user.role });
    setShowUserModal(true);
    setAddMsg("");
  };

  const handleUserModalSubmit = async (e) => {
    e.preventDefault();
    setAddMsg("");
    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/api/admin/users/${editUserId}`, newUser, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAddMsg("User updated successfully.");
      } else {
        await axios.post(`${BASE_URL}/api/admin/users`, newUser, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAddMsg("User added successfully.");
      }
      setShowUserModal(false);
      setNewUser({ username: "", password: "", role: "officer" });
      fetchUsers();
    } catch {
      setAddMsg(editMode ? "Failed to update user." : "Failed to add user.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUsers();
    } catch {
      setError("Failed to delete user.");
    }
  };

  // Show modal to add criminal on reject
  const handleRejectWithCriminal = (review) => {
    console.log("Reject button clicked for review:", review);
    setAddCriminalData({
      full_name: "",
      crime_type: "",
      location: "",
      arrest_date: "",
      photo_path: review.image_path || "",
    });
    setShowAddCriminalModal(true);
  };

  // Submit new criminal
  const handleAddCriminalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/criminals`,
        addCriminalData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Add criminal response:", response.data);
      if (response.status === 200 || response.status === 201) {
        console.log("Criminal saved successfully.");
      } else {
        console.log(
          "Criminal save request completed, but not successful:",
          response.status
        );
      }
      setShowAddCriminalModal(false);
      setAddCriminalData({
        full_name: "",
        crime_type: "",
        location: "",
        arrest_date: "",
        photo_path: "",
      });
      fetchReviews();
    } catch (err) {
      setError("Failed to add new criminal.");
      console.log("Error saving criminal:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100dvh",
        position: "relative",
        overflow: "auto",
        background: `url(${bgImage}) center center/cover no-repeat`,
      }}
    >
      {/* Overlay for contrast */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(10, 30, 60, 0.55)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2vw",
        }}
      >
        {/* Admin Panel Title Section */}
        <div className="container pt-5 flex-grow-1 d-flex flex-column">
          <div
            className="d-flex flex-column align-items-center mb-4"
            style={{ paddingTop: 10 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
              style={{
                width: 70,
                height: 70,
                background: "#1976d2",
              }}
            >
              <i className="bi bi-shield-lock text-white fs-2"></i>
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
                {/* Optionally, you can use an SVG or icon here for a more modern look */}
                <i
                  className="bi bi-person-badge"
                  style={{ color: "#0a6efd" }}
                ></i>
              </span>
              Admin Dashboard
            </h1>
            <div
              className="mb-1"
              style={{ fontSize: "1.5rem", color: "#444", fontWeight: 500 }}
            >
              Welcome,{" "}
              <span style={{ fontWeight: 700, color: "#0a6efd" }}>Admin</span>.
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
          {/* Tab Buttons */}
          <div className="mb-4 d-flex flex-wrap gap-3 align-items-center justify-content-start">
            <button
              className={
                "btn fw-semibold px-4 py-2 shadow-sm admin-tab-btn " +
                (tab === "dashboard" ? "active" : "")
              }
              onClick={() => setTab("dashboard")}
              type="button"
            >
              Dashboard
            </button>
            <button
              className={
                "btn fw-semibold px-4 py-2 shadow-sm admin-tab-btn " +
                (tab === "reviews" ? "active" : "")
              }
              onClick={() => setTab("reviews")}
              type="button"
            >
              Review Queue
            </button>
            <button
              className={
                "btn fw-semibold px-4 py-2 shadow-sm admin-tab-btn " +
                (tab === "users" ? "active" : "")
              }
              onClick={() => setTab("users")}
              type="button"
            >
              User Management
            </button>
          </div>
          {error && <div className="alert alert-danger mb-2">{error}</div>}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 16,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              padding: "2.5rem 2.5rem 2rem 2.5rem",
              minWidth: 320,
              maxWidth: 1100,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(2px)",
              marginTop: 48,
            }}
          >
            <span style={{ fontSize: 38, marginBottom: 12 }}>🛡️</span>
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 28,
                marginBottom: 18,
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              }}
            >
              Admin Panel
            </h2>
            {/* Place your admin panel tabs, tables, and controls here, styled as cards or tables similar to Dashboard/HistoryTable */}
            <div style={{ width: "100%", marginTop: 24 }}>
              {/* Example: Wrap each admin section in a card-like div for consistency */}
              <div
                style={{
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: 14,
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
                  padding: "1.5rem 1.5rem 1rem 1.5rem",
                  marginBottom: 32,
                  border: "1px solid rgba(255,255,255,0.10)",
                  overflowX: "auto",
                }}
              >
                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                  {tab === "dashboard" &&
                    (loadingDashboard ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: 200 }}
                      >
                        <BounceLoader
                          color="#0a6efd"
                          loading={true}
                          size={60}
                        />
                      </div>
                    ) : (
                      <div className="row g-4 justify-content-start">
                        <div className="col-12 col-md-6 col-lg-4">
                          <div className="card h-100 shadow-lg border-0 bg-white bg-opacity-75">
                            <div className="card-body d-flex flex-column justify-content-between">
                              <h5 className="card-title text-primary">
                                <i className="bi bi-upload me-2"></i>Upload New
                                Image
                              </h5>
                              <p className="card-text">
                                Upload a new suspect image for identification.
                              </p>
                              <Link
                                to="/upload"
                                className="btn btn-primary mt-auto"
                              >
                                Upload Image
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <div className="card h-100 shadow-lg border-0 bg-white bg-opacity-75">
                            <div className="card-body d-flex flex-column justify-content-between">
                              <h5 className="card-title text-primary">
                                <i className="bi bi-clock-history me-2"></i>
                                Upload History
                              </h5>
                              <p className="card-text">
                                View your previous uploads and match results.
                              </p>
                              <Link
                                to="/history"
                                className="btn btn-primary mt-auto"
                              >
                                View History
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {tab === "reviews" &&
                    (loadingReviews ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: 200 }}
                      >
                        <BounceLoader
                          color="#0a6efd"
                          loading={true}
                          size={60}
                        />
                      </div>
                    ) : (
                      <div className="bg-white bg-opacity-75 rounded-4 p-4 shadow-lg">
                        <h4 className="mb-4 text-primary">
                          <i className="bi bi-flag me-2"></i>Flagged
                          Low-Confidence Matches
                        </h4>
                        <div className="table-responsive">
                          <table className="table table-bordered align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>Image</th>
                                <th>Officer</th>
                                <th>Confidence</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviews.map((r) => (
                                <tr key={r.review_id}>
                                  <td>
                                    {r.image_path ? (
                                      <>
                                        <img
                                          src={`${BASE_URL}/api/${r.image_path.replace(
                                            /\\/g,
                                            "/"
                                          )}`}
                                          alt="review"
                                          style={{
                                            width: 60,
                                            borderRadius: 8,
                                            boxShadow: "0 2px 8px #0001",
                                          }}
                                        />
                                        <button
                                          className="btn btn-link btn-sm ms-2"
                                          onClick={() =>
                                            window.open(
                                              `${BASE_URL}/api/${r.image_path.replace(
                                                /\\/g,
                                                "/"
                                              )}`,
                                              "_blank"
                                            )
                                          }
                                          title="View Full Image"
                                          style={{
                                            verticalAlign: "middle",
                                            padding: 0,
                                          }}
                                        >
                                          View
                                        </button>
                                      </>
                                    ) : (
                                      <span>No image</span>
                                    )}
                                  </td>
                                  <td>{r.flagger_username || r.flagged_by || 'N/A'}</td>
                                  <td>
                                    {r.match_confidence !== undefined &&
                                    r.match_confidence !== null ? (
                                      r.matched_criminal ? (
                                        <span>
                                          This person looks like{" "}
                                          <b>{r.matched_criminal.full_name}</b>{" "}
                                          with{" "}
                                          <b>
                                            {Math.round(
                                              r.match_confidence * 100
                                            )}
                                            %
                                          </b>{" "}
                                          confidence
                                          <br />
                                          <span className="text-muted">
                                            Crime:{" "}
                                            {r.matched_criminal.crime_type ||
                                              "N/A"}
                                            <br />
                                            Location:{" "}
                                            {r.matched_criminal.location ||
                                              "N/A"}
                                            <br />
                                            Arrest Date:{" "}
                                            {r.matched_criminal.arrest_date ||
                                              "N/A"}
                                          </span>
                                        </span>
                                      ) : (
                                        <span>
                                          No direct match.
                                          <br />
                                          <b>Confidence:</b>{" "}
                                          {Math.round(r.match_confidence * 100)}
                                          %
                                        </span>
                                      )
                                    ) : (
                                      "N/A"
                                    )}
                                  </td>
                                  <td>{r.review_status}</td>
                                  <td>
                                    <button
                                      className="btn btn-success btn-sm me-2"
                                      onClick={() =>
                                        handleReviewAction(
                                          r.review_id,
                                          "approve"
                                        )
                                      }
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleRejectWithCriminal(r)
                                      }
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  {tab === "users" &&
                    (loadingUsers ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: 200 }}
                      >
                        <BounceLoader
                          color="#0a6efd"
                          loading={true}
                          size={60}
                        />
                      </div>
                    ) : (
                      <div className="bg-white bg-opacity-75 rounded-4 p-4 shadow-lg">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="mb-0 text-primary">
                            <i className="bi bi-people me-2"></i>User Management
                          </h4>
                          <button
                            className="btn btn-success"
                            onClick={openAddUserModal}
                          >
                            <i className="bi bi-plus-lg me-1"></i>Add User
                          </button>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-bordered align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((u) => (
                                <tr key={u.user_id}>
                                  <td>{u.username}</td>
                                  <td>{u.role}</td>
                                  <td>{u.status}</td>
                                  <td>
                                    <div className="d-flex gap-2">
                                      <button
                                        className={
                                          "btn btn-outline-" +
                                          (u.status === "active"
                                            ? "warning"
                                            : "success") +
                                          " btn-sm"
                                        }
                                        onClick={() =>
                                          handleUserStatus(
                                            u.user_id,
                                            u.status === "active"
                                              ? "deactivate"
                                              : "activate"
                                          )
                                        }
                                      >
                                        {u.status === "active"
                                          ? "Deactivate"
                                          : "Activate"}
                                      </button>
                                      <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => openEditUserModal(u)}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                          handleDeleteUser(u.user_id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* Overlay for Add/Edit User Panel */}
                        {showUserModal && (
                          <div
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center admin-user-panel-overlay"
                            style={{
                              zIndex: 1050,
                              background: "rgba(0,0,0,0.6)",
                            }}
                          >
                            <div
                              className="card p-4 shadow-lg admin-user-panel-card"
                              style={{
                                minWidth: 350,
                                maxWidth: 400,
                                background:
                                  "linear-gradient(135deg, #fff 80%, #e3eaff 100%)",
                              }}
                            >
                              <form onSubmit={handleUserModalSubmit}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h5 className="mb-0">
                                    {editMode ? "Edit User" : "Add User"}
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUserModal(false)}
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Username</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={newUser.username}
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        username: e.target.value,
                                      })
                                    }
                                    required
                                    disabled={editMode}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">
                                    Password{" "}
                                    {editMode && (
                                      <span className="text-muted">
                                        (leave blank to keep unchanged)
                                      </span>
                                    )}
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    value={newUser.password}
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                      })
                                    }
                                    placeholder={
                                      editMode
                                        ? "Leave blank to keep current password"
                                        : ""
                                    }
                                    minLength={editMode ? 0 : 4}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Role</label>
                                  <select
                                    className="form-select"
                                    value={newUser.role}
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        role: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="officer">Officer</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                </div>
                                {addMsg && (
                                  <div className="text-info mt-1">{addMsg}</div>
                                )}
                                <div className="d-flex justify-content-end gap-2 mt-3">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowUserModal(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    {editMode ? "Save Changes" : "Add User"}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Criminal Modal - always rendered at the root of Admin page */}
        {showAddCriminalModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 2000, background: "rgba(0,0,0,0.5)" }}
          >
            <div
              className="card p-4 shadow-lg"
              style={{ minWidth: 350, maxWidth: 400 }}
            >
              <form onSubmit={handleAddCriminalSubmit}>
                <h5 className="mb-3">Add New Criminal</h5>
                <div className="mb-2">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addCriminalData.full_name}
                    onChange={(e) =>
                      setAddCriminalData({
                        ...addCriminalData,
                        full_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Crime Type</label>
                  <select
                    className="form-select"
                    value={addCriminalData.crime_type}
                    onChange={(e) =>
                      setAddCriminalData({
                        ...addCriminalData,
                        crime_type: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a crime type</option>
                    <option value="Burglary">
                      Burglary – Unauthorized entry into a property with intent
                      to commit a crime.
                    </option>
                    <option value="Fraud">
                      Fraud – Deception used to gain financial or personal
                      benefits.
                    </option>
                    <option value="Cyberbullying">
                      Cyberbullying – Harassment or intimidation of individuals
                      online.
                    </option>
                    <option value="Money Laundering">
                      Money Laundering – Concealing illegally obtained money to
                      make it appear legitimate.
                    </option>
                    <option value="Identity Theft">
                      Identity Theft – Using someone else’s personal information
                      for financial gain.
                    </option>
                    <option value="Drug Trafficking">
                      Drug Trafficking – The distribution and sale of illegal
                      substances.
                    </option>
                    <option value="Sexual Assault">
                      Sexual Assault – Any non-consensual sexual act.
                    </option>
                    <option value="Vandalism">
                      Vandalism – Deliberate destruction or damage to property.
                    </option>
                    <option value="Racketeering">
                      Racketeering – Engaging in fraudulent business operations
                      or organized crime schemes.
                    </option>
                    <option value="Arson">
                      Arson – Intentionally setting fire to property.
                    </option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addCriminalData.location}
                    onChange={(e) =>
                      setAddCriminalData({
                        ...addCriminalData,
                        location: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Arrest Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={addCriminalData.arrest_date}
                    onChange={(e) =>
                      setAddCriminalData({
                        ...addCriminalData,
                        arrest_date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Photo Path</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addCriminalData.photo_path}
                    onChange={(e) =>
                      setAddCriminalData({
                        ...addCriminalData,
                        photo_path: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAddCriminalModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
