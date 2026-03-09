from pydantic import BaseModel

class ResumeData(BaseModel):
    name: str
    email: str
    phone: str
    skills: str
    experience: str
    objective: str
    education: str = ""
    projects: str = ""
    linkedin: str = ""
    github: str = ""
    portfolio: str = ""

class RewriteRequest(BaseModel):
    text: str
