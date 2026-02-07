import { useState } from "react";
import { generateResume } from "../services/api";
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateResume(form);
    alert("Resume generated successfully!");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>AI Resume Generator</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />

          <label>Phone</label>
          <input name="phone" onChange={handleChange} required />

          <label>Career Objective</label>
          <textarea name="objective" rows="3" onChange={handleChange} />

          <label>Skills</label>
          <textarea name="skills" rows="3" onChange={handleChange} />

          <label>Experience</label>
          <textarea name="experience" rows="4" onChange={handleChange} />

          <button type="submit">Generate Resume</button>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
