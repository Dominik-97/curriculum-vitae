# curriculum-vitae
My curriculum vitae with periodic updates.

## Current Setup

This repository now contains a Docker-based deployment for serving CV files on a VPS with Traefik reverse proxy.

### What's Included

- **LaTeX source files** in `tex-source/` - Source files for CV and cover letters
- **Generated PDF files** - Compiled CVs in English and Czech, plus English cover letter
- **Docker configuration** - Dockerfile and docker-compose.yml for containerized deployment
- **Static HTML page** - Simple index page for easy navigation to PDF downloads

## Deployment Options

### Option 1: GitHub Pages (Legacy)

The PDF files can still be served directly via GitHub Pages by enabling GitHub Pages on the main branch.

### Option 2: Docker on VPS with Traefik (Recommended)

This is the new recommended deployment method for your Hostinger VPS.

#### Prerequisites

- Docker installed on VPS
- Docker Compose installed
- Traefik running with proper network configuration
- Domain name pointing to your VPS

#### Setup Instructions

1. **Clone the repository on your VPS:**
   ```bash
   git clone https://github.com/Dominik-97/curriculum-vitae.git
   cd curriculum-vitae
   ```

2. **Update the domain in docker-compose.yml:**
   ```yaml
   - "traefik.http.routers.cv.rule=Host(`cv.yourdomain.com`)"
   ```
   Replace `cv.yourdomain.com` with your actual domain.

3. **Ensure Traefik network exists:**
   ```bash
   docker network create traefik_public
   ```

4. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

5. **Verify it's running:**
   ```bash
   docker-compose logs -f
   ```

6. **Access your CV at:** `https://cv.yourdomain.com`

#### Updating Content

1. Make changes to LaTeX source files in `tex-source/`
2. Rebuild PDFs (locally or on VPS):
   ```bash
   make build
   ```
3. Rebuild and restart Docker container:
   ```bash
   make docker-restart
   ```

## Available Make Commands

- `make build` - Build PDFs from LaTeX source
- `make docker-build` - Build Docker image
- `make docker-up` - Start container
- `make docker-down` - Stop container
- `make docker-restart` - Restart container
- `make docker-logs` - View container logs
- `make clean` - Clean generated files

## File Structure

```
curriculum-vitae/
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose with Traefik labels
├── .dockerignore           # Files to ignore in Docker build
├── Makefile                # Helper commands
├── index.html              # Landing page
├── cv_en.pdf               # English CV
├── cv_cz.pdf               # Czech CV
├── Cover_Letter_en.pdf      # English Cover Letter
├── assets/                 # Image assets
│   ├── Me.png
│   ├── Asseco.jpeg
│   └── ...
└── tex-source/             # LaTeX source files
    ├── cv_en.tex
    ├── cv_cz.tex
    ├── cv_information_en.tex
    ├── cv_information_cz.tex
    ├── Cover_Letter_en.tex
    └── Cover_Letter_cz.tex
```

## TO DO

- [x] Finalize en curriculum vitae.
    - [ ] Check consistency with cz curriculum vitae and markdown curriculum vitae.
- [x] Finalize cz curriculum vitae.
    - [ ] Check consistency with en curriculum vitae and markdown curriculum vitae.
- [ ] Finalize en Cover Letter.
- [ ] Finalize cz Cover Letter.
- [ ] Update docker-compose.yml with your actual domain
