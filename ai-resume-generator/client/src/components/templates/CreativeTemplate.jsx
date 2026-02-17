const CreativeTemplate = ({ data }) => {
  return (
    <div className="preview-card creative">
      <div className="sidebar">
        <h2>{data.name || "Your Name"}</h2>
        <p>{data.jobTitle}</p>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.location}</p>

        <h4>Skills</h4>
        <ul>
          {data.skills?.length ? data.skills.map((skill) => <li key={skill}>{skill}</li>) : <li>Add key skills</li>}
        </ul>

        <h4>Certifications</h4>
        <p style={{ whiteSpace: "pre-line" }}>{data.certifications || "Add certifications"}</p>
      </div>

      <div className="main">
        <h3>Career Objective</h3>
        <p style={{ whiteSpace: "pre-line" }}>{data.objective}</p>

        <h3>Experience</h3>
        <p style={{ whiteSpace: "pre-line" }}>{data.experience}</p>

        <h3>Projects</h3>
        <p style={{ whiteSpace: "pre-line" }}>{data.projects}</p>

        <h3>Education</h3>
        <p style={{ whiteSpace: "pre-line" }}>{data.education}</p>
      </div>
    </div>
  );
};

export default CreativeTemplate;
