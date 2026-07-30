# Multi-stage Docker build for React + Vite static site
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies (use npm ci if lockfile exists, otherwise npm install)
RUN if [ -f package-lock.json ]; then \
    echo "Using npm ci with existing lockfile" && \
    npm ci; \
  else \
    echo "No lockfile found, using npm install" && \
    npm install; \
  fi

# Copy all source files
COPY . .

# Optional analytics config, injected at build time (Vite inlines VITE_* vars).
# Provide via `docker build --build-arg` or the CI build-args (see deploy.yml).
ARG VITE_UMAMI_SRC=""
ARG VITE_UMAMI_WEBSITE_ID=""
ENV VITE_UMAMI_SRC=$VITE_UMAMI_SRC
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID

# Build the application
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Install curl (for healthcheck)
RUN apk add --no-cache curl

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/cv.conf

# Expose port 80 (Traefik will handle HTTPS and routing)
EXPOSE 80

# Health check (hits the dedicated /health endpoint in nginx.conf)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
