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
        {/* Title and Info Banner */}
        <div className="container pt-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <div
            className="d-flex flex-column align-items-center mb-4"
            style={{ paddingTop: 10 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
              style={{
                width: 80,
                height: 80,
                background:
                  "linear-gradient(135deg, #0a6efd 60%, #1f4068 100%)",
                boxShadow: "0 4px 16px 0 rgba(10,110,253,0.18)",
              }}
            >
              <i className="bi bi-search text-white fs-1"></i>
            </div>
            <h1
              className="fw-bold mb-1 text-center"
              style={{
                letterSpacing: 1,
                fontSize: "2.2rem",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0 8px 0",
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              }}
            >
              <span style={{ fontSize: "2rem", marginRight: 8 }}>
                <i
                  className="bi bi-person-lines-fill"
                  style={{ color: "#ffc107" }}
                ></i>
              </span>
              Browse Criminals
            </h1>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: 0.5,
                marginTop: 2,
                marginBottom: 2,
                textAlign: "center",
                textShadow: "0 2px 8px #0a6efd88, 0 1px 0 #2228",
                background:
                  "linear-gradient(90deg, #0a6efd33 0%, #1abc9c33 100%)",
                borderRadius: 8,
                padding: "0.5rem 1.2rem",
                display: "inline-block",
                boxShadow: "0 2px 8px 0 rgba(10,110,253,0.10)",
              }}
              className="lead mb-4"
            >
              Search and explore the criminal database below.
            </div>
          </div>
          {/* Card Container */}
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
            <span style={{ fontSize: 38, marginBottom: 12 }}>🕵️‍♂️</span>
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 26,
                marginBottom: 18,
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
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
                  style={{
                    borderRadius: 10,
                    border: "2px solid #0a6efd33",
                    background: "rgba(255,255,255,0.85)",
                    fontSize: 18,
                    boxShadow: "0 2px 8px #0a6efd11",
                  }}
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
                      <div className="card h-100 shadow-lg border-0 bg-white bg-opacity-75">
                        {criminal.photo_path && (
                          <img
                            src={getImageUrl(criminal.photo_path)}
                            className="card-img-top"
                            alt={criminal.full_name}
                            style={{
                              objectFit: "cover",
                              height: "250px",
                              borderTopLeftRadius: 14,
                              borderTopRightRadius: 14,
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div className="card-body d-flex flex-column">
                          <h5
                            className="card-title mb-1 text-primary fw-bold"
                            style={{ fontSize: 22 }}
                          >
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
    </div>
  );
};

export default BrowseCriminals;
