const ModernTemplate = ({ data }) => {
  return (
    <div className="preview-card modern">
      <h1>{data.name || "Your Name"}</h1>
      <p className="contact">
        {data.jobTitle || "Target Role"}
        {data.location ? ` • ${data.location}` : ""}
      </p>
      <p className="contact">
        {[data.email, data.phone, data.linkedin].filter(Boolean).join(" | ") || "email@example.com | +123456789"}
      </p>

      <h3>Career Objective</h3>
      <p>{data.objective || "A strong 2-3 line professional summary."}</p>

      <h3>Skills</h3>
      <div className="preview-skills">
        {data.skills?.length ? (
          data.skills.map((skill) => (
            <span key={skill} className="preview-skill">
              {skill}
            </span>
          ))
        ) : (
          <p>No skills added yet.</p>
        )}
      </div>

      <h3>Experience</h3>
      <p style={{ whiteSpace: "pre-line" }}>{data.experience || "Show impact with metrics and outcomes."}</p>

      <h3>Education</h3>
      <p style={{ whiteSpace: "pre-line" }}>{data.education || "Your degree and institution."}</p>

      <h3>Projects</h3>
      <p style={{ whiteSpace: "pre-line" }}>{data.projects || "Key projects with stack and business value."}</p>

      <h3>Certifications</h3>
      <p style={{ whiteSpace: "pre-line" }}>{data.certifications || "List relevant certificates."}</p>
    </div>
  );
};

export default ModernTemplate;
