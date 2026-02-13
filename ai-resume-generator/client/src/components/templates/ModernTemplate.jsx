const ModernTemplate = ({ data }) => {
  return (
    <div className="preview-card modern">
      <h1>{data.name || "Your Name"}</h1>
      <p className="contact">
        {data.email} | {data.phone}
      </p>

      <h3>Career Objective</h3>
      <p>{data.objective}</p>

      <h3>Skills</h3>
      <div className="preview-skills">
        {data.skills?.map((skill, i) => (
          <span key={i} className="preview-skill">
            {skill}
          </span>
        ))}
      </div>

      <h3>Experience</h3>
      <p>{data.experience}</p>
    </div>
  );
};

export default ModernTemplate;
