import { useMemo, useState } from "react";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const suggestions = [
  "Led a cross-functional team of 6 engineers to deliver features 2 weeks ahead of schedule.",
  "Improved API response time by 43% by optimizing caching and database indexes.",
  "Implemented automated CI/CD pipelines, reducing deployment errors by 35%.",
];

const ResumeForm = () => {
  const [form, setForm] = useState({
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
    certifications: "",
  });

  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const requiredFields = ["name", "email", "phone", "experience"];
  const filledRequired = requiredFields.filter((field) => form[field]?.trim()).length;
  const completion = Math.round(((filledRequired + (form.skills.length > 0 ? 1 : 0)) / 5) * 100);

  const atsScore = useMemo(() => {
    let score = 30;
    if (form.skills.length >= 6) score += 20;
    if (form.experience.length >= 120) score += 25;
    if (form.objective.length >= 60) score += 10;
    if (form.projects.length >= 80) score += 10;
    if (form.linkedin || form.github) score += 5;
    return Math.min(score, 100);
  }, [form]);

  const isFormValid =
    form.name && form.email && form.phone && form.skills.length > 0 && form.experience;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(skillInput.trim())) {
        setForm((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      await generateResume(form);
      alert("Resume generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Resume generation failed. Check backend logs.");
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
    <div className="container">
      <div className="layout">
        <aside className="card">
          <div className="hero">
            <p className="eyebrow">AI-powered Resume Studio</p>
            <h2>Build a polished resume in minutes</h2>
            <p className="hero-sub">Track completion, improve bullet points, and export instantly.</p>
          </div>

          <div className="stats-row">
            <div className="stat-box">
              <span>Profile Completion</span>
              <strong>{completion}%</strong>
            </div>
            <div className="stat-box">
              <span>Estimated ATS</span>
              <strong>{atsScore}/100</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="resume-form">
            <div className="form-section">
              <h4>Personal Information</h4>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Aayush Jung Kunwar" />

              <label>Professional Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Full Stack Developer" />

              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. aayush@email.com" />

              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 98XXXXXXXX" />

              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Kathmandu, Nepal" />

              <div className="grid-two">
                <div>
                  <label>LinkedIn</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" />
                </div>
                <div>
                  <label>GitHub/Portfolio</label>
                  <input name="github" value={form.github} onChange={handleChange} placeholder="github.com/username" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Career Objective</h4>
                {renderRewriteButton("objective")}
              </div>
              <textarea name="objective" rows="4" value={form.objective} onChange={handleChange} placeholder="Brief summary of your career goals and value proposition..." />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Skills *</h4>
                {renderRewriteButton("skills")}
              </div>
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter" />
              <div className="skills-container">
                {form.skills.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Experience *</h4>
                {renderRewriteButton("experience")}
              </div>
              <textarea name="experience" rows="5" value={form.experience} onChange={handleChange} placeholder={suggestions[1]} />
              <div className="tip-box">Tip: add measurable impact (%, time saved, revenue, user growth).</div>
            </div>

            <div className="form-section">
              <h4>Education</h4>
              <textarea name="education" rows="3" value={form.education} onChange={handleChange} placeholder="B.Sc. in Computer Science — XYZ University (2020-2024)" />
            </div>

            <div className="form-section">
              <h4>Projects</h4>
              <textarea name="projects" rows="4" value={form.projects} onChange={handleChange} placeholder={suggestions[0]} />
            </div>

            <div className="form-section">
              <h4>Certifications</h4>
              <textarea name="certifications" rows="3" value={form.certifications} onChange={handleChange} placeholder="AWS Certified Developer — Associate" />
            </div>

            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Generating Resume..." : "Generate Resume"}
            </button>
          </form>

          <div className="download-row">
            <a href="http://localhost:5000/api/resume/download/pdf" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download PDF</button>
            </a>
            <a href="http://localhost:5000/api/resume/download/docx" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download DOCX</button>
            </a>
          </div>
        </aside>

        <ResumePreview data={form} />
      </div>
    </div>
  );
};

export default ResumeForm;
