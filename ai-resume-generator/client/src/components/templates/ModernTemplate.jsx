const renderLines = (content) =>
  content
    ?.split("\n")
    .filter(Boolean)
    .map((line, index) => <p key={index}>{line}</p>);

const ModernTemplate = ({ data }) => {
  return (
    <article className="preview-card modern">
      <header>
        <h1>{data.name || "Your Name"}</h1>
        <h2>{data.title || "Your Professional Title"}</h2>
        <p className="contact">
          {[data.email, data.phone, data.location].filter(Boolean).join(" • ")}
        </p>
        <p className="contact links">{[data.linkedin, data.github].filter(Boolean).join(" • ")}</p>
      </header>

      <section>
        <h3>Career Objective</h3>
        <p>{data.objective || "Add a concise professional summary tailored to your target role."}</p>
      </section>

      <section>
        <h3>Skills</h3>
        <div className="preview-skills">
          {data.skills?.length ? data.skills.map((skill) => <span key={skill}>{skill}</span>) : <p>Add your key skills.</p>}
        </div>
      </section>

      <section>
        <h3>Experience</h3>
        {renderLines(data.experience) || <p>Add work experience and measurable impact.</p>}
      </section>

      <section>
        <h3>Education</h3>
        {renderLines(data.education) || <p>Add your education background.</p>}
      </section>

      <section>
        <h3>Projects</h3>
        {renderLines(data.projects) || <p>Highlight 1-2 relevant projects with outcomes.</p>}
      </section>
    </article>
  );
};

export default ModernTemplate;
