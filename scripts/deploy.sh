#!/bin/bash

# =============================================================================
# Deployment Script for Hostinger VPS
# Uses SSH key authentication (no password needed)
#
# This script copies the docker-compose file to your VPS and starts the container.
# The Docker image must already be pushed to GHCR (done by GitHub Actions).
#
# Usage: ./scripts/deploy.sh
#
# Environment variables:
#   HOSTINGER_USER - SSH username (default: root)
#   HOSTINGER_HOST - VPS IP or domain (REQUIRED)
#   HOSTINGER_SSH_PORT - SSH port (default: 22)
#   HOSTINGER_DEPLOY_PATH - Remote path to deploy (default: /root/cv)
#   SUBDOMAIN - Subdomain for Traefik (default: cv)
#   TRAEFIK_HOST - Domain for Traefik (REQUIRED)
#   TZ - Timezone (default: UTC)
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "${SCRIPT_DIR}")"

# Configuration from environment or defaults
HOSTINGER_USER="${HOSTINGER_USER:-root}"
HOSTINGER_HOST="${HOSTINGER_HOST:-your-vps-ip}"
HOSTINGER_SSH_PORT="${HOSTINGER_SSH_PORT:-22}"
HOSTINGER_DEPLOY_PATH="${HOSTINGER_DEPLOY_PATH:-/root/cv}"
SUBDOMAIN="${SUBDOMAIN:-cv}"
TRAEFIK_HOST="${TRAEFIK_HOST:-yourdomain.com}"
TZ="${TZ:-UTC}"

# Validate required variables
if [ -z "$HOSTINGER_HOST" ]; then
    echo -e "${RED}✗ ERROR: HOSTINGER_HOST must be set${NC}"
    echo "   Example: HOSTINGER_HOST=123.123.123.123"
    exit 1
fi

if [ -z "$TRAEFIK_HOST" ]; then
    echo -e "${RED}✗ ERROR: TRAEFIK_HOST must be set${NC}"
    echo "   Example: TRAEFIK_HOST=example.com"
    exit 1
fi

# Print configuration
echo -e "${BLUE}==========================================================================${NC}"
echo -e "  Hostinger Deployment"
echo -e "==========================================================================${NC}"
echo -e "  Host:            ${YELLOW}${HOSTINGER_USER}@${HOSTINGER_HOST}:${HOSTINGER_SSH_PORT}${NC}"
echo -e "  Deploy Path:     ${YELLOW}${HOSTINGER_DEPLOY_PATH}${NC}"
echo -e "  Domain:          ${YELLOW}${SUBDOMAIN}.${TRAEFIK_HOST}${NC}"
echo -e "  Timezone:        ${YELLOW}${TZ}${NC}"
echo -e "==========================================================================${NC}"
echo ""

# Step 1: Copy files to VPS via SSH (using SSH key auth)
echo -e "${YELLOW}[Step 1/2] Copying files to Hostinger VPS via SSH...${NC}"

# Create a temporary directory for deployment files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Create .env file for VPS
cat > "$TEMP_DIR/.env" << EOF
# Hostinger VPS Configuration
SUBDOMAIN=${SUBDOMAIN}
TRAEFIK_HOST=${TRAEFIK_HOST}
TZ=${TZ}
EOF

# Copy docker-compose and env files
if ! scp -P "${HOSTINGER_SSH_PORT}" \
    "${PROJECT_DIR}/docker-compose.hostinger.yml" \
    "$TEMP_DIR/.env" \
    "${HOSTINGER_USER}@${HOSTINGER_HOST}:${HOSTINGER_DEPLOY_PATH}/" 2>/dev/null; then
    # If scp fails, try creating the directory first
    echo -e "${YELLOW}Creating remote directory...${NC}"
    ssh -p "${HOSTINGER_SSH_PORT}" "${HOSTINGER_USER}@${HOSTINGER_HOST}" \
        "mkdir -p ${HOSTINGER_DEPLOY_PATH}"
    
    scp -P "${HOSTINGER_SSH_PORT}" \
        "${PROJECT_DIR}/docker-compose.hostinger.yml" \
        "$TEMP_DIR/.env" \
        "${HOSTINGER_USER}@${HOSTINGER_HOST}:${HOSTINGER_DEPLOY_PATH}/"
fi

echo -e "${GREEN}✓ Files copied to VPS${NC}"

# Step 2: Deploy on VPS
echo -e "${YELLOW}[Step 2/2] Running docker compose on Hostinger VPS...${NC}"

# Build the remote commands
REMOTE_COMMANDS=$(cat << EOF
set -e
cd ${HOSTINGER_DEPLOY_PATH}

# Login to GHCR (uses pre-configured token on VPS)
if [ -f ~/.ghcr-token ]; then
    echo "Logging in to GHCR..."
    cat ~/.ghcr-token | docker login ghcr.io -u dominik-97 --password-stdin
fi

# Pull latest image and start containers
echo "Pulling latest image..."
docker compose -f docker-compose.hostinger.yml pull

echo "Starting containers..."
docker compose -f docker-compose.hostinger.yml up -d

# Clean up old images
docker image prune -f

# Verify
echo ""
echo "Verifying deployment..."
if docker ps | grep -q curriculum-vitae; then
    echo "✓ Container is running"
    echo ""
    echo "Deployment successful!"
    echo "Access at: https://${SUBDOMAIN}.${TRAEFIK_HOST}"
else
    echo "✗ Failed to start container"
    docker logs curriculum-vitae 2>&1 | tail -20
    exit 1
fi
EOF
)

# Execute via SSH (using SSH key authentication)
ssh -p "${HOSTINGER_SSH_PORT}" "${HOSTINGER_USER}@${HOSTINGER_HOST}" "$REMOTE_COMMANDS"

# Success
echo ""
echo -e "${BLUE}==========================================================================${NC}"
echo -e "  ✓ Deployment Complete!"
echo -e "==========================================================================${NC}"
echo -e "  Your CV is now live at: ${GREEN}https://${SUBDOMAIN}.${TRAEFIK_HOST}${NC}"
echo -e "  Traefik handles HTTPS automatically via Let's Encrypt"
echo -e "${NC}"
