import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import HistoryTable from "../components/HistoryTable.jsx";

const History = () => {
  const { user } = useContext(AuthContext);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("http://10.40.17.125:5000/api/uploads", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUploads(res.data);
      } catch (err) {
        setError("Failed to fetch upload history.");
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [user]);

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
            style={{ width: 70, height: 70, background: "#1976d2" }}
          >
            <i className="bi bi-clock-history text-white fs-2"></i>
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
                className="bi bi-clock-history"
                style={{ color: "#0a6efd" }}
              ></i>
            </span>
            Upload History
          </h1>
          <div
            className="mb-1"
            style={{ fontSize: "1.5rem", color: "#444", fontWeight: 500 }}
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
            View your previous uploads and match results below.
          </div>
        </div>
        <div className="flex-grow-1">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <HistoryTable uploads={uploads} />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
