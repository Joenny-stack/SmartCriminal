import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/events");
        setEvents(res.data.events || []);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-5">Loading events...</div>;
  if (error) return <div className="text-danger py-5">{error}</div>;

  return (
    <div className="dashboard-container container py-5">
      <h1 className="display-6 fw-bold mb-4 text-center">Browse Events</h1>
      <div className="row g-4">
        {events.length === 0 && (
          <div className="col-12 text-center">No events found.</div>
        )}
        {events.map((event) => (
          <div className="col-12 col-md-6 col-lg-4" key={event.id}>
            <div className="card" style={{ width: "18rem", minHeight: 420 }}>
              {event.image && (
                <img
                  className="card-img-top"
                  src={
                    event.image.startsWith("http")
                      ? event.image
                      : `/uploads/${event.image}`
                  }
                  alt={event.title}
                  style={{ objectFit: "cover", height: 180 }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                  {event.description?.slice(0, 80)}
                  {event.description && event.description.length > 80
                    ? "..."
                    : ""}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Category:</strong> {event.category || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong> {event.location}
                </li>
                <li className="list-group-item">
                  <strong>Start:</strong>{" "}
                  {event.start_date
                    ? new Date(event.start_date).toLocaleDateString()
                    : "-"}
                </li>
                <li className="list-group-item">
                  <strong>Type:</strong> {event.type}
                </li>
              </ul>
              <div className="card-body">
                {/* Replace # with event detail or registration link if needed */}
                <a href="#" className="card-link">
                  View Details
                </a>
                {/* <a href="#" className="card-link">Register</a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseEvents;
