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
    <section className="preview-pane">
      <div className="preview-toolbar">
        <h3>Live Resume Preview</h3>
        <div className="template-pills">
          <button
            type="button"
            className={template === "modern" ? "active" : ""}
            onClick={() => setTemplate("modern")}
          >
            Modern
          </button>
          <button
            type="button"
            className={template === "ats" ? "active" : ""}
            onClick={() => setTemplate("ats")}
          >
            ATS
          </button>
          <button
            type="button"
            className={template === "creative" ? "active" : ""}
            onClick={() => setTemplate("creative")}
          >
            Creative
          </button>
        </div>
      </div>
      <div className="preview-scroll">{renderTemplate()}</div>
    </section>
  );
};

export default ResumePreview;
