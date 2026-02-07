from docx import Document
from reportlab.pdfgen import canvas

def export_docx(content):
    doc = Document()
    doc.add_paragraph(content)
    doc.save("output/resume.docx")

def export_pdf(content):
    c = canvas.Canvas("output/resume.pdf")
    text = c.beginText(40, 800)
    for line in content.split("\n"):
        text.textLine(line)
    c.drawText(text)
    c.save()
