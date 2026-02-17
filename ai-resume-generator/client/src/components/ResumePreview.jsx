import { useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ATSTemplate from "./templates/ATSTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import "./ResumePreview.css";

const ResumePreview = ({ data }) => {
  const [template, setTemplate] = useState("modern");

  const renderTemplate = () => {
    switch (template) {
      case "ats":
        return <ATSTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <section className="preview-shell">
      <div className="preview-toolbar">
        <div>
          <p className="preview-eyebrow">Live Preview</p>
          <h3>Template Studio</h3>
        </div>
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="modern">Modern</option>
          <option value="ats">ATS Friendly</option>
          <option value="creative">Creative</option>
        </select>
      </div>
      <div className="preview-frame">{renderTemplate()}</div>
    </section>
  );
};

export default ResumePreview;
