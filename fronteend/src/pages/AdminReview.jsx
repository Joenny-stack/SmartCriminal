import React, { useState } from "react";
import "../styles/Dashboard.css";

// Example flagged data
const flaggedMatches = [
  {
    id: 1,
    match: {
      name: "Maria Gonzalez",
      crime: "Drug Trafficking",
      location: "Mexico City, Mexico",
      arrestDate: "2024-03-10",
      confidence: 77,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    flagReason: "Low confidence score (77%)",
    officerId: "OFC-1023",
  },
  {
    id: 2,
    match: {
      name: "John Doe",
      crime: "Robbery, Burglary",
      location: "New York, NY",
      arrestDate: "2023-11-15",
      confidence: 65,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    flagReason: "Suspicious appearance, possible mismatch",
    officerId: "OFC-2045",
  },
];

const AdminReview = () => {
  const [flags, setFlags] = useState(flaggedMatches);
  const [actionMsg, setActionMsg] = useState("");

  const handleAction = (id, action) => {
    setFlags(flags.filter((f) => f.id !== id));
    setActionMsg(
      action === "approve"
        ? "Flag approved as correct match."
        : "Flag rejected as incorrect match."
    );
    setTimeout(() => setActionMsg(""), 2000);
  };

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">Admin Review Page</h1>
      {actionMsg && (
        <div className="alert alert-info text-center">{actionMsg}</div>
      )}
      <div className="row g-4 justify-content-center">
        {flags.length === 0 ? (
          <div className="col-12 text-center text-success fw-bold fs-4">
            No pending flags for review.
          </div>
        ) : (
          flags.map((flag) => (
            <div
              style={{ minHeight: "100dvh" }}
              className="col-12 col-md-8 col-lg-6"
              key={flag.id}
            >
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-2">Original Match Details</h5>
                  <div className="mb-3 text-center">
                    <img
                      src={flag.match.image}
                      alt={flag.match.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #eee",
                      }}
                    />
                  </div>
                  <ul className="mb-2">
                    <li>
                      <strong>Name:</strong> {flag.match.name}
                    </li>
                    <li>
                      <strong>Crime Type:</strong> {flag.match.crime}
                    </li>
                    <li>
                      <strong>Location:</strong> {flag.match.location}
                    </li>
                    <li>
                      <strong>Arrest Date:</strong> {flag.match.arrestDate}
                    </li>
                    <li>
                      <strong>Confidence Score:</strong> {flag.match.confidence}
                      %
                    </li>
                  </ul>
                  <p className="mb-1">
                    <strong>Flag Reason:</strong> {flag.flagReason}
                  </p>
                  <p className="mb-3">
                    <strong>Uploading Officer ID:</strong> {flag.officerId}
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleAction(flag.id, "approve")}
                    >
                      Approve as Match
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAction(flag.id, "reject")}
                    >
                      Reject as Incorrect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReview;
