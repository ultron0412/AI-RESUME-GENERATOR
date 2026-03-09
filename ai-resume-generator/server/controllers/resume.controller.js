const axios = require("axios");
const { validationResult } = require("express-validator");

const PYTHON_URL = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

// HELPER: Handle validation errors
const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return null;
};

// GENERATE RESUME
exports.generateResume = async (req, res, next) => {
  const errorResponse = handleValidation(req, res);
  if (errorResponse) return;

  try {
    const response = await axios.post(`${PYTHON_URL}/generate-resume`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Generate error:", error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.detail || "Resume generation failed";
    res.status(statusCode).json({ error: message });
  }
};

// AI REWRITE
exports.rewriteText = async (req, res, next) => {
  const errorResponse = handleValidation(req, res);
  if (errorResponse) return;

  try {
    const response = await axios.post(`${PYTHON_URL}/ai-rewrite`, {
      text: req.body.text,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Rewrite error:", error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.detail || "AI rewrite failed";
    res.status(statusCode).json({ error: message });
  }
};

// DOWNLOAD PDF
exports.downloadPDF = async (req, res, next) => {
  try {
    // Just a redirect to the Python backend
    // Since we are proxying, it might be better to actually proxy the stream
    // instead of redirecting so the client doesn't need to know the Python URL.
    // However, keeping consistent with the original implementation:
    res.redirect(`${PYTHON_URL}/download/pdf`);
  } catch (error) {
    next(error);
  }
};

// DOWNLOAD DOCX
exports.downloadDOCX = async (req, res, next) => {
  try {
    res.redirect(`${PYTHON_URL}/download/docx`);
  } catch (error) {
    next(error);
  }
};
