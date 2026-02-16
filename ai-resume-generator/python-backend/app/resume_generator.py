from .ai_enhancer import enhance_text

def build_resume(data):
    return f"""
{data.name}
{data.email} | {data.phone}

OBJECTIVE
{enhance_text(data.objective)}

SKILLS
{enhance_text(data.skills)}     \** Skills are often best presented as bullet points, so we can enhance them as a list.

EXPERIENCE
{enhance_text(data.experience)}
"""
