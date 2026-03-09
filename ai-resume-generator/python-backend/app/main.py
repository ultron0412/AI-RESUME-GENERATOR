"""
FastAPI application for AI Resume Generator.
Provides resume generation, AI text rewriting, and file export endpoints.
"""

import logging
import os
import sys

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from .config import settings
from .models import ResumeData, RewriteRequest
from .file_exporter import export_pdf, export_docx
from .ai_enhancer import enhance_text

# ── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)

# ── App ──────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.app_name,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
)

# ── CORS ─────────────────────────────────────────────────────────────
origins = settings.allowed_origins.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in origins else [o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Ensure output directory ──────────────────────────────────────────
os.makedirs(settings.output_dir, exist_ok=True)


# ── Global exception handler ────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled error on %s %s: %s", request.method, request.url.path, exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )


# ── Health check ─────────────────────────────────────────────────────
@app.get("/health")
def health_check():
    """Health check endpoint for load balancers and orchestrators."""
    return {"status": "ok", "service": "python-backend"}


# ── Resume generation ────────────────────────────────────────────────
@app.post("/generate-resume")
def generate_resume(data: ResumeData):
    """Generate a resume from structured data and export as PDF + DOCX."""
    logger.info("Generating resume for %s", data.name)

    sections = []
    sections.append(f"{data.name}")
    sections.append(f"{data.email} | {data.phone}")

    if data.linkedin or data.github or data.portfolio:
        links = " | ".join(
            link for link in [data.linkedin, data.github, data.portfolio] if link
        )
        sections.append(links)

    sections.append("")

    if data.objective:
        sections.append("CAREER OBJECTIVE")
        sections.append(data.objective)
        sections.append("")

    if data.education:
        sections.append("EDUCATION")
        sections.append(data.education)
        sections.append("")

    sections.append("SKILLS")
    sections.append(data.skills)
    sections.append("")

    sections.append("EXPERIENCE")
    sections.append(data.experience)

    if data.projects:
        sections.append("")
        sections.append("PROJECTS")
        sections.append(data.projects)

    resume_text = "\n".join(sections)

    try:
        export_pdf(resume_text)
        export_docx(resume_text)
    except Exception as e:
        logger.error("Export failed: %s", e)
        raise HTTPException(status_code=500, detail="Resume file export failed.")

    logger.info("Resume generated successfully for %s", data.name)
    return {"message": "Resume generated successfully"}


# ── AI rewrite ───────────────────────────────────────────────────────
@app.post("/ai-rewrite")
def ai_rewrite(req: RewriteRequest):
    """Rewrite text using AI for professional resume language."""
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text field cannot be empty.")

    rewritten = enhance_text(req.text)
    return {"rewritten": rewritten}


# ── File downloads ───────────────────────────────────────────────────
@app.get("/download/pdf")
def download_pdf():
    """Download the generated resume as PDF."""
    file_path = os.path.join(settings.output_dir, "resume.pdf")
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="PDF not found. Generate a resume first.")
    return FileResponse(
        file_path, media_type="application/pdf", filename="resume.pdf"
    )


@app.get("/download/docx")
def download_docx():
    """Download the generated resume as DOCX."""
    file_path = os.path.join(settings.output_dir, "resume.docx")
    if not os.path.isfile(file_path):
        raise HTTPException(
            status_code=404,
            detail="DOCX not found. Generate a resume first.",
        )
    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="resume.docx",
    )
