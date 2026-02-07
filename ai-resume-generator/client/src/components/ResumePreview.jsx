const ResumePreview = ({ data }) => {
  return (
    <div className="preview-card">
      <h1>{data.name || "Your Name"}</h1>
      <p className="contact">
        {data.email || "email@example.com"} | {data.phone || "98XXXXXXXX"}
      </p>

      <hr />

      <h3>Career Objective</h3>
      <p>{data.objective || "Your career objective will appear here."}</p>

      <h3>Skills</h3>
      <p>{data.skills || "Your skills will appear here."}</p>

      <h3>Experience</h3>
      <p>{data.experience || "Your experience will appear here."}</p>
    </div>
  );
};

export default ResumePreview;
