from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from .resume_generator import build_resume
from .file_exporter import export_pdf, export_docx
from .ai_enhancer import enhance_text

app = FastAPI()

class ResumeData(BaseModel):
    name: str
    email: str
    phone: str
    skills: str
    experience: str
    objective: str

class RewriteRequest(BaseModel):
    text: str

@app.post("/generate-resume")
def generate_resume(data: ResumeData):
    resume_text = f"""
{data.name}
{data.email} | {data.phone}

CAREER OBJECTIVE
{enhance_text(data.objective)}

SKILLS
{enhance_text(data.skills)}

EXPERIENCE
{enhance_text(data.experience)}
"""
    export_pdf(resume_text)
    export_docx(resume_text)
    return {"message": "Resume generated successfully"}

@app.post("/ai-rewrite")
def ai_rewrite(req: RewriteRequest):
    return {"rewritten": enhance_text(req.text)}

@app.get("/download/pdf")
def download_pdf():
    return FileResponse("output/resume.pdf", media_type="application/pdf", filename="resume.pdf")

@app.get("/download/docx")
def download_docx():
    return FileResponse(
        "output/resume.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="resume.docx"
    )
