import { useState } from "react";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const ResumeForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    objective: "",
  });

  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    form.name && form.email && form.phone && form.skills && form.experience;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill all required fields before generating resume.");
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
    if (!form[field]) {
      alert("Please enter some text before rewriting.");
      return;
    }

    try {
      setRewritingField(field);
      const res = await rewriteWithAI(form[field]);
      setForm((prev) => ({
        ...prev,
        [field]: res.data.rewritten,
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

          <form onSubmit={handleSubmit}>
            <label>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Phone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <label>
              Career Objective {renderRewriteButton("objective")}
            </label>
            <textarea
              name="objective"
              rows="3"
              value={form.objective}
              onChange={handleChange}
              placeholder="Write your career objective"
            />

            <label>
              Skills * {renderRewriteButton("skills")}
            </label>
            <textarea
              name="skills"
              rows="3"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node, Python"
            />

            <label>
              Experience * {renderRewriteButton("experience")}
            </label>
            <textarea
              name="experience"
              rows="4"
              value={form.experience}
              onChange={handleChange}
              placeholder="Describe your work experience"
            />

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
