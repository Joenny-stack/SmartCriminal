import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import HistoryTable from "../components/HistoryTable.jsx";

const History = () => {
  const { user } = useContext(AuthContext);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/uploads", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUploads(res.data);
      } catch (err) {
        setError("Failed to fetch upload history.");
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [user]);

  return (
    <div className="container py-5">
      <h2>Upload History</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <HistoryTable uploads={uploads} />
      )}
    </div>
  );
};

export default History;
