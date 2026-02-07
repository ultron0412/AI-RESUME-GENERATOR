import { useState } from "react";
import { generateResume } from "../services/api";

const ResumeForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    objective: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateResume(form);
    alert("Resume generated successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <textarea name="objective" placeholder="Objective" onChange={handleChange} />
      <textarea name="skills" placeholder="Skills" onChange={handleChange} />
      <textarea name="experience" placeholder="Experience" onChange={handleChange} />
      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
