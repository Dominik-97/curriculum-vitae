# Deployment Guide

This guide covers the simplified deployment of your Curriculum Vitae to Hostinger VPS using Docker and Traefik.

## Quick Start

### Prerequisites

- Docker installed on Hostinger VPS
- Traefik running on VPS with host network mode
- Docker network `traefik_network` exists on VPS
- SSH key authentication set up on Hostinger VPS
- GitHub SSH key added to repository secrets

### Deploy via GitHub Actions (Recommended)

1. Set up the following GitHub repository secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `HOSTINGER_USER` | SSH username | `root` |
| `HOSTINGER_HOST` | VPS IP or domain | `123.123.123.123` |
| `HOSTINGER_SSH_PORT` | SSH port | `22` |
| `HOSTINGER_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `HOSTINGER_DEPLOY_PATH` | Remote deployment path | `/root/cv` |
| `SUBDOMAIN` | Subdomain for Traefik | `cv` |
| `TRAEFIK_HOST` | Domain for Traefik | `example.com` |
| `TZ` | Timezone | `Europe/Bratislava` |

2. Push to `main` or `gh-pages` branch, or manually trigger the workflow in GitHub Actions.

3. Your CV will be automatically deployed to `https://cv.yourdomain.com`

### Deploy Manually

```bash
# Set your VPS details
export HOSTINGER_HOST=your-vps-ip
export TRAEFIK_HOST=yourdomain.com

# Optional settings
export SUBDOMAIN=cv                    # default: cv
export HOSTINGER_USER=root             # default: root
export HOSTINGER_SSH_PORT=22           # default: 22
export HOSTINGER_DEPLOY_PATH=/root/cv # default: /root/cv
export TZ=Europe/Bratislava            # default: UTC

# Run deployment
./scripts/deploy.sh
```

## Docker Compose File

The production docker-compose file (`docker-compose.hostinger.yml`) is configured to:

- Pull the Docker image from GHCR (`ghcr.io/dominik-97/curriculum-vitae:latest`)
- Connect to your existing `traefik_network`
- Use Traefik labels for automatic HTTPS routing
- Automatically get SSL certificates via Let's Encrypt

## Configuration

### Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `HOSTINGER_HOST` | - | Yes | VPS IP or domain |
| `TRAEFIK_HOST` | - | Yes | Your domain (e.g., example.com) |
| `HOSTINGER_USER` | root | No | SSH username |
| `HOSTINGER_SSH_PORT` | 22 | No | SSH port |
| `HOSTINGER_DEPLOY_PATH` | /root/cv | No | Remote deployment path |
| `SUBDOMAIN` | cv | No | Subdomain for Traefik |
| `TZ` | UTC | No | Timezone |

### On Hostinger VPS

1. **Store GHCR Token** (one-time setup):
   ```bash
   echo "your_github_personal_access_token" > ~/.ghcr-token
   ```

2. **Ensure Traefik is running** with your existing configuration.

3. **Ensure `traefik_network` exists**:
   ```bash
   docker network create traefik_network
   ```

## Updating

When you make changes to your CV:

1. Commit and push to `main` or `gh-pages` branch
2. GitHub Actions will automatically:
   - Build the Docker image
   - Push to GHCR
   - Deploy to Hostinger VPS

Or run manually:
```bash
./scripts/deploy.sh
```

## Files

| File | Purpose |
|------|---------|
| `docker-compose.hostinger.yml` | Production docker-compose for Hostinger |
| `.env.hostinger` | Environment variables template |
| `scripts/deploy.sh` | Deployment script |
| `.github/workflows/deploy.yml` | GitHub Actions workflow |

## Traefik Configuration

Your existing Traefik configuration works with this setup. The docker-compose file uses labels that match your Traefik pattern:

```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.${SUBDOMAIN}.rule=Host(`${SUBDOMAIN}.${TRAEFIK_HOST}`)
  - traefik.http.routers.${SUBDOMAIN}.entrypoints=websecure
  - traefik.http.routers.${SUBDOMAIN}.tls.certresolver=letsencrypt
  - traefik.http.services.${SUBDOMAIN}.loadbalancer.server.port=80
```

## Troubleshooting

### SSH Connection Issues

```bash
# Test SSH connection
ssh -T user@your-vps

# Ensure your key is added to ssh-agent
ssh-add ~/.ssh/id_rsa
```

### Docker Pull Issues

On your VPS:
```bash
# Login to GHCR
echo "your_token" | docker login ghcr.io -u dominik-97 --password-stdin

# Or use the pre-configured token file
cat ~/.ghcr-token | docker login ghcr.io -u dominik-97 --password-stdin
```

### Traefik Not Routing

```bash
# Check Traefik logs
docker logs traefik

# Verify container labels
docker inspect curriculum-vitae | grep -A5 Labels

# Check network connectivity
docker network inspect traefik_network
```

### Manual Verification

```bash
# Check container is running
docker ps

# View logs
docker logs curriculum-vitae

# Test the application
curl https://cv.yourdomain.com
```
