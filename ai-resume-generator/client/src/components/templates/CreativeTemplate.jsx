const lineItems = (content) => content?.split("\n").filter(Boolean) || [];

const CreativeTemplate = ({ data }) => {
  return (
    <article className="preview-card creative">
      <aside className="sidebar">
        <h2>{data.name || "Your Name"}</h2>
        <p>{data.title || "Professional Title"}</p>
        <div className="meta-block">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>

        <h4>Skills</h4>
        <ul>
          {data.skills?.length ? (
            data.skills.map((skill) => <li key={skill}>{skill}</li>)
          ) : (
            <li>Add skills</li>
          )}
        </ul>
      </aside>

      <main className="main">
        <section>
          <h3>Profile</h3>
          <p>{data.objective || "Add a compelling profile summary."}</p>
        </section>

        <section>
          <h3>Experience</h3>
          {lineItems(data.experience).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>

        <section>
          <h3>Education</h3>
          {lineItems(data.education).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>

        <section>
          <h3>Projects</h3>
          {lineItems(data.projects).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>
      </main>
    </article>
  );
};

export default CreativeTemplate;
