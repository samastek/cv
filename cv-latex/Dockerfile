FROM texlive/texlive:latest

# Install moderncv and other useful packages
RUN tlmgr update --self && \
    tlmgr install moderncv \
    fontawesome5 \
    multirow \
    arydshln \
    xcolor \
    geometry \
    fancyhdr \
    hyperref

WORKDIR /workspace

# Default command to build the PDF
CMD ["make", "pdf"]
