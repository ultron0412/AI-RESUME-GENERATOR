const axios = require("axios");

// GENERATE RESUME
exports.generateResume = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/generate-resume",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Generate error:", error.message);
    res.status(500).json({ error: "Resume generation failed" });
  }
};

// AI REWRITE
exports.rewriteText = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/ai-rewrite",
      { text: req.body.text }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Rewrite error:", error.message);
    res.status(500).json({ error: "AI rewrite failed" });
  }
};

// DOWNLOAD PDF
exports.downloadPDF = (req, res) => {
  res.redirect("http://localhost:8000/download/pdf");
};

// DOWNLOAD DOCX
exports.downloadDOCX = (req, res) => {
  res.redirect("http://localhost:8000/download/docx");
};
