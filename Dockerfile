# ----------------------------------------------------
# Stage 1: Dependencies installation
# ----------------------------------------------------
FROM node:20-alpine AS deps

WORKDIR /usr/src/app

# Install build dependencies required if any native bindings need compiling on target architecture
RUN apk add --no-cache python3 make g++

# Copy package manifests
COPY package*.json ./

# Install only production dependencies with npm cache mount for accelerated multi-arch builds
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then \
      npm ci --omit=dev --no-audit --prefer-offline; \
    else \
      npm install --omit=dev --no-audit; \
    fi

# ----------------------------------------------------
# Stage 2: Production runner
# ----------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Install tini for graceful PID 1 signal forwarding (SIGTERM / SIGINT)
RUN apk add --no-cache tini

# Copy node_modules from deps stage with pre-assigned non-root ownership
# (avoids expensive recursive chown in emulated QEMU multi-arch layers)
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules

# Copy application source code with non-root ownership
COPY --chown=node:node . .

# Run as non-root user
USER node

# Expose HTTP port
EXPOSE 3000

# Use tini as init process
ENTRYPOINT ["/sbin/tini", "--"]

# Start server
CMD ["node", "app.js"]
