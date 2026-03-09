import "./ResumePreview.css";

const TEMPLATE_COLORS = {
  classic: { accent: "#1e40af", headerBg: "#1e3a5f" },
  modern: { accent: "#7c3aed", headerBg: "#4c1d95" },
  minimal: { accent: "#059669", headerBg: "#064e3b" },
};

const ResumePreview = ({ data, template = "classic" }) => {
  const colors = TEMPLATE_COLORS[template] || TEMPLATE_COLORS.classic;

  const hasLinks = data.linkedin || data.github || data.portfolio;

  return (
    <div className="preview-panel">
      <div className="resume-paper">
        {/* Header */}
        <div
          className="resume-header"
          style={{ background: colors.headerBg }}
        >
          <h1 className="resume-name">{data.name || "Your Name"}</h1>
          <p className="resume-contact">
            {data.email || "email@example.com"} &nbsp;|&nbsp;{" "}
            {data.phone || "98XXXXXXXX"}
          </p>
          {hasLinks && (
            <p className="resume-links">
              {[data.linkedin, data.github, data.portfolio]
                .filter(Boolean)
                .join("  •  ")}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="resume-body">
          {data.objective && (
            <section className="resume-section">
              <h3 style={{ color: colors.accent }}>Career Objective</h3>
              <p>{data.objective}</p>
            </section>
          )}

          {data.education && (
            <section className="resume-section">
              <h3 style={{ color: colors.accent }}>Education</h3>
              <p>{data.education}</p>
            </section>
          )}

          <section className="resume-section">
            <h3 style={{ color: colors.accent }}>Skills</h3>
            {Array.isArray(data.skills) && data.skills.length > 0 ? (
              <div className="resume-skills">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="resume-skill-tag"
                    style={{
                      borderColor: colors.accent,
                      color: colors.accent,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="placeholder-text">Your skills will appear here.</p>
            )}
          </section>

          <section className="resume-section">
            <h3 style={{ color: colors.accent }}>Experience</h3>
            <p>
              {data.experience || "Your experience will appear here."}
            </p>
          </section>

          {data.projects && (
            <section className="resume-section">
              <h3 style={{ color: colors.accent }}>Projects</h3>
              <p>{data.projects}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
