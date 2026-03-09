"""
Centralized configuration using Pydantic Settings.
All environment variables are loaded and validated here.
"""

import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # LM Studio
    lm_studio_url: str = "http://localhost:1234/v1/chat/completions"
    lm_studio_model: str = "mistralai/mistral-7b-instruct-v0.3"
    lm_studio_timeout: int = 60
    lm_studio_max_tokens: int = 200
    lm_studio_temperature: float = 0.4

    # CORS
    allowed_origins: str = "*"

    # Output directory
    output_dir: str = "output"

    # App
    app_name: str = "AI Resume Generator API"
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()
