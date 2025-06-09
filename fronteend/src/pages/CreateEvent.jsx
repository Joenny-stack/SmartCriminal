import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Register.css"; // Reuse the same CSS for consistent styling
import TicketConfig from "./TicketConfig";

const initialState = {
  title: "",
  category: "",
  description: "",
  attendance_reason: "",
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  address: "",
  country: "",
  state: "",
  city: "",
  location: "",
  type: "online",
  capacity: "",
  visibility: true,
  image: null,
};

const CreateEvent = () => {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [createdEventId, setCreatedEventId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend
    axios.get("http://localhost:5000/api/auth/categories").then((res) => {
      setCategories(res.data.categories || []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/events",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response: ", response);
      setMessage(response.data.message || "Event created successfully.");
      setCreatedEventId(response.data.event?.id);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create event. Please try again."
      );
    }
  };

  return (
    <div className="register-container container">
      <div className="register-card other-pages">
        <h2 className="register-title">Create Event</h2>
        <form
          onSubmit={handleSubmit}
          className="register-form"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              placeholder="Describe the event"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="attendance_reason">Reason for Attendance</label>
            <input
              type="text"
              id="attendance_reason"
              name="attendance_reason"
              placeholder="Why should people attend?"
              value={formData.attendance_reason}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Event address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="online">Online</option>
              <option value="physical">Physical</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Enter event capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Event Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="visibility">
              <input
                type="checkbox"
                id="visibility"
                name="visibility"
                checked={formData.visibility}
                onChange={handleChange}
              />
              Visible to public
            </label>
          </div>
          <button type="submit" className="register-button">
            Create Event
          </button>
        </form>
        {message && <p className="register-footer">{message}</p>}
        {createdEventId && <TicketConfig eventId={createdEventId} />}
      </div>
    </div>
  );
};

export default CreateEvent;
