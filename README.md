# curriculum-vitae

My personal curriculum vitae website, built as a static site with periodic updates.

## About

This repository contains the source code for my professional CV/portfolio website. The site is built using modern web technologies and deployed automatically via CI/CD.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Containerization**: Docker (multi-stage build with Nginx)
- **CI/CD**: GitHub Actions
- **Deployment**: Hostinger VPS with Docker Compose and Traefik (for HTTPS)

## Project Structure

```
curriculum-vitae/
├── src/                  # React source code
│   ├── App.tsx           # Main application component
│   ├── components/       # React components
│   ├── data/             # CV data (JSON)
│   └── styles/           # Global styles
├── public/               # Static assets
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.hostinger.yml  # Production deployment config
├── .github/workflows/    # GitHub Actions CI/CD
│   ├── deploy.yml        # Build & deploy to Hostinger
│   └── deploy-redirect.yml
├── nginx.conf            # Nginx server configuration
├── package.json          # Dependencies & npm scripts
├── vite.config.ts        # Vite configuration
└── Makefile              # Convenience commands
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `make dev` / `npm run dev` | Start development server (Vite) |
| `make build` / `npm run build` | Build for production |
| `make preview` / `npm run preview` | Preview production build |
| `make lint` / `npm run lint` | Run ESLint |

## Deployment

The site is automatically built and deployed on push to `main` or `gh-pages` branches via GitHub Actions:

1. Docker image is built and pushed to GitHub Container Registry (GHCR)
2. Image is pulled and deployed to Hostinger VPS
3. Traefik handles HTTPS with Let's Encrypt certificates

The live site is available at the domain configured in the deployment workflow.

## History

Previously, this repository contained:
- A Markdown version rendered as a static HTML page via Jekyll (hosted on GitHub Pages)
- A LaTeX version exported to PDF

The current iteration is a React-based static site offering better interactivity and maintainability.
