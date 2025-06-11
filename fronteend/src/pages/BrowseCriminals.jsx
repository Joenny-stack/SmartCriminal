import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import bgImage from "../assets/images/criminal-home2.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BrowseCriminals = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCriminals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/api/criminals`, {
          headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {},
        });
        setCriminals(res.data);
      } catch {
        setError("Failed to fetch criminals.");
      } finally {
        setLoading(false);
      }
    };
    fetchCriminals();
  }, [user]);

  const filteredCriminals = criminals.filter((criminal) => {
    const term = search.trim().toLowerCase();
    return (
      !term ||
      criminal.full_name?.toLowerCase().includes(term) ||
      criminal.criminal_id?.toString() === term
    );
  });

  // Helper to resolve image URL
  const getImageUrl = (photo_path) => {
    if (!photo_path) return "";
    // Remove leading ../ or ..\\ if present
    let cleanPath = photo_path.replace(/^\.\.\/?/, "").replace(/^\.\.\\?/, "");
    // Replace backslashes with slashes
    cleanPath = cleanPath.replace(/\\/g, "/");
    // If path starts with uploads/, serve from BASE_URL/uploads/...
    if (cleanPath.startsWith("uploads/")) {
      return `${BASE_URL}/api/${cleanPath}`;
    }
    // Otherwise, serve from BASE_URL/images/...
    return `${BASE_URL}/api/${cleanPath}`;
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
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 16,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
            padding: "2.5rem 2.5rem 2rem 2.5rem",
            minWidth: 320,
            maxWidth: 900,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(2px)",
            marginTop: 48,
          }}
        >
          <span style={{ fontSize: 38, marginBottom: 12 }}>🕵️‍♂️</span>
          <h2
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            Browse Criminals
          </h2>
          <div className="row mb-4 justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <div className="text-light text-center py-5 fs-4">Loading...</div>
          ) : error ? (
            <div className="text-danger text-center py-5 fs-4">{error}</div>
          ) : (
            <div className="row g-4 justify-content-center">
              {filteredCriminals.length === 0 ? (
                <div className="col-12 text-center text-danger fw-bold fs-4">
                  No records found.
                </div>
              ) : (
                filteredCriminals.map((criminal) => (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    key={criminal.criminal_id}
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={getImageUrl(criminal.photo_path)}
                        className="card-img-top"
                        alt={criminal.full_name}
                        style={{ objectFit: "cover", height: "250px" }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title mb-1">
                          {criminal.full_name}
                        </h5>
                        <p className="text-muted mb-2">
                          <strong>Crime Type:</strong> {criminal.crime_type}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          <span className="text-info fw-bold">Active</span>
                        </p>
                        <p className="mb-1">
                          <strong>Location:</strong> {criminal.location}
                        </p>
                        <p className="mb-1">
                          <strong>Arrest Date:</strong> {criminal.arrest_date}
                        </p>
                        {/* Add more details if needed */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCriminals;
