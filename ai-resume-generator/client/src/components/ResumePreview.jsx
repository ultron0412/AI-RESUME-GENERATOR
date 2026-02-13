import { useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ATSTemplate from "./templates/ATSTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

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
    <div>
      <div style={{ marginBottom: "15px" }}>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value="modern">Modern</option>
          <option value="ats">ATS Friendly</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
