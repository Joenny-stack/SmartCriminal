import { Link } from "react-router-dom";
import "../styles/Home.css";
import eventIllustration from "../assets/images/mostwanted.jpg";

const Home = () => (
  <div
    className="dashboard-bg min-vh-100 w-100 d-flex flex-column"
    style={{
      minHeight: "100vh",
      width: "100vw",
      overflowY: "auto",
      position: "relative",
    }}
  >
    <div className="container pt-5 flex-grow-1 d-flex flex-column">
      <div
        className="d-flex flex-column align-items-center mb-4"
        style={{ paddingTop: 52 }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
          style={{
            width: 70,
            height: 70,
            background: "#1976d2",
          }}
        >
          <i className="bi bi-house-door text-white fs-2"></i>
        </div>
        <h1
          className="fw-bold mb-1"
          style={{
            letterSpacing: 1,
            fontSize: "3rem",
            color: "#0a6efd",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0 8px 0",
          }}
        >
          <span style={{ fontSize: "2.5rem", marginRight: 8 }}>
            <i className="bi bi-house-door" style={{ color: "#0a6efd" }}></i>
          </span>
          Home
        </h1>
        <div
          className="mb-1"
          style={{
            fontSize: "1.5rem",
            color: "#444",
            fontWeight: 500,
          }}
        >
          Welcome,{" "}
          <span style={{ fontWeight: 700, color: "#0a6efd" }}>Officer</span>.
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            color: "#555",
            marginTop: 2,
            marginBottom: 2,
            textAlign: "center",
          }}
          className="lead text-secondary mb-4"
        >
          Access the Smart Criminal ID system features below.
        </div>
      </div>
      <section className="home-content">
        <h1 className="home-title">Smart Criminal ID: Modernizing Justice</h1>
        <p className="home-subtitle">
          Empower law enforcement, legal professionals, and the public with
          instant, secure access to digital criminal identification. <br />
          Search, verify, and manage criminal records with confidence. <br />
          Join Smart Criminal ID and help build a safer, smarter society.
        </p>
        <Link to="/register" className="home-cta-btn">
          Get Started
        </Link>
      </section>
      <section className="home-illustration">
        <img
          src={eventIllustration}
          alt="Justice and digital criminal identification"
        />
      </section>
    </div>
    <footer className="home-footer">
      <span>
        © {new Date().getFullYear()} Smart Criminal ID. All rights reserved.
      </span>
      <span>
        <Link to="/privacy" className="home-footer-link">
          Privacy Policy
        </Link>
        {" | "}
        <Link to="/terms" className="home-footer-link">
          Terms of Service
        </Link>
      </span>
    </footer>
  </div>
);

export default Home;
