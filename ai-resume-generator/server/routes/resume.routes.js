const router = require("express").Router();
const {
  generateResume,
  rewriteText,
  downloadPDF,
  downloadDOCX,
} = require("../controllers/resume.controller");

router.post("/generate", generateResume);
router.post("/rewrite", rewriteText);
router.get("/download/pdf", downloadPDF);
router.get("/download/docx", downloadDOCX);

module.exports = router;
