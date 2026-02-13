const ATSTemplate = ({ data }) => {
  return (
    <div className="preview-card ats">
      <h2>{data.name}</h2>
      <p>{data.email} | {data.phone}</p>

      <hr />

      <strong>Objective</strong>
      <p>{data.objective}</p>

      <strong>Skills</strong>
      <p>{data.skills?.join(", ")}</p>

      <strong>Experience</strong>
      <p>{data.experience}</p>
    </div>
  );
};

export default ATSTemplate;
