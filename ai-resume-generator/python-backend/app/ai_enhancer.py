import requests

LM_STUDIO_URL = "http://192.168.52.1:1234"

def enhance_text(text: str) -> str:
    if not text or not text.strip():
        return text

    payload = {
        "model": "local-model",
        "messages": [
            {
                "role": "system",
                "content": "You are an expert resume writer. Improve text professionally and concisely."
            },
            {
                "role": "user",
                "content": text
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
