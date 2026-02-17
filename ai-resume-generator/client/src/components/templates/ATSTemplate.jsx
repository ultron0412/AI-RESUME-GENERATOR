const ATSTemplate = ({ data }) => {
  return (
    <div className="preview-card ats">
      <h2>{data.name || "Your Name"}</h2>
      <p>{[data.email, data.phone, data.location].filter(Boolean).join(" | ")}</p>
      <p>{data.linkedin}</p>
      <hr />

      <strong>Target Role</strong>
      <p>{data.jobTitle || "Your target role"}</p>

      <strong>Objective</strong>
      <p>{data.objective}</p>

      <strong>Skills</strong>
      <p>{data.skills?.join(", ")}</p>

      <strong>Experience</strong>
      <p style={{ whiteSpace: "pre-line" }}>{data.experience}</p>

      <strong>Education</strong>
      <p style={{ whiteSpace: "pre-line" }}>{data.education}</p>

      <strong>Projects</strong>
      <p style={{ whiteSpace: "pre-line" }}>{data.projects}</p>

      <strong>Certifications</strong>
      <p style={{ whiteSpace: "pre-line" }}>{data.certifications}</p>
    </div>
  );
};

export default ATSTemplate;
