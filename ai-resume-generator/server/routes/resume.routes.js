const router = require("express").Router();
const { generateResume } = require("../controllers/resume.controller");

router.post("/generate", generateResume);

module.exports = router;
