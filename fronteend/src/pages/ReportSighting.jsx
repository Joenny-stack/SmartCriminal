import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ReportSighting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Optionally, get criminalId from query params
  const params = new URLSearchParams(location.search);
  const criminalId = params.get("criminalId");

  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    date: "",
    details: "",
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [flagged, setFlagged] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate recognition result
    if (form.image) {
      // Fake recognition result for demo
      const fakeResults = [
        {
          name: "John Doe",
          crime: "Robbery, Burglary",
          location: "New York, NY",
          arrestDate: "2023-11-15",
          confidence: 92,
        },
        {
          name: "Maria Gonzalez",
          crime: "Drug Trafficking",
          location: "Mexico City, Mexico",
          arrestDate: "2024-03-10",
          confidence: 77,
        },
        {
          name: "David Kim",
          crime: "Money Laundering",
          location: "Seoul, South Korea",
          arrestDate: "2022-08-21",
          confidence: 85,
        },
      ];
      // Pick a random result for demo
      const result =
        fakeResults[Math.floor(Math.random() * fakeResults.length)];
      setRecognition(result);
    }
    setSubmitted(true);
    // Only auto-redirect if no recognition result
    if (!form.image) {
      setTimeout(() => {
        navigate("/browse-criminals");
      }, 2000);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="display-6 fw-bold mb-4 text-center">
        Upload Criminal Profile
      </h1>
      {submitted && recognition ? (
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <div className="alert alert-info">
            <h4 className="mb-3">Recognition Result</h4>
            <p>
              <strong>Matched Name:</strong> {recognition.name}
            </p>
            <p>
              <strong>Crime Type:</strong> {recognition.crime}
            </p>
            <p>
              <strong>Location:</strong> {recognition.location}
            </p>
            <p>
              <strong>Arrest Date:</strong> {recognition.arrestDate}
            </p>
            <p>
              <strong>Confidence Score:</strong> {recognition.confidence}%
            </p>
            {!flagged && (
              <button
                className="btn btn-warning mt-2"
                onClick={() => setFlagged(true)}
              >
                Flag as Suspicious or Incorrect
              </button>
            )}
            {flagged && (
              <div className="mt-2 text-danger fw-bold">
                Flagged for admin review.
              </div>
            )}
          </div>
          <button
            className="btn btn-secondary w-100"
            onClick={() => navigate("/browse-criminals")}
          >
            Back to Browse Criminals
          </button>
        </div>
      ) : submitted ? (
        <div className="alert alert-success text-center">
          Thank you for your submission! Authorities have been notified.
          <br />
          Redirecting to Browse Criminals...
        </div>
      ) : (
        <form
          className="mx-auto"
          style={{ maxWidth: 500 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">Your Name (optional)</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Info (optional)</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Email or phone number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sighting Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City, address, or landmark"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Details</label>
            <textarea
              className="form-control"
              name="details"
              value={form.details}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what you saw, appearance, vehicle, etc."
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Image (optional)</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {form.image && (
              <div className="mt-2 text-success">
                Selected: {form.image.name}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Upload Criminal Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ReportSighting;
