# Use lightweight nginx alpine image
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static files to nginx web root
COPY cv_en.pdf cv_cz.pdf Cover_Letter_en.pdf /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY index.html /usr/share/nginx/html/

# Set environment variables for health checks
ENV NGINX_VERSION=alpine

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
