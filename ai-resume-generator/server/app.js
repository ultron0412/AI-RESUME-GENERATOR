const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const resumeRoutes = require("./routes/resume.routes");

const app = express();

// Security HTTP headers
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Rate limiting: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api", limiter);

// CORS config
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*").split(",");
app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  })
);

// Body parser with size limit
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "node-server" });
});

// API routes
app.use("/api/resume", resumeRoutes);

// Serve static client build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Express Error:", err.stack || err.message || err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

module.exports = app;
