# Stage 1: Build the application
FROM node:24-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Run the production server
FROM node:24-alpine AS runtime
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Grab the built compiled output from Stage 1
COPY --from=base /app/dist ./dist

# Set environment variables for the standalone server
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the Node server
CMD ["node", "./dist/server/entry.mjs"]