import { Link } from "react-router-dom";
import "../styles/Home.css";
import bgImage from "../assets/images/criminal-home2.jpg";

const Home = () => (
  <div
    style={{
      minHeight: "100vh",
      minWidth: "100vw",
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Background Image */}
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
    {/* Overlay for contrast */}
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
    {/* Main Content */}
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
      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          paddingTop: 60,
        }}
      >
        <div
          style={{
            flex: "1 1 420px",
            minWidth: 320,
            maxWidth: 600,
            padding: "2vw 0",
          }}
        >
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 24,
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
            }}
          >
            Discover the power of
            <span
              style={{
                background: "rgba(13,110,253,0.85)",
                borderRadius: 8,
                padding: "0 10px",
                margin: "0 8px",
                color: "#fff",
                boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
              }}
            >
              secure
            </span>
            digital criminal identification
            <br />
            with
            <span
              style={{
                background: "rgba(13,110,253,0.85)",
                borderRadius: 8,
                padding: "0 10px",
                margin: "0 8px",
                color: "#fff",
                boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
              }}
            >
              Smart Criminal ID
            </span>
            .
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#e3eaff",
              marginBottom: 32,
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(0,0,0,0.18)",
            }}
          >
            Instantly search, verify, and manage criminal records.
            <br />
            Empower law enforcement, legal professionals, and the public.
            <br />
            Join us to help build a safer, smarter society.
          </p>
          <Link
            to="/register"
            style={{
              display: "inline-block",
              background: "#0a6efd",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              padding: "1rem 2.5rem",
              borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 2px 12px 0 rgba(10,110,253,0.18)",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
      {/* Feature Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          marginTop: 40,
          background: "rgba(10,30,60,0.35)",
          borderRadius: 12,
          width: "100%",
          maxWidth: 1200,
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            flex: "2 1 320px",
            minWidth: 220,
            padding: "2rem 1.5rem",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 6,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <span style={{ marginRight: 6 }}>🔍</span> Powerful Search
          </div>
          <div
            style={{
              color: "#e3eaff",
              fontSize: 16,
            }}
          >
            Instantly search criminal records and match faces securely.
          </div>
        </div>
        <div
          style={{
            flex: "2 1 320px",
            minWidth: 220,
            padding: "2rem 1.5rem",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 6,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <span style={{ marginRight: 6 }}>🛡️</span> Trusted & Secure
          </div>
          <div
            style={{
              color: "#e3eaff",
              fontSize: 16,
            }}
          >
            Data privacy and security for all users and agencies.
          </div>
        </div>
        <div
          style={{
            flex: "2 1 320px",
            minWidth: 220,
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 6,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <span style={{ marginRight: 6 }}>⚡</span> Fast & Reliable
          </div>
          <div
            style={{
              color: "#e3eaff",
              fontSize: 16,
            }}
          >
            Lightning-fast results and robust uptime for mission-critical work.
          </div>
        </div>
      </div>
    </div>
    {/* Footer */}
    <footer
      className="home-footer"
      style={{
        marginTop: 32,
        position: "relative",
        zIndex: 3,
        color: "#e3eaff",
        textShadow: "0 2px 8px rgba(0,0,0,0.18)",
      }}
    >
      <span>
        © {new Date().getFullYear()} Smart Criminal ID. All rights reserved.
      </span>
      <span style={{ marginLeft: 12 }}>
        <Link
          to="/privacy"
          className="home-footer-link"
          style={{ color: "#e3eaff" }}
        >
          Privacy Policy
        </Link>
        {" | "}
        <Link
          to="/terms"
          className="home-footer-link"
          style={{ color: "#e3eaff" }}
        >
          Terms of Service
        </Link>
      </span>
    </footer>
  </div>
);

export default Home;
