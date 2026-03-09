# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use npm install to ensure we get exactly what package-lock wants, falling back if needed
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
