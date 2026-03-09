const router = require("express").Router();
const { body } = require("express-validator");
const {
  generateResume,
  rewriteText,
  downloadPDF,
  downloadDOCX,
} = require("../controllers/resume.controller");

// Validation rules
const generateValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("skills").trim().notEmpty().withMessage("Skills are required"),
  body("experience").trim().notEmpty().withMessage("Experience is required"),
];

const rewriteValidation = [
  body("text").trim().notEmpty().withMessage("Text to rewrite is required"),
];

// Routes
router.post("/generate", generateValidation, generateResume);
router.post("/rewrite", rewriteValidation, rewriteText);
router.get("/download/pdf", downloadPDF);
router.get("/download/docx", downloadDOCX);

module.exports = router;
