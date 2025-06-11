import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ResultCard from "../components/ResultCard.jsx";
import "../styles/Dashboard.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Upload = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post(`${BASE_URL}/api/match`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlagForReview = async () => {
    setError("");
    setLoading(true);
    if (!result?.upload_id) {
      setError("Upload ID missing. Please re-upload the image and try again.");
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/admin/reviews`,
        {
          flagged_by: user.user_id,
          reason: "No match found, flagged for admin review.",
          upload_id: result.upload_id, // always present now
          confidence:
            typeof result.confidence === "number"
              ? result.confidence
              : result.match_confidence ?? result.criminal?.confidence ?? null,
          status: result?.status || "flagged",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setError("Successfully submitted for admin review.");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to submit for admin review."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to render result in a user-friendly way
  const renderResult = () => {
    if (!result) return null;
    if (result.match) {
      return (
        <div className="alert alert-success mt-4">
          <h4>Match Found!</h4>
          <p>
            This person looks like <b>{result.criminal?.full_name || "N/A"}</b>{" "}
            with <b>{Math.round(result.confidence * 100)}%</b> confidence.
            <br />
            <span className="text-muted">
              Crime: {result.criminal?.crime_type || "N/A"}
              <br />
              Location: {result.criminal?.location || "N/A"}
              <br />
              Arrest Date: {result.criminal?.arrest_date || "N/A"}
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="alert alert-warning mt-4">
          <h4>No Match Found</h4>
          <p>
            The uploaded person does not match anyone in the database.
            <br />
            Best confidence: <b>{Math.round(result.confidence * 100)}%</b>
            {result.criminal && (
              <>
                <br />
                Closest match details:
                <br />
                <span className="text-muted">
                  Name: {result.criminal.full_name || "N/A"}
                  <br />
                  Crime: {result.criminal.crime_type || "N/A"}
                  <br />
                  Location: {result.criminal.location || "N/A"}
                  <br />
                  Arrest Date: {result.criminal.arrest_date || "N/A"}
                </span>
              </>
            )}
          </p>
          <button
            className="btn btn-outline-danger mt-2"
            onClick={handleFlagForReview}
            disabled={loading || !result.upload_id}
          >
            {loading ? "Submitting..." : "Submit to Admin for Review"}
          </button>
        </div>
      );
    }
  };

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
            <i className="bi bi-upload text-white fs-2"></i>
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
              <i className="bi bi-upload" style={{ color: "#0a6efd" }}></i>
            </span>
            Upload Suspect Image
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
            Upload a suspect's image to check for a match in the criminal
            database.
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="card p-4 shadow-lg border-0 dashboard-card-gradient mb-4"
        >
          <div className="d-flex flex-column align-items-center mb-3">
            <span className="dashboard-icon-circle bg-primary bg-gradient text-white mb-2">
              <i className="bi bi-image fs-2" />
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control form-control-lg mt-2"
              style={{ maxWidth: 350 }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail mt-3"
                style={{
                  maxWidth: 200,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(60,72,88,0.10)",
                }}
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-100 mt-2"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <i className="bi bi-upload me-1" /> Upload & Match
              </>
            )}
          </button>
          {error && <div className="text-danger mt-2 text-center">{error}</div>}
        </form>
        {renderResult()}
      </div>
    </div>
  );
};

export default Upload;
