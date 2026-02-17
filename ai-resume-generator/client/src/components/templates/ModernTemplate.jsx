const ModernTemplate = ({ data }) => {
  return (
    <div className="preview-card modern">
      <h1>{data.name || "Your Name"}</h1>
      <p className="headline">{data.title || "Your professional title"}</p>
      <p className="contact">
        {[data.email, data.phone, data.location].filter(Boolean).join(" • ")}
      </p>
      <p className="contact">{[data.linkedin, data.github].filter(Boolean).join(" | ")}</p>

      <h3>Career Objective</h3>
      <p>{data.objective || "Write a compelling summary that highlights your strengths."}</p>

      <h3>Skills</h3>
      <div className="preview-skills">
        {data.skills?.length ? (
          data.skills.map((skill, i) => (
            <span key={i} className="preview-skill">
              {skill}
            </span>
          ))
        ) : (
          <p>Add your top technical and soft skills.</p>
        )}
      </div>

      <h3>Experience</h3>
      <p>{data.experience || "Share your achievements and measurable impact."}</p>

      <h3>Projects</h3>
      <p>{data.projects || "Showcase key projects with outcomes and technologies."}</p>

      <h3>Education</h3>
      <p>{data.education || "Add your degree, institution, and graduation year."}</p>
    </div>
  );
};

export default ModernTemplate;
