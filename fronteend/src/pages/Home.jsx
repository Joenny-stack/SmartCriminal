import { Link } from "react-router-dom";
import "../styles/Home.css";
import eventIllustration from "../assets/images/mostwanted.jpg";

const Home = () => (
  <div className="home-hero" style={{ paddingTop: 0, marginTop: 0 }}>
    <nav className="home-nav"></nav>
    <main className="home-main">
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
    </main>
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
