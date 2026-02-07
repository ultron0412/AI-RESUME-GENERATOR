import { useState } from "react";
import { generateResume } from "../services/api";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateResume(form);
    alert("Resume generated successfully!");
  };

  return (
    <div className="container">
      <div className="layout">
        {/* LEFT SIDE – FORM */}
        <div className="card">
          <h2>AI Resume Generator</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <label>Career Objective</label>
            <textarea
              name="objective"
              rows="3"
              value={form.objective}
              onChange={handleChange}
              placeholder="Write your career objective"
            />

            <label>Skills</label>
            <textarea
              name="skills"
              rows="3"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node, Python"
            />

            <label>Experience</label>
            <textarea
              name="experience"
              rows="4"
              value={form.experience}
              onChange={handleChange}
              placeholder="Describe your work experience"
            />

            <button type="submit">Generate Resume</button>
          </form>
        </div>

        {/* RIGHT SIDE – LIVE PREVIEW */}
        <ResumePreview data={form} />
      </div>
    </div>
  );
};

export default ResumeForm;
