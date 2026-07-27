# Makefile - proxy to npm scripts and TeX build
.PHONY: dev build preview lint help tex build-tex build-cv build-cover-letter clean clean-tex

# React application targets
dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

# TeX source targets
TEX_DIR = tex-source
TEX_FILES = $(wildcard $(TEX_DIR)/*.tex)

build-tex: $(patsubst $(TEX_DIR)/%.tex,$(TEX_DIR)/%.pdf,$(TEX_FILES))

$(TEX_DIR)/%.pdf: $(TEX_DIR)/%.tex
	latexmk -pdf -quiet -cd -outdir=$(TEX_DIR) $<

build-cv: $(TEX_DIR)/cv_cz.pdf $(TEX_DIR)/cv_en.pdf

build-cover-letter: $(TEX_DIR)/Cover_Letter_cz.pdf $(TEX_DIR)/Cover_Letter_en.pdf

tex: build-tex

# Clean targets
clean-tex:
	@echo "Cleaning TeX build artifacts..."
	@cd $(TEX_DIR) && rm -f *.aux *.log *.toc *.bbl *.blg *.out *.synctex* *.fdb_latexmk *.dvi *.xdv *.fls *.fmt *.fot *.cb *.cb2 *.idx *.ind *.ilg latex.out 2>/dev/null || true
	@rm -f $(TEX_DIR)/*.pdf

clean: clean-tex
	npm run clean 2>/dev/null || true

# Default target builds both React and TeX
build-all: build build-tex

# Help
help:
	@echo "Available targets:"
	@echo ""
	@echo "  React Application:"
	@echo "    make dev           - Run development server (vite)"
	@echo "    make build         - Build React for production (tsc && vite build)"
	@echo "    make preview       - Preview production build (vite preview)"
	@echo "    make lint          - Run ESLint"
	@echo ""
	@echo "  TeX/LaTeX:"
	@echo "    make tex           - Build all TeX files to PDF"
	@echo "    make build-tex     - Build all TeX files to PDF"
	@echo "    make build-cv      - Build CV files (cz + en)"
	@echo "    make build-cover-letter - Build cover letter files (cz + en)"
	@echo ""
	@echo "  Combined:"
	@echo "    make build-all     - Build both React and TeX"
	@echo ""
	@echo "  Clean:"
	@echo "    make clean         - Clean TeX artifacts and run npm clean"
	@echo "    make clean-tex     - Clean only TeX build artifacts"

