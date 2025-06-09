import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ResultCard from "../components/ResultCard.jsx";

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
      const res = await axios.post(
        "http://localhost:5000/api/match",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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
        "http://localhost:5000/admin/reviews",
        {
          flagged_by: user.user_id,
          reason: "No match found, flagged for admin review.",
          upload_id: result.upload_id, // always present now
          confidence: typeof result.confidence === 'number' ? result.confidence : (result.match_confidence ?? result.criminal?.confidence ?? null),
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
      setError(err.response?.data?.error || "Failed to submit for admin review.");
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
            This person looks like <b>{result.criminal?.full_name || 'N/A'}</b> with <b>{Math.round(result.confidence * 100)}%</b> confidence.<br/>
            <span className="text-muted">
              Crime: {result.criminal?.crime_type || 'N/A'}<br/>
              Location: {result.criminal?.location || 'N/A'}<br/>
              Arrest Date: {result.criminal?.arrest_date || 'N/A'}
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="alert alert-warning mt-4">
          <h4>No Match Found</h4>
          <p>
            The uploaded person does not match anyone in the database.<br/>
            Best confidence: <b>{Math.round(result.confidence * 100)}%</b>
            {result.criminal && (
              <>
                <br/>
                Closest match details:<br/>
                <span className="text-muted">
                  Name: {result.criminal.full_name || 'N/A'}<br/>
                  Crime: {result.criminal.crime_type || 'N/A'}<br/>
                  Location: {result.criminal.location || 'N/A'}<br/>
                  Arrest Date: {result.criminal.arrest_date || 'N/A'}
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
    <div className="container py-5">
      <h2>Upload Suspect Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: 200, margin: 10 }}
          />
        )}
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Uploading..." : "Upload & Match"}
        </button>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
      {renderResult()}
    </div>
  );
};

export default Upload;
