import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import HistoryTable from "../components/HistoryTable.jsx";
import bgImage from "../assets/images/criminal-home2.jpg";
import "../styles/Home.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const History = () => {
  const { user } = useContext(AuthContext);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/uploads`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // console.log(res.data);
        setUploads(res.data);
      } catch {
        setError("Failed to fetch upload history.");
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100dvh",
        position: "relative",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: `url(${bgImage}) center center/cover no-repeat`,
          zIndex: 0,
          filter: "brightness(0.55) blur(0px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(10, 30, 60, 0.55)",
          zIndex: 1,
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
            maxWidth: 900,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(2px)",
            marginTop: 48,
          }}
        >
          <span style={{ fontSize: 38, marginBottom: 12 }}>🕓</span>
          <h2
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            History
          </h2>
          <div className="flex-grow-1">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              <HistoryTable uploads={uploads} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
