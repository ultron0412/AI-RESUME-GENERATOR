import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HiSparkles,
  HiArrowRight,
  HiArrowLeft,
  HiArrowDownTray,
  HiBookmarkSquare,
} from "react-icons/hi2";
import { generateResume, rewriteWithAI } from "../services/api";
import ResumePreview from "./ResumePreview";
import StrengthMeter from "./StrengthMeter";
import "./ResumeForm.css";

const STEPS = [
  "Personal Info",
  "Objective",
  "Education",
  "Skills",
  "Experience",
  "Projects",
  "Links",
];

const DRAFT_KEY = "ultron_draft";

const ResumeForm = () => {
  const [searchParams] = useSearchParams();
  const [template, setTemplate] = useState(
    searchParams.get("template") || "classic"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    objective: "",
    education: "",
    skills: [],
    experience: "",
    projects: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rewritingField, setRewritingField] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [generated, setGenerated] = useState(false);

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(parsed);
        toast.success("Draft restored!");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    toast.success("Draft saved!");
  };

  const isFormValid =
    form.name && form.email && form.phone && form.skills.length > 0 && form.experience;

  /* ---------- SKILL CHIPS ---------- */
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

  const removeSkill = (s) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => sk !== s),
    }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      await generateResume(form);
      setGenerated(true);
      toast.success("Resume generated successfully!");
    } catch {
      toast.error("Resume generation failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- AI REWRITE ---------- */
  const handleRewrite = async (field) => {
    const val = form[field];
    if (!val || (Array.isArray(val) && val.length === 0)) {
      toast.error("Add some text first.");
      return;
    }
    try {
      setRewritingField(field);
      const inputText = Array.isArray(val) ? val.join(", ") : val;
      const res = await rewriteWithAI(inputText);
      const rewritten = res.data.rewritten;
      setForm((prev) => ({
        ...prev,
        [field]:
          field === "skills"
            ? rewritten.split(",").map((s) => s.trim())
            : rewritten,
      }));
      toast.success(`${field} professionally rewritten!`);
    } catch {
      toast.error("Rewrite failed. Is LM Studio running?");
    } finally {
      setRewritingField(null);
    }
  };

  const RewriteBtn = ({ field }) => (
    <button
      type="button"
      className="ai-rewrite-btn"
      disabled={rewritingField === field}
      onClick={() => handleRewrite(field)}
    >
      {rewritingField === field ? (
        <>
          <span className="spinner" /> Rewriting...
        </>
      ) : (
        <>
          Rewrite
        </>
      )}
    </button>
  );

  /* ---------- STEP CONTENT ---------- */
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-content fade-in" key="step0">
            <h3 className="step-title">Personal Information</h3>
            <p className="step-desc">Let's start with your basic details.</p>
            <div className="field-group">
              <label>Full Name *</label>
              <input
                id="field-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Aayush Jung Kunwar"
              />
            </div>
            <div className="field-group">
              <label>Email Address *</label>
              <input
                id="field-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. aayush@email.com"
              />
            </div>
            <div className="field-group">
              <label>Phone Number *</label>
              <input
                id="field-phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 98XXXXXXXX"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content fade-in" key="step1">
            <div className="step-header-row">
              <div>
                <h3 className="step-title">Career Objective</h3>
                <p className="step-desc">Summarize your career goals.</p>
              </div>
              <RewriteBtn field="objective" />
            </div>
            <div className="field-group">
              <textarea
                id="field-objective"
                name="objective"
                rows="5"
                value={form.objective}
                onChange={handleChange}
                placeholder="Brief summary of your career goals..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content fade-in" key="step2">
            <div className="step-header-row">
              <div>
                <h3 className="step-title">Education</h3>
                <p className="step-desc">Your academic background.</p>
              </div>
              <RewriteBtn field="education" />
            </div>
            <div className="field-group">
              <textarea
                id="field-education"
                name="education"
                rows="5"
                value={form.education}
                onChange={handleChange}
                placeholder="e.g. Bachelor of Computer Science, XYZ University (2020-2024)"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content fade-in" key="step3">
            <div className="step-header-row">
              <div>
                <h3 className="step-title">Skills *</h3>
                <p className="step-desc">Add your skills one by one.</p>
              </div>
              <RewriteBtn field="skills" />
            </div>
            <div className="field-group">
              <input
                id="field-skills"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter"
              />
              <div className="skills-chips">
                {form.skills.map((skill, index) => (
                  <span key={index} className="chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content fade-in" key="step4">
            <div className="step-header-row">
              <div>
                <h3 className="step-title">Experience *</h3>
                <p className="step-desc">Describe your work history.</p>
              </div>
              <RewriteBtn field="experience" />
            </div>
            <div className="field-group">
              <textarea
                id="field-experience"
                name="experience"
                rows="6"
                value={form.experience}
                onChange={handleChange}
                placeholder="Describe your work experience, roles, and accomplishments..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content fade-in" key="step5">
            <div className="step-header-row">
              <div>
                <h3 className="step-title">Projects</h3>
                <p className="step-desc">Showcase your key projects.</p>
              </div>
              <RewriteBtn field="projects" />
            </div>
            <div className="field-group">
              <textarea
                id="field-projects"
                name="projects"
                rows="5"
                value={form.projects}
                onChange={handleChange}
                placeholder="e.g. AI Resume Generator — React + FastAPI app with AI-powered content rewriting..."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content fade-in" key="step6">
            <h3 className="step-title">Online Profiles</h3>
            <p className="step-desc">Add links to your professional profiles.</p>
            <div className="field-group">
              <label>LinkedIn</label>
              <input
                id="field-linkedin"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="field-group">
              <label>GitHub</label>
              <input
                id="field-github"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="field-group">
              <label>Portfolio</label>
              <input
                id="field-portfolio"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="builder-layout">
      {/* ====== LEFT PANEL ====== */}
      <div className="form-panel glass">
        {/* Step progress */}
        <div className="step-progress">
          {STEPS.map((s, i) => (
            <button
              key={i}
              className={`step-dot ${i === step ? "active" : ""} ${
                i < step ? "completed" : ""
              }`}
              onClick={() => setStep(i)}
              title={s}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="step-indicator">
          Step {step + 1} of {STEPS.length}
        </div>

        {/* Strength Meter */}
        <StrengthMeter data={form} />

        {/* Template selector */}
        <div className="template-selector">
          <label>Template</label>
          <div className="template-options">
            {["classic", "modern", "minimal"].map((t) => (
              <button
                key={t}
                type="button"
                className={`template-opt ${template === t ? "selected" : ""}`}
                onClick={() => setTemplate(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Step content */}
        {renderStep()}

        {/* Navigation */}
        <div className="step-nav">
          {step > 0 && (
            <button
              type="button"
              className="btn-secondary nav-btn"
              onClick={() => setStep(step - 1)}
            >
              <HiArrowLeft /> Back
            </button>
          )}

          <div className="nav-actions">
            <button
              type="button"
              className="btn-secondary nav-btn save-btn"
              onClick={saveDraft}
            >
              <HiBookmarkSquare /> Save
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className="btn-primary nav-btn"
                onClick={() => setStep(step + 1)}
              >
                Next <HiArrowRight />
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary nav-btn"
                disabled={loading || !isFormValid}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <span className="spinner" /> Generating...
                  </>
                ) : (
                  <>
                    Generate Resume
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Download Buttons */}
        {generated && (
          <div className="download-row fade-in">
            <a
              href={`${import.meta.env.VITE_API_URL || "/api"}/resume/download/pdf`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary download-btn"
            >
              <HiArrowDownTray /> Download PDF
            </a>
            <a
              href={`${import.meta.env.VITE_API_URL || "/api"}/resume/download/docx`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary download-btn"
            >
              <HiArrowDownTray /> Download DOCX
            </a>
          </div>
        )}
      </div>

      {/* ====== RIGHT PANEL — LIVE PREVIEW ====== */}
      <ResumePreview data={form} template={template} />
    </div>
  );
};

export default ResumeForm;
