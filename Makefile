# Makefile for Curriculum Vitae Deployment
# Usage: make <target>

.PHONY: help deploy

# Colors
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

# Default target
help:
	@echo "Curriculum Vitae - Deployment Makefile"
	@echo ""
	@echo "Available targets:"
	@echo "  make deploy    - Deploy to Hostinger VPS"
	@echo ""

# Deploy to Hostinger VPS
deploy:
	@echo "$(YELLOW)Deploying to Hostinger VPS...$(NC)"
	./scripts/deploy.sh
