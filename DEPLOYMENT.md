# CV Application Deployment Guide

This guide covers the deployment of the CV application using Docker Compose with CI/CD pipelines for both GitHub Actions and GitLab CI.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker Development
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🏗️ Production Deployment

### Prerequisites

- Docker & Docker Compose installed
- Domain name configured
- SSL certificate setup (automatic with Traefik)
- Server with at least 1GB RAM and 1 CPU core

### Environment Setup

1. **Copy environment file:**
   ```bash
   cp .env.example .env.production
   ```

2. **Update environment variables:**
   ```bash
   # Edit the production environment file
   nano .env.production
   ```

   Key variables to update:
   - `DOMAIN`: Your domain name (e.g., cv.yourdomain.com)
   - `ACME_EMAIL`: Email for SSL certificate
   - `DOCKER_REGISTRY`: Your Docker registry URL

### Deployment Options

#### Option 1: Manual Deployment
```bash
# Using the deployment script
./deploy.sh deploy

# Or directly with Docker Compose
docker-compose -f docker-compose.prod.yaml up -d
```

#### Option 2: Automated CI/CD

**GitHub Actions:**
1. Fork the repository
2. Set up the following secrets in GitHub:
   - `STAGING_HOST`, `STAGING_USER`, `STAGING_SSH_KEY`
   - `PRODUCTION_HOST`, `PRODUCTION_USER`, `PRODUCTION_SSH_KEY`
   - `STAGING_DOMAIN`, `PRODUCTION_DOMAIN`
   - `ACME_EMAIL`

**GitLab CI:**
1. Push to GitLab repository
2. Set up the following variables in GitLab CI/CD settings:
   - `STAGING_HOST`, `STAGING_USER`, `STAGING_SSH_PRIVATE_KEY`
   - `PRODUCTION_HOST`, `PRODUCTION_USER`, `PRODUCTION_SSH_PRIVATE_KEY`
   - `STAGING_DOMAIN`, `PRODUCTION_DOMAIN`
   - `ACME_EMAIL`

## 🐳 Docker Configuration

### Multi-Stage Build

The production Dockerfile (`Dockerfile.prod`) uses a multi-stage build for optimal image size:

1. **Dependencies stage**: Install only production dependencies
2. **Builder stage**: Build the Next.js application
3. **Runner stage**: Create minimal runtime image

### Services

#### Core Services
- **cv-app**: Main Next.js application
- **traefik**: Reverse proxy with automatic SSL
- **watchtower**: Automatic container updates (optional)

#### Optional Services (using profiles)
- **redis**: Caching layer (`--profile cache`)
- **postgres**: Analytics database (`--profile analytics`)

### Service Profiles

```bash
# Run with caching
docker-compose -f docker-compose.prod.yaml --profile cache up -d

# Run with analytics
docker-compose -f docker-compose.prod.yaml --profile analytics up -d

# Run with auto-updates
docker-compose -f docker-compose.prod.yaml --profile auto-update up -d
```

## 🔧 Management Commands

### Using Deployment Script

```bash
# Deploy application
./deploy.sh deploy

# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Perform health check
./deploy.sh health

# Create backup
./deploy.sh backup

# Rollback deployment
./deploy.sh rollback
```

### Manual Docker Commands

```bash
# View logs
docker-compose -f docker-compose.prod.yaml logs -f cv-app

# Check status
docker-compose -f docker-compose.prod.yaml ps

# Scale application (if needed)
docker-compose -f docker-compose.prod.yaml up -d --scale cv-app=2

# Update services
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d
```

## 🔍 Monitoring & Health Checks

### Health Check Endpoint
- URL: `/api/health`
- Method: GET
- Returns: Application status and metrics

### Monitoring
- **Application logs**: `docker-compose logs cv-app`
- **Traefik dashboard**: `http://your-server:8080` (staging only)
- **Resource usage**: `docker stats`

## 🔒 Security Features

- **Automatic SSL/TLS**: Via Let's Encrypt and Traefik
- **Security headers**: Configured in Next.js
- **Image scanning**: Trivy security scan in CI/CD
- **Non-root user**: Application runs as non-root user
- **Resource limits**: CPU and memory limits configured

## 🚨 Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yaml logs cv-app
   
   # Check resource usage
   docker system df
   ```

2. **SSL certificate issues**
   ```bash
   # Check Traefik logs
   docker-compose -f docker-compose.prod.yaml logs traefik
   
   # Verify domain DNS
   nslookup your-domain.com
   ```

3. **Health check failures**
   ```bash
   # Manual health check
   curl -f http://localhost:3000/api/health
   
   # Check application logs
   docker-compose -f docker-compose.prod.yaml logs cv-app
   ```

### Recovery Procedures

1. **Application crash recovery**
   ```bash
   # Restart service
   docker-compose -f docker-compose.prod.yaml restart cv-app
   
   # Or recreate container
   docker-compose -f docker-compose.prod.yaml up -d --force-recreate cv-app
   ```

2. **Full system recovery**
   ```bash
   # Stop all services
   docker-compose -f docker-compose.prod.yaml down
   
   # Clean up
   docker system prune -af
   
   # Redeploy
   ./deploy.sh deploy
   ```

## 📊 Performance Optimization

### Image Optimization
- Multi-stage builds reduce image size by ~60%
- Alpine Linux base images for minimal footprint
- Standalone Next.js output for optimal runtime

### Runtime Optimization
- Resource limits prevent resource exhaustion
- Health checks ensure service reliability
- Automatic container updates with Watchtower

### Caching Strategy
- Docker layer caching in CI/CD
- Next.js build cache persistence
- Optional Redis for application caching

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

1. **Test Stage**: Lint and build verification
2. **Build Stage**: Multi-arch Docker image build
3. **Deploy Staging**: Automatic deployment to staging
4. **Deploy Production**: Manual approval required
5. **Cleanup**: Remove old container images

### GitLab CI Pipeline

1. **Test Stage**: Code quality and build tests
2. **Build Stage**: Container image creation
3. **Deploy Staging**: Automatic staging deployment
4. **Deploy Production**: Manual production deployment
5. **Security Scan**: Vulnerability assessment
6. **Cleanup**: Image cleanup and maintenance

## 📁 File Structure

```
cv/
├── .github/workflows/deploy.yml    # GitHub Actions workflow
├── .gitlab-ci.yml                  # GitLab CI pipeline
├── docker-compose.yaml             # Development compose file
├── docker-compose.prod.yaml        # Production compose file
├── Dockerfile                      # Development dockerfile
├── Dockerfile.prod                 # Production dockerfile
├── deploy.sh                       # Deployment script
├── .env.example                   # Environment template
└── src/app/api/health/route.ts    # Health check endpoint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `docker-compose up`
5. Submit a pull request

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify environment configuration
4. Test health check endpoint

---

**Note**: Remember to update domain names, registry URLs, and secrets before deploying to production!
