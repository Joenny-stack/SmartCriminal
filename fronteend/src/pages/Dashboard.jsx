import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/criminal-home2.jpg";
import "../styles/Home.css";

const Dashboard = () => {
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
        <h2
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 24,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}
        >
          Welcome to your Dashboard!
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            maxWidth: 1000,
            marginBottom: 32,
          }}
        >
          {/* Upload Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 16,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              padding: "2rem 2.5rem 1.5rem 2.5rem",
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(2px)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
          >
            <span style={{ fontSize: 38, marginBottom: 12 }}>⬆️</span>
            <h3
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 10,
              }}
            >
              Upload
            </h3>
            <p
              style={{
                color: "#e3eaff",
                fontSize: 16,
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              Upload new criminal records or evidence securely.
            </p>
            <Link
              to="/upload"
              style={{
                background: "#0a6efd",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                padding: "0.7rem 2rem",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
                letterSpacing: 1,
                marginTop: "auto",
                transition: "background 0.2s",
              }}
            >
              Go to Upload
            </Link>
          </div>
          {/* History Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 16,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              padding: "2rem 2.5rem 1.5rem 2.5rem",
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(2px)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
          >
            <span style={{ fontSize: 38, marginBottom: 12 }}>🕓</span>
            <h3
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 10,
              }}
            >
              History
            </h3>
            <p
              style={{
                color: "#e3eaff",
                fontSize: 16,
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              Review your search and upload history.
            </p>
            <Link
              to="/history"
              style={{
                background: "#0a6efd",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                padding: "0.7rem 2rem",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
                letterSpacing: 1,
                marginTop: "auto",
                transition: "background 0.2s",
              }}
            >
              Go to History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/*
// Add to Dashboard.css for extra polish:
.dashboard-card-gradient {
  background: linear-gradient(135deg, #f8fafd 60%, #e9f0fb 100%);
}
.dashboard-icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.10);
  font-size: 2rem;
}
*/
