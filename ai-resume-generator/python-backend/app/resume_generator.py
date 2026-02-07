from .ai_enhancer import enhance_text

def build_resume(data):
    return f"""
{data.name}
{data.email} | {data.phone}

OBJECTIVE
{enhance_text(data.objective)}

SKILLS
{enhance_text(data.skills)}

EXPERIENCE
{enhance_text(data.experience)}
"""
