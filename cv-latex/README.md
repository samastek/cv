# LaTeX CV - Sami Alzein

Professional CV generated from resume data using LaTeX and the moderncv class.

## Prerequisites

You need a LaTeX distribution installed on your system:

### macOS
```bash
brew install --cask mactex
# or for a smaller installation
brew install --cask basictex
```

### Ubuntu/Debian
```bash
sudo apt-get install texlive-latex-base texlive-latex-extra
```

### Windows
Download and install [MiKTeX](https://miktex.org/download) or [TeX Live](https://www.tug.org/texlive/)

## Building the PDF

### Using Make (Recommended)
```bash
# Build PDF
make pdf

# Build and view PDF (macOS)
make show

# Clean auxiliary files
make clean

# Clean everything including PDF
make cleanall
```

### Manual Build
```bash
# Run twice to resolve all references
pdflatex main.tex
pdflatex main.tex
```

## Output

The generated PDF will be named `main.pdf` in the same directory.

## Customization

Edit `main.tex` to customize:
- Personal information in the preamble
- Color scheme (moderncvcolor)
- Style (moderncvstyle: casual, classic, banking, oldstyle, fancy)
- Content sections

## Structure

```
cv-latex/
├── main.tex      # Main LaTeX file with CV content
├── Makefile      # Build automation
└── README.md     # This file
```

## Syncing with Web CV

This CV is based on the data from `../src/data/resume-data.tsx`. To update:
1. Make changes in the TypeScript resume data
2. Manually update corresponding sections in `main.tex`

## License

Personal CV - All Rights Reserved
