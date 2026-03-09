# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# ci works better but fallback to install if package-lock is out of sync
RUN npm install
COPY . .

# Production stage
FROM node:20-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy from build stage
COPY --from=build --chown=appuser:appgroup /app/package*.json ./
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/controllers ./controllers
COPY --from=build --chown=appuser:appgroup /app/routes ./routes
COPY --from=build --chown=appuser:appgroup /app/app.js ./
COPY --from=build --chown=appuser:appgroup /app/server.js ./

# Switch to non-root user
USER appuser

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
