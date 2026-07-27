# Makefile - proxy to npm scripts
.PHONY: dev build preview lint help

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

help:
	@echo "Available targets:"
	@echo "  make dev      - Run development server (vite)"
	@echo "  make build    - Build for production (tsc && vite build)"
	@echo "  make preview  - Preview production build (vite preview)"
	@echo "  make lint     - Run ESLint"

