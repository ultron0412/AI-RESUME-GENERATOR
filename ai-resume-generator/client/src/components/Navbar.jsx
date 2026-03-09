import { Link, useLocation } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <Link to="/" className="navbar-logo">
        <HiSparkles className="logo-icon" />
        <span className="logo-text">Ultron<span className="logo-accent">AI</span></span>
      </Link>

      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/builder"
          className={`nav-link ${location.pathname === "/builder" ? "active" : ""}`}
        >
          Builder
        </Link>
        <Link
          to="/templates"
          className={`nav-link ${location.pathname === "/templates" ? "active" : ""}`}
        >
          Templates
        </Link>
      </div>

      <Link to="/builder" className="navbar-cta btn-primary">
        <HiSparkles />
        Build Resume
      </Link>
    </nav>
  );
};

export default Navbar;
