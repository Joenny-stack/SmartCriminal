import React, { useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const defaultTicket = { type: "General", price: "", quantity: "" };

const TicketConfig = ({ eventId, onTicketsCreated }) => {
  const [tickets, setTickets] = useState([{ ...defaultTicket }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTicketChange = (idx, e) => {
    const { name, value } = e.target;
    setTickets((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, [name]: value } : t))
    );
  };

  const addTicket = () => setTickets([...tickets, { ...defaultTicket }]);
  const removeTicket = (idx) => setTickets(tickets.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/tickets`,
        { eventId, tickets },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Tickets configured successfully.");
      setTickets([{ ...defaultTicket }]);
      if (onTicketsCreated) onTicketsCreated(res.data.tickets);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to configure tickets. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="register-card" style={{ maxWidth: 600 }}>
        <h2 className="dashboard-title" style={{ fontSize: "2rem" }}>
          Ticket Configuration
        </h2>
        <form onSubmit={handleSubmit} className="register-form">
          {tickets.map((ticket, idx) => (
            <div
              className="form-group"
              key={idx}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input
                  type="text"
                  name="type"
                  placeholder="Type (e.g. General, VIP)"
                  value={ticket.type}
                  onChange={(e) => handleTicketChange(idx, e)}
                  style={{ flex: 2 }}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(idx, e)}
                  style={{ flex: 1 }}
                  min="0"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketChange(idx, e)}
                  style={{ flex: 1 }}
                  min="1"
                  required
                />
                {tickets.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeTicket(idx)}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary mb-2"
            onClick={addTicket}
          >
            + Add Ticket Type
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Ticket Types"}
          </button>
        </form>
        {message && <p className="register-footer">{message}</p>}
      </div>
    </div>
  );
};

export default TicketConfig;
