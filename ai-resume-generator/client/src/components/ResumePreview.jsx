import { useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ATSTemplate from "./templates/ATSTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import "./ResumePreview.css";

const ResumePreview = ({ data, completionScore }) => {
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
    <div className="preview-shell">
      <div className="preview-topbar">
        <div>
          <p className="preview-label">Live Preview</p>
          <h3>Template Playground</h3>
        </div>

        <div className="preview-actions">
          <div className="score-chip">Resume Score: {completionScore}%</div>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="modern">Modern</option>
            <option value="ats">ATS Friendly</option>
            <option value="creative">Creative</option>
          </select>
        </div>
      </div>

      <div className="preview-canvas">{renderTemplate()}</div>
    </div>
  );
};

export default ResumePreview;
