const ATSTemplate = ({ data }) => {
  return (
    <article className="preview-card ats">
      <h1>{data.name || "Your Name"}</h1>
      <p>{[data.title, data.location].filter(Boolean).join(" | ")}</p>
      <p>{[data.email, data.phone, data.linkedin, data.github].filter(Boolean).join(" | ")}</p>

      <hr />

      <section>
        <strong>PROFESSIONAL SUMMARY</strong>
        <p>{data.objective || "Include your summary here."}</p>
      </section>

      <section>
        <strong>SKILLS</strong>
        <p>{data.skills?.join(", ") || "Add core skills separated by commas."}</p>
      </section>

      <section>
        <strong>EXPERIENCE</strong>
        <p>{data.experience || "List experience with action verbs and outcomes."}</p>
      </section>

      <section>
        <strong>EDUCATION</strong>
        <p>{data.education || "Degree, institution, year."}</p>
      </section>

      <section>
        <strong>PROJECTS</strong>
        <p>{data.projects || "Mention practical projects relevant to the role."}</p>
      </section>
    </article>
  );
};

export default ATSTemplate;
