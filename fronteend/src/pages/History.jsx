import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import HistoryTable from "../components/HistoryTable.jsx";
import bgImage from "../assets/images/criminal-home2.jpg";
import "../styles/Home.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const History = () => {
  const { user } = useContext(AuthContext);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/uploads`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // console.log(res.data);
        setUploads(res.data);
      } catch {
        setError("Failed to fetch upload history.");
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [user]);

  // Calculate paginated uploads
  const totalPages = Math.ceil(uploads.length / itemsPerPage);
  const paginatedUploads = uploads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100dvh",
        position: "relative",
        top: "5rem",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background image and overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: `url(${bgImage}) center center/cover no-repeat`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(10, 30, 60, 0.55)",
          zIndex: 1,
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
              <i className="bi bi-clock-history text-white fs-1"></i>
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
                  className="bi bi-clock-history"
                  style={{ color: "#ffc107" }}
                ></i>
              </span>
              Upload History
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
              View your previous uploads and match results below.
            </div>
          </div>
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
            <span style={{ fontSize: 38, marginBottom: 12 }}>🕓</span>
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 26,
                marginBottom: 18,
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              }}
            >
              History
            </h2>
            <div className="flex-grow-1" style={{ width: "100%" }}>
              {loading ? (
                <div className="text-light text-center py-5 fs-4">
                  Loading...
                </div>
              ) : error ? (
                <div className="text-danger text-center py-5 fs-4">{error}</div>
              ) : (
                <>
                  <HistoryTable uploads={paginatedUploads} loading={loading} />
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                      <button
                        className="btn btn-pagination px-3"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                          borderRadius: 8,
                          background: currentPage === 1 ? "#e9ecef" : "#0a6efd",
                          color: currentPage === 1 ? "#b0b8c9" : "#fff",
                          border: "none",
                          fontWeight: 700,
                          boxShadow: "0 2px 8px #0a6efd22",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        &laquo; Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className="btn btn-pagination px-3"
                            onClick={() => handlePageChange(page)}
                            style={{
                              borderRadius: 8,
                              background:
                                page === currentPage ? "#ffc107" : "#fff",
                              color: page === currentPage ? "#222" : "#0a6efd",
                              border:
                                page === currentPage
                                  ? "2px solid #ffc107"
                                  : "2px solid #0a6efd",
                              fontWeight: 700,
                              boxShadow:
                                page === currentPage
                                  ? "0 2px 8px #ffc10744"
                                  : "0 2px 8px #0a6efd22",
                              transition:
                                "background 0.2s, color 0.2s, border 0.2s",
                            }}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        className="btn btn-pagination px-3"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                          borderRadius: 8,
                          background:
                            currentPage === totalPages ? "#e9ecef" : "#0a6efd",
                          color:
                            currentPage === totalPages ? "#b0b8c9" : "#fff",
                          border: "none",
                          fontWeight: 700,
                          boxShadow: "0 2px 8px #0a6efd22",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        Next &raquo;
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
