# -----------------------------
# Stage Builder (Production)
# -----------------------------
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# -----------------------------
# Stage Development
# -----------------------------
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
# Gunakan npm ci agar install cepat dan deterministic
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# -----------------------------
# Stage Production
# -----------------------------
FROM node:20-alpine AS production
WORKDIR /app

# 1️⃣ Copy package.json dan install production dependencies
# COPY package*.json ./
# RUN npm ci --production

# 2️⃣ Copy hasil build terakhir dari builder
COPY --from=builder /app/.output/ ./


EXPOSE 3000

# 4️⃣ Jalankan server
CMD ["node", "/app/server/index.mjs"]

