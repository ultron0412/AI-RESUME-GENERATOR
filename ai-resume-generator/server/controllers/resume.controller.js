const axios = require("axios");

exports.generateResume = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/generate-resume",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Python service error" });
  }
};
