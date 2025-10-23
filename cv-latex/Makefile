.PHONY: all clean pdf view docker-build docker-pdf docker-clean

# Default target
all: pdf

# Build PDF locally
pdf:
	xelatex main.tex
	xelatex main.tex

# Clean auxiliary files
clean:
	rm -f *.aux *.log *.out *.toc *.lot *.lof *.bbl *.blg *.synctex.gz

# Clean everything including PDF
cleanall: clean
	rm -f *.pdf

# View PDF (macOS)
view: pdf
	open main.pdf

# Build and view
show: pdf view

# Docker targets
docker-build:
	docker-compose build

docker-pdf:
	docker-compose run --rm latex

docker-clean:
	docker-compose down
	docker rmi cv-latex-latex 2>/dev/null || true
