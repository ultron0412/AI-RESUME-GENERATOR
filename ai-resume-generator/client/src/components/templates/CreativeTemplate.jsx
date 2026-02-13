const CreativeTemplate = ({ data }) => {
  return (
    <div className="preview-card creative">
      <div className="sidebar">
        <h2>{data.name}</h2>
        <p>{data.email}</p>
        <p>{data.phone}</p>

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
      </div>
    </div>
  );
};

export default CreativeTemplate;
