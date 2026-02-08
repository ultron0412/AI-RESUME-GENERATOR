import "./ResumePreview.css";

const ResumePreview = ({ data }) => {
  return (
    <div className="preview-container">
      <div className="resume-paper">
        <h1 className="name">{data.name || "Your Name"}</h1>

        <p className="contact">
          {data.email || "email@example.com"} |{" "}
          {data.phone || "98XXXXXXXX"}
        </p>

        <hr />

        <section>
          <h3>Career Objective</h3>
          <p>{data.objective || "Your career objective will appear here."}</p>
        </section>

        <section>
          <h3>Skills</h3>
          <p>{data.skills || "Your skills will appear here."}</p>
        </section>

        <section>
          <h3>Experience</h3>
          <p>{data.experience || "Your experience will appear here."}</p>
        </section>
      </div>
    </div>
  );
};

export default ResumePreview;
