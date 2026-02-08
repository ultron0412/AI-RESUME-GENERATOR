from fastapi import FastAPI
from pydantic import BaseModel
from .ai_enhancer import enhance_text

app = FastAPI()

class RewriteRequest(BaseModel):
    text: str

@app.post("/ai-rewrite")
def ai_rewrite(req: RewriteRequest):
    rewritten = enhance_text(req.text)
    return { "rewritten": rewritten }
