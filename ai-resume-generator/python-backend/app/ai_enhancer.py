import requests

LM_STUDIO_URL = "http://192.168.52.1:1234/v1/chat/completions"

def enhance_text(text: str) -> str:
    if not text or not text.strip():
        return text

    prompt = (
        "You are an expert resume writer. "
        "Rewrite the following text professionally and concisely for a resume:\n\n"
        f"{text}"
    )

    payload = {
        "model": "mistralai/mistral-7b-instruct-v0.3",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.4,
        "max_tokens": 200
    }

    try:
        response = requests.post(LM_STUDIO_URL, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print("LM Studio error:", e)
        return text
