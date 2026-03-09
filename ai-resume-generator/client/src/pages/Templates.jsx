import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import "./Templates.css";

const templates = [
  {
    id: "classic",
    name: "Classic",
    desc: "Traditional and professional. Perfect for corporate roles, finance, and legal positions.",
    color: "#1e40af",
    features: ["Clean header", "Section dividers", "Traditional layout"],
  },
  {
    id: "modern",
    name: "Modern",
    desc: "Bold and contemporary. Great for tech, marketing, and creative industries.",
    color: "#7c3aed",
    features: ["Colored sidebar", "Skill bars", "Two-column layout"],
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Elegant simplicity. Ideal for designers, writers, and consultants.",
    color: "#059669",
    features: ["Whitespace focus", "Subtle typography", "Clean lines"],
  },
];

const Templates = () => {
  return (
    <div className="templates-page">
      <Navbar />

      <section className="templates-hero">
        <h1>
          Choose Your <span className="gradient-text">Template</span>
        </h1>
        <p>Select a professional design and start building your resume.</p>
      </section>

      <section className="templates-grid">
        {templates.map((t, i) => (
          <div
            key={t.id}
            className="template-card glass fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Preview mockup */}
            <div
              className="template-preview"
              style={{
                borderTop: `4px solid ${t.color}`,
              }}
            >
              <div className="preview-header" style={{ background: t.color }}>
                <div className="preview-name" />
                <div className="preview-contact" />
              </div>
              <div className="preview-body">
                <div className="preview-section" />
                <div className="preview-line" />
                <div className="preview-line short" />
                <div className="preview-section" />
                <div className="preview-line" />
                <div className="preview-line" />
                <div className="preview-line short" />
              </div>
            </div>

            <div className="template-info">
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <ul className="template-features">
                {t.features.map((f, j) => (
                  <li key={j}>
                    <HiCheckCircle /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/builder?template=${t.id}`}
                className="btn-primary template-btn"
              >
                Use {t.name}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Templates;
