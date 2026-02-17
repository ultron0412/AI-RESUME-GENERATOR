import { useMemo, useRef, useState } from "react";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const initialForm = {
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  skills: [],
  experience: "",
  objective: "",
  education: "",
  projects: "",
  certifications: "",
};

const sampleData = {
  name: "Aayush Jung Kunwar",
  jobTitle: "Frontend Developer",
  email: "aayush@email.com",
  phone: "+977 98XXXXXXXX",
  location: "Kathmandu, Nepal",
  linkedin: "linkedin.com/in/aayush",
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Figma"],
  experience:
    "Frontend Developer at PixelStack (2022–Present)\n- Built responsive web apps used by 20k+ users.\n- Improved Lighthouse performance score from 62 to 93.",
  objective:
    "Product-focused frontend developer with 3+ years of experience building clean and accessible interfaces.",
  education:
    "B.Sc. in Computer Science, Tribhuvan University (2018–2022)",
  projects:
    "ResumeCraft AI: AI-powered resume platform with live preview and export features.\nTravelMate: End-to-end itinerary app with React + Express.",
  certifications: "Meta Front-End Developer Certificate, Google UX Design",
};

const requiredFields = ["name", "email", "phone", "experience"];

const ResumeForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef(null);

  const completionScore = useMemo(() => {
    const checks = [
      form.name,
      form.jobTitle,
      form.email,
      form.phone,
      form.location,
      form.objective,
      form.skills.length,
      form.experience,
      form.education,
      form.projects,
      form.certifications,
    ];

    const complete = checks.filter(Boolean).length;
    return Math.round((complete / checks.length) * 100);
  }, [form]);

  const isFormValid = requiredFields.every((field) => form[field]) && form.skills.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const normalized = skillInput.trim();

      if (!form.skills.includes(normalized)) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, normalized],
        }));
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
      alert("Please complete the required fields and add at least one skill.");
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

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const parsed = JSON.parse(content);
      setForm({ ...initialForm, ...parsed, skills: parsed.skills || [] });
    } catch (error) {
      alert("Invalid JSON file. Please upload a valid resume-data.json file.");
    } finally {
      event.target.value = "";
    }
  };

  const renderRewriteButton = (field) => (
    <button
      type="button"
      className="ai-btn"
      disabled={rewritingField === field}
      onClick={() => handleRewrite(field)}
    >
      {rewritingField === field ? "Rewriting..." : "✨ Rewrite"}
    </button>
  );

  return (
    <div className="container">
      <div className="hero-banner">
        <h1>Resume Studio</h1>
        <p>Create polished resumes faster with AI rewriting, live templates, and one-click exports.</p>
      </div>

      <div className="layout">
        <div className="card">
          <div className="card-head">
            <h2>Build Your Resume</h2>
            <span className="completion-pill">Completion: {completionScore}%</span>
          </div>

          <div className="progress-wrap">
            <div className="progress-bar" style={{ width: `${completionScore}%` }} />
          </div>

          <div className="quick-actions">
            <button type="button" onClick={() => setForm(sampleData)}>
              Load Sample
            </button>
            <button type="button" onClick={() => setForm(initialForm)}>
              Clear
            </button>
            <button type="button" onClick={handleExportJson}>
              Export JSON
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              Import JSON
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImportJson} />
          </div>

          <form onSubmit={handleSubmit} className="resume-form">
            <div className="form-section">
              <h4>Personal Information</h4>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Jane Doe" />

              <label>Target Role</label>
              <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="e.g. Product Designer" />

              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" />

              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 123 456 7890" />

              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />

              <label>LinkedIn / Portfolio</label>
              <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Career Objective</h4>
                {renderRewriteButton("objective")}
              </div>
              <textarea name="objective" rows="4" value={form.objective} onChange={handleChange} placeholder="A concise and impactful summary..." />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Skills *</h4>
                {renderRewriteButton("skills")}
              </div>
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter" />
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
              <textarea name="experience" rows="5" value={form.experience} onChange={handleChange} placeholder="Include achievements and measurable impact..." />
            </div>

            <div className="form-section">
              <h4>Education</h4>
              <textarea name="education" rows="3" value={form.education} onChange={handleChange} placeholder="Degree, institution, and dates" />
            </div>

            <div className="form-section">
              <h4>Projects</h4>
              <textarea name="projects" rows="4" value={form.projects} onChange={handleChange} placeholder="Highlight 1-2 standout projects" />
            </div>

            <div className="form-section">
              <h4>Certifications</h4>
              <textarea name="certifications" rows="3" value={form.certifications} onChange={handleChange} placeholder="Relevant certificates or courses" />
            </div>

            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Generating Resume..." : "Generate Resume"}
            </button>
          </form>

          <div className="download-actions">
            <a href="http://localhost:5000/api/resume/download/pdf" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download PDF</button>
            </a>

            <a href="http://localhost:5000/api/resume/download/docx" target="_blank" rel="noreferrer">
              <button type="button" disabled={loading}>Download DOCX</button>
            </a>
          </div>
        </div>

        <ResumePreview data={form} completionScore={completionScore} />
      </div>
    </div>
  );
};

export default ResumeForm;
