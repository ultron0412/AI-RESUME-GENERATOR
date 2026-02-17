const CreativeTemplate = ({ data }) => {
  return (
    <div className="preview-card creative">
      <div className="sidebar">
        <h2>{data.name || "Your Name"}</h2>
        <p>{data.title}</p>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.location}</p>

        <h4>Links</h4>
        <ul>
          {data.linkedin && <li>{data.linkedin}</li>}
          {data.github && <li>{data.github}</li>}
        </ul>

        <h4>Skills</h4>
        <ul>
          {data.skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="main">
        <h3>Career Objective</h3>
        <p>{data.objective}</p>

        <h3>Experience</h3>
        <p>{data.experience}</p>

        <h3>Projects</h3>
        <p>{data.projects}</p>

        <h3>Education</h3>
        <p>{data.education}</p>

        <h3>Certifications</h3>
        <p>{data.certifications}</p>
      </div>
    </div>
  );
};

export default CreativeTemplate;
