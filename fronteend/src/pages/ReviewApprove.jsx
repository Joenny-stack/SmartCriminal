import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReviewApprove = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const [criminals, setCriminals] = useState([]);
  const [filteredCriminals, setFilteredCriminals] = useState([]);
  const [selectedCriminal, setSelectedCriminal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [uploadImage, setUploadImage] = useState(null);

  // Fetch criminals and upload image
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${BASE_URL}/api/admin/criminals`, { credentials: "include" })
        .then((res) => res.json()),
      fetch(`${BASE_URL}/api/uploads`, { credentials: "include" })
        .then((res) => res.json()),
    ])
      .then(([criminalsData, uploadsData]) => {
        setCriminals(criminalsData);
        setFilteredCriminals(criminalsData);
        // Find the upload image for this review
        const upload = uploadsData.find((u) => String(u.upload_id) === String(uploadId));
        setUploadImage(upload ? upload.image_path : null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [uploadId, BASE_URL]);

  // Search filter
  useEffect(() => {
    if (!search) {
      setFilteredCriminals(criminals);
    } else {
      const s = search.toLowerCase();
      setFilteredCriminals(
        criminals.filter(
          (c) =>
            c.full_name.toLowerCase().includes(s) ||
            c.crime_type.toLowerCase().includes(s) ||
            c.location.toLowerCase().includes(s)
        )
      );
    }
  }, [search, criminals]);

  const handleApprove = async () => {
    if (!selectedCriminal) {
      setError("Please select a criminal to match.");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${BASE_URL}/api/admin/upload/${uploadId}/set_match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ criminal_id: selectedCriminal }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Upload matched successfully!",
          showConfirmButton: true,
          timer: 1500,
        }).then(() => navigate("/admin?tab=reviews"));
        setTimeout(() => navigate("/admin?tab=reviews"), 1600);
      } else {
        setError(data.error || "Failed to match upload.");
      }
    } catch (e) {
      setError("Failed to match upload.");
    }
  };

  if (loading) return <div>Loading criminals...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary fw-bold">Approve & Match Upload</h3>
      <div className="row mb-4 align-items-center">
        <div className="col-md-5 d-flex flex-column align-items-center">
          <div className="card shadow-lg p-3 mb-3 bg-white rounded" style={{ width: 260 }}>
            <div className="text-center fw-semibold mb-2">Image Under Review</div>
            {uploadImage ? (
              <img
                src={`${BASE_URL}/api/${uploadImage.replace(/\\/g, "/")}`}
                alt="Upload"
                style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 12, border: "2px solid #1976d2" }}
              />
            ) : (
              <div className="text-muted">No image found</div>
            )}
          </div>
        </div>
        <div className="col-md-7">
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by name, crime type, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ borderRadius: 10, border: "1.5px solid #1976d2" }}
            />
          </div>
          <div className="row g-3" style={{ maxHeight: 400, overflowY: "auto" }}>
            {filteredCriminals.length === 0 && (
              <div className="text-muted ms-3">No criminals found.</div>
            )}
            {filteredCriminals.map((c) => (
              <div className="col-12 col-md-6 col-lg-4" key={c.criminal_id}>
                <div
                  className={`card h-100 shadow-sm border-2 ${selectedCriminal === c.criminal_id ? "border-primary" : "border-light"}`}
                  style={{ cursor: "pointer", borderWidth: 2, transition: "border 0.2s" }}
                  onClick={() => setSelectedCriminal(c.criminal_id)}
                >
                  <img
                    src={c.photo_path ? `${BASE_URL}/api/${c.photo_path.replace(/\\/g, "/")}` : "https://via.placeholder.com/180x180?text=No+Photo"}
                    alt={c.full_name}
                    className="card-img-top"
                    style={{ height: 140, objectFit: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  />
                  <div className="card-body p-2">
                    <h5 className="card-title mb-1" style={{ fontWeight: 700, color: "#1976d2" }}>{c.full_name}</h5>
                    <div className="mb-1" style={{ fontSize: 15 }}><b>Crime:</b> {c.crime_type}</div>
                    <div className="mb-1" style={{ fontSize: 15 }}><b>Location:</b> {c.location}</div>
                    <div className="mb-1" style={{ fontSize: 15 }}><b>Arrested:</b> {c.arrest_date?.slice(0, 10)}</div>
                  </div>
                  {selectedCriminal === c.criminal_id && (
                    <div className="card-footer bg-primary text-white text-center fw-bold" style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                      Selected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success btn-lg px-5 py-2 shadow"
          onClick={handleApprove}
          disabled={!selectedCriminal}
          style={{ fontSize: 20, borderRadius: 10 }}
        >
          Approve & Match
        </button>
      </div>
      {success && <div className="alert alert-success mt-3 text-center">{success}</div>}
    </div>
  );
};

export default ReviewApprove;
