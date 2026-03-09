# AI Resume Generator

An enterprise-ready AI Resume Generator that parses, enhances, and formats user inputs into professional PDF and DOCX resumes, powered by a 3-tier architecture.

## Architecture
1. **Frontend**: React + Vite SPA with modern, glassmorphic UI. Served via Nginx in production.
2. **Proxy Server**: Node.js + Express API gateway handling routing, security, validation, and rate limiting.
3. **Backend Engine**: Python + FastAPI service responsible for layout generation, multi-format export (ReportLab, python-docx), and AI processing.
4. **AI Inference**: Integrates with local LM Studio instances to rewrite and enhance resume bullet points and objectives.

## Prerequisites
- **Docker** and **Docker Compose**
- **LM Studio** (optional, but required for the "AI Rewrite" features).
  - Download from [lmstudio.ai](https://lmstudio.ai/).
  - Load an instruction-following model (like `mistral-7b-instruct-v0.3`).
  - Start the Local Inference Server on port `1234`.

## Getting Started (Production)

To run the full production stack using Docker Compose:

1. Create an environment file:
   ```bash
   cp .env.example .env
   ```
2. Build and start the containers:
   ```bash
   docker compose up -d --build
   ```
3. Open your browser:
   - Frontend: `http://localhost`
   - Python Backend docs: `http://localhost:8000/docs` (if debug mode is on)

## Local Development

To run with hot-reloading for local development:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
- Client runs on `http://localhost:5173`
- Node Proxy on `http://localhost:5000`
- Python Backend on `http://localhost:8000`

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Node server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `ALLOWED_ORIGINS` | CORS origins | `http://localhost` |
| `PYTHON_BACKEND_URL` | Internal Python service URL | `http://python-backend:8000` |
| `LM_STUDIO_URL` | Local LM Studio endpoint | `http://host.docker.internal:1234/v1/chat/completions` |
| `LM_STUDIO_MODEL` | HuggingFace model ID loaded | `mistralai/mistral-7b-instruct-v0.3` |

## Security Features
- **Helmet**: Secures Node API headers.
- **Express Rate Limit**: Protects against DDOS / spam requests.
- **Express Validator**: Sanitizes JSON payloads.
- **Payload Limits**: Rejects large bodies to prevent memory exhaustion.
- **Non-root Docker**: All Docker containers drop privileges correctly.
- **Healthchecks**: Docker ensures system integrity continuously.

## License
MIT License.
