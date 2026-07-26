# Makefile for building and deploying the CV

.PHONY: build docker-build docker-up docker-down docker-restart docker-logs

# Build PDFs from LaTeX source (requires pdflatex)
build:
	cd tex-source && pdflatex cv_en.tex && pdflatex cv_en.tex
	cd tex-source && pdflatex cv_cz.tex && pdflatex cv_cz.tex
	cd tex-source && pdflatex Cover_Letter_en.tex && pdflatex Cover_Letter_en.tex
	# Copy built PDFs to root
	cp tex-source/cv_en.pdf .
	cp tex-source/cv_cz.pdf .
	cp tex-source/Cover_Letter_en.pdf .

# Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-restart:
	docker-compose down && docker-compose up -d

docker-logs:
	docker-compose logs -f

# Clean generated files
clean:
	rm -f tex-source/*.aux tex-source/*.log tex-source/*.out tex-source/*.toc tex-source/*.bbl tex-source/*.blg
	docker-compose down
