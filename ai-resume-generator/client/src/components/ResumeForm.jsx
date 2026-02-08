import { useState } from "react";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const ResumeForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [], // ✅ skills as chips
    experience: "",
    objective: "",
  });

  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.skills.length > 0 &&
    form.experience;

  /* ------------------ SKILL CHIP HANDLERS ------------------ */

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      if (!form.skills.includes(skillInput.trim())) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
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

  /* ------------------ SUBMIT ------------------ */

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

  /* ------------------ AI REWRITE ------------------ */

  const handleRewrite = async (field) => {
    if (
      !form[field] ||
      (Array.isArray(form[field]) && form[field].length === 0)
    ) {
      alert("Please enter some text before rewriting.");
      return;
    }

    try {
      setRewritingField(field);

      const inputText = Array.isArray(form[field])
        ? form[field].join(", ")
        : form[field];

      const res = await rewriteWithAI(inputText);
      const rewritten = res.data.rewritten;

      setForm((prev) => ({
        ...prev,
        [field]:
          field === "skills"
            ? rewritten.split(",").map((s) => s.trim())
            : rewritten,
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
      {rewritingField === field ? "Rewriting..." : "✨ Rewrite"}
    </button>
  );

  return (
    <div className="container">
      <div className="layout">
        {/* LEFT SIDE – FORM */}
        <div className="card">
          <h2>AI Resume Generator</h2>

          <form onSubmit={handleSubmit} className="resume-form">
            {/* PERSONAL INFO */}
            <div className="form-section">
              <h4>Personal Information</h4>

              <label>Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Aayush Jung Kunwar"
              />

              <label>Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. aayush@email.com"
              />

              <label>Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 98XXXXXXXX"
              />
            </div>

            {/* OBJECTIVE */}
            <div className="form-section">
              <div className="section-header">
                <h4>Career Objective</h4>
                {renderRewriteButton("objective")}
              </div>

              <textarea
                name="objective"
                rows="4"
                value={form.objective}
                onChange={handleChange}
                placeholder="Brief summary of your career goals..."
              />
            </div>

            {/* SKILLS – CHIPS */}
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
                {form.skills.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="form-section">
              <div className="section-header">
                <h4>Experience *</h4>
                {renderRewriteButton("experience")}
              </div>

              <textarea
                name="experience"
                rows="5"
                value={form.experience}
                onChange={handleChange}
                placeholder="Describe your work experience..."
              />
            </div>

            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Generating Resume..." : "Generate Resume"}
            </button>
          </form>

          {/* DOWNLOAD BUTTONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <a
              href="http://localhost:5000/api/resume/download/pdf"
              target="_blank"
              rel="noreferrer"
            >
              <button type="button" disabled={loading}>
                Download PDF
              </button>
            </a>

            <a
              href="http://localhost:5000/api/resume/download/docx"
              target="_blank"
              rel="noreferrer"
            >
              <button type="button" disabled={loading}>
                Download DOCX
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE – LIVE PREVIEW */}
        <ResumePreview data={form} />
      </div>
    </div>
  );
};

export default ResumeForm;
