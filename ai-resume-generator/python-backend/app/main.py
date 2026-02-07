from fastapi import FastAPI
from .models import ResumeData
from .resume_generator import build_resume
from .file_exporter import export_docx, export_pdf

app = FastAPI()

@app.post("/generate-resume")
def generate_resume(data: ResumeData):
    resume_text = build_resume(data)
    export_docx(resume_text)
    export_pdf(resume_text)
    return {"message": "Resume generated"}
