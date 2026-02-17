import { useMemo, useState } from "react";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const initialState = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  skills: [],
  objective: "",
  experience: "",
  education: "",
  projects: "",
};

const ResumeForm = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const requiredFields = ["name", "email", "phone", "experience"];
  const completedRequired = requiredFields.filter((field) => form[field]?.trim()).length;
  const completionPercent = Math.round((completedRequired / requiredFields.length) * 100);

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.skills.length > 0 &&
    form.experience;

  const wordCount = useMemo(() => {
    const text = [form.objective, form.experience, form.education, form.projects]
      .join(" ")
      .trim();

    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [form.objective, form.experience, form.education, form.projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const nextSkill = skillInput.trim();

      if (!form.skills.includes(nextSkill)) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, nextSkill],
        }));
      }

      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const fillSampleData = () => {
    setForm({
      name: "Alex Morgan",
      title: "Full Stack Developer",
      email: "alex.morgan@email.com",
      phone: "+1 (555) 101-2020",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      objective:
        "Product-focused software developer with 4+ years of experience building fast, accessible web applications. Passionate about turning user insights into reliable features that improve engagement and retention.",
      experience:
        "Software Engineer, BrightLabs (2022–Present)\n• Built a reusable React component system that reduced UI delivery time by 35%.\n• Collaborated with backend team to optimize API calls and cut page load by 40%.\n\nFrontend Developer, Nova Apps (2020–2022)\n• Delivered 20+ responsive client projects with Lighthouse scores above 90.",
      education:
        "B.Sc. Computer Science — University of Texas at Austin (2019)\nRelevant coursework: Data Structures, Distributed Systems, Human-Computer Interaction",
      projects:
        "ResumeForge — AI resume optimizer with template scoring and export automation.\nSalesPulse — dashboard for sales forecasting with role-based analytics and alerts.",
    });
  };

  const clearForm = () => {
    setForm(initialState);
    setSubmitMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill all required fields and add at least one skill.");
      return;
    }

    try {
      setLoading(true);
      setSubmitMessage("");
      await generateResume(form);
      setSubmitMessage("Resume data generated successfully. You can now download PDF or DOCX.");
    } catch (err) {
      console.error(err);
      setSubmitMessage("Resume generation failed. Please check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleRewrite = async (field) => {
    if (!form[field] || (Array.isArray(form[field]) && form[field].length === 0)) {
      alert("Please enter some text before rewriting.");
      return;
    }

    try {
      setRewritingField(field);
      const inputText = Array.isArray(form[field]) ? form[field].join(", ") : form[field];
      const res = await rewriteWithAI(inputText);
      const rewritten = res.data.rewritten;

      setForm((prev) => ({
        ...prev,
        [field]: field === "skills" ? rewritten.split(",").map((s) => s.trim()) : rewritten,
      }));
    } catch (err) {
      console.error(err);
      alert("AI rewrite failed. Is LM Studio running?");
    } finally {
      setRewritingField(null);
    }
  };

  const renderRewriteButton = (field) => (
    <button
      type="button"
      className="ai-btn"
      disabled={rewritingField === field}
      onClick={() => handleRewrite(field)}
    >
      {rewritingField === field ? "Rewriting..." : "✨ Improve"}
    </button>
  );

  return (
    <div className="page-shell">
      <div className="layout">
        <section className="card form-card">
          <div className="hero">
            <p className="eyebrow">AI Resume Studio</p>
            <h2>Build an interview-ready resume in minutes</h2>
            <p className="hero-subtext">
              Add your profile details, optimize your writing with AI, and preview different resume styles live.
            </p>
          </div>

          <div className="utility-row">
            <button type="button" className="ghost-btn" onClick={fillSampleData}>
              Fill sample data
            </button>
            <button type="button" className="ghost-btn" onClick={clearForm}>
              Clear
            </button>
          </div>

          <div className="progress-wrap">
            <div className="progress-meta">
              <span>Completion</span>
              <strong>{completionPercent}%</strong>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${completionPercent}%` }} />
            </div>
            <small>{wordCount} words of content</small>
          </div>

          <form onSubmit={handleSubmit} className="resume-form">
            <div className="form-section">
              <h4>Personal Information</h4>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Morgan" />

              <label>Professional Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Product Designer" />

              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />

              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />

              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />

              <div className="grid-two">
                <div>
                  <label>LinkedIn</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" />
                </div>
                <div>
                  <label>GitHub / Portfolio</label>
                  <input name="github" value={form.github} onChange={handleChange} placeholder="github.com/username" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Career Objective</h4>
                {renderRewriteButton("objective")}
              </div>
              <textarea name="objective" rows="4" value={form.objective} onChange={handleChange} placeholder="Summarize your strengths and career goals..." />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Skills *</h4>
                {renderRewriteButton("skills")}
              </div>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter"
              />
              <div className="skills-container">
                {form.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Experience *</h4>
                {renderRewriteButton("experience")}
              </div>
              <textarea name="experience" rows="6" value={form.experience} onChange={handleChange} placeholder="Add role, company, dates, and impact bullets..." />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Education</h4>
                {renderRewriteButton("education")}
              </div>
              <textarea name="education" rows="4" value={form.education} onChange={handleChange} placeholder="Degree, institution, graduation year, highlights..." />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Projects</h4>
                {renderRewriteButton("projects")}
              </div>
              <textarea name="projects" rows="4" value={form.projects} onChange={handleChange} placeholder="Highlight key projects and outcomes..." />
            </div>

            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Generating Resume..." : "Generate Resume"}
            </button>

            {submitMessage ? <p className="status-text">{submitMessage}</p> : null}
          </form>

          <div className="download-row">
            <a href="http://localhost:5000/api/resume/download/pdf" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download PDF</button>
            </a>
            <a href="http://localhost:5000/api/resume/download/docx" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download DOCX</button>
            </a>
          </div>
        </section>

        <ResumePreview data={form} />
      </div>
    </div>
  );
};

export default ResumeForm;
