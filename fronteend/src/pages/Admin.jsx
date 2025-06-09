import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState("dashboard");
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "officer" });
  const [addMsg, setAddMsg] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    if (tab === "reviews") fetchReviews();
    if (tab === "users") fetchUsers();
    // eslint-disable-next-line
  }, [tab]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/reviews", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReviews(res.data);
    } catch (err) {
      setError("Failed to fetch review queue.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  const handleReviewAction = async (id, action) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/review/${id}`,
        { action },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchReviews();
    } catch (err) {
      setError("Failed to update review.");
    }
  };

  const handleUserStatus = async (id, status) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchUsers();
    } catch (err) {
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
        await axios.put(
          `http://localhost:5000/api/admin/users/${editUserId}`,
          newUser,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setAddMsg("User updated successfully.");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/users",
          newUser,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setAddMsg("User added successfully.");
      }
      setShowUserModal(false);
      setNewUser({ username: "", password: "", role: "officer" });
      fetchUsers();
    } catch (err) {
      setAddMsg(editMode ? "Failed to update user." : "Failed to add user.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Admin Panel</h2>
      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className={`btn btn-${tab === "dashboard" ? "primary" : "secondary"}`} onClick={() => setTab("dashboard")}>Dashboard</button>
        <button className={`btn btn-${tab === "reviews" ? "primary" : "secondary"}`} onClick={() => setTab("reviews")}>Review Queue</button>
        <button className={`btn btn-${tab === "users" ? "primary" : "secondary"}`} onClick={() => setTab("users")}>User Management</button>
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      {tab === "dashboard" && (
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
      )}
      {tab === "reviews" && (
        <div>
          <h4>Flagged Low-Confidence Matches</h4>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Image</th>
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
                        <img src={`http://localhost:5000/${r.image_path.replace(/\\/g, '/')}`} alt="review" style={{ width: 60 }} />
                        <button
                          className="btn btn-link btn-sm ms-2"
                          onClick={() => window.open(`http://localhost:5000/${r.image_path.replace(/\\/g, '/')}`, '_blank')}
                          title="View Full Image"
                          style={{ verticalAlign: 'middle', padding: 0 }}
                        >
                          View
                        </button>
                      </>
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>
                    {r.match_confidence !== undefined && r.match_confidence !== null && r.matched_criminal ? (
                      <span>
                        This person looks like <b>{r.matched_criminal.full_name}</b> with <b>{Math.round(r.match_confidence * 100)}%</b> confidence<br/>
                        <span className="text-muted">
                          Crime: {r.matched_criminal.crime_type || 'N/A'}<br/>
                          Location: {r.matched_criminal.location || 'N/A'}<br/>
                          Arrest Date: {r.matched_criminal.arrest_date || 'N/A'}
                        </span>
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{r.review_status}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleReviewAction(r.review_id, "approve")}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReviewAction(r.review_id, "reject")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "users" && (
        <div>
          <h4>User Management</h4>
          <button className="btn btn-success mb-3" onClick={openAddUserModal}>Add User</button>
          <table className="table table-bordered mt-3">
            <thead>
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
                        className={`btn btn-outline-${u.status === "active" ? "warning" : "success"} btn-sm`}
                        onClick={() => handleUserStatus(u.user_id, u.status === "active" ? "deactivate" : "activate")}
                      >
                        {u.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openEditUserModal(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteUser(u.user_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* User Modal */}
          {showUserModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={handleUserModalSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">{editMode ? "Edit User" : "Add User"}</h5>
                      <button type="button" className="btn-close" onClick={() => setShowUserModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newUser.username}
                          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                          required
                          disabled={editMode}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password {editMode && <span className="text-muted">(leave blank to keep unchanged)</span>}</label>
                        <input
                          type="password"
                          className="form-control"
                          value={newUser.password}
                          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder={editMode ? "Leave blank to keep current password" : ""}
                          minLength={editMode ? 0 : 4}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                          className="form-select"
                          value={newUser.role}
                          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        >
                          <option value="officer">Officer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      {addMsg && <div className="text-info mt-1">{addMsg}</div>}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowUserModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">{editMode ? "Save Changes" : "Add User"}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
