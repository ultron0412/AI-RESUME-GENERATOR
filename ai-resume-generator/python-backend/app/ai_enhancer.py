import requests

LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"

def enhance_text(text: str) -> str:
    if not text.strip():
        return text

    payload = {
        "model": "local-model",
        "messages": [
            {
                "role": "system",
                "content": "You are a professional resume writer."
            },
            {
                "role": "user",
                "content": f"Rewrite the following text professionally for a resume:\n{text}"
            }
        ],
        "temperature": 0.4
    }

    try:
        response = requests.post(LM_STUDIO_URL, json=payload, timeout=30)
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except Exception:
        return text  # fallback if AI fails
