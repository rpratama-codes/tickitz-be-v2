# Express Starterkit (Tickitz Backend v2)

## Install

How to install on your local machine:

```bash
git clone https://github.com/kubi-codes/express-starterkit.git
```

## Setup

Create your database and edit `.env`, configuring your credentials:

```env
APP_SECRET_KEY=your_secret_key
APP_URL=https://api.tickitz.rpratama.web.id
PORT=3000

DB_URI=postgresql://user:password@host:port/dbname?sslmode=require
```

Then run the following commands:

```bash
npm install
npx sequelize-cli db:migrate
npm run dev
```

---

## Multi-Platform Docker Build

The application Dockerfile is optimized with a multi-stage build, BuildKit caching, and non-root user permissions to support multi-platform architectures (`linux/amd64`, `linux/arm64`).

### 1. Prerequisites
Ensure Docker Buildx is available (included by default in Docker Desktop and modern Docker CLI versions).

On Linux hosts, install QEMU multi-architecture emulation binaries if not already installed:
```bash
docker run --privileged --rm tonistiigi/binfmt --install all
```

### 2. Create and Use a Buildx Builder
Create a new builder instance with multi-platform support:
```bash
docker buildx create --name multiarch-builder --driver docker-container --use
docker buildx inspect --bootstrap
```

### 3. Build & Push Multi-Platform Image
To build simultaneously for `linux/amd64` (x86_64 servers) and `linux/arm64` (ARM / Apple Silicon / AWS Graviton) and push directly to Docker Hub:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t rizqipratama1st/tickitz-be-v2:latest \
  --push .
```

### 4. Build Locally for Host Architecture
If you only want to build and load the image into your local Docker daemon for testing:

```bash
docker buildx build \
  --load \
  -t rizqipratama1st/tickitz-be-v2:latest .
```

### 5. Verify the Multi-Arch Manifest
Verify that the published image supports both target architectures:

```bash
docker buildx imagetools inspect rizqipratama1st/tickitz-be-v2:latest
```

---

## Deploy with Kubernetes

Deploy all resources (ConfigMap, Secret, Deployment, Service, and Traefik IngressRoute):

```bash
kubectl apply -k k8s/
```
