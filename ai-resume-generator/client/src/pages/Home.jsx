import { Link } from "react-router-dom";
import {
  HiDocument,
  HiCpuChip,
  HiArrowDownTray,
  HiPaintBrush,
  HiShieldCheck,
  HiRocketLaunch,
} from "react-icons/hi2";
import Navbar from "../components/Navbar";
import "./Home.css";

const features = [
  {
    icon: <HiCpuChip />,
    title: "AI-Powered Writing",
    desc: "Our AI rewrites your content professionally, crafting compelling bullet points and career objectives.",
  },
  {
    icon: <HiPaintBrush />,
    title: "Beautiful Templates",
    desc: "Choose from multiple professionally designed templates — Classic, Modern, and Minimal styles.",
  },
  {
    icon: <HiDocument />,
    title: "Live Preview",
    desc: "Watch your resume come to life in real-time as you type, with pixel-perfect A4 formatting.",
  },
  {
    icon: <HiArrowDownTray />,
    title: "PDF & DOCX Export",
    desc: "Download your finished resume in PDF or DOCX format, ready to send to recruiters.",
  },
  {
    icon: <HiShieldCheck />,
    title: "Resume Scoring",
    desc: "Get instant feedback on your resume strength with our intelligent scoring system.",
  },
  {
    icon: <HiRocketLaunch />,
    title: "Save Progress",
    desc: "Your work is saved automatically. Come back anytime and continue where you left off.",
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content fade-in">
          <span className="hero-badge glass">
            Professional Resume Builder
          </span>
          <h1 className="hero-title">
            Build Your Perfect
            <br />
            <span className="gradient-text">Resume in Minutes</span>
          </h1>
          <p className="hero-subtitle">
            Create stunning, ATS-friendly resumes with professional writing
            assistance. Stand out from the competition and land your dream job.
          </p>
          <div className="hero-actions">
            <Link to="/builder" className="btn-primary hero-btn">
              Start Building — Free
            </Link>
            <Link to="/templates" className="btn-secondary hero-btn">
              View Templates
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Resumes Created</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">ATS Pass Rate</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Pro Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">
          Everything You Need to{" "}
          <span className="gradient-text">Land the Job</span>
        </h2>
        <p className="section-subtitle">
          From professional writing to expert templates, we've got you covered.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card glass"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box glass">
          <h2>
            Ready to Build Your{" "}
            <span className="gradient-text">Dream Resume?</span>
          </h2>
          <p>Join thousands who've already created their perfect resume.</p>
          <Link to="/builder" className="btn-primary hero-btn">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">
            Ultron
          </span>
          <span className="footer-copy">
            © 2026 Ultron. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
