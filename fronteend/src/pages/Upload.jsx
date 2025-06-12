import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ResultCard from "../components/ResultCard.jsx";
import bgImage from "../assets/images/criminal-home2.jpg";
import "../styles/Home.css";
import "../styles/Dashboard.css";
import Swal from "sweetalert2";

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
        `${BASE_URL}/api/admin/reviews/flag`,
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
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Successfully submitted for admin review.",
        confirmButtonColor: "#0a6efd", // Bootstrap warning (yellow/gold)
        background: "linear-gradient(135deg, #162447 0%, #1f4068 100%)",
        color: "#eaf6fb",
        customClass: {
          popup: "rounded-4 shadow-lg border-0",
          title: "fw-bold text-warning",
          confirmButton: "btn btn-warning",
        },
        showClass: {
          popup: "swal2-show animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "swal2-hide animate__animated animate__fadeOutUp",
        },
      });
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
            maxWidth: 420,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(2px)",
          }}
        >
          <span style={{ fontSize: 38, marginBottom: 12 }}>⬆️</span>
          <h2
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            Upload Records
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-100 d-flex flex-column align-items-center"
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
            {error && (
              <div
                className={
                  error === "Successfully submitted for admin review."
                    ? "text-success mt-2 text-center"
                    : "text-danger mt-2 text-center"
                }
              >
                {error}
              </div>
            )}
          </form>
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default Upload;
