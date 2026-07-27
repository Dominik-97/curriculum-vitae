# curriculum-vitae

My personal curriculum vitae website, built as a static site with periodic updates. This repository contains both a React-based web application and LaTeX source files for PDF distribution.

You can find the React-based web version [here](https://cv.dominik-97.cloud), alternatively you can download the PDF distributing from the repository [releases](https://github.com/Dominik-97/curriculum-vitae/releases).

## About

This repository contains the source code for my professional CV/portfolio, available in two formats:

1. **Web Application**: A React-based static website with interactive features
2. **PDF Distribution**: LaTeX source files that can be compiled to PDF documents

The web application is built using modern technologies and deployed automatically via CI/CD, while the LaTeX files allow for generating printable PDF versions of the CV and cover letters.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Containerization**: Docker (multi-stage build with Nginx)
- **CI/CD**: GitHub Actions
- **Deployment**: Hostinger VPS with Docker Compose and Traefik (for HTTPS)
- **Document Generation**: LaTeX (for PDF exports)

## Project Structure

```
curriculum-vitae/
├── src/                  # React source code
│   ├── App.tsx           # Main application component
│   ├── components/       # React components
│   ├── data/             # CV data (JSON)
│   └── styles/           # Global styles
├── public/               # Static assets
├── tex-source/           # LaTeX source files
│   ├── cv_cz.tex         # CV - Czech version
│   ├── cv_en.tex         # CV - English version
│   ├── cv_information_cz.tex
│   ├── cv_information_en.tex
│   ├── Cover_Letter_cz.tex
│   └── Cover_Letter_en.tex
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

### React Application

| Command | Description |
|---------|-------------|
| `make dev` / `npm run dev` | Start development server (Vite) |
| `make build` / `npm run build` | Build for production |
| `make preview` / `npm run preview` | Preview production build |
| `make lint` / `npm run lint` | Run ESLint |

### TeX/LaTeX (PDF Generation)

| Command | Description |
|---------|-------------|
| `make tex` / `make build-tex` | Build all TeX files to PDF |
| `make build-cv` | Build CV files (Czech + English) |
| `make build-cover-letter` | Build cover letter files (Czech + English) |
| `make clean-tex` | Remove TeX build artifacts |

### Combined

| Command | Description |
|---------|-------------|
| `make build-all` | Build both React app and all TeX files |
| `make clean` | Clean TeX artifacts and run npm clean |
| `make help` | Display all available commands |

## Deployment

The site is automatically built and deployed on push to the `main` branch via GitHub Actions:

1. Docker image is built and pushed to GitHub Container Registry (GHCR)
2. Image is pulled and deployed to Hostinger VPS
3. Traefik handles HTTPS with Let's Encrypt certificates

The live site is available at the domain configured in the deployment workflow.

## PDF Distribution

To generate PDF versions of the CV and cover letters:

```bash
# Build all PDFs
make tex

# Or build specific documents
make build-cv           # Build CV files
make build-cover-letter # Build cover letters
```

The generated PDF files will be placed in the `tex-source/` directory.

To clean up LaTeX build artifacts:
```bash
make clean-tex
```

## History

Previously, this repository contained:
- A Markdown version rendered as a static HTML page via Jekyll (hosted on GitHub Pages)
- A LaTeX version exported to PDF

The current iteration combines a React-based static site with maintained LaTeX source files, offering both an interactive web experience and the ability to generate printable PDF documents.
