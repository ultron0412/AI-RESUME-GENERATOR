"""
AI text enhancement using LM Studio (OpenAI-compatible API).
Rewrites resume content professionally.
"""

import logging
import requests

from .config import settings

logger = logging.getLogger(__name__)


def enhance_text(text: str) -> str:
    """Enhance resume text using LM Studio AI.

    Falls back to original text if LM Studio is unavailable or errors.
    """
    if not text or not text.strip():
        return text

    prompt = (
        "You are an expert resume writer. "
        "Rewrite the following text professionally and concisely for a resume:\n\n"
        f"{text}"
    )

    payload = {
        "model": settings.lm_studio_model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": settings.lm_studio_temperature,
        "max_tokens": settings.lm_studio_max_tokens,
    }

    try:
        response = requests.post(
            settings.lm_studio_url,
            json=payload,
            timeout=settings.lm_studio_timeout,
        )
        response.raise_for_status()
        data = response.json()
        rewritten = data["choices"][0]["message"]["content"].strip()
        logger.info("AI rewrite successful (input=%d chars, output=%d chars)",
                     len(text), len(rewritten))
        return rewritten

    except requests.ConnectionError:
        logger.warning("LM Studio unavailable at %s", settings.lm_studio_url)
        return text
    except requests.Timeout:
        logger.warning("LM Studio request timed out after %ds", settings.lm_studio_timeout)
        return text
    except requests.HTTPError as e:
        logger.error("LM Studio HTTP error: %s", e)
        return text
    except (KeyError, IndexError) as e:
        logger.error("Unexpected LM Studio response format: %s", e)
        return text
    except Exception as e:
        logger.error("LM Studio unexpected error: %s", e)
        return text
