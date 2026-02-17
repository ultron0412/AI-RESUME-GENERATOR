const ATSTemplate = ({ data }) => {
  return (
    <div className="preview-card ats">
      <h2>{data.name || "Your Name"}</h2>
      <p>{data.title || "Professional Title"}</p>
      <p>{[data.email, data.phone, data.location].filter(Boolean).join(" | ")}</p>
      <p>{[data.linkedin, data.github].filter(Boolean).join(" | ")}</p>

      <hr />

      <strong>Objective</strong>
      <p>{data.objective}</p>

      <strong>Skills</strong>
      <p>{data.skills?.join(", ")}</p>

      <strong>Experience</strong>
      <p>{data.experience}</p>

      <strong>Education</strong>
      <p>{data.education}</p>

      <strong>Projects</strong>
      <p>{data.projects}</p>

      <strong>Certifications</strong>
      <p>{data.certifications}</p>
    </div>
  );
};

export default ATSTemplate;
